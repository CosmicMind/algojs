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
  Tree,
  TreeChildren,
  treeCreate,
} from '../../src'

const sentinel = void 0

interface TreeNode extends Tree {
  key: number
  value: string
}

const createTreeNode = (key: number, value: string): ReturnType<typeof treeCreate<TreeNode>> =>
  treeCreate<TreeNode>({
    key,
    value,
  })

class TreeTrace implements Tree {
  readonly parent: Optional<Tree>
  readonly previous: Optional<Tree>
  readonly next: Optional<Tree>
  readonly children: Optional<TreeChildren<Tree>>
  readonly size: number
  readonly key: number
  readonly value: string
  constructor(key: number, value: string) {
    this.parent = sentinel
    this.previous = sentinel
    this.next = sentinel
    this.children = sentinel
    this.size = 0
    this.key = key
    this.value = value
  }
}

test('Tree: treeCreate', t => {
  const node = treeCreate({})

  t.true(guardFor<Tree>(node, 'parent'))
  t.true(guardFor<Tree>(node, 'previous'))
  t.true(guardFor<Tree>(node, 'next'))
  t.true(guardFor<Tree>(node, 'children'))
  t.true(guardFor<Tree>(node, 'size'))
  t.is(node.parent, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 0)
})

test('Tree: createTreeNode', t => {
  const node = createTreeNode(1, 'a')

  t.true(guardFor<TreeNode>(node, 'parent'))
  t.true(guardFor<TreeNode>(node, 'previous'))
  t.true(guardFor<TreeNode>(node, 'next'))
  t.true(guardFor<TreeNode>(node, 'children'))
  t.true(guardFor<TreeNode>(node, 'size'))
  t.true(guardFor<TreeNode>(node, 'key'))
  t.true(guardFor<TreeNode>(node, 'value'))
  t.is(node.parent, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 0)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})

test('Tree: new TreeTrace', t => {
  const node = new TreeTrace(1, 'a')

  t.true(node instanceof TreeTrace)
  t.true(guardFor<TreeTrace>(node, 'parent'))
  t.true(guardFor<TreeTrace>(node, 'previous'))
  t.true(guardFor<TreeTrace>(node, 'next'))
  t.true(guardFor<TreeTrace>(node, 'children'))
  t.true(guardFor<TreeTrace>(node, 'size'))
  t.true(guardFor<TreeTrace>(node, 'key'))
  t.true(guardFor<TreeTrace>(node, 'value'))
  t.is(node.parent, sentinel)
  t.is(node.previous, sentinel)
  t.is(node.next, sentinel)
  t.is(node.children, sentinel)
  t.is(node.size, 0)
  t.is(node.key, 1)
  t.is(node.value, 'a')
})
