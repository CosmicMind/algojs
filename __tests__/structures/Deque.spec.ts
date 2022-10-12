/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import {
  it,
  expect,
  describe,
} from 'vitest'

import {
  Optional,
  guardFor,
} from '@cosmicmind/foundation'

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

describe('Deque', () => {
  it('dequeableCreate', () => {
    const node = dequeableCreate({})

    expect(guardFor(node, ...DequeableKeys)).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
  })

  it('dequeCreate', () => {
    const deque = dequeCreate<DequeableNode>()

    expect(guardFor(deque, ...DequeKeys)).toBeTruthy()
    expect(deque.first).toBe(sentinel)
    expect(deque.last).toBe(sentinel)
    expect(deque.count).toBe(0)
  })

  it('createDequeableNode', () => {
    const node = createDequeableNode(1, 'a')

    expect(guardFor(node, ...DequeableKeys, 'key', 'value')).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new DequeNode', () => {
    const node = new DequeNode(1, 'a')

    expect(guardFor(node, ...DequeableKeys, 'key', 'value')).toBeTruthy()
    expect(node.previous).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new DequeTrace', () => {
    const deque = new DequeTrace<DequeNode>()

    expect(guardFor(deque, ...DequeKeys)).toBeTruthy()
    expect(deque.first).toBe(sentinel)
    expect(deque.last).toBe(sentinel)
    expect(deque.count).toBe(0)
  })

  it('dequeInsert', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveFirst', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveLast', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveBefore', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeInsertAfter', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemoveAfter', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeRemove', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateFromFirst', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateFromLast', () => {
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

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result[2]).toBe(expectation[2])
    expect(result.length).toBe(deque.count)
  })

  it('dequeIterateToNext', () => {
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    const result: DequeableNode[] = []
    const expectation = [ n2, n3 ]

    for (const n of dequeIterateToNext(n1)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('dequeIterateToPrevious', () => {
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    const result: DequeableNode[] = []
    const expectation = [ n2, n1 ]

    for (const n of dequeIterateToPrevious(n3)) {
      result.push(n)
    }

    expect(result[0]).toBe(expectation[0])
    expect(result[1]).toBe(expectation[1])
    expect(result.length).toBe(2)
  })

  it('dequeClear', () => {
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(deque.count).toBe(3)

    dequeClear(deque)

    expect(deque.count).toBe(0)
  })

  it('dequeIsFirst/dequeIsLast', () => {
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeIsFirst(deque, n1)).toBeTruthy()
    expect(dequeIsFirst(deque, n2)).toBeFalsy()
    expect(dequeIsLast(deque, n3)).toBeTruthy()
    expect(dequeIsLast(deque, n2)).toBeFalsy()
  })

  it('dequeIsNext', () => {
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')
    const n4 = createDequeableNode(4, 'd')

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
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')
    const n4 = createDequeableNode(4, 'd')

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
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')
    const n4 = createDequeableNode(3, 'd')

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
    const deque = dequeCreate<DequeableNode>()

    const n1 = createDequeableNode(1, 'a')
    const n2 = createDequeableNode(2, 'b')
    const n3 = createDequeableNode(3, 'c')
    const n4 = createDequeableNode(3, 'd')

    dequeAppend(deque, n1)
    dequeAppend(deque, n2)
    dequeAppend(deque, n3)

    expect(dequeHas(deque, n1)).toBeTruthy()
    expect(dequeHas(deque, n2)).toBeTruthy()
    expect(dequeHas(deque, n3)).toBeTruthy()
    expect(dequeHas(deque, n4)).toBeFalsy()
  })
})
