import { Writable } from "stream";
import { Context, setContext } from "../common/context";
import { Renderer, HydrateInstance } from "../common/types";
import reorderRuntime from "./reorder-runtime";

const runtimeId = "M";
const reorderRuntimeString = String(reorderRuntime).replace(
  "RUNTIME_ID",
  runtimeId
);

type MaybeFlushable = Writable & { flush?(): void };
let $_buffer: Buffer | null = null;
let $_stream: MaybeFlushable | null = null;
let $_flush: typeof flushToStream | null = null;
let $_promises: Array<
  Promise<unknown> & { isPlaceholder?: true }
> | null = null;

const uids: WeakMap<MaybeFlushable, number> = new WeakMap();
const runtimeFlushed: WeakSet<MaybeFlushable> = new WeakSet();

export function nextId() {
  const id = uids.get($_stream!)! + 1 || 0;
  uids.set($_stream!, id);
  return id;
}

export function createRenderer(renderer: Renderer) {
  type Input = Parameters<Renderer>[0];
  return async (input: Input, stream: MaybeFlushable) => {
    $_buffer = createBuffer();
    $_stream = stream;
    $_flush = flushToStream;

    try {
      let renderedPromises: typeof $_promises;
      try {
        renderer(input);
      } finally {
        renderedPromises = $_promises;
        $_flush();
        clearScope();
      }

      if (renderedPromises) {
        await Promise.all(renderedPromises);
      }
    } catch (err) {
      stream.emit("error", err);
    } finally {
      stream.end();
    }
  };
}

export function write(data: string) {
  $_buffer!.content += data;
}

export function fork<T extends unknown>(
  promise: Promise<T>,
  renderResult: (result: T) => void
) {
  $_flush!();

  let resolved = false;
  let targetFlush = $_flush!;
  const forkedBuffer = createBuffer();

  $_promises = $_promises || [];
  $_promises.push(
    resolveWithScope(
      promise,
      result => {
        resolved = true;
        try {
          renderResult(result);
        } finally {
          mergeBuffers(forkedBuffer, $_buffer!);
          if ($_promises) {
            const originalTargetFlush = targetFlush;
            targetFlush = $_flush!;
            Promise.all($_promises).then(
              () => (targetFlush = originalTargetFlush)
            );
          }
        }
      },
      err => {
        resolved = true;
        $_buffer = forkedBuffer;
        $_flush = targetFlush;
        throw err;
      }
    )
  );

  $_flush = () => {
    if (resolved) {
      targetFlush();
    } else {
      mergeBuffers($_buffer!, forkedBuffer);
    }
  };
}

export function tryCatch(
  renderBody: () => void,
  renderError: (err: Error) => void
) {
  const id = nextId();
  let err: Error | null = null;

  const originalPromises = $_promises;
  const originalBuffer = $_buffer!;
  const originalFlush = $_flush!;
  const tryBuffer = createBuffer();

  $_flush = () => {
    $_buffer = originalBuffer;
    $_flush = originalFlush;
    markReplaceStart(id);
    mergeBuffers(tryBuffer, $_buffer);
    $_flush();
  };

  try {
    $_buffer = tryBuffer;
    $_promises = null;
    renderBody();
  } catch (_err) {
    err = _err;
  } finally {
    const childPromises = $_promises;
    $_promises = originalPromises;

    if (err) {
      $_buffer = originalBuffer;
      $_flush = originalFlush;
      renderError(err);
    } else if (!childPromises) {
      $_buffer = originalBuffer;
      $_flush = originalFlush;
      mergeBuffers(tryBuffer, $_buffer);
    } else {
      markReplaceEnd(id);
      $_promises = $_promises || [];
      $_promises.push(
        resolveWithScope(Promise.all(childPromises), null, asyncErr => {
          renderReplacement(renderError, asyncErr, id);
        })
      );
    }
  }
}

export function tryPlaceholder(
  renderBody: () => void,
  renderPlaceholder: () => void
) {
  const originalBuffer = $_buffer!;
  const originalPromises = $_promises;
  const originalFlush = $_flush!;
  const asyncBuffer = createBuffer();

  let resolved = false;
  const targetFlush = originalFlush;
  $_flush = () => {
    if (resolved) {
      targetFlush();
    } else {
      mergeBuffers($_buffer!, asyncBuffer);
    }
  };
  $_buffer = createBuffer();
  $_promises = null;

  renderBody();
  $_flush();

  const childPromises = $_promises!;
  $_buffer = originalBuffer;
  $_promises = originalPromises;
  $_flush = originalFlush;

  if (childPromises) {
    const contentPromises: Array<Promise<unknown>> = [];
    const placeholderPromises: Array<
      Promise<unknown> & { isPlaceholder: true }
    > = [];
    for (const promise of childPromises) {
      if (promise.isPlaceholder) {
        placeholderPromises.push(
          promise as Promise<unknown> & {
            isPlaceholder: true;
          }
        );
      } else {
        contentPromises.push(promise);
      }
    }

    if (placeholderPromises.length) {
      ($_promises = originalPromises || []).push(...placeholderPromises);
    } else {
      $_promises = originalPromises;
    }

    if (contentPromises.length) {
      const id = nextId();
      $_promises = $_promises || [];
      $_promises.push(
        Object.assign(
          resolveWithScope(Promise.all(contentPromises), () => {
            resolved = true;
            renderReplacement(mergeBuffers, asyncBuffer, id);
          }),
          { isPlaceholder: true } as const
        )
      );
      markReplaceStart(id);
      renderPlaceholder();
      markReplaceEnd(id);
      return;
    }
  }

  mergeBuffers(asyncBuffer, originalBuffer);
}

