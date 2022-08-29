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
} from '@libs/foundation'

import {
  TreeKeys,
  Tree,
  TreeChildren,
  treeCreate,
  treeInsertChild,
  treeDepth,
  treeIsFirstChild,
  treeIsLastChild,
} from '../../src'

const sentinel = void 0

type TreeNode = Tree & {
  key: number
  value: string
}

const createTreeNode = (key: number, value: string): TreeNode =>
  treeCreate<TreeNode>({
    key,
    value,
  })

class TreeTrace implements Tree {
  readonly parent: Optional<Tree>
  readonly next: Optional<Tree>
  readonly previous: Optional<Tree>
  readonly children: Optional<TreeChildren<Tree>>
  readonly size: number
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = sentinel
    this.next = sentinel
    this.previous = sentinel
    this.children = sentinel
    this.size = 1
    this.key = key
    this.value = value
  }
}

test('Tree: treeCreate', t => {
  const node = treeCreate({})

  t.true(guardFor(node, ...TreeKeys))
  t.is(node.parent, sentinel)
  t.is(node.next, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 1)
})

test('Tree: createTreeNode', t => {
  const node = createTreeNode(1, 'a')

  t.true(guardFor(node, ...TreeKeys, 'key', 'value'))
  t.is(node.parent, sentinel)
  t.is(node.next, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 1)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Tree: new TreeTrace', t => {
  const node = new TreeTrace(1, 'a')

  t.true(guardFor(node, ...TreeKeys, 'key', 'value'))
  t.is(node.parent, sentinel)
  t.is(node.next, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 1)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Tree: treeInsertChild', t => {
  const n1 = createTreeNode(1, 'a')
  const n2 = createTreeNode(2, 'b')
  const n3 = createTreeNode(3, 'c')
  const n4 = createTreeNode(4, 'd')

  treeInsertChild(n2, n1)
  treeInsertChild(n3, n1)
  treeInsertChild(n4, n1)

  t.false(treeIsFirstChild(n2, n1))
  t.false(treeIsFirstChild(n3, n1))
  t.true(treeIsFirstChild(n4, n1))
  t.true(treeIsLastChild(n2, n1))
  t.is(n1.size, 4)
})

test('Tree: node.size', t => {
  const n1 = createTreeNode(1, 'a')
  const n2 = createTreeNode(2, 'b')
  const n3 = createTreeNode(3, 'c')
  const n4 = createTreeNode(4, 'd')
  const n5 = createTreeNode(5, 'e')
  const n6 = createTreeNode(6, 'f')
  const n7 = createTreeNode(7, 'g')

  treeInsertChild(n2, n1)
  treeInsertChild(n3, n1)
  treeInsertChild(n4, n1)
  treeInsertChild(n5, n1)
  treeInsertChild(n6, n1)
  treeInsertChild(n7, n2)

  t.is(n1.size, 7)
  t.is(n2.size, 2)
  t.is(n3.size, 1)
  t.is(n4.size, 1)
})

test('Tree: treeDepth', t => {
  const n1 = createTreeNode(1, 'a')
  const n2 = createTreeNode(2, 'b')
  const n3 = createTreeNode(3, 'c')
  const n4 = createTreeNode(4, 'd')
  const n5 = createTreeNode(5, 'e')
  const n6 = createTreeNode(6, 'f')
  const n7 = createTreeNode(7, 'g')

  treeInsertChild(n2, n1)
  treeInsertChild(n3, n1)
  treeInsertChild(n4, n1)
  treeInsertChild(n5, n1)
  treeInsertChild(n6, n2)
  treeInsertChild(n7, n2)

  t.is(treeDepth(n1), 0)
  t.is(treeDepth(n2), 1)
  t.is(treeDepth(n3), 1)
  t.is(treeDepth(n4), 1)
  t.is(treeDepth(n5), 1)
  t.is(treeDepth(n6), 2)
  t.is(treeDepth(n7), 2)
})