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

import test from 'ava'

import { guardFor } from '@cosmicverse/foundation'

import {
  Listable,
  listableCreate,
  List,
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
  listClear,
  listIterateFromFirst,
  listIterateFromLast,
  listIterateToNext,
  listIterateToPrevious,
} from '../../src'

const sentinel = void 0

class ListNode implements Listable {
  readonly previous?: Listable
  readonly next?: Listable
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.previous = sentinel
    this.next = sentinel
    this.key = key
    this.value = value
  }
}

interface ListableNode extends Listable {
  key: number
  value: string
}

const createListableNode = (key: number, value: string): Readonly<ListableNode> =>
  listableCreate<ListableNode>({
    key,
    value,
  })

test('List: listableCreate', t => {
  const node = listableCreate({})

  t.true(guardFor<Listable>(node, 'previous'))
  t.true(guardFor<Listable>(node, 'next'))
})

test('List: createListableNode', t => {
  const node = createListableNode(1, 'a')

  t.true(guardFor<Listable>(node, 'previous'))
  t.true(guardFor<Listable>(node, 'next'))
  t.true(guardFor<ListableNode>(node, 'key'))
  t.true(guardFor<ListableNode>(node, 'value'))
})

test('List: new ListNode', t => {
  const node = new ListNode(1, 'a')

  t.true(node instanceof ListNode)
  t.true(guardFor<Listable>(node, 'previous'))
  t.true(guardFor<Listable>(node, 'next'))
  t.true(guardFor<ListNode>(node, 'key'))
  t.true(guardFor<ListNode>(node, 'value'))
})

test('List: listCreate', t => {
  const list = listCreate<ListNode>()
  t.true(list instanceof List)
})

test('List: listRemove', t => {
  const list = listCreate<ListNode>()

  const n1 = createListableNode(1, 'a')
  const n2 = createListableNode(2, 'b')
  const n3 = createListableNode(3, 'c')

  listInsert(list, n1)
  listAppend(list, n2)
  listAppend(list, n3)
  // listRemove(list, n3)

  const result: ListNode[] = []
  const expectation = [ n1, n2 ]

  for (const n of listIterateFromFirst(list)) {
    // result.push(n)
    console.log('NODE', n)
  }

  console.log('LIST', list)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

// test('List: listInsertBefore', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   listInsert(list, n1)
//   listInsertBefore(list, n1, n2)
//   listInsertBefore(list, n1, n3)

//   const result: ListNode[] = []
//   const expectation = [ n2, n3, n1 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)
// })

// test('List: listRemoveBefore', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   listInsert(list, n1)
//   listInsertBefore(list, n1, n2)
//   listInsertBefore(list, n1, n3)
//   listRemoveBefore(list, n3)

//   const result: ListNode[] = []
//   const expectation = [ n3, n1 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result.length, 2)
// })

// test('List: listInsertAfter', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   listInsert(list, n1)
//   listInsertAfter(list, n1, n2)
//   listInsertAfter(list, n1, n3)

//   const result: ListNode[] = []
//   const expectation = [ n1, n3, n2 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)
// })

// test('List: listRemoveAfter', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   listInsert(list, n1)
//   listInsertAfter(list, n1, n2)
//   listInsertAfter(list, n1, n3)
//   listRemoveAfter(list, n3)

//   const result: ListNode[] = []
//   const expectation = [ n1, n3 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result.length, 2)
// })

// test('List: listIterateFromFirst', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   listInsert(list, n1)
//   listInsert(list, n2)
//   listInsert(list, n3)

//   const result: ListNode[] = []
//   const expectation = [ n3, n2, n1 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)
// })

// test('List: listIterateFromLast', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   append(list, n1)
//   append(list, n2)
//   append(list, n3)

//   const result: ListNode[] = []
//   const expectation = [ n3, n2, n1 ]

//   for (const n of listIterateFromLast(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)
// })

// test('List: listRemoveFirst', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   append(list, n1)
//   append(list, n2)
//   append(list, n3)

//   let result: ListNode[] = []
//   let expectation = [ n1, n2, n3 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)

//   listRemoveFirst(list)
//   listRemoveFirst(list)

//   result = []
//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   expectation = [ n3 ]

//   t.is(result[0], expectation[0])
//   t.is(result.length, 1)
// })

// test('List: listRemoveLast', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   append(list, n1)
//   append(list, n2)
//   append(list, n3)

//   let result: ListNode[] = []
//   let expectation = [ n1, n2, n3 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result.length, 3)

//   listRemoveLast(list)
//   listRemoveLast(list)

//   result = []
//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   expectation = [ n1 ]

//   t.is(result[0], expectation[0])
//   t.is(result.length, 1)
// })

// test('List: listClear', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   append(list, n1)
//   append(list, n2)
//   append(list, n3)

//   t.is(list.count, 3)

//   listClear(list)

//   t.is(list.count, 0)
// })

// test('List: count', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')

//   append(list, n1)
//   append(list, n2)
//   append(list, n3)

//   t.is(list.count, 3)

//   listRemove(list, n1)
//   listRemove(list, n2)

//   t.is(list.count, 1)
// })

// test('List: reverseOrder', t => {
//   const list = listCreate<ListNode>()

//   const n1 = createListableNode(1, 'a')
//   const n2 = createListableNode(2, 'b')
//   const n3 = createListableNode(3, 'c')
//   const n4 = createListableNode(4, 'd')
//   const n5 = createListableNode(5, 'e')
//   const n6 = createListableNode(6, 'f')
//   const n7 = createListableNode(7, 'g')

//   listInsert(list, n1)
//   listInsertAfter(list, n1, n2)
//   listInsertAfter(list, n2, n3)
//   listInsertAfter(list, n3, n4)
//   listInsertAfter(list, n4, n5)
//   listInsertAfter(list, n5, n6)
//   listInsertAfter(list, n6, n7)

//   let result: ListNode[] = []
//   let expectation = [ n1, n2, n3, n4, n5, n6, n7 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result[3], expectation[3])
//   t.is(result[4], expectation[4])
//   t.is(result[5], expectation[5])
//   t.is(result[6], expectation[6])

//   reverseOrder(list)

//   result = []
//   expectation = [ n7, n6, n5, n4, n3, n2, n1 ]

//   for (const n of listIterateFromFirst(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result[3], expectation[3])
//   t.is(result[4], expectation[4])
//   t.is(result[5], expectation[5])
//   t.is(result[6], expectation[6])

//   result = []
//   expectation = [ n1, n2, n3, n4, n5, n6, n7 ]

//   for (const n of listIterateFromLast(list)) result.push(n as ListNode)

//   t.is(result[0], expectation[0])
//   t.is(result[1], expectation[1])
//   t.is(result[2], expectation[2])
//   t.is(result[3], expectation[3])
//   t.is(result[4], expectation[4])
//   t.is(result[5], expectation[5])
//   t.is(result[6], expectation[6])
// })