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
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module Stack
 */

import { Optional } from '@cosmicverse/foundation'

/**
 * The `Stackable` interface defines a structure that moves
 * from parent to child, or child to parent. Advancing to the
 * `child`, or `parent` tree within its structure has a
 * performance runtime of O(1).
 *
 * @property {Stackable} [parent]
 */
export interface Stackable {
  parent?: Stackable
}

/**
 * The `Stack` interface is a linear data structure that
 * stores a single pointer to a `Stackable` tree called `top`.
 * It creates a `vertical` relationship between the `Stackable`
 * instances within its structure.
 *
 * @property {Stackable} [top]
 * @property {number} count
 */
export class Stack {
  /**
   * A reference to the `topmost` item.
   *
   * @type {Stackable}
   */
  top?: Stackable

  /**
   * A reference to the number of items
   * within the `Stack`.
   *
   * @type {number}
   */
  count: number

  /**
   * Class constructor.
   */
  constructor() {
    this.count = 0
  }
}

/**
 * Create a new `Stack` instance.
 * @returns {Stack}
 */
export const createStack = (): Stack => new Stack()

/**
 * The `push` operation adds a `Stackable` tree to the
 * `top` position of the `Stack`.
 *
 * @performance O(1)
 * @param {Stack} stack
 * @param {Stackable} el
 */
export function push(stack: Stack, el: Stackable): void {
  el.parent = stack.top
  stack.top = el
  ++stack.count
}

/**
 * The `pop` operation removes a `Stackable` tree from the
 * `top` of the `Stack` and returns its value.
 *
 * @performance O(1)
 * @param {Stack} stack
 * @returns {Optional<Stackable>}
 */
export function pop(stack: Stack): Optional<Stackable> {
  const el = stack.top
  stack.top = el?.parent
  delete el?.parent
  --stack.count
  return el
}

/**
 * Clears the given `Stack` by removing all the
 * relationships within it.
 *
 * @performance O(n)
 * @param {Stack} stack
 */
export function clear(stack: Stack): void {
  while (stack.top) {
    pop(stack)
  }
}

/**
 * Iterates from the `parent` property `Stackable` tree recursively.
 *
 * @performance O(n)
 * @param {Stackable} el
 * @returns {IterableIterator<Stackable>}
 */
export function *fromParent(el: Stackable): IterableIterator<Stackable> {
  let p: Optional<Stackable> = el
  while (p) {
    yield p
    p = p.parent
  }
}