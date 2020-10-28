import { UpstreamSignalOrValue, UpstreamRawValue } from "./signals";
declare type HydrateFunction = (...args: UpstreamSignalOrValue[]) => void;
export interface Renderer<H extends HydrateFunction = HydrateFunction> {
    ___input?: string[];
    ___clone: () => Node;
    ___hydrate?: H;
    ___walks?: string;
    ___template?: string;
    ___sourceNode?: Node;
}
export interface ComponentFragment<Input> extends DocumentFragment {
    rerender: (input: Input) => void;
    destroy: () => void;
}
export declare function createRenderFn<H extends HydrateFunction>(template: Renderer["___template"], walks: Renderer["___walks"], inputProps?: Renderer["___input"], hydrate?: H): ((input: UpstreamRawValue<Parameters<H>[0]>) => ComponentFragment<UpstreamRawValue<Parameters<H>[0]>>) & Renderer<(input: unknown) => void>;
export declare function createRenderer<T, H extends HydrateFunction>(template: string, walks?: Renderer["___walks"], input?: Renderer["___input"], hydrate?: H, target?: T): T & Renderer<H>;
export declare function isDocumentFragment(node: Node): node is DocumentFragment;
export declare function render(renderer: Renderer, ...input: UpstreamSignalOrValue[]): void;
export declare function attr(name: string, value: UpstreamSignalOrValue): void;
export declare function attrs(attributes: UpstreamSignalOrValue<Record<string, unknown> | null | undefined>): void;
export declare function html(value: UpstreamSignalOrValue<string>): void;
export declare function prop(name: string, value: UpstreamSignalOrValue, node?: Node): void;
export declare function props(properties: any): void;
export declare function text(value: UpstreamSignalOrValue): void;
export declare function textContent(value: UpstreamSignalOrValue): void;
export declare function innerHTML(value: UpstreamSignalOrValue): void;
export declare function dynamicTag(tag: UpstreamSignalOrValue<string | Renderer>, input: UpstreamSignalOrValue<Record<string, unknown>>, renderBody?: Renderer): void;
export {};
