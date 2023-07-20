export type CompareFn<T> = (a: T, b: T) => number;
export declare const stringCompare: CompareFn<string>;
export declare const numericCompare: CompareFn<number>;
export type CompareStringKey = {
    key: string;
};
export declare const stringKeyCompare: CompareFn<CompareStringKey>;
export type CompareNumericKey = {
    key: number;
};
export declare const numericKeyCompare: CompareFn<CompareNumericKey>;
