/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import test from 'ava'

import {
  stringCompare,
  stringKeyCompare,
  numericCompare,
  numericKeyCompare,
  insertionSort,
  Tree,
  treeCreate,
} from '../../src'

type TreeNode = Tree & {
  key: number
  value: string
}

const createTreeNode = (key: number, value: string): TreeNode =>
  treeCreate<TreeNode>({
    key,
    value,
  })

test('InsertionSort: string', t => {
  const data = [ 'a', 'b', '1', 'cde', '77', 'efg' ]
  const expected = [ '1', '77', 'a', 'b', 'cde', 'efg' ]

  insertionSort(data, stringCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: string with duplicates', t => {
  const data = [ 'abc', '1', 'b', '1', 'cde', '77', 'efg', 'cde', 'xyz', '0' ]
  const expected = [ '0', '1', '1', '77', 'abc', 'b', 'cde', 'cde', 'efg', 'xyz' ]

  insertionSort(data, stringCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: string key', t => {
  const data = [
    { key: 'a' },
    { key: 'b' },
    { key: '1' },
    { key: 'cde' },
    { key: '77' },
    { key: 'efg' }
  ]

  const expected = [
    { key: '1' },
    { key: '77' },
    { key: 'a' },
    { key: 'b' },
    { key: 'cde' },
    { key: 'efg' }
  ]

  insertionSort(data, stringKeyCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: string key with duplicates', t => {
  const data = [
    { key: 'abc' },
    { key: '1' },
    { key: 'b' },
    { key: '1' },
    { key: 'cde' },
    { key: '77' },
    { key: 'efg' },
    { key: 'cde' },
    { key: 'xyz' },
    { key: '0' }
  ]

  const expected = [
    { key: '0' },
    { key: '1' },
    { key: '1' },
    { key: '77' },
    { key: 'abc' },
    { key: 'b' },
    { key: 'cde' },
    { key: 'cde' },
    { key: 'efg' },
    { key: 'xyz' }
  ]

  insertionSort(data, stringKeyCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: number', t => {
  const data = [ 5, 2, 4, 6, 1, 3 ]
  const expected = [ 1, 2, 3, 4, 5, 6 ]

  insertionSort(data, numericCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: number with duplicates', t => {
  const data = [ 5, 6, 2, 4, 6, 1, 3, 1, 5, 0 ]
  const expected = [ 0, 1, 1, 2, 3, 4, 5, 5, 6, 6 ]

  insertionSort(data, numericCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: number key', t => {
  const data = [
    { key: 5 },
    { key: 2 },
    { key: 4 },
    { key: 6 },
    { key: 1 },
    { key: 3 }
  ]

  const expected = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 6 }
  ]

  insertionSort(data, numericKeyCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: number key with duplicates', t => {
  const data = [
    { key: 5 },
    { key: 6 },
    { key: 2 },
    { key: 4 },
    { key: 6 },
    { key: 1 },
    { key: 3 },
    { key: 1 },
    { key: 5 },
    { key: 0 }
  ]

  const expected = [
    { key: 0 },
    { key: 1 },
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
    { key: 5 },
    { key: 6 },
    { key: 6 }
  ]

  insertionSort(data, numericKeyCompare)
  t.deepEqual(data, expected)
})

test('InsertionSort: tree sorting', t => {
  const n1 = createTreeNode(1, 'a')
  const n2 = createTreeNode(2, 'b')
  const n3 = createTreeNode(3, 'c')
  const n4 = createTreeNode(4, 'd')

  const data = [
    n1,
    n3,
    n4,
    n2
  ]

  const expected = [
    n1,
    n2,
    n3,
    n4
  ]

  insertionSort(data, numericKeyCompare)
  t.deepEqual(data, expected)
})
