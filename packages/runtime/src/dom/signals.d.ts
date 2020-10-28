import { Fragment } from "./fragments";
export interface Batch {
    ___bid: number;
    ___computations: Computation[];
    ___effects: Effect[];
    ___values: Record<string, unknown>;
    ___signals: Record<string, UpstreamSignal<unknown>>;
    ___computationIndex: number;
    ___fragments: Map<Fragment, boolean> | undefined;
}
export declare const enum SignalTypes {
    SOURCE = 0,
    COMPUTATION = 1,
    ASYNC_COMPUTATION = 2,
    EFFECT = 3,
    USER_EFFECT = 4
}
export interface BaseSignal<V> {
    ___bid: number;
    ___sid: number;
    ___type: SignalTypes;
    ___value: V;
    ___upstream: unknown;
    ___upstreamSingle: 0 | 1;
    ___downstream: DownstreamSignal[] | undefined;
    ___execFn: ((arg: unknown) => unknown) | undefined;
    ___execObject: Record<string, unknown> | undefined;
    ___execProperty: string | undefined;
    ___execStart: ExecChain | undefined;
    ___execEnd: ExecChain | undefined;
    ___consumable: boolean;
    ___cleanup: (() => void) | undefined;
    ___root: Fragment;
}
declare type ExecChain = ((...args: unknown[]) => unknown) & {
    next?: ExecChain;
};
interface SignalWithDownstream<V> extends BaseSignal<V> {
    ___downstream: DownstreamSignal[];
}
interface SignalSingleUpstream<V> extends BaseSignal<V> {
    ___upstream: UpstreamSignalOrValue;
    ___upstreamSingle: 1;
}
interface SignalMultipleUpstream<V> extends BaseSignal<V> {
    ___upstream: UpstreamSignalOrValue[];
    ___upstreamSingle: 0;
}
declare type SignalWithUpstream<V> = SignalSingleUpstream<V> | SignalMultipleUpstream<V>;
export declare type Source<V> = SignalWithDownstream<V> & {
    ___type: SignalTypes.SOURCE;
    ___execFn: undefined;
    ___upstream: undefined;
};
export declare type SyncComputation<V> = SignalWithUpstream<V> & SignalWithDownstream<V> & {
    ___type: SignalTypes.COMPUTATION;
    ___execFn: (arg: unknown) => V;
};
export declare type ConsumableComputation<V> = SyncComputation<V> & {
    ___execFn: typeof execConsumable;
    ___execStart: ExecChain;
    ___execEnd: ExecChain;
};
export declare type AsyncComputation<V> = SignalWithUpstream<V> & SignalWithDownstream<V> & {
    ___type: SignalTypes.ASYNC_COMPUTATION;
    ___execFn: (arg: unknown) => Promise<V>;
};
export declare type InternalEffect = SignalWithUpstream<undefined> & {
    ___type: SignalTypes.EFFECT;
    ___execFn: (arg: unknown) => void;
    ___downstream: undefined;
};
export declare type UserEffect = SignalWithUpstream<undefined> & {
    ___type: SignalTypes.USER_EFFECT;
    ___execFn: (arg: unknown) => void;
    ___downstream: undefined;
};
export declare type Computation<V = unknown> = SyncComputation<V> | AsyncComputation<V>;
export declare type Effect = InternalEffect | UserEffect;
declare type UpstreamSignal<V = unknown> = Source<V> | Computation<V>;
export declare type UpstreamSignalOrValue<V = unknown> = UpstreamSignal<V> | V;
export declare type UpstreamRawValue<T> = T extends UpstreamSignal<infer V> ? V : T;
declare type UpstreamRawValues<T> = T extends readonly UpstreamSignalOrValue[] ? {
    [I in keyof T]: UpstreamRawValue<T[I]>;
} : UpstreamRawValue<T>;
declare type DownstreamSignal = Computation<unknown> | Effect;
export declare function createSource<V>(initialValue: V): Source<V>;
export declare function createComputation<V, U extends UpstreamSignalOrValue | readonly UpstreamSignalOrValue[]>(fn: (arg: UpstreamRawValues<U>) => V, upstream: U, upstreamSingle: 0 | 1, consumable?: boolean, type?: SignalTypes, ensureComputation?: boolean): V | (SignalSingleUpstream<V> & SignalWithDownstream<V> & {
    ___type: SignalTypes.COMPUTATION;
    ___execFn: (arg: unknown) => V;
}) | (SignalMultipleUpstream<V> & SignalWithDownstream<V> & {
    ___type: SignalTypes.COMPUTATION;
    ___execFn: (arg: unknown) => V;
});
declare function execConsumable<V>(this: ConsumableComputation<V>, originalInput: unknown): V;
export declare function createEffect<U>(fn: (arg: UpstreamRawValues<U>) => void, upstream: U, upstreamSingle: 0 | 1, type?: SignalTypes): Effect;
export declare function createPropertyComputation<P extends string, O extends Record<string, unknown>>(property: P, upstream: UpstreamSignalOrValue<O>, consumable?: boolean): O[P] | (SignalSingleUpstream<O[P]> & SignalWithDownstream<O[P]> & {
    ___type: SignalTypes.COMPUTATION;
    ___execFn: (arg: unknown) => O[P];
}) | (SignalMultipleUpstream<O[P]> & SignalWithDownstream<O[P]> & {
    ___type: SignalTypes.COMPUTATION;
    ___execFn: (arg: unknown) => O[P];
});
export declare function createPropertyEffect<P extends string, U extends UpstreamSignalOrValue>(object: Record<string, unknown>, property: P, upstream: U): Effect;
export declare function setSignalValue<V>(signal: UpstreamSignal<V>, nextValue: V): void;
export declare function isSignal<T>(signalOrValue: UpstreamSignalOrValue<T>): signalOrValue is UpstreamSignal<T>;
export declare function dynamicKeys<T extends UpstreamSignalOrValue<Record<string, unknown>>>(object: T, watchedKeys: string[]): T;
export declare function get<T>(value: UpstreamSignalOrValue<T>): T;
export declare let set: typeof setAndBeginBatch;
declare function setAndBeginBatch(value: UpstreamSignalOrValue, newValue: unknown): unknown;
export declare function beginBatch(): {
    ___bid: number;
    ___computations: never[];
    ___effects: never[];
    ___values: {};
    ___signals: {};
    ___computationIndex: number;
    ___fragments: undefined;
};
export declare function runInBatch<T extends (...args: any) => any>(fn: T): ReturnType<T>;
export declare function markFragmentDestroyed(f: Fragment): void;
export declare function tick(): Promise<void>;
export {};
