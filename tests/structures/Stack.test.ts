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
  Stackable,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackClear,
  stackIterator,
} from '../../src'

interface StackNode extends Stackable {
  key: number
  value: string
}

const stackCreateNode = (key: number, value: string): StackNode => ({
  key,
  value,
})

test('Stack: peek', t => {
  const stack = stackCreate<StackNode>()

  const n1 = stackCreateNode(1, 'a')
  const n2 = stackCreateNode(2, 'b')
  const n3 = stackCreateNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  const result = stackPeek(stack)
  const expected = n3

  t.is(result, expected)
})

test('Stack: stackPush/stackPop', t => {
  const stack = stackCreate<StackNode>()

  const n1 = stackCreateNode(1, 'a')
  const n2 = stackCreateNode(2, 'b')
  const n3 = stackCreateNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const result = [
    stackPop(stack),
    stackPop(stack),
    stackPop(stack)
  ]

  const expected = [ n3, n2, n1 ]

  t.deepEqual(result, expected)
})

test('Stack: stackClear', t => {
  const stack = stackCreate<StackNode>()

  const n1 = stackCreateNode(1, 'a')
  const n2 = stackCreateNode(2, 'b')
  const n3 = stackCreateNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  stackClear(stack)

  t.is(stack.count, 0)
})

test('Stack: stackIterator', t => {
  const stack = stackCreate<StackNode>()

  const n1 = stackCreateNode(1, 'a')
  const n2 = stackCreateNode(2, 'b')
  const n3 = stackCreateNode(3, 'c')

  stackPush(stack, n1)
  stackPush(stack, n2)
  stackPush(stack, n3)

  t.is(stack.count, 3)

  const data: StackNode[] = []

  for (const x of stackIterator(stack)) {
    data.push(x)
  }

  const expected = [ n3, n2, n1 ]

  t.deepEqual(data, expected)
})