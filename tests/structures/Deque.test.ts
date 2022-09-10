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
} from '@cosmicverse/foundation'

import {
  DequeableKeys,
  DequeKeys,
  Dequeable,
  Deque,
  dequeableCreate,
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
} from '../../src'

const sentinel = void 0

type DequeableNode = Dequeable & {
  key: number
  value: string
}

const createDequeableNode = (key: number, value: string): DequeableNode =>
  dequeableCreate<DequeableNode>({
    key,
    value,
  })

class DequeNode implements Dequeable {
  readonly next: Optional<Dequeable>
  readonly previous: Optional<Dequeable>
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
  readonly first: Optional<T>
  readonly last: Optional<T>
  readonly count: number
  constructor() {
    this.first = sentinel
    this.last = sentinel
    this.count = 0
  }
}

test('Deque: dequeableCreate', t => {
  const node = dequeableCreate({})

  t.true(guardFor(node, ...DequeableKeys))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
})

test('Deque: dequeCreate', t => {
  const deque = dequeCreate<DequeableNode>()

  t.true(guardFor(deque, ...DequeKeys))
  t.is(deque.first, sentinel)
  t.is(deque.last, sentinel)
  t.is(deque.count, 0)
})

test('Deque: createDequeableNode', t => {
  const node = createDequeableNode(1, 'a')

  t.true(guardFor(node, ...DequeableKeys, 'key', 'value'))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Deque: new DequeNode', t => {
  const node = new DequeNode(1, 'a')

  t.true(guardFor(node, ...DequeableKeys, 'key', 'value'))
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Deque: new DequeTrace', t => {
  const deque = new DequeTrace<DequeNode>()

  t.true(guardFor(deque, ...DequeKeys))
  t.is(deque.first, sentinel)
  t.is(deque.last, sentinel)
  t.is(deque.count, 0)
})

test('Deque: dequeInsert', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsert(deque, n2)
  dequeInsert(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeRemoveFirst', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  let result: DequeableNode[] = []
  let expectation = [ n1, n2, n3 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)

  dequeRemoveFirst(deque)
  dequeRemoveFirst(deque)

  result = []
  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  expectation = [ n3 ]

  t.is(result[0], expectation[0])
  t.is(result.length, deque.count)
})

test('Deque: dequeAppend', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of dequeIterateFromLast(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeRemoveLast', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  let result: DequeableNode[] = []
  let expectation = [ n1, n2, n3 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)

  dequeRemoveLast(deque)
  dequeRemoveLast(deque)

  result = []
  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  expectation = [ n1 ]

  t.is(result[0], expectation[0])
  t.is(result.length, deque.count)
})

test('Deque: dequeInsertBefore', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsertBefore(deque, n2, n1)
  dequeInsertBefore(deque, n3, n1)

  const result: DequeableNode[] = []
  const expectation = [ n2, n3, n1 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeRemoveBefore', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsertBefore(deque, n2, n1)
  dequeInsertBefore(deque, n3, n1)
  dequeRemoveBefore(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n3, n1 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, deque.count)
})

test('Deque: dequeInsertAfter', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsertAfter(deque, n2, n1)
  dequeInsertAfter(deque, n3, n2)

  const result: DequeableNode[] = []
  const expectation = [ n1, n2, n3 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeRemoveAfter', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsertAfter(deque, n2, n1)
  dequeInsertAfter(deque, n3, n2)
  dequeRemoveAfter(deque, n1)

  const result: DequeableNode[] = []
  const expectation = [ n1, n3 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, deque.count)
})

test('Deque: dequeRemove', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)
  dequeRemove(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n1, n2 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, deque.count)
})

