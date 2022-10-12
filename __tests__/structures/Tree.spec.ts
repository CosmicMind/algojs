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

describe('Tree', () => {
  it('treeCreate', () => {
    const node = treeCreate({})

    expect(guardFor(node, ...TreeKeys)).toBeTruthy()
    expect(node.parent).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.previous).toBe(sentinel)
    expect(node.children).toBe(sentinel)
    expect(node.size).toBe(1)
  })

  it('createTreeNode', () => {
    const node = createTreeNode(1, 'a')

    expect(guardFor(node, ...TreeKeys, 'key', 'value')).toBeTruthy()
    expect(node.parent).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.previous).toBe(sentinel)
    expect(node.children).toBe(sentinel)
    expect(node.size).toBe(1)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('new TreeTrace', () => {
    const node = new TreeTrace(1, 'a')

    expect(guardFor(node, ...TreeKeys, 'key', 'value')).toBeTruthy()
    expect(node.parent).toBe(sentinel)
    expect(node.next).toBe(sentinel)
    expect(node.previous).toBe(sentinel)
    expect(node.children).toBe(sentinel)
    expect(node.size).toBe(1)
    expect(node.key).toBe(1)
    expect(node.value).toBe('a')
  })

  it('treeInsertChild', () => {
    const n1 = createTreeNode(1, 'a')
    const n2 = createTreeNode(2, 'b')
    const n3 = createTreeNode(3, 'c')
    const n4 = createTreeNode(4, 'd')

    treeInsertChild(n2, n1)
    treeInsertChild(n3, n1)
    treeInsertChild(n4, n1)

    expect(treeIsFirstChild(n2, n1)).toBeFalsy()
    expect(treeIsFirstChild(n3, n1)).toBeFalsy()
    expect(treeIsFirstChild(n4, n1)).toBeTruthy()
    expect(treeIsLastChild(n2, n1)).toBeTruthy()
    expect(n1.size).toBe(4)
  })

  it('node.size', () => {
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

    expect(n1.size).toBe(7)
    expect(n2.size).toBe(2)
    expect(n3.size).toBe(1)
    expect(n4.size).toBe(1)
  })

  it('treeDepth', () => {
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

    expect(treeDepth(n1)).toBe(0)
    expect(treeDepth(n2)).toBe(1)
    expect(treeDepth(n3)).toBe(1)
    expect(treeDepth(n4)).toBe(1)
    expect(treeDepth(n5)).toBe(1)
    expect(treeDepth(n6)).toBe(2)
    expect(treeDepth(n7)).toBe(2)
  })
})