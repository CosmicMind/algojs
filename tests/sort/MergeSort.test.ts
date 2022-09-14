// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

import test from 'ava'

import {
  stringCompare,
  stringKeyCompare,
  numericCompare,
  numericKeyCompare,
  mergeSort,
} from '../../src'

test('mergeSort: string', t => {
  const data = [ 'a', 'b', '1', 'cde', '77', 'efg' ]
  const expected = [ '1', '77', 'a', 'b', 'cde', 'efg' ]

  mergeSort(data, stringCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: string with duplicates', t => {
  const data = [ 'abc', '1', 'b', '1', 'cde', '77', 'efg', 'cde', 'xyz', '0' ]
  const expected = [ '0', '1', '1', '77', 'abc', 'b', 'cde', 'cde', 'efg', 'xyz' ]

  mergeSort(data, stringCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: string key', t => {
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

  mergeSort(data, stringKeyCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: string key with duplicates', t => {
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

  mergeSort(data, stringKeyCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: number', t => {
  const data = [ 5, 2, 4, 6, 1, 3 ]
  const expected = [ 1, 2, 3, 4, 5, 6 ]

  mergeSort(data, numericCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: number with duplicates', t => {
  const data = [ 5, 6, 2, 4, 6, 1, 3, 1, 5, 0 ]
  const expected = [ 0, 1, 1, 2, 3, 4, 5, 5, 6, 6 ]

  mergeSort(data, numericCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: number key', t => {
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

  mergeSort(data, numericKeyCompare)
  t.deepEqual(data, expected)
})

test('mergeSort: number key with duplicates', t => {
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

  mergeSort(data, numericKeyCompare)
  t.deepEqual(data, expected)
})
