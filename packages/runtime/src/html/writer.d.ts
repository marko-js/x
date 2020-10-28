/// <reference types="node" />
import { Writable } from "stream";
import { Renderer } from "../common/types";
declare type MaybeFlushable = Writable & {
    flush?(): void;
};
export declare function nextId(): number;
export declare function createRenderer(renderer: Renderer): (input: unknown, stream: MaybeFlushable) => Promise<void>;
export declare function write(data: string): void;
export declare function fork<T extends unknown>(promise: Promise<T>, renderResult: (result: T) => void): void;
export declare function tryCatch(renderBody: () => void, renderError: (err: Error) => void): void;
export declare function tryPlaceholder(renderBody: () => void, renderPlaceholder: () => void): void;
export declare function markReplaceStart(id: number): string;
export declare function markReplaceEnd(id: number): string;
export declare function addComponentToInit(markerId: number, inputData: Record<string, unknown>, componentType: string): void;
export {};
