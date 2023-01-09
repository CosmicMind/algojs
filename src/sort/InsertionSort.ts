/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicverse dot org>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module InsertionSort
 *
 * Insertion sort is an `in place` sorting algorithm that holds a constant number
 *  of keys outside the sequence at any given time.
 *
 *  It is an efficient algorithm for smaller sizes of `S`, where `S` is a sequence
 *  of type `T` and size `n`, in the form
 *
 *     S[T] <= S[2] <= S[3] ... S[n -1] <= S[n]
 *  It works by comparing an unsorted value in the sequence to the other members
 *  of that sequence until it finds its new position.
 *
 *  For example:
 *
 *     Consider a sequence of numbers `A`, where `A` = {8, 3, 9, 10, 2, 4}
 *  Insertion sort begins at position `i` where A[i] = 3, and compares that value
 *  with position A[i - 1] = 8. If A[i] < A[i - 1], whereas 3 < 8, which is true,
 *  insertion sort will swap the value in position A[i] for that in position
 *  A[i - 1]. This sequence of operations continue until the first false result,
 *  that is A[i] > A[i - 1]. Insertion sort then moves to position A[i + 1] and
 *  continues the sequence of operations just as before.
 *  At worst case, the sorting algorithm will perform at O(n^2) performance, where
 *  all smaller values are pushed towards the end of the sequence causing a full
 *  reorder of the sequence itself, for example {7, 6, 5, 4, 3, 2, 1}, would need
 *  to be sorted to {1, 2, 3, 4, 5, 6, 7}. If the sequence has already been sorted
 *  than subsequent insertions and sorts will perform at O(n), thus making
 *  insertion sort a suitable sorting algorithm for sequential input of data that
 *  has a small size `n`.
 *
 * @performance O(n^2)
 */

import { LinearSort } from '@/utils/sort'
import { CompareFn } from '@/utils/compare'

/**
 * The `insertionSort` algorithm is implemented using generics, which
 * allows for specific data types to be processed. A `CompareFn`
 * function is passed as a second parameter in order to specify more
 * complex comparison operations.
 *
 * @performance O(n^2)
 */
export const insertionSort: LinearSort = <T>(data: T[], fn: CompareFn<T>): void => {
  for (let i = 1, l = data.length; i < l; ++i) {
    const key = data[i]
    let j = i - 1

    while (0 <= j && 0 < fn(data[j], key)) {
      data[j + 1] = data[j]
      --j
    }

    data[j + 1] = key
  }
}