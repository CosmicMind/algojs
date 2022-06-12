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
 * @module List
 */

import {
  Optional,
  guardFor,
} from '@cosmicverse/foundation'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `List`.
 */
const sentinel = void 0

/**
 * The `Listable` interface defines a structure that moves
 * from a `previous` node to its `next` node, or a `next`
 * node to its `previous` node within a `List` data
 * structure.
 *
 * @property {Optional<Listable>} previous
 * @property {Optional<Listable>} next
 */
export interface Listable {
  previous: Optional<Listable>
  next: Optional<Listable>
}

/**
 * @template T
 *
 * Creates a `Stackable` instance of type `T` by using the
 * given node definition and returning a Readonly version
 * of the node.
 *
 * @param {Omit<T, keyof Listable>} props
 * @returns {Readonly<T>}
 */
export function listableCreate<T extends Listable>(props: Omit<T, keyof Listable>): Readonly<T> {
  return Object.assign(props, {
    previous: sentinel,
    next: sentinel,
  }) as T
}

/**
 * @template T
 *
 * The `List` class is a linear data structure that
 * stores two references to `Listable` nodes called
 * `first` and `last`. It creates a `horizontal`
 * relationship between the nodes that exist within
 * its structure.
 *
 * @property {Optional<T>} first
 * @property {Optional<T>} last
 * @property {number} count
 */
export interface List<T extends Listable> {
  first: Optional<T>
  last: Optional<T>
  count: number
}

/**
 * @template T
 *
 * Creates a new `List` instance.
 *
 * @returns {Readonly<List<T>>}
 */
export const listCreate = <T extends Listable>(): Readonly<List<T>> => ({
  first: sentinel,
  last: sentinel,
  count: 0,
})

/**
 * @template T
 *
 * The `listInsert` operation adds a given node to the
 * `first` position of the given list.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} node
 */
