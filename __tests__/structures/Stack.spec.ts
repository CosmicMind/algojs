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
  stackQuery,
} from '@/internal'

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
  readonly parent?: Stackable
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = sentinel
    this.key = key
    this.value = value
  }
}

class StackTrace<T extends StackNode> implements Stack<T> {
  readonly top?: T
  readonly count: number
  constructor() {
    this.top = sentinel
    this.count = 0
  }
}

describe('Stack', () => {
  it('stackableCreate', () => {
    const node = stackableCreate({})

    expect(guard(node)).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
  })

  it('stackCreate', () => {
    const stack = stackCreate<StackableNode>()

    expect(guard(stack)).toBeTruthy()
    expect(stack.top).toStrictEqual(sentinel)
    expect(stack.count).toBe(0)
  })

  it('createStackableNode', () => {
    const node = createStackableNode(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new StackNode', () => {
    const node = new StackNode(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toStrictEqual(sentinel)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new StackTrace', () => {
    const stack = new StackTrace<StackNode>()

    expect(guard(stack)).toBeTruthy()
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
    const n4 = createStackableNode(4, 'd')

    stackPush(stack, n1)
    stackPush(stack, n2)
    stackPush(stack, n3)

    expect(stackHas(stack, n1)).toBeTruthy()
    expect(stackHas(stack, n2)).toBeTruthy()
    expect(stackHas(stack, n3)).toBeTruthy()
    expect(stackHas(stack, n4)).toBeFalsy()
  })

  it('stackQuery', () => {
    const stack = stackCreate<StackableNode>()

    const n1 = createStackableNode(1, 'a')
    const n2 = createStackableNode(2, 'b')
    const n3 = createStackableNode(3, 'c')
    const n4 = createStackableNode(4, 'd')

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
