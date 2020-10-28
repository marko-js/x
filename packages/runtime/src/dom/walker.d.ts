import { Renderer } from "./dom";
import { UpstreamSignalOrValue } from "./signals";
export declare const walker: TreeWalker;
export declare const enum WalkCodes {
    Get = 33,
    Before = 35,
    After = 36,
    Inside = 37,
    Replace = 38,
    Out = 39,
    OutEnd = 49,
    Over = 58,
    OverEnd = 91,
    Next = 93,
    NextEnd = 126
}
export declare function walk<T extends Node>(newNode?: T): Node;
export declare function walkAndGetText(): Node;
export declare function detachedWalk(firstChild: Node, renderer: Renderer, ...input: UpstreamSignalOrValue[]): void;
export declare function beginHydrate(startNode: Node): void;
export declare function endHydrate(): void;
