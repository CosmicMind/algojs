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

import {
  Optional,
  guardFor,
} from '@cosmicverse/foundation'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `Stack`.
 *
 * @type {Readonly<undefined>}
 */
let sentinel: Readonly<undefined>

/**
 * The `Stackable` interface defines a structure that moves
 * from a child node to its parent node within a `Stack`
 * data structure.
 *
 * @property {Optional<Stackable>} parent
 */
export interface Stackable {
  parent?: Stackable
}

/**
 * @template T
 *
 * Creates a `Stackable` instance of type `T` by using the
 * given node definition and returning a Readonly version
 * of the node.
 * @param {T} node
 * @returns {T}
 */
export const stackableCreate = <T extends Stackable>(node: T): T => {
  node.parent = sentinel
  return node
}

/**
 * @template T
 *
 * The `Stack` class represents a linear data structure that
 * stores a single reference to a `Stackable` node called
 * `top`. It creates a `vertical` relationship between the
 * nodes that exist within its structure.
 */
export class Stack<T extends Stackable> {
  /**
   * A reference to the topmost node.
   *
   * @type {Optional<T>}
   */
  top?: T

  /**
   * A reference to the number of nodes
   * within the structure.
   *
   * @type {number}
   */
  count: number

  /**
   * @constructor
   */
  constructor() {
    this.count = 0
  }
}

/**
 * @template T
 *
 * Creates a new `Stack` instance.
 *
 * @returns {Readonly<Stack<T>>}
 */
export const stackCreate = <T extends Stackable>(): Readonly<Stack<T>> => new Stack<T>()

/**
 * @template T
 *
 * The `stackPeek` operation looks at the `top` positioned
 * node within the given stack.
 *
 * @performance O(1)
 *
 * @param {Stack<T>} stack
 */
export function stackPeek<T extends Stackable>(stack: Stack<T>): Optional<T> {
  return stack.top
}

/**
 * @template T
 *
 * The `stackPush` operation adds a given node to the `top`
 * position of the given stack.
 *
 * @performance O(1)
 *
 * @param {Stack<T>} stack
 * @param {T} node
 */
export function stackPush<T extends Stackable>(stack: Stack<T>, node: T): void {
  node.parent = stack.top
  stack.top = node
  ++stack.count
}

/**
 * @template T
 *
 * The `stackPop` operation removes the `top` positioned
 * node from the given stack and returns its reference.
 *
 * @performance O(1)
 *
 * @param {Stack<T>} stack
 * @returns {Optional<T>}
 */
export function stackPop<T extends Stackable>(stack: Stack<T>): Optional<T> {
  const top = stack.top
  if (guardFor<Stackable>(top, 'parent')) {
    stack.top = top.parent as Optional<T>
    top.parent = sentinel
  }
  --stack.count
  return top
}

/**
 * @template T
 *
 * The `stackClear` operation clears the given stack by removing
 * all the relationships between its nodes.
 *
 * @performance O(n)
 *
 * @param {Stack<T>} stack
 */
export function stackClear<T extends Stackable>(stack: Stack<T>): void {
  while (guardFor<Stackable>(stack.top, 'parent')) {
    stackPop(stack)
  }
}

/**
 * @template T
 *
 * The `stackIterator` operation iterates from the `top`positioned * iteratively to the final node within the given stack.
 *
 * @performance O(n)
 *
 * @param {Stack<T>} stack
 * @returns {IterableIterator<T>}
 */
export function *stackIterator<T extends Stackable>(stack: Stack<T>): IterableIterator<T> {
  let top: Optional<Stackable> = stack.top
  while (top) {
    yield top as T
    top = top.parent
  }
}