/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicverse dot com>
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
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MergeSort
 *
 * Run Time: O(n * log n)
 *
 * Merge sort is a sorting algorithm that is more generally suited for larger
 *  data sets. It is not an `in place` sorting algorithm, and requires double
 *  the size of memory to operate without any augmented memory management
 *  solutions.
 *
 *  Merge sort uses a recursive `divide and conquer` approach to sorting, by
 *  breaking its larger sequence into smaller sequences that are then sorted
 *  and reemerged back into a larger sequence. A sequence `S` of type `T` and
 *  size `n` will result after sorting to the form
 *
 *     S[T] <= S[2] <= S[3] ... S[n -1] <= S[n]
 *  with performance O(n * log(n)), where `n = r - p + 1`, and `p`, `q`,
 *  and `r` are indices into the sequence that `p <= q < r`. The
 *  performance analysis is broken into two parts, the time to divide
 *  the initial sequence, which runs at O(log(n)) time, and the comparison
 *  of values in the sequence, which runs at O(n), resulting in
 *  O(n) * O(log(n)) = O(n * log(n)) performance.
 *  For example:
 *
 *     Consider a sequence of numbers `A`, where `A` = {8, 3, 9, 2, 10, 2, 4, 1}
 *                      {8, 3, 9, 2, 10, 2, 4, 1}
 *                 {8, 3, 9, 2}          {10, 2, 4, 1}
 *               {8, 3}    {9, 2}      {10, 2}    {4, 1}
 *              {8}  {3}  {9}  {2}    {10}  {2}  {4}  {1}
 *               {3, 8}    {2, 9}      {2, 10}    {1, 4}
 *                {2, 3, 8, 9}           {1, 2, 4, 10}
 *                      {1, 2, 2, 3, 4, 8, 9, 10}
 */

// import { CompareFn } from '@/utils/compare'

/**
 * @template T
 *
 * The `mergeSort` algorithm is implemented using generics, which
 * allows for specific data types to be processed. A `CompareFn`
 * function is passed as a second parameter in order to specify more
 * complex comparison operations.
 *
 * @param {T[]} data
 * @param {CompareFn<T>} fn
 */
// export const mergeSort = <T>(data: T[], fn: CompareFn<T>): void => {

// }

// const merge = <T>(data: T[], p: number, q: number, r: number, fn: CompareFn<T>): void => {
//   const nL = q - p + 1
//   const nR = r - q

//   const L: T[] = []
//   const R: T[] = []

//   let i = 0
//   let j = 0

//   for (; i < nL; ++i) L[i] = data[i + p]
//   for (; j < nR; ++j) R[j] = data[j + q + 1]

//   i = 0 // indexes the smallest remaining element in L
//   j = 0 // indexes the smallest remaining element in R
//   let k = p // indexes the location in A to fill

//   // As long as each of the array L and R contain an unmerged element,
//   // copy the smallest unmerged element back into data[p : r]

//   while (i < nL && j < nR) {
//     if (L[i] <= R[j]) data[k] = L[i++]
//     else data[k] = R[j++]
//     ++k
//   }

//   while (j < nR) {
//     data[k] = R[j++]
//     ++k
//   }
// }