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
  CompareFn,
  StackCompareFn,
  Stackable,
=======
  CompareFn,
  StackCompareFn,
  StackNode,
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  Stack,
  stackNodeCreate,
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
  stackHas,
  stackQuery,
} from '@/internal'

<<<<<<< HEAD
type StackNode = Stackable & {
=======
const sentinel = void 0

type StackNodeKeyValue = StackNode & {
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  key: number
  value: string
}

<<<<<<< HEAD
const createStackTrace = (key: number, value: string): StackNode =>
  stackNodeCreate<StackNode>({
=======
const createStackKeyValue = (key: number, value: string): StackNodeKeyValue =>
  stackNodeCreate<StackNodeKeyValue>({
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
    key,
    value,
  })

<<<<<<< HEAD
class StackTraceNode implements Stackable {
  readonly parent?: Stackable
=======
class StackTraceKeyValue implements StackNode {
  readonly parent?: StackNode
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = SentinelNode
    this.key = key
    this.value = value
  }
}

<<<<<<< HEAD
class StackTrace<T extends StackTraceNode> implements Stack<T> {
=======
class StackKeyValue<T extends StackNode> implements Stack<T> {
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  readonly top?: T
  readonly count: number
  readonly compare: CompareFn<T>
  constructor() {
    this.top = SentinelNode
    this.count = 0
<<<<<<< HEAD
    this.compare = (a, b): number => a.key === b.key ? 0 : a.key > b.key ? 1 : -1
=======
    this.compare = StackCompareFn
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  }
}

describe('Stack', () => {
<<<<<<< HEAD
  it('StackCompareFn', () => {
    const compare = StackCompareFn<StackTraceNode>

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')

    expect(compare(n1, n1)).toBe(0)
    expect(compare(n2, n1)).toBe(-1)
    expect(compare(n2, n3)).toBe(-1)
  })

  it('custom StackCompareFn', () => {
    const compare: CompareFn<StackTraceNode> = (a, b): number => a.key === b.key ? 0 : a.key > b.key ? 1 : -1

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')

    expect(compare(n1, n1)).toBe(0)
    expect(compare(n2, n1)).toBe(1)
    expect(compare(n2, n3)).toBe(-1)
  })

=======
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3
  it('stackNodeCreate', () => {
    const node = stackNodeCreate()

    expect(guard(node)).toBeTruthy()
    expect(node.parent).toStrictEqual(SentinelNode)
  })

  it('stackCreate', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackTraceNode>()
=======
    const stack = stackCreate<StackTraceKeyValue>()
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    expect(guard(stack)).toBeTruthy()
    expect(stack.top).toStrictEqual(SentinelNode)
    expect(stack.count).toBe(0)
  })

<<<<<<< HEAD
  it('createStackTrace', () => {
    const node = createStackTrace(1, 'a')
=======
  it('createStackKeyValue', () => {
    const node = createStackKeyValue(1, 'a')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(SentinelNode)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

<<<<<<< HEAD
  it('new Stackable', () => {
    const node = new StackTraceNode(1, 'a')
=======
  it('new StackNode', () => {
    const node = new StackTraceKeyValue(1, 'a')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(SentinelNode)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new StackKeyValue', () => {
    const stack = new StackKeyValue<StackNodeKeyValue>()

    expect(guard(stack)).toBeTruthy()
    expect(stack.top).toStrictEqual(SentinelNode)
    expect(stack.count).toBe(0)
  })

  it('stackPeek', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackPeek(stack)).toBe(n3)
    expect(stack.count).toBe(3)
  })

  it('stackPush/stackPop', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

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
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

<<<<<<< HEAD
    const result: StackNode[] = []
=======
    const result: StackNodeKeyValue[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    for (const x of stackIterator(stack)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n3, n2, n1 ])
  })

  it('stackIterateFrom', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

<<<<<<< HEAD
    const result: StackNode[] = []
=======
    const result: StackNodeKeyValue[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    for (const x of stackIterateFrom(n3)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n3, n2, n1 ])
  })

  it('stackIterateToParent', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

<<<<<<< HEAD
    const result: StackNode[] = []
=======
    const result: StackNodeKeyValue[] = []
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    for (const x of stackIterateToParent(n3)) {
      result.push(x)
    }

    expect(result).toStrictEqual([ n2, n1 ])
  })

  it('stackClear', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stack.count).toBe(3)

    stackClear(stack)

    expect(stack.count).toBe(0)
  })

  it('stackDepth', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackDepth(n1)).toBe(0)
    expect(stackDepth(n2)).toBe(1)
    expect(stackDepth(n3)).toBe(2)
  })

  it('stackIsTop', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackIsTop(stack, n3)).toBeTruthy()
    expect(stack.count).toBe(3)
  })

  it('stackHas', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
    const n4 = createStackTrace(4, 'd')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
    const n4 = createStackKeyValue(4, 'd')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackHas(stack, n1)).toBeTruthy()
    expect(stackHas(stack, n2)).toBeTruthy()
    expect(stackHas(stack, n3)).toBeTruthy()
    expect(stackHas(stack, n4)).toBeFalsy()
  })

  it('stackQuery', () => {
<<<<<<< HEAD
    const stack = stackCreate<StackNode>()

    const n1 = createStackTrace(1, 'a')
    const n2 = createStackTrace(2, 'b')
    const n3 = createStackTrace(3, 'c')
    const n4 = createStackTrace(4, 'd')
=======
    const stack = stackCreate<StackNodeKeyValue>()

    const n1 = createStackKeyValue(1, 'a')
    const n2 = createStackKeyValue(2, 'b')
    const n3 = createStackKeyValue(3, 'c')
    const n4 = createStackKeyValue(4, 'd')
>>>>>>> bfc066e9ee3ccd4ec3d8e412118ebffeb1a379b3

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)
    stackPush(stack, n4)

    let result = stackQuery(stack, node => 1 === node.key || 3 === node.key)
    expect(result.size).toBe(2)

    result = stackQuery(stack,
      node => 1 === node.key,
      node => 'a' === node.value || 'b' === node.value
    )
    expect(result.size).toBe(1)

    result = stackQuery(stack,
      node => 1 === node.key,
      node => 'b' === node.value
    )
    expect(result.size).toBe(0)
  })
})
