import { guard as i, assert as C } from "@cosmicmind/foundationjs";
const d = (e, t) => e === t ? 0 : e > t ? 1 : -1, B = (e, t) => e === t ? 0 : e > t ? 1 : -1, H = (e, t) => e.key === t.key ? 0 : e.key > t.key ? 1 : -1, K = (e, t) => e.key === t.key ? 0 : e.key > t.key ? 1 : -1, s = void 0, M = (e, t) => {
  for (let n = 1, o = e.length; n < o; ++n) {
    const r = e[n];
    let f = n - 1;
    for (; 0 <= f && 0 < t(e[f], r); )
      e[f + 1] = e[f], --f;
    e[f + 1] = r;
  }
}, A = (e, t, n, o, r) => {
  const f = n - t + 1, l = o - n;
  let c, u, p;
  const v = [], x = [];
  for (c = 0; c < f; ++c)
    v[c] = e[t + c];
  for (u = 0; u < l; ++u)
    x[u] = e[n + u + 1];
  for (c = 0, u = 0, p = t; c < f && u < l; )
    1 > r(v[c], x[u]) ? (e[p] = v[c], ++c) : (e[p] = x[u], ++u), ++p;
  for (; c < f; )
    e[p] = v[c], ++c, ++p;
  for (; u < l; )
    e[p] = x[u], ++u, ++p;
}, y = (e, t, n, o) => {
  if (t < n) {
    const r = Math.floor(t + (n - t) / 2);
    y(e, t, r, o), y(e, r + 1, n, o), A(e, t, r, n, o);
  }
}, O = (e, t) => y(e, 0, e.length - 1, t), q = (e, t) => {
  let n = 0;
  for (let o = 0, r = e.length; o < r; ++o) {
    n = o;
    for (let l = o + 1; l < r; ++l)
      0 < t(e[n], e[l]) && (n = l);
    const f = e[n];
    e[n] = e[o], e[o] = f;
  }
}, k = (e, t) => e === t ? 0 : -1, E = (e) => ({
  ...e ?? {},
  parent: s
}), G = () => ({
  top: s,
  count: 0
});
function J(e) {
  return e.top;
}
function U(e, t) {
  t.parent = e.top, e.top = t, ++e.count;
}
function N(e) {
  const t = e.top;
  return i(t) && (e.top = t.parent, t.parent = s, --e.count), t;
}
function* w(e) {
  let t = e.top;
  for (; i(t); )
    yield t, t = t.parent;
}
function* g(e) {
  let t = e;
  for (; i(t); )
    yield t, t = t.parent;
}
function* V(e) {
  let t = e.parent;
  for (; i(t); )
    yield t, t = t.parent;
}
function W(e) {
  for (; i(e.top); )
    N(e);
}
function j(e) {
  let t = e.parent, n = 0;
  for (; i(t); )
    ++n, t = t.parent;
  return n;
}
function X(e, t, n = k) {
  return i(e.top) && n(e.top, t) === 0;
}
function Y(e, t, n = k) {
  for (const o of w(e))
    if (n(o, t) === 0)
      return !0;
  return !1;
}
function Z(e, ...t) {
  const n = /* @__PURE__ */ new Set();
  e:
    for (const o of w(e)) {
      for (const r of t)
        if (!r(o))
          continue e;
      n.add(o);
    }
  return n;
}
const h = (e, t) => e === t ? 0 : e > t ? 1 : -1, _ = (e) => ({
  ...e,
  next: s,
  previous: s
}), D = () => ({
  first: s,
  last: s,
  count: 0
});
function F(e, t) {
  i(e.first) ? (e.first.previous = t, t.next = e.first, t.previous = s) : (e.last = t, t.previous = s, t.next = s), e.first = t, ++e.count;
}
function m(e) {
  const t = e.first;
  if (i(t)) {
    const n = t.next;
    i(n) ? (e.first = n, n.previous = s) : (e.first = s, e.last = s), t.previous = s, t.next = s, --e.count;
  }
  return t;
}
function S(e, t) {
  i(e.last) ? (e.last.next = t, t.previous = e.last, t.next = s) : (e.first = t, t.previous = s, t.next = s), e.last = t, ++e.count;
}
function z(e) {
  const t = e.last;
  if (i(t)) {
    const n = t.previous;
    i(n) ? (e.last = n, n.next = s) : (e.first = s, e.last = s), t.previous = s, t.next = s, --e.count;
  }
  return t;
}
function $(e, t, n, o = h) {
  if (i(e.first) && o(e.first, n) === 0)
    F(e, t);
  else {
    const r = n.previous;
    i(r) && (r.next = t, t.previous = r, t.next = n, n.previous = t, ++e.count);
  }
}
function b(e, t, n = h) {
  const o = t.previous;
  if (i(e.first) && i(o) && n(e.first, o) === 0)
    m(e);
  else if (i(o)) {
    const r = o.previous;
    i(r) && (t.previous = r, r.next = t, o.previous = s, o.next = s, --e.count);
  }
  return o;
}
function ee(e, t, n, o = h) {
  if (i(e.last) && o(e.last, n) === 0)
    S(e, t);
  else {
    const r = n.next;
    i(r) && (r.previous = t, t.next = r, t.previous = n, n.next = t, ++e.count);
  }
}
function te(e, t, n = h) {
  const o = t.next;
  if (i(e.last) && i(o) && n(e.last, o) === 0)
    z(e);
  else if (i(o)) {
    const r = o.next;
    i(r) && (r.previous = t, t.next = r, o.previous = s, o.next = s, --e.count);
  }
  return o;
}
function ne(e, t, n = h) {
  if (i(e.first) && n(e.first, t) === 0)
    m(e);
  else if (i(e.last) && n(e.last, t) === 0)
    z(e);
  else {
    const o = t.previous, r = t.next;
    i(o) && i(r) && (o.next = r, r.previous = o, t.previous = s, t.next = s, --e.count);
  }
}
function* I(e) {
  let t = e.first;
  for (; i(t); )
    yield t, t = t.next;
}
function* oe(e) {
  let t = e.last;
  for (; i(t); )
    yield t, t = t.previous;
}
function* re(e) {
  let t = e;
  for (; i(t); )
    yield t, t = t.next;
}
function* ie(e) {
  let t = e;
  for (; i(t); )
    yield t, t = t.previous;
}
function se(e) {
  for (; i(e.first); )
    m(e);
}
function L(e, t, n = h) {
  return i(e.first) && n(e.first, t) === 0;
}
function R(e, t, n = h) {
  return i(e.last) && n(e.last, t) === 0;
}
function ce(e, t) {
  for (const n of I(e))
    if (n === t)
      return !0;
  return !1;
}
function ue(e, ...t) {
  const n = /* @__PURE__ */ new Set();
  e:
    for (const o of I(e)) {
      for (const r of t)
        if (!r(o))
          continue e;
      n.add(o);
    }
  return n;
}
const a = (e, t) => e === t ? 0 : e > t ? 1 : -1, fe = (e) => ({
  ...e ?? {},
  parent: s,
  next: s,
  previous: s,
  children: D(),
  size: 1
});
function le(e, t) {
  e.parent = t, F(t.children, e), P(t, e.size);
}
function pe(e, t) {
  e.parent = t, S(t.children, e), P(t, e.size);
}
const he = (e) => j(e);
function ve(e) {
  return s === e.parent;
}
function xe(e) {
  return e.children.count === 0;
}
function ae(e, t, n = a) {
  return i(e.parent) && n(e.parent, t) === 0;
}
function ye(e, t, n = a) {
  return L(t.children, e, n);
}
function me(e, t, n = a) {
  return R(t.children, e, n);
}
function Ie(e, t, n = a) {
  return L(t.children, e, n) && R(t.children, e, n);
}
function P(e, t) {
  C(0 < t, "size must be greater than 0");
  for (const n of g(e))
    n.size += t;
}
function Ce(e, t) {
  C(0 < t, "size must be greater than 0");
  for (const n of g(e))
    n.size -= t;
}
function* T(e) {
  yield e;
  for (const t of I(e.children))
    yield* T(t);
}
function ke(e, ...t) {
  const n = /* @__PURE__ */ new Set();
  e:
    for (const o of T(e)) {
      for (const r of t)
        if (!r(o))
          continue e;
      n.add(o);
    }
  return n;
}
export {
  h as ListCompareFn,
  s as SentinelNode,
  k as StackCompareFn,
  a as TreeCompareFn,
  M as insertionSort,
  S as listAppend,
  se as listClear,
  D as listCreate,
  ce as listHas,
  F as listInsert,
  ee as listInsertAfter,
  $ as listInsertBefore,
  L as listIsFirst,
  R as listIsLast,
  I as listIterateFromFirst,
  oe as listIterateFromLast,
  re as listIterateToNext,
  ie as listIterateToPrevious,
  _ as listNodeCreate,
  ue as listQuery,
  ne as listRemove,
  te as listRemoveAfter,
  b as listRemoveBefore,
  m as listRemoveFirst,
  z as listRemoveLast,
  O as mergeSort,
  B as numericCompare,
  K as numericKeyCompare,
  q as selectionSort,
  W as stackClear,
  G as stackCreate,
  j as stackDepth,
  Y as stackHas,
  X as stackIsTop,
  g as stackIterateFrom,
  V as stackIterateToParent,
  w as stackIterator,
  E as stackNodeCreate,
  J as stackPeek,
  N as stackPop,
  U as stackPush,
  Z as stackQuery,
  d as stringCompare,
  H as stringKeyCompare,
  pe as treeAppendChild,
  fe as treeCreate,
  Ce as treeDecreaseSize,
  he as treeDepth,
  P as treeIncreaseSize,
  le as treeInsertChild,
  ae as treeIsChild,
  ye as treeIsFirstChild,
  me as treeIsLastChild,
  xe as treeIsLeaf,
  Ie as treeIsOnlyChild,
  ve as treeIsRoot,
  T as treeIterator,
  ke as treeQuery
};
