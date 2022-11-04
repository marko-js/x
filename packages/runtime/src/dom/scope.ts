import { queueHydrate } from "./queue";
import type { Scope } from "../common/types";
import type { Renderer } from "./renderer";
import { Signal, wrapSignal } from "./signals";

const CLIENT_SCOPE_ID_BIT = 2 ** 52;
let scopeId = 0;

export function createScope(owner?: Scope): Scope {
  const scope = {} as Scope;
  scope.___id = CLIENT_SCOPE_ID_BIT + scopeId++;
  scope.___client = true;
  scope._ = owner;
  return scope;
}

const emptyScope = createScope();
export function getEmptyScope(marker?: Comment) {
  emptyScope.___startNode = emptyScope.___endNode = marker;
  return emptyScope;
}

export function write<S extends Scope>(
  scope: S,
  localIndex: number,
  value: unknown
) {
  if (scope[localIndex] !== value) {
    scope[localIndex] = value;
    return 1;
  }
  return 0;
}

export function bind<S extends Scope>(
  boundScope: S,
  fn: (scope: S, ...args: unknown[]) => unknown
) {
  return fn.length
    ? (...args: unknown[]) => fn(boundScope, ...args)
    : () => fn(boundScope);
}

export function bindRenderer<S extends Scope>(
  ownerScope: S,
  renderer: Renderer
): Renderer {
  return {
    ...renderer,
    ___owner: ownerScope,
  };
}

export function bindSignal<S extends Scope>(
  boundScope: S,
  signal: Signal
): Signal {
  boundScope.___boundSignals ??= new Map();
  let boundSignal = boundScope.___boundSignals.get(signal);
  if (!boundSignal) {
    boundSignal = wrapSignal(
      (methodName) => (_scope, extraArg) =>
        signal[methodName](boundScope, extraArg)
    );
    boundScope.___boundSignals.set(signal, boundSignal);
  }
  return boundSignal;
}

export function destroyScope(scope: Scope) {
  scope._?.___cleanup?.delete(scope);

  const cleanup = scope.___cleanup;
  if (cleanup) {
    for (const instance of cleanup) {
      if (typeof instance === "object") {
        destroyScope(instance);
      } else {
        queueHydrate(scope, scope[instance] as () => void);
      }
    }
  }
  const closureSignals = scope.___renderer?.___closureSignals;
  if (closureSignals) {
    for (const signal of closureSignals) {
      signal.___unsubscribe?.(scope);
    }
  }
  return scope;
}

export function onDestroy(scope: Scope, localIndex: number | string) {
  const parentScope = scope._;
  if (parentScope) {
    (parentScope.___cleanup = parentScope.___cleanup || new Set()).add(scope);
  }
  (scope.___cleanup = scope.___cleanup || new Set()).add(localIndex);
}

export function getOwnerScope(scope: Scope, level: number) {
  let ownerScope = scope._!;
  for (let i = 1; i++ < level; ) ownerScope = ownerScope._!;
  return ownerScope;
}
