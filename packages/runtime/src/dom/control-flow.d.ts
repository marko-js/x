import { UpstreamSignalOrValue } from "./signals";
import { Renderer } from "./dom";
export declare function loopOf<T>(array: UpstreamSignalOrValue<T[]>, renderer: Renderer<(item: UpstreamSignalOrValue<T>, index: UpstreamSignalOrValue<number> | boolean, all: typeof array) => void>, getKey: (item: T, index: number) => string, hasIndex?: boolean, onlyChild?: boolean): void;
export declare function loopIn<T>(object: UpstreamSignalOrValue<Record<string, T>>, renderer: Renderer<(key: UpstreamSignalOrValue<string>, value: UpstreamSignalOrValue<T>, all: typeof object) => void>, onlyChild?: boolean): void;
export declare function loopFrom(from: UpstreamSignalOrValue<number>, to: UpstreamSignalOrValue<number>, step: UpstreamSignalOrValue<number>, renderer: Renderer<(i: UpstreamSignalOrValue<number>) => void>, onlyChild?: boolean): void;
export declare function conditional(renderer: UpstreamSignalOrValue<Renderer | undefined>, ...input: UpstreamSignalOrValue[]): void;
