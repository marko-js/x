import { queueHydrate } from "./queue";
import type { Accessor, Scope, ScopeContext } from "../common/types";
import type { Renderer } from "./renderer";
import { Signal, wrapSignal } from "./signals";

export function createScope(context?: ScopeContext): Scope {
  const scope = {} as Scope;
  scope.___client = true;
  scope.___context = context;
  return scope;
}

const emptyScope = createScope();
export function getEmptyScope(marker?: Comment) {
  emptyScope.___startNode = emptyScope.___endNode = marker;
  return emptyScope;
}

export function write(scope: Scope, localIndex: Accessor, value: unknown) {
  if (scope[localIndex] !== value) {
    scope[localIndex] = value;
    return 1;
  }
  return 0;
}

function binder<T>(bind: (scope: Scope, value: T) => T) {
  return (scope: Scope, value: T) => {
    scope.___bound ??= new Map();
    let bound = scope.___bound.get(value) as T;
    if (!bound) {
      bound = bind(scope, value);
      scope.___bound.set(value, bound);
    }
    return bound;
  };
}

export function bind<S extends Scope>(
  boundScope: S,
  fn: (this: unknown, scope: S, ...args: unknown[]) => unknown
) {
  return fn.length
    ? function bound(this: unknown, ...args: unknown[]) {
        return fn.call(this, boundScope, ...args);
      }
    : function bound(this: unknown) {
        return fn.call(this, boundScope);
      };
}

export const bindRenderer = binder(
  (ownerScope, renderer: Renderer): Renderer => ({
    ...renderer,
    ___owner: ownerScope,
  })
);

export const bindSignal = binder(
  (boundScope, signal: Signal): Signal =>
    wrapSignal(
      (methodName) => (_scope, extraArg) =>
        signal[methodName](boundScope, extraArg)
    )
);

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
