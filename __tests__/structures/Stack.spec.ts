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
  StackableKeys,
  StackKeys,
  Stackable,
  Stack,
  stackableCreate,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackIterator,
  stackIterateFrom,
  stackIterateToParent,
  stackClear,
  stackDepth,
  stackIsTop,
  stackIsDescendant,
  stackHas,
} from '../../src'

const sentinel = void 0

type StackableNode = Stackable & {
  key: number
  value: string
}

const createStackableNode = (key: number, value: string): StackableNode =>
  stackableCreate<StackableNode>({
    key,
    value,
  })

class StackNode implements Stackable {
  readonly parent: Optional<Stackable>
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = sentinel
    this.key = key
    this.value = value
  }
}

class StackTrace<T extends StackNode> implements Stack<T> {
  readonly top: Optional<T>
  readonly count: number
  constructor() {
    this.top = sentinel
    this.count = 0
  }
}

describe('Stack', () => {
  it('stackableCreate', () => {
    const node = stackableCreate({})

    expect(guardFor(node, ...StackableKeys)).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
  })

  it('stackCreate', () => {
    const stack = stackCreate<StackableNode>()

    expect(guardFor(stack, ...StackKeys)).toBeTruthy()
    expect(stack.top).toStrictEqual(sentinel)
    expect(stack.count).toBe(0)
  })

  it('createStackableNode', () => {
    const node = createStackableNode(1, 'a')

    expect(guardFor(node, ...StackableKeys, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new StackNode', () => {
    const node = new StackNode(1, 'a')

    expect(guardFor(node, ...StackableKeys, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new StackTrace', () => {
    const stack = new StackTrace<StackNode>()

    expect(guardFor(stack, ...StackKeys)).toBeTruthy()
    expect(stack.top).toStrictEqual(sentinel)
    expect(stack.count).toBe(0)
  })

  it('stackPeek', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackPeek(stack)).toBe(n3)
    expect(stack.count).toBe(3)
  })

  it('stackPush/stackPop', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    const result = [
      stackPop(stack),
      stackPop(stack),
      stackPop(stack)
    ]

    expect(stack.count).toBe(0)

    expect(result).toStrictEqual([ n3, n2, n1 ])
  })

  it('stackIterator', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

    const result: StackableNode[] = []

    for (const x of stackIterator(stack)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n3, n2, n1 ])
  })

  it('stackIterateFrom', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

    const result: StackableNode[] = []

    for (const x of stackIterateFrom(n3)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n3, n2, n1 ])
  })

  it('stackIterateToParent', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

    const result: StackableNode[] = []

    for (const x of stackIterateToParent(n3)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n2, n1 ])
  })

  it('stackClear', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

    stackClear(stack)

    expect(stack.count).toBe(0)
  })

  it('stackDepth', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackDepth(n1)).toBe(0)
    expect(stackDepth(n2)).toBe(1)
    expect(stackDepth(n3)).toBe(2)
  })

  it('stackIsTop', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackIsTop(stack, n3)).toBeTruthy()
    expect(stack.count).toBe(3)
  })

  it('stackIsDescendant', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')
    const n4 = createStackableNode(4, 'd')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackIsDescendant(n3, n1)).toBeTruthy()
    expect(stackIsDescendant(n1, n3)).toBeFalsy()
    expect(stackIsDescendant(n4, n1)).toBeFalsy()
    expect(stackIsDescendant(n4, n3)).toBeFalsy()
  })

  it('stackHas', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')
    const n4 = createStackableNode(3, 'd')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackHas(stack, n1)).toBeTruthy()
    expect(stackHas(stack, n2)).toBeTruthy()
    expect(stackHas(stack, n3)).toBeTruthy()
    expect(stackHas(stack, n4)).toBeFalsy()
  })
})
