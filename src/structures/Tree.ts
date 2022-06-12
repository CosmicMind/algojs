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

/**
 * @module Tree
 */

import {
  Optional,
  guardFor,
} from '@cosmicverse/foundation'

import {
  Listable,
  List,
  listableCreate,
  listCreate,
  listInsert,
  listRemoveFirst,
  listAppend,
  listRemoveLast,
  listInsertBefore,
  listRemoveBefore,
  listInsertAfter,
  listRemoveAfter,
  listRemove,
  listIterateFromFirst,
  listIterateFromLast,
  listIterateToNext,
  listIterateToPrevious,
  listClear,
  listIsFirst,
  listIsLast,
  listIsNext,
  listIsPrevious,
  listHas,
} from './List'

import {
  Stackable,
  Stack,
  stackableCreate,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackIterator,
  stackClear,
  stackIsTop,
  stackIsDescendant,
  stackHas,
} from './Stack'

/**
 * The `sentinel` value is used to determine
 * leaf nodes within the `Tree`.
 */
const sentinel = void 0

export type TreeChildren<T extends Listable> = List<T>

export interface Tree extends Listable, Stackable {
  parent: Optional<Tree>
  previous: Optional<Tree>
  next: Optional<Tree>
  children: Optional<TreeChildren<Tree>>
  size: number
}

/**
 * @template T
 *
 *
 * @param {Omit<T, keyof Tree>} props
 * @returns {Readonly<T>}
 */
export function treeCreate<T extends Tree>(props: Omit<T, keyof Tree>): Readonly<T> {
  return Object.assign(props, {
    parent: sentinel,
    previous: sentinel,
    next: sentinel,
    children: sentinel,
    size: 0,
  }) as T
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsRoot<T extends Tree>(tree: T): boolean {
  return guardFor<T>(tree, 'parent') && sentinel === tree.parent
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsLeaf<T extends Tree>(tree: T): boolean {
  return guardFor<T>(tree, 'children') && sentinel === tree.children
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor<T>(child, 'parent') &&
         guardFor<T>(parent, 'children') &&
         guardFor<TreeChildren<T>>(parent.children, 'first') &&
         listHas(parent.children, child)
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsOnlyChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor<T>(child, 'parent') &&
         guardFor<T>(parent, 'children') &&
         guardFor<TreeChildren<T>>(parent.children as TreeChildren<T>, 'first', 'last') &&
         listIsFirst(parent.children as TreeChildren<T>, child) &&
         listIsLast(parent.children as TreeChildren<T>, child)
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsFirstChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor<T>(child, 'parent') &&
         guardFor<T>(parent, 'children') &&
         guardFor<TreeChildren<T>>(parent.children as TreeChildren<T>, 'first') &&
         listIsFirst(parent.children as TreeChildren<T>, child)
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsLastChild<T extends Tree>(child: T, parent: T): boolean {
  return guardFor<T>(child, 'parent') &&
         guardFor<T>(parent, 'children') &&
         guardFor<TreeChildren<T>>(parent.children as TreeChildren<T>, 'last') &&
         listIsLast(parent.children as TreeChildren<T>, child)
}

/**
 * @template T
 *
 * @param {T} tree
 * @returns {boolean}
 */
export function treeIsDescendantOfParent<T extends Tree>(descendant: T, tree: T): boolean {
  return stackIsDescendant(descendant, tree)
}
