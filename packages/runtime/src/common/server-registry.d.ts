import { Renderer } from "./types";
export declare function serverRegister(id: string, renderer: Renderer): (input: any) => void;
export declare function getRenderer(id: string): Renderer;
