/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicmind dot com>
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
 * @module List
 */

import {
  Optional,
  guardFor,
} from '@cosmicmind/foundationjs'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `List`.
 */
const sentinel = void 0

export const ListableKeys = [ 'next', 'previous' ] as const
export const ListKeys = [ 'first', 'last', 'count' ] as const

/**
 * The `Listable` interface defines a structure that moves
 * from a `previous` node to its `next` node, or a `next`
 * node to its `previous` node within a `List` data
 * structure.
 */
export interface Listable {
  next: Optional<Listable>
  previous: Optional<Listable>
}

/**
 * Creates a `Listable` instance of type `T` by using the
 * given node definition and returning a Readonly version
 * of the node.
 */
export const listableCreate = <T extends Listable>(props: Omit<T, keyof Listable>): Readonly<T> =>
  Object.assign(props, {
    next: sentinel,
    previous: sentinel,
  }) as T

/**
 * The `List` class is a linear data structure that
 * stores two references to `Listable` nodes called
 * `first` and `last`. It creates a `horizontal`
 * relationship between the nodes that exist within
 * its structure.
 */
export interface List<T extends Listable> {
  first: Optional<T>
  last: Optional<T>
  count: number
}

/**
 * Creates a new `List` instance.
 */
export const listCreate = <T extends Listable>(): Readonly<List<T>> => ({
  first: sentinel,
  last: sentinel,
  count: 0,
})

/**
 * The `listInsert` operation adds a given node to the
 * `first` position of the given list.
 *
 * @performance O(1)
 */
export function listInsert<T extends Listable>(list: List<T>, node: T): void {
  if (guardFor(list.first, ...ListableKeys)) {
    list.first.previous = node
    node.next = list.first
  }
  else {
    list.last = node
  }
  list.first = node
  ++list.count
}

/**
 * The `listRemoveFirst` operation removes the node
 * from the `first` position of the given list and
 * returns its reference. If the given list only has
 * a single node within its structure, that node is
 * removed from the `last` position as well.
 *
 * @performance O(1)
 */
export function listRemoveFirst<T extends Listable>(list: List<T>): Optional<T> {
  const first = list.first
  if (guardFor(first, ...ListableKeys)) {
    const next = first.next
    if (guardFor(next, ...ListableKeys)) {
      list.first = next as Optional<T>
      first.next = sentinel
      next.previous = sentinel
    }
    else {
      list.first = sentinel
      list.last = sentinel
    }
    --list.count
  }
  return first
}

/**
 * The `listAppend` operation adds a given `append` node
 * to the `last` position of the given list and returns
 * its reference.
 *
 * @performance O(1)
 */
export function listAppend<T extends Listable>(list: List<T>, node: T): void {
  if (guardFor(list.last, ...ListableKeys)) {
    list.last.next = node
    node.previous = list.last
  }
  else {
    list.first = node
  }
  list.last = node
  ++list.count
}

/**
 * The `removeLast` operation removes the node at the
 * `last` position of the given list and returns its
 * reference. If the given list only has a single node
 * within its structure, then that node is removed from
 * the `first` position as well.
 *
 * @performance O(1)
 */
export function listRemoveLast<T extends Listable>(list: List<T>): Optional<T> {
  const node = list.last
  if (guardFor(node, ...ListableKeys)) {
    const previous = node.previous
    if (guardFor(previous, ...ListableKeys)) {
      list.last = previous as Optional<T>
      node.previous = sentinel
      previous.next = sentinel
    }
    else {
      list.first = sentinel
      list.last = sentinel
    }
    --list.count
  }
  return node
}

/**
 * The `listInsertBefore` operation adds a given `insert`
 * node to the `previous` position of the given `before`
 * node within the given list. If the `before` node is at
 * the `first` position of the given list, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 */
export function listInsertBefore<T extends Listable>(list: List<T>, insert: T, before: T): void {
  if (list.first === before) {
    listInsert(list, insert)
  }
  else {
    const previous = before.previous
    if (guardFor(previous, ...ListableKeys)) {
      previous.next = insert
      insert.previous = previous
      insert.next = before
      before.previous = insert
      ++list.count
    }
  }
}

/**
 * The `listRemoveBefore` operation removes a given node from
 * the `previous` position of the given `before` node within
 * the given list and returns its reference. If the `previous`
 * position of the given `before` node is also the `first`
 * node of the given list, then the `first` node is updated to
 * the `before` reference.
 *
 * @performance O(1)
 */
export function listRemoveBefore<T extends Listable>(list: List<T>, before: T): Optional<T> {
  const node = before.previous as Optional<T>
  if (list.first === node) {
    listRemoveFirst(list)
  }
  else if (guardFor(node, ...ListableKeys)) {
    const previous = node.previous
    if (guardFor(previous, ...ListableKeys)) {
      before.previous = previous
      previous.next = before
      node.previous = sentinel
      node.next = sentinel
      --list.count
    }
  }
  return node
}

/**
 * The `listInsertAfter` operation adds a given `insert`
 * node to the `next` position of the given `after` node
 * within the given list. If the `after` node is at the
 * `last` position of the given list, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 */
