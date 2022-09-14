// Copyright (C) 2022, CosmicMind, Inc. <http://cosmicmind.com>. All rights reserved.

/**
 * @module Sort
 */

import { CompareFn } from './compare'

export type LogarithmicSearch = <T>(data: T[], fn: CompareFn<T>) => void
