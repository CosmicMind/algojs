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

import {
  guard,
} from '@cosmicmind/foundationjs'

import {
  Deque,
  dequeCreate,
  dequeInsert,
  dequeRemoveFirst,
  dequeAppend,
  dequeRemoveLast,
  dequeInsertBefore,
  dequeRemoveBefore,
  dequeInsertAfter,
  dequeRemoveAfter,
  dequeRemove,
  dequeIterateFromFirst,
  dequeIterateFromLast,
  dequeIterateToNext,
  dequeIterateToPrevious,
  dequeClear,
  dequeIsFirst,
  dequeIsLast,
  dequeIsNext,
  dequeIsPrevious,
  dequeIsSibling,
  dequeHas,
  Listable,
  listableCreate,
} from '@/internal'

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

class DequeNode implements Listable {
  readonly next?: Listable
  readonly previous?: Listable
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.next = sentinel
    this.previous = sentinel
    this.key = key
    this.value = value
  }
}

class DequeTrace<T extends DequeNode> implements Deque<T> {
  readonly first?: T
  readonly last?: T
  readonly count: number
  constructor() {
    this.first = sentinel
    this.last = sentinel
    this.count = 0
  }
}

describe('Deque', () => {
  it('listableCreate', () => {
    const node = listableCreate({})

    expect(guard(node)).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
  })

  it('dequeCreate', () => {
    const deque = dequeCreate<ListableNode>()

    expect(guard(deque)).toBeTruthy()
    expect(deque.first).toBe(sentinel)
    expect(deque.last).toBe(sentinel)
    expect(deque.count).toBe(0)
  })

  it('createListableNode', () => {
    const node = createListableNode(1, 'a')

    expect(guard(node)).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new DequeNode', () => {
    const node = new DequeNode(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new DequeTrace', () => {
    const deque = new DequeTrace<DequeNode>()

    expect(guard(deque)).toBeTruthy()
    expect(deque.first).toBe(sentinel)
    expect(deque.last).toBe(sentinel)
    expect(deque.count).toBe(0)
  })

  it('dequeInsert', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsert(deque, n2)
    dequeInsert(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n3, n2, n1 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveFirst', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    let result: ListableNode[] = []
    let expectation = [ n1, n2, n3 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)

    dequeRemoveFirst(deque)
    dequeRemoveFirst(deque)

    result = []
    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expectation = [ n3 ]

    expect(result[0]).toBe(expectation[0])
    expect(result.length).toBe(deque.count)
  })

  it('dequeAppend', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n3, n2, n1 ]

    for (const n of dequeIterateFromLast(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveLast', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    let result: ListableNode[] = []
    let expectation = [ n1, n2, n3 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)

    dequeRemoveLast(deque)
    dequeRemoveLast(deque)

    result = []
    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expectation = [ n1 ]

    expect(result[0]).toBe(expectation[0])
    expect(result.length).toBe(deque.count)
  })

  it('dequeInsertBefore', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsertBefore(deque, n2, n1)
    dequeInsertBefore(deque, n3, n1)

    const result: ListableNode[] = []
    const expectation = [ n2, n3, n1 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveBefore', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsertBefore(deque, n2, n1)
    dequeInsertBefore(deque, n3, n1)
    dequeRemoveBefore(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n3, n1 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeInsertAfter', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsertAfter(deque, n2, n1)
    dequeInsertAfter(deque, n3, n2)

    const result: ListableNode[] = []
    const expectation = [ n1, n2, n3 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveAfter', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsertAfter(deque, n2, n1)
    dequeInsertAfter(deque, n3, n2)
    dequeRemoveAfter(deque, n1)

    const result: ListableNode[] = []
    const expectation = [ n1, n3 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemove', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)
    dequeRemove(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n1, n2 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateFromFirst', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeInsert(deque, n1)
    dequeInsert(deque, n2)
    dequeInsert(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n3, n2, n1 ]

    for (const n of dequeIterateFromFirst(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateFromLast', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    const result: ListableNode[] = []
    const expectation = [ n3, n2, n1 ]

    for (const n of dequeIterateFromLast(deque)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateToNext', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    const result: ListableNode[] = []
    const expectation = [ n2, n3 ]

    for (const n of dequeIterateToNext(n1)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('dequeIterateToPrevious', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    const result: ListableNode[] = []
    const expectation = [ n2, n1 ]

    for (const n of dequeIterateToPrevious(n3)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('dequeClear', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    dequeClear(deque)

    expect(deque.count).toBe(0)
  })

  it('dequeIsFirst/dequeIsLast', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeIsFirst(deque, n1)).toBeTruthy()
    expect(dequeIsFirst(deque, n2)).toBeFalsy()
    expect(dequeIsLast(deque, n3)).toBeTruthy()
    expect(dequeIsLast(deque, n2)).toBeFalsy()
  })

  it('dequeIsNext', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')
    const n4 = createListableNode(4, 'd')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeIsNext(n2, n1)).toBeTruthy()
    expect(dequeIsNext(n1, n2)).toBeFalsy()
    expect(dequeIsNext(n3, n2)).toBeTruthy()
    expect(dequeIsNext(n2, n3)).toBeFalsy()
    expect(dequeIsNext(n1, n3)).toBeFalsy()
    expect(dequeIsNext(n3, n1)).toBeFalsy()
    expect(dequeIsNext(n4, n1)).toBeFalsy()
    expect(dequeIsNext(n4, n2)).toBeFalsy()
    expect(dequeIsNext(n4, n3)).toBeFalsy()
    expect(dequeIsNext(n1, n4)).toBeFalsy()
    expect(dequeIsNext(n2, n4)).toBeFalsy()
    expect(dequeIsNext(n3, n4)).toBeFalsy()
  })

  it('dequeIsPrevious', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')
    const n4 = createListableNode(4, 'd')

    dequeInsert(deque, n1)
    dequeInsert(deque, n2)
    dequeInsert(deque, n3)

    expect(dequeIsPrevious(n2, n1)).toBeTruthy()
    expect(dequeIsPrevious(n1, n2)).toBeFalsy()
    expect(dequeIsPrevious(n3, n2)).toBeTruthy()
    expect(dequeIsPrevious(n2, n3)).toBeFalsy()
    expect(dequeIsPrevious(n1, n3)).toBeFalsy()
    expect(dequeIsPrevious(n3, n1)).toBeFalsy()
    expect(dequeIsPrevious(n4, n1)).toBeFalsy()
    expect(dequeIsPrevious(n4, n2)).toBeFalsy()
    expect(dequeIsPrevious(n4, n3)).toBeFalsy()
    expect(dequeIsPrevious(n1, n4)).toBeFalsy()
    expect(dequeIsPrevious(n2, n4)).toBeFalsy()
    expect(dequeIsPrevious(n3, n4)).toBeFalsy()
  })

  it('dequeIsSibling', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')
    const n4 = createListableNode(3, 'd')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeIsSibling(n1, n2)).toBeTruthy()
    expect(dequeIsSibling(n3, n2)).toBeTruthy()
    expect(dequeIsSibling(n1, n3)).toBeTruthy()
    expect(dequeIsSibling(n3, n1)).toBeTruthy()
    expect(dequeIsSibling(n1, n2)).toBeTruthy()
    expect(dequeIsSibling(n2, n1)).toBeTruthy()
    expect(dequeIsSibling(n3, n2)).toBeTruthy()
    expect(dequeIsSibling(n2, n3)).toBeTruthy()
    expect(dequeIsSibling(n4, n1)).toBeFalsy()
    expect(dequeIsSibling(n4, n2)).toBeFalsy()
    expect(dequeIsSibling(n4, n3)).toBeFalsy()
    expect(dequeIsSibling(n1, n4)).toBeFalsy()
    expect(dequeIsSibling(n2, n4)).toBeFalsy()
    expect(dequeIsSibling(n3, n4)).toBeFalsy()
  })

  it('dequeHas', () => {
    const deque = dequeCreate<ListableNode>()

    const n1 = createListableNode(1, 'a')
    const n2 = createListableNode(2, 'b')
    const n3 = createListableNode(3, 'c')
    const n4 = createListableNode(3, 'd')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeHas(deque, n1)).toBeTruthy()
    expect(dequeHas(deque, n2)).toBeTruthy()
    expect(dequeHas(deque, n3)).toBeTruthy()
    expect(dequeHas(deque, n4)).toBeFalsy()
  })
})
