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

import { Optional } from '@cosmicverse/foundation'

import {
  Stackable,
  push,
  pop,
  clear,
  createStack,
} from '../../src'

interface StackNode extends Stackable {
  key: number
  value: string
}

const createStackNode = (key: number, value: string): StackNode => ({
  key,
  value,
})

test('Stack: peek', t => {
  const stack = createStack()

  const n1 = createStackNode(1, 'a')
  const n2 = createStackNode(2, 'b')
  const n3 = createStackNode(3, 'c')

  push(stack, n1)
  push(stack, n2)
  push(stack, n3)

  const result: Optional<Stackable> = stack.top
  const expected: StackNode = n3

  t.is(result, expected)
})

test('Stack: push/pop', t => {
  const stack = createStack()

  const n1 = createStackNode(1, 'a')
  const n2 = createStackNode(2, 'b')
  const n3 = createStackNode(3, 'c')

  push(stack, n1)
  push(stack, n2)
  push(stack, n3)

  t.is(stack.count, 3)

  const result: StackNode[] = [
    pop(stack) as StackNode,
    pop(stack) as StackNode,
    pop(stack) as StackNode
  ]

  const expected: StackNode[] = [ n3, n2, n1 ]

  t.deepEqual(result, expected)
})

test('Stack: clear', t => {
  const stack = createStack()

  const n1 = createStackNode(1, 'a')
  const n2 = createStackNode(2, 'b')
  const n3 = createStackNode(3, 'c')

  push(stack, n1)
  push(stack, n2)
  push(stack, n3)

  t.is(stack.count, 3)

  clear(stack)

  t.is(stack.count, 0)
})