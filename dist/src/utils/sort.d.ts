import { CompareFn } from '../utils/compare';
export type LinearSort = <T>(data: T[], fn: CompareFn<T>) => void;
