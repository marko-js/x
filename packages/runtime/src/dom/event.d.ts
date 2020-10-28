import { UpstreamSignalOrValue } from "./signals";
declare type EventNames = keyof GlobalEventHandlersEventMap;
declare type Unset = false | null | undefined;
export declare function on<T extends EventNames, H extends (ev: GlobalEventHandlersEventMap[T], target: Element) => void>(type: T, handler: H | Unset): void;
export declare function dynamicOn<T extends EventNames, H extends (ev: GlobalEventHandlersEventMap[T], target: Element) => void>(type: T, handler: UpstreamSignalOrValue<H | Unset>): void;
export declare function once<T extends EventNames, H extends (ev: GlobalEventHandlersEventMap[T], target: Element) => void>(type: T, handler: UpstreamSignalOrValue<H | Unset>): void;
export {};
