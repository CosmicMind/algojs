/* Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved. */

export type { CompareFn } from './utils/compare'
export {
  stringCompare,
  numericCompare,
  stringKeyCompare,
  numericKeyCompare,
} from './utils/compare'

export type { LinearSort } from './utils/sort'

export { insertionSort } from './sort/InsertionSort'
export { mergeSort } from './sort/MergeSort'
export { selectionSort } from './sort/SelectionSort'

export type {
  Stackable,
  Stack,
} from './structures/Stack'

export type {
  Dequeable,
  Deque,
} from './structures/Deque'

export {
  DequeableKeys,
  DequeKeys,
  dequeableCreate,
  dequeCreate,
  dequeInsert,
  dequeRemoveFirst,
  dequeAppend,
  dequeRemoveLast,
  dequeInsertBefore,
  dequeRemoveBefore,
  dequeInsertAfter,
  dequeRemoveAfter,
  dequeRemove,
  dequeIterateFromFirst,
  dequeIterateFromLast,
  dequeIterateToNext,
  dequeIterateToPrevious,
  dequeClear,
  dequeIsFirst,
  dequeIsLast,
  dequeIsNext,
  dequeIsPrevious,
  dequeIsSibling,
  dequeHas,
} from './structures/Deque'

export type {
  Listable,
  List,
} from './structures/List'

export {
  ListableKeys,
  ListKeys,
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
} from './structures/List'

export {
  StackableKeys,
  StackKeys,
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
} from './structures/Stack'

export type {
  Tree,
  TreeChildren,
} from './structures/Tree'

export {
  TreeKeys,
  treeCreate,
  treeInsertChild,
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
} from './structures/Tree'
