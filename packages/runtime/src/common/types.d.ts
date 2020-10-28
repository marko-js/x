export declare type Renderer = (...args: unknown[]) => void;
export declare type CommentWalker = TreeWalker & Record<string, Comment>;
export declare type HydrateInstance = [
    number,
    string,
    Record<string, unknown>
];
