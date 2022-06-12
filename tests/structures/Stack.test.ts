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
  Optional,
  guardFor,
} from '@cosmicverse/foundation'

import {
  Stackable,
  Stack,
  stackableCreate,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackIterator,
  stackClear,
  stackIsTop,
  stackIsDescendant,
  stackHas,
} from '../../src'

const sentinel = void 0

interface StackableNode extends Stackable {
  key: number
  value: string
}

const createStackableNode = (key: number, value: string): ReturnType<typeof stackableCreate<StackableNode>> =>
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

  t.true(guardFor<Stackable>(node, 'parent'))
  t.is(node.parent, sentinel)
})

test('Stack: stackCreate', t => {
  const stack = stackCreate<StackableNode>()

  t.true(guardFor<Stack<StackableNode>>(stack, 'top'))
  t.true(guardFor<Stack<StackableNode>>(stack, 'count'))
  t.is(stack.top, sentinel)
  t.is(stack.count, 0)
})

test('Stack: createStackableNode', t => {
  const node = createStackableNode(1, 'a')

  t.true(guardFor<StackableNode>(node, 'parent'))
  t.true(guardFor<StackableNode>(node, 'key'))
  t.true(guardFor<StackableNode>(node, 'value'))
  t.is(node.parent, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Stack: new StackNode', t => {
  const node = new StackNode(1, 'a')

  t.true(node instanceof StackNode)
  t.true(guardFor<StackNode>(node, 'parent'))
  t.true(guardFor<StackNode>(node, 'key'))
  t.true(guardFor<StackNode>(node, 'value'))
  t.is(node.parent, sentinel)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Stack: new StackTrace', t => {
  const stack = new StackTrace<StackNode>()

  t.true(stack instanceof StackTrace)
  t.true(guardFor<StackTrace<StackNode>>(stack, 'top'))
  t.true(guardFor<StackTrace<StackNode>>(stack, 'count'))
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
  t.is(result.length, stack.count)
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