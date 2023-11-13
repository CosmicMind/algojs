/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
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
  guard,
} from '@cosmicmind/foundationjs'

import {
  SentinelNode,
} from '@/utils'

/**
 * The `Listable` interface defines a structure that moves
 * from a `previous` node to its `next` node, or a `next`
 * node to its `previous` node within a `List` data
 * structure.
 */
export type Listable = {
  next?: Listable
  previous?: Listable
}

export const ListCompareFn = <T extends Listable>(a: T, b: T): number => a === b ? 0 : a > b ? 1 : -1

/**
 * Creates a `Listable` instance of type `T` by using the
 * given node definition.
 */
export const listNodeCreate = <T extends Listable>(props?: Omit<T, keyof Listable>): T => ({
  ...props as T,
  next: SentinelNode,
  previous: SentinelNode,
})

/**
 * The `List` class is a linear data structure that
 * stores two references to `Listable` nodes called
 * `first` and `last`. It creates a `horizontal`
 * relationship between the nodes that exist within
 * its structure.
 */
export type List<T extends Listable> = {
  first?: T
  last?: T
  count: number
}

/**
 * Creates a new `List` instance.
 */
export const listCreate = <T extends Listable>(): List<T> => ({
  first: SentinelNode,
  last: SentinelNode,
  count: 0,
})

/**
 * The `listInsert` operation adds a given node to the
 * `first` position of the given list.
 *
 * @performance O(1)
 */
export function listInsert<T extends Listable>(list: List<T>, node: T): void {
  if (guard<T>(list.first)) {
    list.first.previous = node
    node.next = list.first
    node.previous = SentinelNode
  }
  else {
    list.last = node
    node.previous = SentinelNode
    node.next = SentinelNode
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
  const node = list.first
  if (guard<T>(node)) {
    const next = node.next
    if (guard<T>(next)) {
      list.first = next
      next.previous = SentinelNode
    }
    else {
      list.first = SentinelNode
      list.last = SentinelNode
    }
    node.previous = SentinelNode
    node.next = SentinelNode
    --list.count
  }
  return node
}

/**
 * The `listAppend` operation adds a given `append` node
 * to the `last` position of the given list and returns
 * its reference.
 *
 * @performance O(1)
 */
export function listAppend<T extends Listable>(list: List<T>, node: T): void {
  if (guard<T>(list.last)) {
    list.last.next = node
    node.previous = list.last
    node.next = SentinelNode
  }
  else {
    list.first = node
    node.previous = SentinelNode
    node.next = SentinelNode
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
  if (guard<T>(node)) {
    const previous = node.previous
    if (guard<T>(previous)) {
      list.last = previous
      previous.next = SentinelNode
    }
    else {
      list.first = SentinelNode
      list.last = SentinelNode
    }
    node.previous = SentinelNode
    node.next = SentinelNode
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
export function listInsertBefore<T extends Listable>(list: List<T>, insert: T, before: T, compare = ListCompareFn<T>): void {
  if (guard<T>(list.first) && 0 === compare(list.first, before)) {
    listInsert(list, insert)
  }
  else {
    const previous = before.previous
    if (guard<T>(previous)) {
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
export function listRemoveBefore<T extends Listable>(list: List<T>, before: T, compare = ListCompareFn<T>): Optional<T> {
  const node = before.previous as T
  if (guard<T>(list.first) && guard<T>(node) && 0 === compare(list.first, node)) {
    listRemoveFirst(list)
  }
  else if (guard<T>(node)) {
    const previous = node.previous
    if (guard<T>(previous)) {
      before.previous = previous
      previous.next = before
      node.previous = SentinelNode
      node.next = SentinelNode
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
export function listInsertAfter<T extends Listable>(list: List<T>, insert: T, after: T, compare = ListCompareFn<T>): void {
  if (guard<T>(list.last) && 0 === compare(list.last, after)) {
    listAppend(list, insert)
  }
  else {
    const next = after.next
    if (guard<T>(next)) {
      next.previous = insert
      insert.next = next
      insert.previous = after
      after.next = insert
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
export function listRemoveAfter<T extends Listable>(list: List<T>, after: T, compare = ListCompareFn<T>): Optional<T> {
  const node = after.next as T
  if (guard<T>(list.last) && guard<T>(node) && 0 === compare(list.last, node)) {
    listRemoveLast(list)
  }
  else if (guard<T>(node)) {
    const next = node.next
    if (guard<T>(next)) {
      next.previous = after
      after.next = next
      node.previous = SentinelNode
      node.next = SentinelNode
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
export function listRemove<T extends Listable>(list: List<T>, node: T, compare = ListCompareFn<T>): void {
  if (guard<T>(list.first) && 0 === compare(list.first, node)) {
    listRemoveFirst(list)
  }
  else if (guard<T>(list.last) && 0 === compare(list.last, node)) {
    listRemoveLast(list)
  }
  else {
    const previous = node.previous
    const next = node.next
    if (guard<T>(previous) && guard<T>(next)) {
      previous.next = next
      next.previous = previous
      node.previous = SentinelNode
      node.next = SentinelNode
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
  let n = list.first
  while (guard<T>(n)) {
    yield n
    n = n.next as T
  }
}

/**
 * @performance O(n)
 */
export function *listIterateFromLast<T extends Listable>(list: List<T>): IterableIterator<T> {
  let n = list.last
  while (guard<T>(n)) {
    yield n
    n = n.previous as T
  }
}

/**
 * @performance O(n)
 */
export function *listIterateToNext<T extends Listable>(node: T): IterableIterator<T> {
  let n = node
  while (guard(n)) {
    yield n
    n = n.next as T
  }
}

/**
 * @performance O(n)
 */
export function *listIterateToPrevious<T extends Listable>(node: T): IterableIterator<T> {
  let n = node
  while (guard(n)) {
    yield n
    n = n.previous as T
  }
}

/**
 * The `listClear` operation clears the given list by removing
 * all relationships within it.
 *
 * @performance O(n)
 */
export function listClear<T extends Listable>(list: List<T>): void {
  while (guard(list.first)) {
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
export function listIsFirst<T extends Listable>(list: List<T>, node: T, compare = ListCompareFn<T>): boolean {
  return guard<T>(list.first) && 0 === compare(list.first, node)
}

/**
 * The `listIsLast` assertion looks at the `last` positioned
 * node for the given list, and determines if the given node
 * is equal to that `last` positioned node.
 *
 * @performance O(1)
 */
export function listIsLast<T extends Listable>(list: List<T>, node: T, compare = ListCompareFn<T>): boolean {
  return guard<T>(list.last) && 0 === compare(list.last, node)
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

/**
 * @performance O(n)
 */
export function listQuery<T extends Listable>(list: List<T>, ...fn: ((node: T) => boolean)[]): Set<T> {
  const r = new Set<T>()
  loop: for (const n of listIterateFromFirst(list)) {
    for (const f of fn) {
      if (f(n)) {
        continue
      }
      continue loop
    }
    r.add(n)
  }
  return r
}