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
 * @module Deque
 */

import {
  Optional,
  guardFor,
} from '@cosmicmind/foundation'

import {
  ListableKeys,
  ListKeys,
  Listable,
  List,
  listableCreate,
  listCreate,
  listInsert,
  listRemoveFirst,
} from './List'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `Deque`.
 */
const sentinel = void 0

export const DequeableKeys = [ ...ListableKeys ] as const
export const DequeKeys = [ ...ListKeys ] as const

/**
 */
export interface Dequeable extends Listable {
  next: Optional<Dequeable>
  previous: Optional<Dequeable>
}

/**
 */
export const dequeableCreate = <T extends Dequeable>(props: Omit<T, keyof Dequeable>): Readonly<T> =>
  listableCreate<T>(props)

/**
 */
export interface Deque<T extends Dequeable> extends List<T> {
  first: Optional<T>
  last: Optional<T>
  count: number
}

/**
 * Creates a new `Deque` instance.
 */
export const dequeCreate = <T extends Dequeable>(): Readonly<Deque<T>> =>
  listCreate<T>()

/**
 * @performance O(1)
 */
export const dequeInsert = <T extends Dequeable>(deque: Deque<T>, node: T): void =>
  listInsert(deque, node)

/**
 * @performance O(1)
 */
export const dequeRemoveFirst = <T extends Dequeable>(deque: Deque<T>): Optional<T> =>
  listRemoveFirst(deque)

/**
 * The `dequeAppend` operation adds a given `append` node
 * to the `last` position of the given deque and returns
 * its reference.
 *
 * @performance O(1)
 */
export function dequeAppend<T extends Dequeable>(deque: Deque<T>, node: T): void {
  if (guardFor(deque.last, ...DequeableKeys)) {
    deque.last.next = node
    node.previous = deque.last
  }
  else {
    deque.first = node
  }
  deque.last = node
  ++deque.count
}

/**
 * The `removeLast` operation removes the node at the
 * `last` position of the given deque and returns its
 * reference. If the given deque only has a single node
 * within its structure, then that node is removed from
 * the `first` position as well.
 *
 * @performance O(1)
 */
export function dequeRemoveLast<T extends Dequeable>(deque: Deque<T>): Optional<T> {
  const node = deque.last
  if (guardFor(node, ...DequeableKeys)) {
    const previous = node.previous
    if (guardFor(previous, ...DequeableKeys)) {
      deque.last = previous as Optional<T>
      node.previous = sentinel
      previous.next = sentinel
    }
    else {
      deque.first = sentinel
      deque.last = sentinel
    }
    --deque.count
  }
  return node
}

/**
 * The `dequeInsertBefore` operation adds a given `insert`
 * node to the `previous` position of the given `before`
 * node within the given deque. If the `before` node is at
 * the `first` position of the given deque, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 */
export function dequeInsertBefore<T extends Dequeable>(deque: Deque<T>, insert: T, before: T): void {
  if (deque.first === before) {
    dequeInsert(deque, insert)
  }
  else {
    const previous = before.previous
    if (guardFor(previous, ...DequeableKeys)) {
      previous.next = insert
      insert.previous = previous
      insert.next = before
      before.previous = insert
      ++deque.count
    }
  }
}

/**
 * The `dequeRemoveBefore` operation removes a given node from
 * the `previous` position of the given `before` node within
 * the given deque and returns its reference. If the `previous`
 * position of the given `before` node is also the `first`
 * node of the given deque, then the `first` node is updated to
 * the `before` reference.
 *
 * @performance O(1)
 */
export function dequeRemoveBefore<T extends Dequeable>(deque: Deque<T>, before: T): Optional<T> {
  const node = before.previous as Optional<T>
  if (deque.first === node) {
    dequeRemoveFirst(deque)
  }
  else if (guardFor(node, ...DequeableKeys)) {
    const previous = node.previous
    if (guardFor(previous, ...DequeableKeys)) {
      before.previous = previous
      previous.next = before
      node.previous = sentinel
      node.next = sentinel
      --deque.count
    }
  }
  return node
}

/**
 * The `dequeInsertAfter` operation adds a given `insert`
 * node to the `next` position of the given `after` node
 * within the given deque. If the `after` node is at the
 * `last` position of the given deque, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 */
export function dequeInsertAfter<T extends Dequeable>(deque: Deque<T>, insert: T, after: T): void {
  if (deque.last === after) {
    dequeAppend(deque, insert)
  }
  else {
    const next = after.next
    if (guardFor(next, ...DequeableKeys)) {
      next.previous = after
      after.next = next
      after.previous = insert
      insert.next = after
      ++deque.count
    }
  }
}

/**
 * The `dequeRemoveBefore` operation removes a given node from
 * the `next` position of the given `after` node within the
 * given deque and returns its reference. If the `next`
 * position of the given `after` node is also the `last` node
 * of the given deque, then the `last` node is updated to
 * the `after` reference.
 *
 * @performance O(1)
 */
