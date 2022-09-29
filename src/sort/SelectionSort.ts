/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

/**
 * @module SelectionSort
 *
 * SelectionSort is a traditional sorting algorithm that is generally
 * used on small sizes of data due to its slow performance run time.
 *
 * @performance O(n^2)
 */

import { LinearSort } from '../utils/sort'
import { CompareFn } from '../utils/compare'

/**
 * The `selectionSort` algorithm is implemented using generics, which
 * allows for specific data types to be processed. A `CompareFn`
 * function is passed as a second parameter in order to specify more
 * complex comparison operations.
 *
 * @performance O(n^2)
 */
export const selectionSort: LinearSort = <T>(data: T[], fn: CompareFn<T>): void => {
  let q = 0

  for (let i = 0, l = data.length; i < l; ++i) {
    q = i
    for (let j = i + 1; j < l; ++j) {
      if (0 < fn(data[q], data[j])) {
        q = j
      }
    }

    const temp = data[q]
    data[q] = data[i]
    data[i] = temp
  }
}
