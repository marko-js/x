import { Computation, UpstreamSignalOrValue } from "./signals";
import { Renderer } from "./dom";
export interface Fragment {
    ___firstRef: Fragment & {
        ___firstChild: Node;
    };
    ___lastRef: Fragment & {
        ___lastChild: Node;
    };
    ___nextNode?: Node;
    ___firstChild: Node;
    ___lastChild: Node;
    ___parentFragment?: Fragment;
    ___dom?: Node;
    ___tracked: Set<Fragment | (Computation<unknown> & {
        ___cleanup: () => void;
    })>;
    ___cleanup: (toplevel?: boolean) => void;
}
export declare let currentFragment: Fragment | undefined;
export declare function createFragment(renderer: Renderer, parentFragment?: Fragment | undefined, ...input: UpstreamSignalOrValue[]): Fragment;
export declare function insertFragmentBefore(parent: (Node & ParentNode) | null, fragment: Fragment, nextSibling: Node): void;
export declare function insertFragmentBefore(parent: Node & ParentNode, fragment: Fragment, nextSibling: Node | null): void;
export declare function replaceFragment(current: Fragment, replacement: Fragment): void;
export declare function removeFragment(fragment: Fragment): void;
export declare function referenceStart(fragment: Fragment): Node;
export declare function referenceAfter(fragment: Fragment): ChildNode | null;
export declare function withChildren(parent: ParentNode, start: Node, stop: Node, reference: Node | null, method: (a: Node, b: Node | null) => void): void;