export function dequeRemoveAfter<T extends Dequeable>(deque: Deque<T>, after: T): Optional<T> {
  const node = after.next as Optional<T>
  if (deque.last === node) {
    dequeRemoveLast(deque)
  }
  else if (guardFor(node, ...DequeableKeys)) {
    const next = node.next
    if (guardFor(next, ...DequeableKeys)) {
      next.previous = after
      after.next = next
      node.previous = sentinel
      node.next = sentinel
      --deque.count
    }
  }
  return node
}

/**
 * The `dequeRemove` operation removes a given `remove` node from
 * the given deque. If the `remove` node is the `first` and or
 * `last` positioned node within the given deque, then those
 * values are updated accordingly.
 *
 * @performance O(1)
 */
export function dequeRemove<T extends Dequeable>(deque: Deque<T>, node: T): void {
  if (deque.first === node) {
    dequeRemoveFirst(deque)
  }
  else if (deque.last === node) {
    dequeRemoveLast(deque)
  }
  else {
    const previous = node.previous
    const next = node.next
    if (guardFor(previous, ...DequeableKeys) && guardFor(next, ...DequeableKeys)) {
      previous.next = next
      next.previous = previous
      node.previous = sentinel
      node.next = sentinel
      --deque.count
    }
  }
}

/**
 * The `dequeIterateFromFirst` operation iterates from the `first`
 * positioned node iteratively to the `last` positioned node
 * within the given deque.
 *
 * @performance O(n)
 */
export function *dequeIterateFromFirst<T extends Dequeable>(deque: Deque<T>): IterableIterator<T> {
  let node: Optional<Dequeable> = deque.first
  while (guardFor(node, ...DequeableKeys)) {
    yield node as T
    node = node.next
  }
}

/**
 * @performance O(n)
 */
export function *dequeIterateFromLast<T extends Dequeable>(deque: Deque<T>): IterableIterator<T> {
  let node: Optional<Dequeable> = deque.last
  while (guardFor(node, ...DequeableKeys)) {
    yield node as T
    node = node.previous
  }
}

/**
 * @performance O(n)
 */
export function *dequeIterateToNext<T extends Dequeable>(node: T): IterableIterator<T> {
  let n: Optional<Dequeable> = node.next
  while (guardFor(n, ...DequeableKeys)) {
    yield n as T
    n = n.next
  }
}

/**
 * @performance O(n)
 */
export function *dequeIterateToPrevious<T extends Dequeable>(node: T): IterableIterator<T> {
  let n: Optional<Dequeable> = node.previous
  while (guardFor(n, ...DequeableKeys)) {
    yield n as T
    n = n.previous
  }
}

/**
 * The `dequeClear` operation clears the given deque by removing
 * all relationships within it.
 *
 * @performance O(n)
 */
export function dequeClear<T extends Dequeable>(deque: Deque<T>): void {
  while (guardFor(deque.first, ...DequeableKeys)) {
    dequeRemoveFirst(deque)
  }
}

/**
 * The `dequeIsFirst` assertion looks at the `first` positioned
 * node for the given deque, and determines if the given node
 * is equal to that `first` positioned node.
 *
 * @performance O(1)
 */
export function dequeIsFirst<T extends Dequeable>(deque: Deque<T>, node: T): boolean {
  return deque.first === node && deque.first !== sentinel
}

/**
 * The `dequeIsLast` assertion looks at the `last` positioned
 * node for the given deque, and determines if the given node
 * is equal to that `last` positioned node.
 *
 * @performance O(1)
 */
export function dequeIsLast<T extends Dequeable>(deque: Deque<T>, node: T): boolean {
  return deque.last === node && deque.last !== sentinel
}

/**
 * The `dequeIsNext` assertion looks at the `next`
 * positioned node for the given node, and determines if
 * the given node is equal to that given node.
 *
 * @performance O(1)
 */
export function dequeIsNext<T extends Dequeable>(next: T, node: T): boolean {
  return next === node.next && node.next !== sentinel
}

/**
 * The `dequeIsPrevious` assertion looks at the `previous`
 * positioned node for the given node, and determines if
 * the given node is equal to that given node.
 *
 * @performance O(1)
 */
export function dequeIsPrevious<T extends Dequeable>(previous: T, node: T): boolean {
  return previous === node.previous && node.previous !== sentinel
}

/**
 * @performance O(n)
 */
export function dequeIsSibling<T extends Dequeable>(sibling: T, node: T): boolean {
  for (const n of dequeIterateToNext(node)) {
    if (n === sibling) {
      return true
    }
  }
  for (const n of dequeIterateToPrevious(node)) {
    if (n === sibling) {
      return true
    }
  }
  return false
}

/**
 * @performance O(n)
 */
export function dequeHas<T extends Dequeable>(deque: Deque<T>, node: T): boolean {
  for (const n of dequeIterateFromFirst(deque)) {
    if (n === node) {
      return true
    }
  }
  return false
}