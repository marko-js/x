export declare function createPool<T>(create: () => T): T[] & {
    get: () => T;
};
