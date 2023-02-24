/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2022, Daniel Jonathan <daniel at cosmicmind dot com>
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

export type {
  Stackable,
  Stack,
} from '@/structures/Stack'

export type {
  Listable,
  List,
} from '@/structures/List'

export {
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
  listIsSibling,
  listHas,
  listQuery,
} from '@/structures/List'

export {
  stackableCreate,
  stackCreate,
  stackPeek,
  stackPush,
  stackPop,
  stackIterator,
  stackIterateFrom,
  stackIterateToParent,
  stackClear,
  stackDepth,
  stackIsTop,
  stackIsDescendant,
  stackHas,
  stackQuery,
} from '@/structures/Stack'

export type { Tree } from '@/structures/Tree'

export {
  treeCreate,
  treeInsertChild,
  treeAppendChild,
  treeDepth,
  treeIsRoot,
  treeIsLeaf,
  treeIsChild,
  treeIsFirstChild,
  treeIsLastChild,
  treeIsOnlyChild,
  treeIsDescendant,
  treeIncreaseSize,
  treeDecreaseSize,
  treeIterator,
  treeQuery,
} from '@/structures/Tree'