export function listInsert<T extends Listable>(list: List<T>, node: T): void {
  if (guardFor<Listable>(list.first, 'previous')) {
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
 * @template T
 *
 * The `listRemoveFirst` operation removes the node
 * from the `first` position of the given list and
 * returns its reference. If the given list only has
 * a single node within its structure, that node is
 * removed from the `last` position as well.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @returns {Optional<T>}
 */
export function listRemoveFirst<T extends Listable>(list: List<T>): Optional<T> {
  const first = list.first
  if (guardFor<Listable>(first, 'next')) {
    const next = first.next
    if (guardFor<Listable>(next, 'previous')) {
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
 * @template T
 *
 * The `listAppend` operation adds a given `append` node
 * to the `last` position of the given list and returns
 * its reference.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} node
 */
export function listAppend<T extends Listable>(list: List<T>, node: T): void {
  if (guardFor<Listable>(list.last, 'next')) {
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
 * @template T
 *
 * The `removeLast` operation removes the node at the
 * `last` position of the given list and returns its
 * reference. If the given list only has a single node
 * within its structure, then that node is removed from
 * the `first` position as well.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @returns {Optional<T>}
 */
export function listRemoveLast<T extends Listable>(list: List<T>): Optional<T> {
  const node = list.last
  if (guardFor<Listable>(node, 'previous')) {
    const previous = node.previous
    if (guardFor<Listable>(previous, 'next')) {
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
 * @template T
 *
 * The `listInsertBefore` operation adds a given `insert`
 * node to the `previous` position of the given `before`
 * node within the given list. If the `before` node is at
 * the `first` position of the given list, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} insert
 * @param {T} before
 */
export function listInsertBefore<T extends Listable>(list: List<T>, insert: T, before: T): void {
  if (list.first === before) {
    listInsert(list, insert)
  }
  else {
    const previous = before.previous
    if (guardFor<Listable>(previous, 'next')) {
      previous.next = insert
      insert.previous = previous
      insert.next = before
      before.previous = insert
      ++list.count
    }
  }
}

/**
 * @template T
 *
 * The `listRemoveBefore` operation removes a given node from
 * the `previous` position of the given `before` node within
 * the given list and returns its reference. If the `previous`
 * position of the given `before` node is also the `first`
 * node of the given list, then the `first` node is updated to
 * the `before` reference.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} before
 * @returns {Optional<T>}
 */
export function listRemoveBefore<T extends Listable>(list: List<T>, before: T): Optional<T> {
  const node = before.previous as Optional<T>
  if (list.first === node) {
    listRemoveFirst(list)
  }
  else if (guardFor<Listable>(node, 'previous')) {
    const previous = node.previous
    if (guardFor<Listable>(previous, 'next')) {
      before.previous = previous
      previous.next = before as Optional<T>
      node.previous = sentinel
      node.next = sentinel
      --list.count
    }
  }
  return node
}

/**
 * @template T
 *
 * The `listInsertAfter` operation adds a given `insert`
 * node to the `next` position of the given `after` node
 * within the given list. If the `after` node is at the
 * `last` position of the given list, then that node
 * reference is updated to the newly inserted node as
 * well.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} insert
 * @param {T} after
 */
export function listInsertAfter<T extends Listable>(list: List<T>, insert: T, after: T): void {
  if (list.last === after) {
    listAppend(list, insert)
  }
  else {
    const next = after.next
    if (guardFor<Listable>(next, 'previous')) {
      next.previous = after
      after.next = next
      after.previous = insert
      insert.next = after
      ++list.count
    }
  }
}

/**
 * @template T
 *
 * The `listRemoveBefore` operation removes a given node from
 * the `next` position of the given `after` node within the
 * given list and returns its reference. If the `next`
 * position of the given `after` node is also the `last` node
 * of the given list, then the `last` node is updated to
 * the `after` reference.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} after
 * @returns {Optional<T>}
 */
export function listRemoveAfter<T extends Listable>(list: List<T>, after: T): Optional<T> {
  const node = after.next as Optional<T>
  if (list.last === node) {
    listRemoveLast(list)
  }
  else if (guardFor<Listable>(node, 'next')) {
    const next = node.next
    if (guardFor<Listable>(next, 'previous')) {
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
 * @template T
 *
 * The `listRemove` operation removes a given `remove` node from
 * the given list. If the `remove` node is the `first` and or
 * `last` positioned node within the given list, then those
 * values are updated accordingly.
 *
 * @performance O(1)
 *
 * @param {List<T>} list
 * @param {T} node
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
    if (guardFor<Listable>(previous, 'next') && guardFor<Listable>(next, 'previous')) {
      previous.next = next
      next.previous = previous
      node.previous = sentinel
      node.next = sentinel
      --list.count
    }
  }
}

/**
 * @template T
 *
 * The `listIterateFromFirst` operation iterates from the `first`
 * positioned node iteratively to the `last` positioned node
 * within the given list.
 *
 * @performance O(n)
 *
 * @param {List<T>} list
 * @returns {IterableIterator<T>}
 */
export function *listIterateFromFirst<T extends Listable>(list: List<T>): IterableIterator<T> {
  let node: Optional<Listable> = list.first
  while (guardFor<Listable>(node, 'next')) {
    yield node as T
    node = node.next
  }
}

/**
 * @template T
 *
 * The `listIterateFromLast` operation iterates from the `last`
 * positioned node iteratively to the `first` positioned node
 * within the given list.
 *
 * @performance O(n)
 *
 * @param {List<T>} list
 * @returns {IterableIterator<T>}
 */
export function *listIterateFromLast<T extends Listable>(list: List<T>): IterableIterator<T> {
  let node: Optional<Listable> = list.last
  while (guardFor<Listable>(node, 'previous')) {
    yield node as T
    node = node.previous
  }
}

/**
 * @template T
 *
 * The `listIterateToPrevious` operation iterates from the given
 * node iteratively to the `previous` positioned node until it
 * reaches the final `previous` node.
 *
 * @performance O(n)
 *
 * @param {Optional<T>} from
 * @returns {IterableIterator<T>}
 */
export function *listIterateToPrevious<T extends Listable>(from: Optional<T>): IterableIterator<T> {
  let node: Optional<Listable> = from
  while (guardFor<Listable>(node, 'previous')) {
    yield node as T
    node = node.previous
  }
}

/**
 * @template T
 *
 * The `listIterateToNext` operation iterates from the given
 * node iteratively to the `next` positioned node until it
 * reaches the final `next` node.
 *
 * @performance O(n)
 *
 * @param {Optional<T>} from
 * @returns {IterableIterator<T>}
 */
export function *listIterateToNext<T extends Listable>(from: Optional<T>): IterableIterator<T> {
  let node: Optional<Listable> = from
  while (guardFor<Listable>(node, 'next')) {
    yield node as T
    node = node.next
  }
}

/**
 * @template T
 *
 * The `listClear` operation clears the given list by removing
 * all relationships within it.
 *
 * @performance O(n)
 *
 * @param {List<T>} list
 */
export function listClear<T extends Listable>(list: List<T>): void {
  while (guardFor<Listable>(list.first, 'next')) {
    listRemoveFirst(list)
  }
}