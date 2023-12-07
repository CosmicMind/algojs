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
  stringCompare,
  stringKeyCompare,
  numericCompare,
  numericKeyCompare,
  mergeSort,
} from '@/index'

describe('MergeSort', () => {
  it('string', () => {
    const data = [ 'a', 'b', '1', 'cde', '77', 'efg' ]
    const expected = [ '1', '77', 'a', 'b', 'cde', 'efg' ]

    mergeSort(data, stringCompare)
    expect(data).toStrictEqual(expected)
  })

  it('string with duplicates', () => {
    const data = [ 'abc', '1', 'b', '1', 'cde', '77', 'efg', 'cde', 'xyz', '0' ]
    const expected = [ '0', '1', '1', '77', 'abc', 'b', 'cde', 'cde', 'efg', 'xyz' ]

    mergeSort(data, stringCompare)
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

    mergeSort(data, stringKeyCompare)
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

    mergeSort(data, stringKeyCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number', () => {
    const data = [ 5, 2, 4, 6, 1, 3 ]
    const expected = [ 1, 2, 3, 4, 5, 6 ]

    mergeSort(data, numericCompare)
    expect(data).toStrictEqual(expected)
  })

  it('number with duplicates', () => {
    const data = [ 5, 6, 2, 4, 6, 1, 3, 1, 5, 0 ]
    const expected = [ 0, 1, 1, 2, 3, 4, 5, 5, 6, 6 ]

    mergeSort(data, numericCompare)
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

    mergeSort(data, numericKeyCompare)
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

    mergeSort(data, numericKeyCompare)
    expect(data).toStrictEqual(expected)
  })
})
