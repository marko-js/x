import { Scope, HydrateSymbols } from "../common/types";
import { bind } from "./scope";

type HydrateFn<S extends Scope = Scope> = (scope: S) => void;

const fnsById: Record<string, HydrateFn> = {};
const SCOPE_ID_MULTIPLIER = 2 ** 16;

export function register<F extends HydrateFn<Scope<any>>>(id: string, fn: F) {
  fnsById[id] = fn;
  return fn;
}

const doc = document;

export function init(runtimeId = "M" /* [a-zA-Z0-9]+ */) {
  const runtimeLength = runtimeId.length;
  const hydrateVar = runtimeId + HydrateSymbols.VAR_HYDRATE;
  // TODO: check if this is a fakeArray
  // and warn in dev that there are conflicting runtime ids
  const initialHydration = (window as any)[hydrateVar];
  const walker = doc.createTreeWalker(doc, 128 /** NodeFilter.SHOW_COMMENT */);

  let currentScope: Scope;
  let currentOffset: number;
  let currentNode: Node;
  const scopeLookup: Record<number, Scope> = {};
  const stack: number[] = [];
  const fakeArray = { push: hydrate };
  const bindFunction = (fnId: string, scopeId: number) => {
    const fn = fnsById[fnId];
    const scope = scopeLookup[scopeId];
    return bind(scope, fn);
  };

  Object.defineProperty(window, hydrateVar, {
    get() {
      return fakeArray;
    },
  });

  if (initialHydration) {
    for (let i = 0; i < initialHydration.length; i += 2) {
      hydrate(initialHydration[i], initialHydration[i + 1]);
    }
  }

  function hydrate(
    scopesFn: (
      b: typeof bindFunction,
      s: typeof scopeLookup,
      ...rest: unknown[]
    ) => Record<string, Scope>,
    calls: Array<string | number>
  ) {
    if (doc.readyState !== "loading") {
      walker.currentNode = doc;
    }

    const scopes = scopesFn(bindFunction, scopeLookup);

    /**
     * Loop over all the new hydration scopes and see if a previous walk
     * had to create a dummy scope to store Nodes of interest.
     * If so merge them and set/replace the scope in the scopeLookup.
     */
    for (const scopeIdAsString in scopes) {
      const scopeId = parseInt(scopeIdAsString);
      const scope = scopes[scopeId];
      const storedScope = scopeLookup[scopeId];

      if (storedScope !== scope) {
        if (storedScope) {
          Object.assign(scope, storedScope);
        } else {
          scope.___id = scopeId * SCOPE_ID_MULTIPLIER;
          scopeLookup[scopeId] = scope;
        }
        if (currentScope === storedScope) {
          currentScope = scope;
        }
      }
    }

    while ((currentNode = walker.nextNode()!)) {
      const nodeValue = currentNode.nodeValue;
      if (nodeValue?.startsWith(`${runtimeId}`)) {
        const token = nodeValue[runtimeLength];
        const data = parseInt(nodeValue.slice(runtimeLength + 1));
        if (token === HydrateSymbols.SCOPE_OFFSET) {
          // eslint-disable-next-line no-constant-condition
          if ("MARKO_DEBUG") {
            const [offset, scopeId, index] = nodeValue
              .slice(runtimeLength + 1)
              .split(" ");
            if (
              parseInt(scopeId) * SCOPE_ID_MULTIPLIER !==
              currentScope.___id
            ) {
              throw new Error("INVALID_MARKER_NESTING: " + nodeValue);
            }
            if (parseInt(offset) + currentOffset !== parseInt(index)) {
              throw new Error("SCOPE_OFFSET_MISMATCH: " + nodeValue);
            }
          }
          const node = currentNode.nextSibling;
          // currentNode.parentNode!.removeChild(currentNode);
          currentScope[(currentOffset += data)] = node;
        } else if (token === HydrateSymbols.SCOPE_START) {
          if (currentScope) {
            stack.push(currentScope.___id, currentOffset);
          }
          currentScope = scopeLookup[data]!;
          currentOffset = 0;
          if (!currentScope) {
            scopeLookup[data] = currentScope = [] as unknown as Scope;
            currentScope.___id = data * SCOPE_ID_MULTIPLIER;
          }
          currentScope.___startNode = currentNode as ChildNode;
        } else if (token === HydrateSymbols.SCOPE_END) {
          // eslint-disable-next-line no-constant-condition
          if ("MARKO_DEBUG") {
            if (data * SCOPE_ID_MULTIPLIER !== currentScope.___id) {
              throw new Error("SCOPE_END_MISMATCH: " + nodeValue);
            }
          }
          currentScope.___endNode = currentNode as ChildNode;
          currentOffset = stack.pop() as number;
          currentScope = scopeLookup[stack.pop() as number]!;
          // eslint-disable-next-line no-constant-condition
        } else if ("MARKO_DEBUG") {
          throw new Error("MALFORMED MARKER: " + nodeValue);
        }
      }
    }

    for (let i = 0; i < calls.length; i += 3) {
      fnsById[calls[i]]!(scopeLookup[calls[i + 1] as number]!);
    }
  }
}
