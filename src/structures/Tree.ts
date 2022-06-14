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
 * SERVICES LOSS OF USE, DATA, OR PROFITS OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module Tree
 */

import {
  assert,
  Optional,
  guardFor,
} from '@cosmicverse/foundation'

import {
  ListableKeys,
  ListKeys,
  Listable,
  List,
  listCreate,
  listIsFirst,
  listIsLast,
  listInsert,
} from './List'

import {
  StackableKeys,
  Stackable,
  stackIterateFrom,
  stackIsDescendant,
} from './Stack'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `Tree`.
 */
const sentinel = void 0

export const TreeKeys = [ ...StackableKeys, ...ListableKeys, 'children', 'size' ] as const

export type TreeChildren<T extends Listable> = List<T>

export interface Tree extends Listable, Stackable {
  parent: Optional<Tree>
  next: Optional<Tree>
  previous: Optional<Tree>
  children: Optional<TreeChildren<Tree>>
  size: number
}

export function treeCreate<T extends Tree>(props: Omit<T, keyof Tree>): Readonly<T> {
  return Object.assign(props, {
    parent: sentinel,
    next: sentinel,
    previous: sentinel,
    children: sentinel,
    size: 1,
  }) as T
}

/**
 * @performance O(1)
 */
export function treeInsertChild<T extends Tree>(insert: T, node: T): void {
  if (!guardFor(node.children, ...ListKeys)) {
    node.children = listCreate<T>()
  }
  insert.parent = node
  listInsert(node.children, insert)
  treeIncreaseSize(node, insert.size)
}

// /**
//  * @performance O(1)
//  */
// export function treeInsertChild<T extends Tree>(insert: T, node: T): void {
//   if (!guardFor(node.children, ...ListKeys)) {
//     node.children = listCreate<T>()
//   }
//   insert.parent = node
//   listInsert(node.children, insert)
//   treeIncreaseSize(node, insert.size)
// }

/**
 * @performance O(1)
 */
export function treeIsRoot<T extends Tree>(tree: T): boolean {
  return guardFor(tree, ...TreeKeys) && sentinel === tree.parent
}

/**
 * @performance O(1)
 */
export function treeIsLeaf<T extends Tree>(tree: T): boolean {
  return guardFor(tree, ...TreeKeys) && sentinel === tree.children
}

/**
 * @performance O(1)
 */
export function treeIsChild<T extends Tree>(child: T, parent: T): boolean {
  return child.parent === parent && child.parent !== sentinel
}

/**
 * @performance O(1)
 */
export function treeIsFirstChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor(parent.children, ...ListKeys) &&
         listIsFirst(parent.children, child)
}

/**
 * @performance O(1)
 */
export function treeIsLastChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor(parent.children, ...ListKeys) &&
         listIsLast(parent.children, child)
}

/**
 * @performance O(1)
 */
export function treeIsOnlyChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor(parent.children, ...ListKeys) &&
         listIsFirst(parent.children, child) &&
         listIsLast(parent.children, child)
}

/**
 * @performance O(n)
 */
export function treeIsDescendant<T extends Tree>(descendant: T, tree: T): boolean {
  return stackIsDescendant(descendant, tree)
}

/**
 * @performance O(n)
 */
function treeIncreaseSize<T extends Tree>(node: T, size: number): void {
  assert(0 < size, 'size must be greater than 0')
  for (const n of stackIterateFrom(node)) {
    n.size += size
  }
}

/**
 * @performance O(n)
 */
function treeDecreaseSize<T extends Tree>(node: T, size: number): void {
  assert(0 < size, 'size must be greater than 0')
  for (const n of stackIterateFrom(node)) {
    n.size -= size
  }
}