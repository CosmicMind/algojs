/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import test from 'ava'

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

test('Stack: stackableCreate', t => {
  const node = stackableCreate({})

  t.true(guardFor(node, ...StackableKeys))
  t.is(node.parent, sentinel)
})

test('Stack: stackCreate', t => {
  const stack = stackCreate<StackableNode>()

  t.true(guardFor(stack, ...StackKeys))
  t.is(stack.top, sentinel)
  t.is(stack.count, 0)
})

test('Stack: createStackableNode', t => {
  const node = createStackableNode(1, 'a')

  t.true(guardFor(node, ...StackableKeys, 'key', 'value'))
  t.is(node.parent, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Stack: new StackNode', t => {
  const node = new StackNode(1, 'a')

  t.true(guardFor(node, ...StackableKeys, 'key', 'value'))
  t.is(node.parent, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Stack: new StackTrace', t => {
  const stack = new StackTrace<StackNode>()

  t.true(guardFor(stack, ...StackKeys))
  t.is(stack.top, sentinel)
  t.is(stack.count, 0)
})

test('Stack: stackPeek', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stackPeek(stack), n3)
  t.is(stack.count, 3)
})

test('Stack: stackPush/stackPop', t => {
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

  t.is(stack.count, 0)

  t.deepEqual(result, [ n3, n2, n1 ])
})

test('Stack: stackIterator', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const result: StackableNode[] = []

  for (const x of stackIterator(stack)) {
    result.push(x)
  }

  t.deepEqual(result, [ n3, n2, n1 ])
})

test('Stack: stackIterateFrom', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const result: StackableNode[] = []

  for (const x of stackIterateFrom(n3)) {
    result.push(x)
  }

  t.deepEqual(result, [ n3, n2, n1 ])
})

test('Stack: stackIterateToParent', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const result: StackableNode[] = []

  for (const x of stackIterateToParent(n3)) {
    result.push(x)
  }

  t.deepEqual(result, [ n2, n1 ])
})

test('Stack: stackClear', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  stackClear(stack)

  t.is(stack.count, 0)
})

test('Stack: stackDepth', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stackDepth(n1), 0)
  t.is(stackDepth(n2), 1)
  t.is(stackDepth(n3), 2)
})

test('Stack: stackIsTop', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.true(stackIsTop(stack, n3))
  t.is(stack.count, 3)
})

test('Stack: stackIsDescendant', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')
  const n4 = createStackableNode(4, 'd')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.true(stackIsDescendant(n3, n1))
  t.false(stackIsDescendant(n1, n3))
  t.false(stackIsDescendant(n4, n1))
  t.false(stackIsDescendant(n4, n3))
})

test('Stack: stackHas', t => {
  const stack = stackCreate<StackableNode>()

  const n1 = createStackableNode(1, 'a')
  const n2 = createStackableNode(2, 'b')
  const n3 = createStackableNode(3, 'c')
  const n4 = createStackableNode(3, 'd')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.true(stackHas(stack, n1))
  t.true(stackHas(stack, n2))
  t.true(stackHas(stack, n3))
  t.false(stackHas(stack, n4))
})