export function listInsertAfter<T extends Listable>(list: List<T>, insert: T, after: T): void {
  if (list.last === after) {
    listAppend(list, insert)
  }
  else {
    const next = after.next
    if (guardFor(next, ...ListableKeys)) {
      next.previous = after
      after.next = next
      after.previous = insert
      insert.next = after
      ++list.count
    }
  }
}

/**
 * The `listRemoveBefore` operation removes a given node from
 * the `next` position of the given `after` node within the
 * given list and returns its reference. If the `next`
 * position of the given `after` node is also the `last` node
 * of the given list, then the `last` node is updated to
 * the `after` reference.
 *
 * @performance O(1)
 */
export function listRemoveAfter<T extends Listable>(list: List<T>, after: T): Optional<T> {
  const node = after.next as Optional<T>
  if (list.last === node) {
    listRemoveLast(list)
  }
  else if (guardFor(node, ...ListableKeys)) {
    const next = node.next
    if (guardFor(next, ...ListableKeys)) {
      next.previous = after
      after.next = next
      node.previous = sentinel
      node.next = sentinel
      --list.count
    }
  }
  return node
}

/**
 * The `listRemove` operation removes a given `remove` node from
 * the given list. If the `remove` node is the `first` and or
 * `last` positioned node within the given list, then those
 * values are updated accordingly.
 *
 * @performance O(1)
 */
export function listRemove<T extends Listable>(list: List<T>, node: T): void {
  if (list.first === node) {
    listRemoveFirst(list)
  }
  else if (list.last === node) {
    listRemoveLast(list)
  }
  else {
    const previous = node.previous
    const next = node.next
    if (guardFor(previous, ...ListableKeys) && guardFor(next, ...ListableKeys)) {
      previous.next = next
      next.previous = previous
      node.previous = sentinel
      node.next = sentinel
      --list.count
    }
  }
}

/**
 * The `listIterateFromFirst` operation iterates from the `first`
 * positioned node iteratively to the `last` positioned node
 * within the given list.
 *
 * @performance O(n)
 */
export function *listIterateFromFirst<T extends Listable>(list: List<T>): IterableIterator<T> {
  let node: Optional<Listable> = list.first
  while (guardFor(node, ...ListableKeys)) {
    yield node as T
    node = node.next
  }
}

/**
 * @performance O(n)
 */
export function *listIterateFromLast<T extends Listable>(list: List<T>): IterableIterator<T> {
  let node: Optional<Listable> = list.last
  while (guardFor(node, ...ListableKeys)) {
    yield node as T
    node = node.previous
  }
}

/**
 * @performance O(n)
 */
export function *listIterateToNext<T extends Listable>(node: T): IterableIterator<T> {
  let n: Optional<Listable> = node.next
  while (guardFor(n, ...ListableKeys)) {
    yield n as T
    n = n.next
  }
}

/**
 * @performance O(n)
 */
export function *listIterateToPrevious<T extends Listable>(node: T): IterableIterator<T> {
  let n: Optional<Listable> = node.previous
  while (guardFor(n, ...ListableKeys)) {
    yield n as T
    n = n.previous
  }
}

/**
 * The `listClear` operation clears the given list by removing
 * all relationships within it.
 *
 * @performance O(n)
 */
export function listClear<T extends Listable>(list: List<T>): void {
  while (guardFor(list.first, ...ListableKeys)) {
    listRemoveFirst(list)
  }
}

/**
 * The `listIsFirst` assertion looks at the `first` positioned
 * node for the given list, and determines if the given node
 * is equal to that `first` positioned node.
 *
 * @performance O(1)
 */
export function listIsFirst<T extends Listable>(list: List<T>, node: T): boolean {
  return list.first === node && list.first !== sentinel
}

/**
 * The `listIsLast` assertion looks at the `last` positioned
 * node for the given list, and determines if the given node
 * is equal to that `last` positioned node.
 *
 * @performance O(1)
 */
export function listIsLast<T extends Listable>(list: List<T>, node: T): boolean {
  return list.last === node && list.last !== sentinel
}

/**
 * The `listIsNext` assertion looks at the `next`
 * positioned node for the given node, and determines if
 * the given node is equal to that given node.
 *
 * @performance O(1)
 */
export function listIsNext<T extends Listable>(next: T, node: T): boolean {
  return next === node.next && node.next !== sentinel
}

/**
 * The `listIsPrevious` assertion looks at the `previous`
 * positioned node for the given node, and determines if
 * the given node is equal to that given node.
 *
 * @performance O(1)
 */
export function listIsPrevious<T extends Listable>(previous: T, node: T): boolean {
  return previous === node.previous && node.previous !== sentinel
}

/**
 * @performance O(n)
 */
export function listIsSibling<T extends Listable>(sibling: T, node: T): boolean {
  for (const n of listIterateToNext(node)) {
    if (n === sibling) {
      return true
    }
  }
  for (const n of listIterateToPrevious(node)) {
    if (n === sibling) {
      return true
    }
  }
  return false
}

/**
 * @performance O(n)
 */
export function listHas<T extends Listable>(list: List<T>, node: T): boolean {
  for (const n of listIterateFromFirst(list)) {
    if (n === node) {
      return true
    }
  }
  return false
}