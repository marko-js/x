import { Fragment } from "./fragments";
export declare function reconcile(parent: Node & ParentNode, oldKeys: string[], oldNodes: Map<string, Fragment>, newKeys: string[], newNodes: Map<string, Fragment>, afterReference: Node | null): void;