test('Deque: dequeIterateFromFirst', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeInsert(deque, n1)
  dequeInsert(deque, n2)
  dequeInsert(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of dequeIterateFromFirst(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeIterateFromLast', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  const result: DequeableNode[] = []
  const expectation = [ n3, n2, n1 ]

  for (const n of dequeIterateFromLast(deque)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result[2], expectation[2])
  t.is(result.length, deque.count)
})

test('Deque: dequeIterateToNext', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.is(deque.count, 3)

  const result: DequeableNode[] = []
  const expectation = [ n2, n3 ]

  for (const n of dequeIterateToNext(n1)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('Deque: dequeIterateToPrevious', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.is(deque.count, 3)

  const result: DequeableNode[] = []
  const expectation = [ n2, n1 ]

  for (const n of dequeIterateToPrevious(n3)) {
    result.push(n)
  }

  t.is(result[0], expectation[0])
  t.is(result[1], expectation[1])
  t.is(result.length, 2)
})

test('Deque: dequeClear', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.is(deque.count, 3)

  dequeClear(deque)

  t.is(deque.count, 0)
})

test('Deque: dequeIsFirst/dequeIsLast', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.true(dequeIsFirst(deque, n1))
  t.false(dequeIsFirst(deque, n2))
  t.true(dequeIsLast(deque, n3))
  t.false(dequeIsLast(deque, n2))
})

test('Deque: dequeIsNext', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')
  const n4 = createDequeableNode(4, 'd')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.true(dequeIsNext(n2, n1))
  t.false(dequeIsNext(n1, n2))
  t.true(dequeIsNext(n3, n2))
  t.false(dequeIsNext(n2, n3))
  t.false(dequeIsNext(n1, n3))
  t.false(dequeIsNext(n3, n1))
  t.false(dequeIsNext(n4, n1))
  t.false(dequeIsNext(n4, n2))
  t.false(dequeIsNext(n4, n3))
  t.false(dequeIsNext(n1, n4))
  t.false(dequeIsNext(n2, n4))
  t.false(dequeIsNext(n3, n4))
})

test('Deque: dequeIsPrevious', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')
  const n4 = createDequeableNode(4, 'd')

  dequeInsert(deque, n1)
  dequeInsert(deque, n2)
  dequeInsert(deque, n3)

  t.true(dequeIsPrevious(n2, n1))
  t.false(dequeIsPrevious(n1, n2))
  t.true(dequeIsPrevious(n3, n2))
  t.false(dequeIsPrevious(n2, n3))
  t.false(dequeIsPrevious(n1, n3))
  t.false(dequeIsPrevious(n3, n1))
  t.false(dequeIsPrevious(n4, n1))
  t.false(dequeIsPrevious(n4, n2))
  t.false(dequeIsPrevious(n4, n3))
  t.false(dequeIsPrevious(n1, n4))
  t.false(dequeIsPrevious(n2, n4))
  t.false(dequeIsPrevious(n3, n4))
})

test('Deque: dequeIsSibling', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')
  const n4 = createDequeableNode(3, 'd')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.true(dequeIsSibling(n1, n2))
  t.true(dequeIsSibling(n3, n2))
  t.true(dequeIsSibling(n1, n3))
  t.true(dequeIsSibling(n3, n1))
  t.true(dequeIsSibling(n1, n2))
  t.true(dequeIsSibling(n2, n1))
  t.true(dequeIsSibling(n3, n2))
  t.true(dequeIsSibling(n2, n3))
  t.false(dequeIsSibling(n4, n1))
  t.false(dequeIsSibling(n4, n2))
  t.false(dequeIsSibling(n4, n3))
  t.false(dequeIsSibling(n1, n4))
  t.false(dequeIsSibling(n2, n4))
  t.false(dequeIsSibling(n3, n4))
})

test('Deque: dequeHas', t => {
  const deque = dequeCreate<DequeableNode>()

  const n1 = createDequeableNode(1, 'a')
  const n2 = createDequeableNode(2, 'b')
  const n3 = createDequeableNode(3, 'c')
  const n4 = createDequeableNode(3, 'd')

  dequeAppend(deque, n1)
  dequeAppend(deque, n2)
  dequeAppend(deque, n3)

  t.true(dequeHas(deque, n1))
  t.true(dequeHas(deque, n2))
  t.true(dequeHas(deque, n3))
  t.false(dequeHas(deque, n4))
})