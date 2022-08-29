/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicmind dot org>
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

import test from 'ava'

import {
  Optional,
  guardFor,
} from '@cosmicmind/lib-foundation'

import {
  ListableKeys,
  ListKeys,
  Listable,
  List,
  listableCreate,
  listCreate,
  listInsert,
  listRemoveFirst,
  listAppend,
  listRemoveLast,
  listInsertBefore,
  listRemoveBefore,
  listInsertAfter,
  listRemoveAfter,
  listRemove,
  listIterateFromFirst,
  listIterateFromLast,
  listIterateToNext,
  listIterateToPrevious,
  listClear,
  listIsFirst,
  listIsLast,
  listIsNext,
  listIsPrevious,
  listIsSibling,
  listHas,
} from '../../src'

const sentinel = void 0

type ListableNode = Listable & {
  key: number
  value: string
}

const createListableNode = (key: number, value: string): ListableNode =>
  listableCreate<ListableNode>({
    key,
    value,
  })

class ListNode implements Listable {
  readonly next: Optional<Listable>
  readonly previous: Optional<Listable>
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.next = sentinel
    this.previous = sentinel
    this.key = key
    this.value = value
  }
}

class ListTrace<T extends ListNode> implements List<T> {
  readonly first: Optional<T>
  readonly last: Optional<T>
  readonly count: number
  constructor() {
    this.first = sentinel
    this.last = sentinel
    this.count = 0
  }
}

test('List: listableCreate', t => {
  const node = listableCreate({})

  t.true(guardFor(node, ...ListableKeys))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
})

test('List: listCreate', t => {
  const list = listCreate<ListableNode>()

  t.true(guardFor(list, ...ListKeys))
  t.is(list.first, sentinel)
  t.is(list.last, sentinel)
  t.is(list.count, 0)
})

test('List: createListableNode', t => {
  const node = createListableNode(1, 'a')

  t.true(guardFor(node, ...ListableKeys, 'key', 'value'))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('List: new ListNode', t => {
  const node = new ListNode(1, 'a')

  t.true(guardFor(node, ...ListableKeys, 'key', 'value'))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('List: new ListTrace', t => {
  const list = new ListTrace<ListNode>()

  t.true(guardFor(list, ...ListKeys))
  t.is(list.first, sentinel)
  t.is(list.last, sentinel)
  t.is(list.count, 0)
})

test('List: listInsert', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsert(list, n2)
  listInsert(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listRemoveFirst', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  let result: ListableNode[] = []
  let expectation = [ n1, n2, n3 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)

  listRemoveFirst(list)
  listRemoveFirst(list)

  result = []
  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  expectation = [ n3 ]

  t.is(result[0], expectation[0])
  t.is(result.length, list.count)
})

test('List: listAppend', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of listIterateFromLast(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listRemoveLast', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  let result: ListableNode[] = []
  let expectation = [ n1, n2, n3 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)

  listRemoveLast(list)
  listRemoveLast(list)

  result = []
  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  expectation = [ n1 ]

  t.is(result[0], expectation[0])
  t.is(result.length, list.count)
})

test('List: listInsertBefore', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsertBefore(list, n2, n1)
  listInsertBefore(list, n3, n1)

  const result: ListableNode[] = []
  const expectation = [ n2, n3, n1 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listRemoveBefore', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsertBefore(list, n2, n1)
  listInsertBefore(list, n3, n1)
  listRemoveBefore(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n3, n1 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, list.count)
})

test('List: listInsertAfter', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsertAfter(list, n2, n1)
  listInsertAfter(list, n3, n2)

  const result: ListableNode[] = []
  const expectation = [ n1, n2, n3 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listRemoveAfter', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsertAfter(list, n2, n1)
  listInsertAfter(list, n3, n2)
  listRemoveAfter(list, n1)

  const result: ListableNode[] = []
  const expectation = [ n1, n3 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, list.count)
})

test('List: listRemove', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)
  listRemove(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n1, n2 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, list.count)
})

test('List: listIterateFromFirst', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listInsert(list, n2)
  listInsert(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of listIterateFromFirst(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listIterateFromLast', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  const result: ListableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of listIterateFromLast(list)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, list.count)
})

test('List: listIterateToNext', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.is(list.count, 3)

  const result: ListableNode[] = []
  const expectation = [ n2, n3 ]

  for (const n of listIterateToNext(n1)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('List: listIterateToPrevious', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.is(list.count, 3)

  const result: ListableNode[] = []
  const expectation = [ n2, n1 ]

  for (const n of listIterateToPrevious(n3)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('List: listClear', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.is(list.count, 3)

  listClear(list)

  t.is(list.count, 0)
})

test('List: listIsFirst/listIsLast', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.true(listIsFirst(list, n1))
  t.false(listIsFirst(list, n2))
  t.true(listIsLast(list, n3))
  t.false(listIsLast(list, n2))
})

test('List: listIsNext', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')
  const n4 = createListableNode(4, 'd')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.true(listIsNext(n2, n1))
  t.false(listIsNext(n1, n2))
  t.true(listIsNext(n3, n2))
  t.false(listIsNext(n2, n3))
  t.false(listIsNext(n1, n3))
  t.false(listIsNext(n3, n1))
  t.false(listIsNext(n4, n1))
  t.false(listIsNext(n4, n2))
  t.false(listIsNext(n4, n3))
  t.false(listIsNext(n1, n4))
  t.false(listIsNext(n2, n4))
  t.false(listIsNext(n3, n4))
})

test('List: listIsPrevious', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')
  const n4 = createListableNode(4, 'd')

  listInsert(list, n1)
  listInsert(list, n2)
  listInsert(list, n3)

  t.true(listIsPrevious(n2, n1))
  t.false(listIsPrevious(n1, n2))
  t.true(listIsPrevious(n3, n2))
  t.false(listIsPrevious(n2, n3))
  t.false(listIsPrevious(n1, n3))
  t.false(listIsPrevious(n3, n1))
  t.false(listIsPrevious(n4, n1))
  t.false(listIsPrevious(n4, n2))
  t.false(listIsPrevious(n4, n3))
  t.false(listIsPrevious(n1, n4))
  t.false(listIsPrevious(n2, n4))
  t.false(listIsPrevious(n3, n4))
})

test('List: listIsSibling', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')
  const n4 = createListableNode(3, 'd')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.true(listIsSibling(n1, n2))
  t.true(listIsSibling(n3, n2))
  t.true(listIsSibling(n1, n3))
  t.true(listIsSibling(n3, n1))
  t.true(listIsSibling(n1, n2))
  t.true(listIsSibling(n2, n1))
  t.true(listIsSibling(n3, n2))
  t.true(listIsSibling(n2, n3))
  t.false(listIsSibling(n4, n1))
  t.false(listIsSibling(n4, n2))
  t.false(listIsSibling(n4, n3))
  t.false(listIsSibling(n1, n4))
  t.false(listIsSibling(n2, n4))
  t.false(listIsSibling(n3, n4))
})

test('List: listHas', t => {
  const list = listCreate<ListableNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')
  const n4 = createListableNode(3, 'd')

  listAppend(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)

  t.true(listHas(list, n1))
  t.true(listHas(list, n2))
  t.true(listHas(list, n3))
  t.false(listHas(list, n4))
})