import { Optional } from '@cosmicmind/foundationjs';
export type Stackable = {
    parent?: Stackable;
};
export declare const StackCompareFn: <T extends Stackable>(a: T, b: T) => number;
export declare const stackNodeCreate: <T extends Stackable>(props?: Omit<T, "parent"> | undefined) => T;
export type Stack<T extends Stackable> = {
    top?: T;
    count: number;
};
export declare const stackCreate: <T extends Stackable>() => Stack<T>;
export declare function stackPeek<T extends Stackable>(stack: Stack<T>): Optional<T>;
export declare function stackPush<T extends Stackable>(stack: Stack<T>, node: T): void;
export declare function stackPop<T extends Stackable>(stack: Stack<T>): Optional<T>;
export declare function stackIterator<T extends Stackable>(stack: Stack<T>): IterableIterator<T>;
export declare function stackIterateFrom<T extends Stackable>(node: T): IterableIterator<T>;
export declare function stackIterateToParent<T extends Stackable>(node: T): IterableIterator<T>;
export declare function stackClear<T extends Stackable>(stack: Stack<T>): void;
export declare function stackDepth<T extends Stackable>(node: T): number;
export declare function stackIsTop<T extends Stackable>(stack: Stack<T>, node: T, compare?: (a: T, b: T) => number): boolean;
export declare function stackHas<T extends Stackable>(stack: Stack<T>, node: T, compare?: (a: T, b: T) => number): boolean;
export declare function stackQuery<T extends Stackable>(stack: Stack<T>, ...fn: ((node: T) => boolean)[]): Set<T>;
