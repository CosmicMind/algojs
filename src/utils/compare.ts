/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module Compare
 */

export type CompareFn<T> = (a: T, b: T) => number

export const stringCompare: CompareFn<string> = (a, b) =>
  a === b ? 0 : a > b ? 1 : -1

export const numericCompare: CompareFn<number> = (a, b) =>
  a === b ? 0 : a > b ? 1 : -1

export interface IStringKey {
  key: string
}

export const stringKeyCompare: CompareFn<IStringKey> = (a, b) =>
  a.key === b.key ? 0 : a.key > b.key ? 1 : -1


export interface INumericKey {
  key: number
}

export const numericKeyCompare: CompareFn<INumericKey> = (a, b) =>
  a.key === b.key ? 0 : a.key > b.key ? 1 : -1
