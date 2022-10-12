/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

import {
  it,
  expect,
  describe,
} from 'vitest'

import {
  stringCompare,
  stringKeyCompare,
  numericCompare,
  numericKeyCompare,
  selectionSort,
} from '../../src'

describe('SelectionSort', () => {
  it('string', () => {
    const data = [ 'a', 'b', '1', 'cde', '77', 'efg' ]
    const expected = [ '1', '77', 'a', 'b', 'cde', 'efg' ]

    selectionSort(data, stringCompare)
    expect(data).toStrictEqual(expected)
  })

  it('string with duplicates', () => {
    const data = [ 'abc', '1', 'b', '1', 'cde', '77', 'efg', 'cde', 'xyz', '0' ]
    const expected = [ '0', '1', '1', '77', 'abc', 'b', 'cde', 'cde', 'efg', 'xyz' ]

    selectionSort(data, stringCompare)
    expect(data).toStrictEqual(expected)
  })

  it('string key', () => {
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

    selectionSort(data, stringKeyCompare)
    expect(data).toStrictEqual(expected)
  })

  it('string key with duplicates', () => {
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

    selectionSort(data, stringKeyCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number', () => {
    const data = [ 5, 2, 4, 6, 1, 3 ]
    const expected = [ 1, 2, 3, 4, 5, 6 ]

    selectionSort(data, numericCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number with duplicates', () => {
    const data = [ 5, 6, 2, 4, 6, 1, 3, 1, 5, 0 ]
    const expected = [ 0, 1, 1, 2, 3, 4, 5, 5, 6, 6 ]

    selectionSort(data, numericCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number key', () => {
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

    selectionSort(data, numericKeyCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number key with duplicates', () => {
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

    selectionSort(data, numericKeyCompare)
    expect(data).toStrictEqual(expected)
  })
})
