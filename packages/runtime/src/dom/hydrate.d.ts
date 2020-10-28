import { Renderer } from "./dom";
export declare function register(id: string, hydrate: Renderer["___hydrate"]): ((...args: unknown[]) => void) | undefined;
export declare function init(runtimeId?: string): void;
