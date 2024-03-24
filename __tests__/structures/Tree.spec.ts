/**
 * BSD 3-Clause License
 *
 * Copyright © 2023, Daniel Jonathan <daniel at cosmicmind dot com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
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
  logger,
  guard,
} from '@cosmicmind/foundationjs'

import {
  SentinelNode,
  List,
  listCreate,
  Tree,
  treeCreate,
  treeRemove,
  treeInsertChild,
  treeAppendChild,
  treeDepth,
  treeIsFirstChild,
  treeIsLastChild,
  treeIsOnlyChild,
  depthFirstIterator,
  breadthFirstIterator,
  treeQuery,
  treeInsertChildBefore,
  treeInsertChildAfter,
} from '@/index'

type A = Tree & {
  key: number
  value: string
}

const createTreeEntry = (key: number, value: string): A =>
  treeCreate({
    key,
    value,
  })

class TreeTrace implements Tree {
  readonly parent?: Tree
  readonly next?: Tree
  readonly previous?: Tree
  readonly children: List<Tree>
  readonly size: number
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = SentinelNode
    this.next = SentinelNode
    this.previous = SentinelNode
    this.children = listCreate()
    this.size = 1
    this.key = key
    this.value = value
  }
}

describe('Tree', () => {
  it('treeCreate', () => {
    const node = treeCreate()

    expect(guard(node)).toBeTruthy()
    expect(node.parent).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
    expect(node.previous).toBe(SentinelNode)
    expect(node.children).toStrictEqual(listCreate())
    expect(node.size).toBe(1)
  })

  it('createTreeEntry', () => {
    const node = createTreeEntry(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
    expect(node.previous).toBe(SentinelNode)
    expect(node.children).toStrictEqual(listCreate())
    expect(node.size).toBe(1)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new TreeTrace', () => {
    const node = new TreeTrace(1, 'a')

    expect(guard(node, 'key', 'value')).toBeTruthy()
    expect(node.parent).toBe(SentinelNode)
    expect(node.next).toBe(SentinelNode)
    expect(node.previous).toBe(SentinelNode)
    expect(node.children).toStrictEqual(listCreate())
    expect(node.size).toBe(1)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('treeInsertChild', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')

    treeInsertChild(n1, n2)
    treeInsertChild(n1, n3)
    treeInsertChild(n1, n4)

    expect(treeIsFirstChild(n1, n2)).toBeFalsy()
    expect(treeIsFirstChild(n1, n3)).toBeFalsy()
    expect(treeIsFirstChild(n1, n4)).toBeTruthy()
    expect(treeIsLastChild(n1, n2)).toBeTruthy()
    expect(n1.size).toBe(4)
  })

  it('treeAppendChild', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')

    treeAppendChild(n1, n2)
    expect(treeIsOnlyChild(n1, n2)).toBeTruthy()

    treeAppendChild(n1, n3)
    expect(treeIsOnlyChild(n1, n2)).toBeFalsy()

    treeAppendChild(n1, n4)

    expect(treeIsLastChild(n1, n2)).toBeFalsy()
    expect(treeIsLastChild(n1, n3)).toBeFalsy()
    expect(treeIsLastChild(n1, n4)).toBeTruthy()
    expect(treeIsFirstChild(n1, n2)).toBeTruthy()
    expect(n1.size).toBe(4)
  })

  it('treeRemove', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')

    treeInsertChild(n1, n2)
    treeInsertChild(n1, n3)
    treeInsertChild(n1, n4)

    expect(n1.size).toBe(4)

    treeRemove(n2)
    expect(n1.size).toBe(3)

    treeRemove(n3)
    expect(n1.size).toBe(2)

    treeRemove(n1)
    expect(n1.size).toBe(2)
  })

  it('treeInsertChildBefore', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')

    treeInsertChild(n1, n2)
    treeInsertChildBefore(n1, n3, n2)
    treeInsertChildBefore(n1, n4, n3)

    expect(n1.children.first).toStrictEqual(n4)
    expect(n4.next).toStrictEqual(n3)
    expect(n3.next).toStrictEqual(n2)
  })

  it('treeInsertChildAfter', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')

    treeInsertChild(n1, n2)
    treeInsertChildAfter(n1, n3, n2)
    treeInsertChildAfter(n1, n4, n3)

    expect(n1.children.last).toStrictEqual(n4)
    expect(n2.next).toStrictEqual(n3)
    expect(n3.next).toStrictEqual(n4)
  })

  it('node.size', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')
    const n5 = createTreeEntry(5, 'e')
    const n6 = createTreeEntry(6, 'f')
    const n7 = createTreeEntry(7, 'g')

    treeInsertChild(n1, n2)
    expect(treeIsOnlyChild(n1, n2)).toBeTruthy()

    treeInsertChild(n1, n3)
    expect(treeIsOnlyChild(n1, n3)).toBeFalsy()

    treeInsertChild(n1, n4)
    treeInsertChild(n1, n5)
    treeInsertChild(n1, n6)
    treeInsertChild(n2, n7)

    expect(n1.size).toBe(7)
    expect(n2.size).toBe(2)
    expect(n3.size).toBe(1)
    expect(n4.size).toBe(1)
  })

  it('treeDepth', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')
    const n5 = createTreeEntry(5, 'e')
    const n6 = createTreeEntry(6, 'f')
    const n7 = createTreeEntry(7, 'g')

    treeInsertChild(n1, n2)
    treeInsertChild(n1, n3)
    treeInsertChild(n1, n4)
    treeInsertChild(n1, n5)
    treeInsertChild(n2, n6)
    treeInsertChild(n2, n7)

    expect(treeDepth(n1)).toBe(0)
    expect(treeDepth(n2)).toBe(1)
    expect(treeDepth(n3)).toBe(1)
    expect(treeDepth(n4)).toBe(1)
    expect(treeDepth(n5)).toBe(1)
    expect(treeDepth(n6)).toBe(2)
    expect(treeDepth(n7)).toBe(2)
  })

  it('depthFirstIterator', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')
    const n5 = createTreeEntry(5, 'e')
    const n6 = createTreeEntry(6, 'f')
    const n7 = createTreeEntry(7, 'g')

    treeAppendChild(n1, n2)
    treeAppendChild(n1, n3)
    treeAppendChild(n1, n4)
    treeAppendChild(n1, n5)
    treeAppendChild(n2, n6)
    treeAppendChild(n2, n7)

    const result: Tree[] = []

    for (const n of depthFirstIterator(n1)) {
      result.push(n)
    }

    expect(result).toStrictEqual([ n1, n2, n6, n7, n3, n4, n5 ])
  })

  it('breadthFirstIterator', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')
    const n5 = createTreeEntry(5, 'e')
    const n6 = createTreeEntry(6, 'f')
    const n7 = createTreeEntry(7, 'g')
    const n8 = createTreeEntry(8, 'h')
    const n9 = createTreeEntry(9, 'i')
    const n10 = createTreeEntry(10, 'j')
    const n11 = createTreeEntry(11, 'k')
    const n12 = createTreeEntry(12, 'l')
    const n13 = createTreeEntry(13, 'm')
    const n14 = createTreeEntry(14, 'n')
    const n15 = createTreeEntry(15, 'o')
    const n16 = createTreeEntry(16, 'p')
    const n17 = createTreeEntry(17, 'q')
    const n18 = createTreeEntry(18, 'r')
    const n19 = createTreeEntry(19, 'j')

    treeAppendChild(n1, n2)
    treeAppendChild(n1, n3)
    treeAppendChild(n1, n4)
    treeAppendChild(n1, n5)

    treeAppendChild(n2, n6)
    treeAppendChild(n2, n7)

    treeAppendChild(n3, n8)
    treeAppendChild(n3, n9)
    treeAppendChild(n3, n10)

    treeAppendChild(n4, n11)
    treeAppendChild(n4, n12)
    treeAppendChild(n4, n13)

    treeAppendChild(n5, n14)
    treeAppendChild(n5, n15)

    treeAppendChild(n10, n16)
    treeAppendChild(n10, n17)

    treeAppendChild(n11, n18)
    treeAppendChild(n11, n19)


    const result = []

    for (const n of breadthFirstIterator(n1)) {
      result.push(n.key)
    }

    expect(result).toStrictEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ])
  })

  it('treeQuery', () => {
    const n1 = createTreeEntry(1, 'a')
    const n2 = createTreeEntry(2, 'b')
    const n3 = createTreeEntry(3, 'c')
    const n4 = createTreeEntry(4, 'd')
    const n5 = createTreeEntry(5, 'e')
    const n6 = createTreeEntry(6, 'f')
    const n7 = createTreeEntry(7, 'g')

    treeAppendChild(n1, n2)
    treeAppendChild(n1, n3)
    treeAppendChild(n1, n4)
    treeAppendChild(n1, n5)
    treeAppendChild(n2, n6)
    treeAppendChild(n2, n7)

    let result = treeQuery(n1, node => 1 === node.key || 3 === node.key)
    expect(result.size).toBe(2)

    result = treeQuery(n1,
      node => 1 === node.key,
      node => 'a' === node.value || 'b' === node.value
    )
    expect(result.size).toBe(1)

    result = treeQuery(n1,
      node => 1 === node.key,
      node => 'b' === node.value
    )
    expect(result.size).toBe(0)
  })
})