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

import {
  Listable,
  insert,
  insertBefore,
  insertAfter,
  append,
  remove,
  clear,
  removeFirst,
  removeLast,
  removeBefore,
  removeAfter,
  reverseOrder,
  fromFirst,
  fromLast,
  createList,
} from '@/structures/List'

import { 
  Key,
  Value, 
} from '@/utils/type-defs'

interface ListNode extends Listable, Key<number>, Value<string> {}

function createListNode(key: number, value: string): ListNode {
  return {
    key,
    value,
  }
}

test('List: remove', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insertAfter(list, n1, n2)
  insertAfter(list, n1, n3)
  remove(list, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n1, n2 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('List: insertBefore', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insertBefore(list, n1, n2)
  insertBefore(list, n1, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n2, n3, n1 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)
})

test('List: removeBefore', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insertBefore(list, n1, n2)
  insertBefore(list, n1, n3)
  removeBefore(list, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n3, n1 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)
  
  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('List: insertAfter', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insertAfter(list, n1, n2)
  insertAfter(list, n1, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n1, n3, n2 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)
})

test('List: removeAfter', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insertAfter(list, n1, n2)
  insertAfter(list, n1, n3)
  removeAfter(list, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n1, n3 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('List: fromFirst', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  insert(list, n1)
  insert(list, n2)
  insert(list, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n3, n2, n1 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)
})

test('List: fromLast', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  append(list, n1)
  append(list, n2)
  append(list, n3)

  const result: Array<ListNode> = []
  const expectation: Array<ListNode> = [ n3, n2, n1 ]

  for (const n of fromLast(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)
})

test('List: removeFirst', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  append(list, n1)
  append(list, n2)
  append(list, n3)

  let result: Array<ListNode> = []
  let expectation: Array<ListNode> = [ n1, n2, n3 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)

  removeFirst(list)
  removeFirst(list)

  result = []
  for (const n of fromFirst(list)) result.push(n as ListNode)

  expectation = [ n3 ]

  t.is(result[0], expectation[0])
  t.is(result.length, 1)
})

test('List: removeLast', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  append(list, n1)
  append(list, n2)
  append(list, n3)

  let result: Array<ListNode> = []
  let expectation: Array<ListNode> = [ n1, n2, n3 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, 3)

  removeLast(list)
  removeLast(list)

  result = []
  for (const n of fromFirst(list)) result.push(n as ListNode)

  expectation = [ n1 ]

  t.is(result[0], expectation[0])
  t.is(result.length, 1)
})

test('List: clear', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  append(list, n1)
  append(list, n2)
  append(list, n3)

  t.is(list.count, 3)
  
  clear(list)
  
  t.is(list.count, 0)
})

test('List: count', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')

  append(list, n1)
  append(list, n2)
  append(list, n3)

  t.is(list.count, 3)
  
  remove(list, n1)
  remove(list, n2)

  t.is(list.count, 1)
})

test('List: reverseOrder', async t => {
  const list = createList()

  const n1 = createListNode(1, 'a')
  const n2 = createListNode(2, 'b')
  const n3 = createListNode(3, 'c')
  const n4 = createListNode(4, 'd')
  const n5 = createListNode(5, 'e')
  const n6 = createListNode(6, 'f')
  const n7 = createListNode(7, 'g')

  insert(list, n1)
  insertAfter(list, n1, n2)
  insertAfter(list, n2, n3)
  insertAfter(list, n3, n4)
  insertAfter(list, n4, n5)
  insertAfter(list, n5, n6)
  insertAfter(list, n6, n7)

  let result: Array<ListNode> = []
  let expectation: Array<ListNode> = [ n1, n2, n3, n4, n5, n6, n7 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result[3], expectation[3])
  t.is(result[4], expectation[4])
  t.is(result[5], expectation[5])
  t.is(result[6], expectation[6])

  reverseOrder(list)

  result = []
  expectation = [ n7, n6, n5, n4, n3, n2, n1 ]

  for (const n of fromFirst(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result[3], expectation[3])
  t.is(result[4], expectation[4])
  t.is(result[5], expectation[5])
  t.is(result[6], expectation[6])

  result = []
  expectation = [ n1, n2, n3, n4, n5, n6, n7 ]

  for (const n of fromLast(list)) result.push(n as ListNode)

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result[3], expectation[3])
  t.is(result[4], expectation[4])
  t.is(result[5], expectation[5])
  t.is(result[6], expectation[6])
})