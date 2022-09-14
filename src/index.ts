// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

export type {
  // Compare
  CompareFn,

  // Sort
  LinearSort,

  // Stack
  Stackable,
  Stack,

  // List
  Listable,
  List,

  // Tree
  Tree,
  TreeChildren,

  // Deque
  Deque,
  Dequeable,
} from './internal'

export {
  // Compare
  stringCompare,
  numericCompare,
  stringKeyCompare,
  numericKeyCompare,

  // Sorting
  insertionSort,
  mergeSort,
  selectionSort,

  // Deque
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

  // List
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

  // Stack
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

  // Tree
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
} from './internal'
