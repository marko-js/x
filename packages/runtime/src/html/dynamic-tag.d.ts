import { Renderer } from "../common/types";
interface RenderBodyObject {
    [x: string]: unknown;
    renderBody: Renderer;
}
export declare function dynamicTag(tag: unknown | string | Renderer | RenderBodyObject, input: Record<string, unknown>, renderBody: (() => void) | undefined): void;
export {};
