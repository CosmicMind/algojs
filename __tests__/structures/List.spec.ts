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

import {
  it,
  expect,
  describe,
} from 'vitest'

import { guard } from '@cosmicmind/foundationjs'

import {
<<<<<<< HEAD
  SentinelNode,
  Listable,
=======
  ListNode,
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  List,
  listNodeCreate,
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
  listHas,
  listQuery,
} from '@/internal'

<<<<<<< HEAD
type ListNode = Listable & {
=======
const sentinel = void 0

type ListNodeNode = ListNode & {
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  key: number
  value: string
}

<<<<<<< HEAD
const createListNode = (key: number, value: string): ListNode =>
  listNodeCreate<ListNode>({
=======
const createListNodeNode = (key: number, value: string): ListNodeNode =>
  listNodeCreate<ListNodeNode>({
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    key,
    value,
  })

<<<<<<< HEAD
class ListTraceNode implements Listable {
  readonly next?: Listable
  readonly previous?: Listable
=======
class ListNode implements ListNode {
  readonly next?: ListNode
  readonly previous?: ListNode
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.next = SentinelNode
    this.previous = SentinelNode
    this.key = key
    this.value = value
  }
}

class ListTrace<T extends ListTraceNode> implements List<T> {
  readonly first?: T
  readonly last?: T
  readonly count: number
  constructor() {
    this.first = SentinelNode
    this.last = SentinelNode
    this.count = 0
  }
}

describe('List', () => {
  it('listNodeCreate', () => {
    const node = listNodeCreate({})

    expect(guard(node)).toBeTruthy()
    expect(node.previous).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
  })

  it('listCreate', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()
=======
    const list = listCreate<ListNodeNode>()
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    expect(guard(list)).toBeTruthy()
    expect(list.first).toBe(SentinelNode)
    expect(list.last).toBe(SentinelNode)
    expect(list.count).toBe(0)
  })

<<<<<<< HEAD
  it('createListNode', () => {
    const node = createListNode(1, 'a')
=======
  it('createListNodeNode', () => {
    const node = createListNodeNode(1, 'a')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.previous).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new Listable', () => {
    const node = new ListTraceNode(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.previous).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new ListTrace', () => {
    const list = new ListTrace()

    expect(guard(list)).toBeTruthy()
    expect(list.first).toBe(SentinelNode)
    expect(list.last).toBe(SentinelNode)
    expect(list.count).toBe(0)
  })

  it('listInsert', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsert(list, n2)
    listInsert(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n3, n2, n1 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listRemoveFirst', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

<<<<<<< HEAD
    let result: ListNode[] = []
=======
    let result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    let expectation = [ n1, n2, n3 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)

    listRemoveFirst(list)
    listRemoveFirst(list)

    result = []
    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expectation = [ n3 ]

    expect(result[0]).toBe(expectation[0])
    expect(result.length).toBe(list.count)
  })

  it('listAppend', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n3, n2, n1 ]

    for (const n of listIterateFromLast(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listRemoveLast', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

<<<<<<< HEAD
    let result: ListNode[] = []
=======
    let result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    let expectation = [ n1, n2, n3 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)

    listRemoveLast(list)
    listRemoveLast(list)

    result = []
    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expectation = [ n1 ]

    expect(result[0]).toBe(expectation[0])
    expect(result.length).toBe(list.count)
  })

  it('listInsertBefore', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsertBefore(list, n2, n1)
    listInsertBefore(list, n3, n1)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n2, n3, n1 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listRemoveBefore', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsertBefore(list, n2, n1)
    listInsertBefore(list, n3, n1)
    listRemoveBefore(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n3, n1 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(list.count)
  })

  it('listInsertAfter', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsertAfter(list, n2, n1)
    listInsertAfter(list, n3, n2)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n1, n2, n3 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listRemoveAfter', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsertAfter(list, n2, n1)
    listInsertAfter(list, n3, n2)
    listRemoveAfter(list, n1)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n1, n3 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(list.count)
  })

  it('listRemove', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)
    listRemove(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n1, n2 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(list.count)
  })

  it('listIterateFromFirst', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listInsert(list, n1)
    listInsert(list, n2)
    listInsert(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n3, n2, n1 ]

    for (const n of listIterateFromFirst(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listIterateFromLast', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n3, n2, n1 ]

    for (const n of listIterateFromLast(list)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(list.count)
  })

  it('listIterateToNext', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

    expect(list.count).toBe(3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n2, n3 ]

    for (const n of listIterateToNext(n1)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('listIterateToPrevious', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

    expect(list.count).toBe(3)

<<<<<<< HEAD
    const result: ListNode[] = []
=======
    const result: ListNodeNode[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    const expectation = [ n2, n1 ]

    for (const n of listIterateToPrevious(n3)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('listClear', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

    expect(list.count).toBe(3)

    listClear(list)

    expect(list.count).toBe(0)
  })

  it('listIsFirst/listIsLast', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

    expect(listIsFirst(list, n1)).toBeTruthy()
    expect(listIsFirst(list, n2)).toBeFalsy()
    expect(listIsLast(list, n3)).toBeTruthy()
    expect(listIsLast(list, n2)).toBeFalsy()
  })

  it('listHas', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
    const n4 = createListNode(3, 'd')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
    const n4 = createListNodeNode(3, 'd')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)

    expect(listHas(list, n1)).toBeTruthy()
    expect(listHas(list, n2)).toBeTruthy()
    expect(listHas(list, n3)).toBeTruthy()
    expect(listHas(list, n4)).toBeFalsy()
  })

  it('listQuery', () => {
<<<<<<< HEAD
    const list = listCreate<ListNode>()

    const n1 = createListNode(1, 'a')
    const n2 = createListNode(2, 'b')
    const n3 = createListNode(3, 'c')
    const n4 = createListNode(4, 'd')
=======
    const list = listCreate<ListNodeNode>()

    const n1 = createListNodeNode(1, 'a')
    const n2 = createListNodeNode(2, 'b')
    const n3 = createListNodeNode(3, 'c')
    const n4 = createListNodeNode(4, 'd')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    listAppend(list, n1)
    listAppend(list, n2)
    listAppend(list, n3)
    listAppend(list, n4)

    let result = listQuery(list, node => 1 === node.key || 3 === node.key)
    expect(result.size).toBe(2)

    result = listQuery(list,
      node => 1 === node.key,
      node => 'a' === node.value || 'b' === node.value
    )
    expect(result.size).toBe(1)

    result = listQuery(list,
      node => 1 === node.key,
      node => 'b' === node.value
    )
    expect(result.size).toBe(0)
  })
})