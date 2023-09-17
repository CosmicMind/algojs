/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
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
 * @module Heap
 *
 */

import {
  assert,
} from '@cosmicmind/foundationjs'

export type Heap<T> = {
  size: number
  nodes: T[]
}

export const heapParent = (index: number): number | never => {
  assert(-1 < index, 'index must be 0 or greater')
  return index / 2
}

export const heapLeft = (index: number): number | never => {
  assert(-1 < index, 'index must be 0 or greater')
  return 2 * index
}

export const heapRight = (index: number): number | never => {
  assert(-1 < index, 'index must be 0 or greater')
  return 2 * index + 1
}

export const heapSwapAt = <T>(heap: Heap<T>, a: number, b: number): void => {
  assert(-1 < a, 'first index must be 0 or greater')
  assert(-1 < b, 'second index must be 0 or greater')

  const temp = heap.nodes[a]
  heap.nodes[a] = heap.nodes[b]
  heap.nodes[b] = temp
}

export const maxHeapify = <T>(heap: Heap<T>, index: number): void | never {
  assert(-1 < index, 'index must be 0 or greater')

  const l = heapLeft(index)
  const r = heapRight(index)

  let largest = 0

  if (l <= heap.size && heap.nodes[l] > heap.nodes[index]) {
    largest = l
  }
  else {
    largest = index
  }

  if (r <= heap.size && heap.nodes[r] > heap.nodes[largest]) {
    largest = r
  }

  if (largest != index) {
    heapSwapAt(heap, index, largest)
    maxHeapify(heap, largest)
  }
}