// TODO: this variable needs to be included in the scope
let currentHydrateRoot: boolean | number = false;

export function register<R extends Renderer>(id: string, renderer: R) {
  return (input: Record<string, unknown>): ReturnType<R> => {
    if (currentHydrateRoot === false) {
      const instanceId = nextId();
      currentHydrateRoot = instanceId;
      const result = renderer(input) as ReturnType<R>;
      currentHydrateRoot = false;
      addComponentToInit(instanceId, input || {}, id);
      return result;
    } else {
      return renderer(input) as ReturnType<R>;
    }
  };
}

export function hydrateMarker() {
  let str: string;
  if (currentHydrateRoot === false) {
    str = "";
  } else if (currentHydrateRoot === true) {
    str = `<!#>`;
  } else {
    str = `<!${marker(currentHydrateRoot)}>`;
    currentHydrateRoot = true;
  }
  return str;
}

export function markReplaceStart(id: number) {
  return ($_buffer!.content += `<!${marker(id)}>`);
}

export function markReplaceEnd(id: number) {
  return ($_buffer!.content += `<!${marker(id)}/>`);
}

export function addComponentToInit(
  markerId: number,
  inputData: Record<string, unknown>,
  componentType: string
) {
  $_buffer!.components = $_buffer!.components || [];
  $_buffer!.components.push([markerId, componentType, inputData]);
}

function flushToStream() {
  if ($_buffer!.components) {
    $_buffer!.content += `<script>${runtimeId}$c=(window.${runtimeId}$c||[]).concat(${JSON.stringify(
      $_buffer!.components
    )})</script>`;
  }
  $_stream!.write($_buffer!.content);
  if ($_stream!.flush) {
    $_stream!.flush();
  }
  clearBuffer($_buffer!);
}

function renderReplacement<T>(render: (data: T) => void, data: T, id: number) {
  let runtimeCall = `${runtimeId}$r`;
  if (!runtimeFlushed.has($_stream!)) {
    runtimeCall = `(${runtimeCall}=${reorderRuntimeString})`;
    runtimeFlushed.add($_stream!);
  }
  $_buffer!.content += `<t id="${marker(id)}">`;
  render(data);
  $_buffer!.content += `</t><script>${runtimeCall}(${id})</script>`;
}

function marker(id: number) {
  return `${runtimeId}$${id}`;
}

interface Buffer {
  content: string;
  components: HydrateInstance[] | null;
}

function createBuffer() {
  return {
    content: "",
    components: null
  } as Buffer;
}

function mergeBuffers(source: Buffer, target: Buffer = $_buffer!) {
  target.content += source.content;
  if (source.components) {
    if (target.components) {
      for (let i = 0, length = source.components.length; i < length; i++) {
        target.components.push(source.components[i]);
      }
    } else {
      target.components = source.components;
    }
  }
  clearBuffer(source);
}

function clearBuffer(buffer: Buffer) {
  buffer.content = "";
  buffer.components = null;
}

function clearScope() {
  $_buffer = $_promises = $_stream = $_flush = null;
  setContext(null);
}

function resolveWithScope<T>(
  promise: Promise<T>,
  onResolve: null | ((r: T) => unknown),
  onReject?: (e: Error) => unknown
) {
  const originalStream = $_stream;
  const originalBuffer = $_buffer;
  const originalFlush = $_flush;
  const originalContext = Context;

  return promise.then(
    onResolve &&
      (result => {
        $_stream = originalStream;
        $_buffer = originalBuffer;
        $_flush = originalFlush;

        try {
          setContext(originalContext);
          onResolve(result);
          return $_promises && Promise.all($_promises);
        } finally {
          $_flush!();
          clearScope();
        }
      }),
    onReject &&
      (error => {
        $_stream = originalStream;
        $_buffer = originalBuffer;
        $_flush = originalFlush;

        try {
          setContext(originalContext);
          onReject(error);
          return $_promises && Promise.all($_promises);
        } finally {
          $_flush!();
          clearScope();
        }
      })
  );
}
