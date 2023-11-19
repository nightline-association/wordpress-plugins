function Tn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const H = {}, ke = [], ue = () => {
}, Ir = () => !1, Rr = /^on[^a-z]/, $t = (e) => Rr.test(e), In = (e) => e.startsWith("onUpdate:"), Q = Object.assign, Rn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Pr = Object.prototype.hasOwnProperty, F = (e, t) => Pr.call(e, t), T = Array.isArray, Xe = (e) => zt(e) === "[object Map]", Ms = (e) => zt(e) === "[object Set]", R = (e) => typeof e == "function", W = (e) => typeof e == "string", Wt = (e) => typeof e == "symbol", j = (e) => e !== null && typeof e == "object", Ns = (e) => (j(e) || R(e)) && R(e.then) && R(e.catch), Fs = Object.prototype.toString, zt = (e) => Fs.call(e), Ar = (e) => zt(e).slice(8, -1), Ss = (e) => zt(e) === "[object Object]", Pn = (e) => W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Mt = /* @__PURE__ */ Tn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Mr = /-(\w)/g, Ge = Vt((e) => e.replace(Mr, (t, n) => n ? n.toUpperCase() : "")), Nr = /\B([A-Z])/g, nt = Vt(
  (e) => e.replace(Nr, "-$1").toLowerCase()
), Us = Vt((e) => e.charAt(0).toUpperCase() + e.slice(1)), on = Vt((e) => e ? `on${Us(e)}` : ""), Ke = (e, t) => !Object.is(e, t), Nt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Lt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, hn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Zn;
const pn = () => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function An(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = W(s) ? Dr(s) : An(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (W(e) || j(e))
    return e;
}
const Fr = /;(?![^(]*\))/g, Sr = /:([^]+)/, Ur = /\/\*[^]*?\*\//g;
function Dr(e) {
  const t = {};
  return e.replace(Ur, "").split(Fr).forEach((n) => {
    if (n) {
      const s = n.split(Sr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Mn(e) {
  let t = "";
  if (W(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const s = Mn(e[n]);
      s && (t += s + " ");
    }
  else if (j(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Lr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Hr = /* @__PURE__ */ Tn(Lr);
function Ds(e) {
  return !!e || e === "";
}
const Ot = (e) => W(e) ? e : e == null ? "" : T(e) || j(e) && (e.toString === Fs || !R(e.toString)) ? JSON.stringify(e, Ls, 2) : String(e), Ls = (e, t) => t && t.__v_isRef ? Ls(e, t.value) : Xe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Ms(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : j(t) && !T(t) && !Ss(t) ? String(t) : t;
let ie;
class jr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ie, !t && ie && (this.index = (ie.scopes || (ie.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ie;
      try {
        return ie = this, t();
      } finally {
        ie = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ie = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ie = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Br(e, t = ie) {
  t && t.active && t.effects.push(e);
}
function Kr() {
  return ie;
}
const Nn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Hs = (e) => (e.w & Pe) > 0, js = (e) => (e.n & Pe) > 0, $r = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Pe;
}, Wr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Hs(r) && !js(r) ? r.delete(e) : t[n++] = r, r.w &= ~Pe, r.n &= ~Pe;
    }
    t.length = n;
  }
}, gn = /* @__PURE__ */ new WeakMap();
let ft = 0, Pe = 1;
const mn = 30;
let le;
const je = Symbol(""), _n = Symbol("");
class Fn {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Br(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = le, n = Ie;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = le, le = this, Ie = !0, Pe = 1 << ++ft, ft <= mn ? $r(this) : Qn(this), this.fn();
    } finally {
      ft <= mn && Wr(this), Pe = 1 << --ft, le = this.parent, Ie = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    le === this ? this.deferStop = !0 : this.active && (Qn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Qn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ie = !0;
const Bs = [];
function st() {
  Bs.push(Ie), Ie = !1;
}
function rt() {
  const e = Bs.pop();
  Ie = e === void 0 ? !0 : e;
}
function ne(e, t, n) {
  if (Ie && le) {
    let s = gn.get(e);
    s || gn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Nn()), Ks(r);
  }
}
function Ks(e, t) {
  let n = !1;
  ft <= mn ? js(e) || (e.n |= Pe, n = !Hs(e)) : n = !e.has(le), n && (e.add(le), le.deps.push(e));
}
function ye(e, t, n, s, r, i) {
  const o = gn.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && T(e)) {
    const u = Number(s);
    o.forEach((a, m) => {
      (m === "length" || !Wt(m) && m >= u) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        T(e) ? Pn(n) && c.push(o.get("length")) : (c.push(o.get(je)), Xe(e) && c.push(o.get(_n)));
        break;
      case "delete":
        T(e) || (c.push(o.get(je)), Xe(e) && c.push(o.get(_n)));
        break;
      case "set":
        Xe(e) && c.push(o.get(je));
        break;
    }
  if (c.length === 1)
    c[0] && bn(c[0]);
  else {
    const u = [];
    for (const a of c)
      a && u.push(...a);
    bn(Nn(u));
  }
}
function bn(e, t) {
  const n = T(e) ? e : [...e];
  for (const s of n)
    s.computed && Gn(s);
  for (const s of n)
    s.computed || Gn(s);
}
function Gn(e, t) {
  (e !== le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const zr = /* @__PURE__ */ Tn("__proto__,__v_isRef,__isVue"), $s = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Wt)
), es = /* @__PURE__ */ Vr();
function Vr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = S(this);
      for (let i = 0, o = this.length; i < o; i++)
        ne(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(S)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      st();
      const s = S(this)[t].apply(this, n);
      return rt(), s;
    };
  }), e;
}
function qr(e) {
  const t = S(this);
  return ne(t, "has", e), t.hasOwnProperty(e);
}
class Ws {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._shallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, i = this._shallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw" && s === (r ? i ? ii : Ys : i ? qs : Vs).get(t))
      return t;
    const o = T(t);
    if (!r) {
      if (o && F(es, n))
        return Reflect.get(es, n, s);
      if (n === "hasOwnProperty")
        return qr;
    }
    const c = Reflect.get(t, n, s);
    return (Wt(n) ? $s.has(n) : zr(n)) || (r || ne(t, "get", n), i) ? c : Z(c) ? o && Pn(n) ? c : c.value : j(c) ? r ? Js(c) : Dn(c) : c;
  }
}
class zs extends Ws {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    if (et(i) && Z(i) && !Z(s))
      return !1;
    if (!this._shallow && (!Ht(s) && !et(s) && (i = S(i), s = S(s)), !T(t) && Z(i) && !Z(s)))
      return i.value = s, !0;
    const o = T(t) && Pn(n) ? Number(n) < t.length : F(t, n), c = Reflect.set(t, n, s, r);
    return t === S(r) && (o ? Ke(s, i) && ye(t, "set", n, s) : ye(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = F(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && ye(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Wt(n) || !$s.has(n)) && ne(t, "has", n), s;
  }
  ownKeys(t) {
    return ne(
      t,
      "iterate",
      T(t) ? "length" : je
    ), Reflect.ownKeys(t);
  }
}
class Yr extends Ws {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Jr = /* @__PURE__ */ new zs(), kr = /* @__PURE__ */ new Yr(), Xr = /* @__PURE__ */ new zs(
  !0
), Sn = (e) => e, qt = (e) => Reflect.getPrototypeOf(e);
function Ct(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = S(e), i = S(t);
  n || (Ke(t, i) && ne(r, "get", t), ne(r, "get", i));
  const { has: o } = qt(r), c = s ? Sn : n ? Hn : pt;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function Tt(e, t = !1) {
  const n = this.__v_raw, s = S(n), r = S(e);
  return t || (Ke(e, r) && ne(s, "has", e), ne(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function It(e, t = !1) {
  return e = e.__v_raw, !t && ne(S(e), "iterate", je), Reflect.get(e, "size", e);
}
function ts(e) {
  e = S(e);
  const t = S(this);
  return qt(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this;
}
function ns(e, t) {
  t = S(t);
  const n = S(this), { has: s, get: r } = qt(n);
  let i = s.call(n, e);
  i || (e = S(e), i = s.call(n, e));
  const o = r.call(n, e);
  return n.set(e, t), i ? Ke(t, o) && ye(n, "set", e, t) : ye(n, "add", e, t), this;
}
function ss(e) {
  const t = S(this), { has: n, get: s } = qt(t);
  let r = n.call(t, e);
  r || (e = S(e), r = n.call(t, e)), s && s.call(t, e);
  const i = t.delete(e);
  return r && ye(t, "delete", e, void 0), i;
}
function rs() {
  const e = S(this), t = e.size !== 0, n = e.clear();
  return t && ye(e, "clear", void 0, void 0), n;
}
function Rt(e, t) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = S(o), u = t ? Sn : e ? Hn : pt;
    return !e && ne(c, "iterate", je), o.forEach((a, m) => s.call(r, u(a), u(m), i));
  };
}
function Pt(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = S(r), o = Xe(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, a = r[e](...s), m = n ? Sn : t ? Hn : pt;
    return !t && ne(
      i,
      "iterate",
      u ? _n : je
    ), {
      // iterator protocol
      next() {
        const { value: E, done: v } = a.next();
        return v ? { value: E, done: v } : {
          value: c ? [m(E[0]), m(E[1])] : m(E),
          done: v
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Oe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zr() {
  const e = {
    get(i) {
      return Ct(this, i);
    },
    get size() {
      return It(this);
    },
    has: Tt,
    add: ts,
    set: ns,
    delete: ss,
    clear: rs,
    forEach: Rt(!1, !1)
  }, t = {
    get(i) {
      return Ct(this, i, !1, !0);
    },
    get size() {
      return It(this);
    },
    has: Tt,
    add: ts,
    set: ns,
    delete: ss,
    clear: rs,
    forEach: Rt(!1, !0)
  }, n = {
    get(i) {
      return Ct(this, i, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: Rt(!0, !1)
  }, s = {
    get(i) {
      return Ct(this, i, !0, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: Oe("add"),
    set: Oe("set"),
    delete: Oe("delete"),
    clear: Oe("clear"),
    forEach: Rt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = Pt(
      i,
      !1,
      !1
    ), n[i] = Pt(
      i,
      !0,
      !1
    ), t[i] = Pt(
      i,
      !1,
      !0
    ), s[i] = Pt(
      i,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  Qr,
  Gr,
  ei,
  ti
] = /* @__PURE__ */ Zr();
function Un(e, t) {
  const n = t ? e ? ti : ei : e ? Gr : Qr;
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    F(n, r) && r in s ? n : s,
    r,
    i
  );
}
const ni = {
  get: /* @__PURE__ */ Un(!1, !1)
}, si = {
  get: /* @__PURE__ */ Un(!1, !0)
}, ri = {
  get: /* @__PURE__ */ Un(!0, !1)
}, Vs = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), ii = /* @__PURE__ */ new WeakMap();
function oi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function li(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Ar(e));
}
function Dn(e) {
  return et(e) ? e : Ln(
    e,
    !1,
    Jr,
    ni,
    Vs
  );
}
function ci(e) {
  return Ln(
    e,
    !1,
    Xr,
    si,
    qs
  );
}
function Js(e) {
  return Ln(
    e,
    !0,
    kr,
    ri,
    Ys
  );
}
function Ln(e, t, n, s, r) {
  if (!j(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const o = li(e);
  if (o === 0)
    return e;
  const c = new Proxy(
    e,
    o === 2 ? s : n
  );
  return r.set(e, c), c;
}
function Ze(e) {
  return et(e) ? Ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
function et(e) {
  return !!(e && e.__v_isReadonly);
}
function Ht(e) {
  return !!(e && e.__v_isShallow);
}
function ks(e) {
  return Ze(e) || et(e);
}
function S(e) {
  const t = e && e.__v_raw;
  return t ? S(t) : e;
}
function Xs(e) {
  return Lt(e, "__v_skip", !0), e;
}
const pt = (e) => j(e) ? Dn(e) : e, Hn = (e) => j(e) ? Js(e) : e;
function Zs(e) {
  Ie && le && (e = S(e), Ks(e.dep || (e.dep = Nn())));
}
function Qs(e, t) {
  e = S(e);
  const n = e.dep;
  n && bn(n);
}
function Z(e) {
  return !!(e && e.__v_isRef === !0);
}
function is(e) {
  return fi(e, !1);
}
function fi(e, t) {
  return Z(e) ? e : new ui(e, t);
}
class ui {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : S(t), this._value = n ? t : pt(t);
  }
  get value() {
    return Zs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Ht(t) || et(t);
    t = n ? t : S(t), Ke(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : pt(t), Qs(this));
  }
}
function ai(e) {
  return Z(e) ? e.value : e;
}
const di = {
  get: (e, t, n) => ai(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return Z(r) && !Z(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Gs(e) {
  return Ze(e) ? e : new Proxy(e, di);
}
class hi {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Fn(t, () => {
      this._dirty || (this._dirty = !0, Qs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = S(this);
    return Zs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function pi(e, t, n = !1) {
  let s, r;
  const i = R(e);
  return i ? (s = e, r = ue) : (s = e.get, r = e.set), new hi(s, r, i || !r, n);
}
var $e = { MANPATH: "/opt/homebrew/share/man::", TERM_PROGRAM: "iTerm.app", NODE: "/opt/homebrew/Cellar/node/21.2.0/bin/node", INIT_CWD: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", TERM: "xterm-256color", SHELL: "/bin/zsh", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/z9/8822xnfn24n5hcphxthnkk8w0000gn/T/", npm_config_global_prefix: "/opt/homebrew", TERM_PROGRAM_VERSION: "3.4.22", COLOR: "1", TERM_SESSION_ID: "w0t0p0:8ADEBFCE-ED15-4E66-89C1-ED423C881A35", npm_config_noproxy: "", npm_config_local_prefix: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", ZSH: "/Users/oliver/.oh-my-zsh", USER: "oliver", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/opt/homebrew/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.Dvs3I9qSni/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x2", npm_execpath: "/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js", HERD_PHP_82_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/82/", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/node_modules/.bin:/Users/oliver/Projects/nightline/wordpress-plugins/node_modules/.bin:/Users/oliver/Projects/nightline/node_modules/.bin:/Users/oliver/Projects/node_modules/.bin:/Users/oliver/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/oliver/Library/Application Support/Herd/bin/:/Users/oliver/Library/Application Support/Herd/bin/:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/oliver/Library/Application Support/JetBrains/Toolbox/scripts", npm_package_json: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/package.json", _: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/node_modules/.bin/vite", npm_config_userconfig: "/Users/oliver/.npmrc", npm_config_init_module: "/Users/oliver/.npm-init.js", __CFBundleIdentifier: "com.googlecode.iterm2", npm_command: "run-script", PWD: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "find-my-nightline", LANG: "en_GB.UTF-8", ITERM_PROFILE: "Default", npm_config_npm_version: "10.2.4", XPC_FLAGS: "0x0", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.0.0", XPC_SERVICE_NAME: "0", SHLVL: "2", HOME: "/Users/oliver", COLORFGBG: "15;0", LC_TERMINAL_VERSION: "3.4.22", HOMEBREW_PREFIX: "/opt/homebrew", ITERM_SESSION_ID: "w0t0p0:8ADEBFCE-ED15-4E66-89C1-ED423C881A35", npm_config_cache: "/Users/oliver/.npm", LESS: "-R", LOGNAME: "oliver", npm_lifecycle_script: "vite build", npm_config_user_agent: "npm/10.2.4 node/v21.2.0 darwin arm64 workspaces/false", INFOPATH: "/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", LC_TERMINAL: "iTerm2", npm_node_execpath: "/opt/homebrew/Cellar/node/21.2.0/bin/node", npm_config_prefix: "/opt/homebrew", COLORTERM: "truecolor", NODE_ENV: "production" };
function Re(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    Yt(i, t, n);
  }
  return r;
}
function ae(e, t, n, s) {
  if (R(e)) {
    const i = Re(e, t, n, s);
    return i && Ns(i) && i.catch((o) => {
      Yt(o, t, n);
    }), i;
  }
  const r = [];
  for (let i = 0; i < e.length; i++)
    r.push(ae(e[i], t, n, s));
  return r;
}
function Yt(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy, c = n;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let m = 0; m < a.length; m++)
          if (a[m](e, o, c) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Re(
        u,
        null,
        10,
        [e, o, c]
      );
      return;
    }
  }
  gi(e, n, r, s);
}
function gi(e, t, n, s = !0) {
  console.error(e);
}
let gt = !1, xn = !1;
const X = [];
let me = 0;
const Qe = [];
let xe = null, De = 0;
const er = /* @__PURE__ */ Promise.resolve();
let jn = null;
function mi(e) {
  const t = jn || er;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _i(e) {
  let t = me + 1, n = X.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = X[s], i = mt(r);
    i < e || i === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function Bn(e) {
  (!X.length || !X.includes(
    e,
    gt && e.allowRecurse ? me + 1 : me
  )) && (e.id == null ? X.push(e) : X.splice(_i(e.id), 0, e), tr());
}
function tr() {
  !gt && !xn && (xn = !0, jn = er.then(sr));
}
function bi(e) {
  const t = X.indexOf(e);
  t > me && X.splice(t, 1);
}
function xi(e) {
  T(e) ? Qe.push(...e) : (!xe || !xe.includes(
    e,
    e.allowRecurse ? De + 1 : De
  )) && Qe.push(e), tr();
}
function os(e, t = gt ? me + 1 : 0) {
  for (; t < X.length; t++) {
    const n = X[t];
    n && n.pre && (X.splice(t, 1), t--, n());
  }
}
function nr(e) {
  if (Qe.length) {
    const t = [...new Set(Qe)];
    if (Qe.length = 0, xe) {
      xe.push(...t);
      return;
    }
    for (xe = t, xe.sort((n, s) => mt(n) - mt(s)), De = 0; De < xe.length; De++)
      xe[De]();
    xe = null, De = 0;
  }
}
const mt = (e) => e.id == null ? 1 / 0 : e.id, yi = (e, t) => {
  const n = mt(e) - mt(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function sr(e) {
  xn = !1, gt = !0, X.sort(yi);
  const t = ue;
  try {
    for (me = 0; me < X.length; me++) {
      const n = X[me];
      n && n.active !== !1 && ($e.NODE_ENV !== "production" && t(n), Re(n, null, 14));
    }
  } finally {
    me = 0, X.length = 0, nr(), gt = !1, jn = null, (X.length || Qe.length) && sr();
  }
}
function Ei(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || H;
  let r = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in s) {
    const m = `${o === "modelValue" ? "model" : o}Modifiers`, { number: E, trim: v } = s[m] || H;
    v && (r = n.map((P) => W(P) ? P.trim() : P)), E && (r = n.map(hn));
  }
  let c, u = s[c = on(t)] || // also try camelCase event handler (#2249)
  s[c = on(Ge(t))];
  !u && i && (u = s[c = on(nt(t))]), u && ae(
    u,
    e,
    6,
    r
  );
  const a = s[c + "Once"];
  if (a) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[c])
      return;
    e.emitted[c] = !0, ae(
      a,
      e,
      6,
      r
    );
  }
}
function rr(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, c = !1;
  if (!R(e)) {
    const u = (a) => {
      const m = rr(a, t, !0);
      m && (c = !0, Q(o, m));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (j(e) && s.set(e, null), null) : (T(i) ? i.forEach((u) => o[u] = null) : Q(o, i), j(e) && s.set(e, o), o);
}
function Jt(e, t) {
  return !e || !$t(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), F(e, t[0].toLowerCase() + t.slice(1)) || F(e, nt(t)) || F(e, t));
}
let ce = null, kt = null;
function jt(e) {
  const t = ce;
  return ce = e, kt = e && e.type.__scopeId || null, t;
}
function wi(e) {
  kt = e;
}
function vi() {
  kt = null;
}
function Oi(e, t = ce, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && ms(-1);
    const i = jt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      jt(i), s._d && ms(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function ln(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: c,
    attrs: u,
    emit: a,
    render: m,
    renderCache: E,
    data: v,
    setupState: P,
    ctx: K,
    inheritAttrs: N
  } = e;
  let z, Y;
  const J = jt(e);
  try {
    if (n.shapeFlag & 4) {
      const A = r || s;
      z = ge(
        m.call(
          A,
          A,
          E,
          i,
          P,
          v,
          K
        )
      ), Y = u;
    } else {
      const A = t;
      $e.NODE_ENV, z = ge(
        A.length > 1 ? A(
          i,
          $e.NODE_ENV !== "production" ? {
            get attrs() {
              return u;
            },
            slots: c,
            emit: a
          } : { attrs: u, slots: c, emit: a }
        ) : A(
          i,
          null
          /* we know it doesn't need it */
        )
      ), Y = t.props ? u : Ci(u);
    }
  } catch (A) {
    ht.length = 0, Yt(A, e, 1), z = Ee(We);
  }
  let k = z;
  if (Y && N !== !1) {
    const A = Object.keys(Y), { shapeFlag: ve } = k;
    A.length && ve & 7 && (o && A.some(In) && (Y = Ti(
      Y,
      o
    )), k = ze(k, Y));
  }
  return n.dirs && (k = ze(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), z = k, jt(J), z;
}
const Ci = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || $t(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ti = (e, t) => {
  const n = {};
  for (const s in e)
    (!In(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Ii(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: c, patchFlag: u } = t, a = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return s ? ls(s, o, a) : !!o;
    if (u & 8) {
      const m = t.dynamicProps;
      for (let E = 0; E < m.length; E++) {
        const v = m[E];
        if (o[v] !== s[v] && !Jt(a, v))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : s === o ? !1 : s ? o ? ls(s, o, a) : !0 : !!o;
  return !1;
}
function ls(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Jt(n, i))
      return !0;
  }
  return !1;
}
function Ri({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Pi = Symbol.for("v-ndc"), Ai = (e) => e.__isSuspense;
function Mi(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const At = {};
function Ft(e, t, n) {
  return $e.NODE_ENV !== "production" && R(t), ir(e, t, n);
}
function ir(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = H) {
  var c;
  const u = Kr() === ((c = q) == null ? void 0 : c.scope) ? q : null;
  let a, m = !1, E = !1;
  if (Z(e) ? (a = () => e.value, m = Ht(e)) : Ze(e) ? (a = () => e, s = !0) : T(e) ? (E = !0, m = e.some((A) => Ze(A) || Ht(A)), a = () => e.map((A) => {
    if (Z(A))
      return A.value;
    if (Ze(A))
      return He(A);
    if (R(A))
      return Re(A, u, 2);
  })) : R(e) ? t ? a = () => Re(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted))
      return v && v(), ae(
        e,
        u,
        3,
        [P]
      );
  } : a = ue, t && s) {
    const A = a;
    a = () => He(A());
  }
  let v, P = (A) => {
    v = J.onStop = () => {
      Re(A, u, 4);
    };
  }, K;
  if (bt)
    if (P = ue, t ? n && ae(t, u, 3, [
      a(),
      E ? [] : void 0,
      P
    ]) : a(), r === "sync") {
      const A = Po();
      K = A.__watcherHandles || (A.__watcherHandles = []);
    } else
      return ue;
  let N = E ? new Array(e.length).fill(At) : At;
  const z = () => {
    if (J.active)
      if (t) {
        const A = J.run();
        (s || m || (E ? A.some((ve, it) => Ke(ve, N[it])) : Ke(A, N))) && (v && v(), ae(t, u, 3, [
          A,
          // pass undefined as the old value when it's changed for the first time
          N === At ? void 0 : E && N[0] === At ? [] : N,
          P
        ]), N = A);
      } else
        J.run();
  };
  z.allowRecurse = !!t;
  let Y;
  r === "sync" ? Y = z : r === "post" ? Y = () => te(z, u && u.suspense) : (z.pre = !0, u && (z.id = u.uid), Y = () => Bn(z));
  const J = new Fn(a, Y);
  t ? n ? z() : N = J.run() : r === "post" ? te(
    J.run.bind(J),
    u && u.suspense
  ) : J.run();
  const k = () => {
    J.stop(), u && u.scope && Rn(u.scope.effects, J);
  };
  return K && K.push(k), k;
}
function Ni(e, t, n) {
  const s = this.proxy, r = W(e) ? e.includes(".") ? or(s, e) : () => s[e] : e.bind(s, s);
  let i;
  R(t) ? i = t : (i = t.handler, n = t);
  const o = q;
  tt(this);
  const c = ir(r, i.bind(s), n);
  return o ? tt(o) : Be(), c;
}
function or(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function He(e, t) {
  if (!j(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Z(e))
    He(e.value, t);
  else if (T(e))
    for (let n = 0; n < e.length; n++)
      He(e[n], t);
  else if (Ms(e) || Xe(e))
    e.forEach((n) => {
      He(n, t);
    });
  else if (Ss(e))
    for (const n in e)
      He(e[n], t);
  return e;
}
function Fi(e, t) {
  const n = ce;
  if (n === null)
    return e;
  const s = Gt(n) || n.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, c, u, a = H] = t[i];
    o && (R(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && He(c), r.push({
      dir: o,
      instance: s,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: a
    }));
  }
  return e;
}
function Se(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const c = r[o];
    i && (c.oldValue = i[o].value);
    let u = c.dir[s];
    u && (st(), ae(u, n, 8, [
      e.el,
      c,
      e,
      t
    ]), rt());
  }
}
const St = (e) => !!e.type.__asyncLoader, lr = (e) => e.type.__isKeepAlive;
function Si(e, t) {
  cr(e, "a", t);
}
function Ui(e, t) {
  cr(e, "da", t);
}
function cr(e, t, n = q) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Xt(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      lr(r.parent.vnode) && Di(s, t, n, r), r = r.parent;
  }
}
function Di(e, t, n, s) {
  const r = Xt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  fr(() => {
    Rn(s[t], r);
  }, n);
}
function Xt(e, t, n = q, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      if (n.isUnmounted)
        return;
      st(), tt(n);
      const c = ae(t, n, e, o);
      return Be(), rt(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const we = (e) => (t, n = q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!bt || e === "sp") && Xt(e, (...s) => t(...s), n)
), Li = we("bm"), Hi = we("m"), ji = we("bu"), Bi = we("u"), Ki = we("bum"), fr = we("um"), $i = we("sp"), Wi = we(
  "rtg"
), zi = we(
  "rtc"
);
function Vi(e, t = q) {
  Xt("ec", e, t);
}
function qi(e, t, n, s) {
  let r;
  const i = n && n[s];
  if (T(e) || W(e)) {
    r = new Array(e.length);
    for (let o = 0, c = e.length; o < c; o++)
      r[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++)
      r[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (j(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (o, c) => t(o, c, void 0, i && i[c])
      );
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let c = 0, u = o.length; c < u; c++) {
        const a = o[c];
        r[c] = t(e[a], a, c, i && i[c]);
      }
    }
  else
    r = [];
  return n && (n[s] = r), r;
}
const yn = (e) => e ? wr(e) ? Gt(e) || e.proxy : yn(e.parent) : null, dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Q(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => yn(e.parent),
    $root: (e) => yn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Kn(e),
    $forceUpdate: (e) => e.f || (e.f = () => Bn(e.update)),
    $nextTick: (e) => e.n || (e.n = mi.bind(e.proxy)),
    $watch: (e) => Ni.bind(e)
  })
), cn = (e, t) => e !== H && !e.__isScriptSetup && F(e, t), Yi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let a;
    if (t[0] !== "$") {
      const P = o[t];
      if (P !== void 0)
        switch (P) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (cn(s, t))
          return o[t] = 1, s[t];
        if (r !== H && F(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && F(a, t)
        )
          return o[t] = 3, i[t];
        if (n !== H && F(n, t))
          return o[t] = 4, n[t];
        En && (o[t] = 0);
      }
    }
    const m = dt[t];
    let E, v;
    if (m)
      return t === "$attrs" && ne(e, "get", t), m(e);
    if (
      // css module (injected by vue-loader)
      (E = c.__cssModules) && (E = E[t])
    )
      return E;
    if (n !== H && F(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      v = u.config.globalProperties, F(v, t)
    )
      return v[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return cn(r, t) ? (r[t] = n, !0) : s !== H && F(s, t) ? (s[t] = n, !0) : F(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let c;
    return !!n[o] || e !== H && F(e, o) || cn(t, o) || (c = i[0]) && F(c, o) || F(s, o) || F(dt, o) || F(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : F(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function cs(e) {
  return T(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let En = !0;
function Ji(e) {
  const t = Kn(e), n = e.proxy, s = e.ctx;
  En = !1, t.beforeCreate && fs(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: c,
    provide: u,
    inject: a,
    // lifecycle
    created: m,
    beforeMount: E,
    mounted: v,
    beforeUpdate: P,
    updated: K,
    activated: N,
    deactivated: z,
    beforeDestroy: Y,
    beforeUnmount: J,
    destroyed: k,
    unmounted: A,
    render: ve,
    renderTracked: it,
    renderTriggered: xt,
    errorCaptured: Ae,
    serverPrefetch: tn,
    // public API
    expose: Me,
    inheritAttrs: ot,
    // assets
    components: yt,
    directives: Et,
    filters: nn
  } = t;
  if (a && ki(a, s, null), o)
    for (const B in o) {
      const D = o[B];
      R(D) && (s[B] = D.bind(n));
    }
  if (r) {
    const B = r.call(n, n);
    j(B) && (e.data = Dn(B));
  }
  if (En = !0, i)
    for (const B in i) {
      const D = i[B], Ne = R(D) ? D.bind(n, n) : R(D.get) ? D.get.bind(n, n) : ue, wt = !R(D) && R(D.set) ? D.set.bind(n) : ue, Fe = Or({
        get: Ne,
        set: wt
      });
      Object.defineProperty(s, B, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (de) => Fe.value = de
      });
    }
  if (c)
    for (const B in c)
      ur(c[B], s, n, B);
  if (u) {
    const B = R(u) ? u.call(n) : u;
    Reflect.ownKeys(B).forEach((D) => {
      to(D, B[D]);
    });
  }
  m && fs(m, e, "c");
  function G(B, D) {
    T(D) ? D.forEach((Ne) => B(Ne.bind(n))) : D && B(D.bind(n));
  }
  if (G(Li, E), G(Hi, v), G(ji, P), G(Bi, K), G(Si, N), G(Ui, z), G(Vi, Ae), G(zi, it), G(Wi, xt), G(Ki, J), G(fr, A), G($i, tn), T(Me))
    if (Me.length) {
      const B = e.exposed || (e.exposed = {});
      Me.forEach((D) => {
        Object.defineProperty(B, D, {
          get: () => n[D],
          set: (Ne) => n[D] = Ne
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ve && e.render === ue && (e.render = ve), ot != null && (e.inheritAttrs = ot), yt && (e.components = yt), Et && (e.directives = Et);
}
function ki(e, t, n = ue) {
  T(e) && (e = wn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    j(r) ? "default" in r ? i = Ut(
      r.from || s,
      r.default,
      !0
      /* treat default function as factory */
    ) : i = Ut(r.from || s) : i = Ut(r), Z(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function fs(e, t, n) {
  ae(
    T(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function ur(e, t, n, s) {
  const r = s.includes(".") ? or(n, s) : () => n[s];
  if (W(e)) {
    const i = t[e];
    R(i) && Ft(r, i);
  } else if (R(e))
    Ft(r, e.bind(n));
  else if (j(e))
    if (T(e))
      e.forEach((i) => ur(i, t, n, s));
    else {
      const i = R(e.handler) ? e.handler.bind(n) : t[e.handler];
      R(i) && Ft(r, i, e);
    }
}
function Kn(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, c = i.get(t);
  let u;
  return c ? u = c : !r.length && !n && !s ? u = t : (u = {}, r.length && r.forEach(
    (a) => Bt(u, a, o, !0)
  ), Bt(u, t, o)), j(t) && i.set(t, u), u;
}
function Bt(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Bt(e, i, n, !0), r && r.forEach(
    (o) => Bt(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const c = Xi[o] || n && n[o];
      e[o] = c ? c(e[o], t[o]) : t[o];
    }
  return e;
}
const Xi = {
  data: us,
  props: as,
  emits: as,
  // objects
  methods: ut,
  computed: ut,
  // lifecycle
  beforeCreate: ee,
  created: ee,
  beforeMount: ee,
  mounted: ee,
  beforeUpdate: ee,
  updated: ee,
  beforeDestroy: ee,
  beforeUnmount: ee,
  destroyed: ee,
  unmounted: ee,
  activated: ee,
  deactivated: ee,
  errorCaptured: ee,
  serverPrefetch: ee,
  // assets
  components: ut,
  directives: ut,
  // watch
  watch: Qi,
  // provide / inject
  provide: us,
  inject: Zi
};
function us(e, t) {
  return t ? e ? function() {
    return Q(
      R(e) ? e.call(this, this) : e,
      R(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Zi(e, t) {
  return ut(wn(e), wn(t));
}
function wn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ut(e, t) {
  return e ? Q(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function as(e, t) {
  return e ? T(e) && T(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Q(
    /* @__PURE__ */ Object.create(null),
    cs(e),
    cs(t ?? {})
  ) : t;
}
function Qi(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = Q(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ee(e[s], t[s]);
  return n;
}
function ar() {
  return {
    app: null,
    config: {
      isNativeTag: Ir,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Gi = 0;
function eo(e, t) {
  return function(s, r = null) {
    R(s) || (s = Q({}, s)), r != null && !j(r) && (r = null);
    const i = ar(), o = /* @__PURE__ */ new WeakSet();
    let c = !1;
    const u = i.app = {
      _uid: Gi++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Ao,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...m) {
        return o.has(a) || (a && R(a.install) ? (o.add(a), a.install(u, ...m)) : R(a) && (o.add(a), a(u, ...m))), u;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, m) {
        return m ? (i.components[a] = m, u) : i.components[a];
      },
      directive(a, m) {
        return m ? (i.directives[a] = m, u) : i.directives[a];
      },
      mount(a, m, E) {
        if (!c) {
          const v = Ee(s, r);
          return v.appContext = i, m && t ? t(v, a) : e(v, a, E), c = !0, u._container = a, a.__vue_app__ = u, Gt(v.component) || v.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, m) {
        return i.provides[a] = m, u;
      },
      runWithContext(a) {
        Kt = u;
        try {
          return a();
        } finally {
          Kt = null;
        }
      }
    };
    return u;
  };
}
let Kt = null;
function to(e, t) {
  if (q) {
    let n = q.provides;
    const s = q.parent && q.parent.provides;
    s === n && (n = q.provides = Object.create(s)), n[e] = t;
  }
}
function Ut(e, t, n = !1) {
  const s = q || ce;
  if (s || Kt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Kt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && R(t) ? t.call(s && s.proxy) : t;
  }
}
function no(e, t, n, s = !1) {
  const r = {}, i = {};
  Lt(i, Qt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), dr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ci(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function so(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, c = S(r), [u] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const m = e.vnode.dynamicProps;
      for (let E = 0; E < m.length; E++) {
        let v = m[E];
        if (Jt(e.emitsOptions, v))
          continue;
        const P = t[v];
        if (u)
          if (F(i, v))
            P !== i[v] && (i[v] = P, a = !0);
          else {
            const K = Ge(v);
            r[K] = vn(
              u,
              c,
              K,
              P,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          P !== i[v] && (i[v] = P, a = !0);
      }
    }
  } else {
    dr(e, t, r, i) && (a = !0);
    let m;
    for (const E in c)
      (!t || // for camelCase
      !F(t, E) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((m = nt(E)) === E || !F(t, m))) && (u ? n && // for camelCase
      (n[E] !== void 0 || // for kebab-case
      n[m] !== void 0) && (r[E] = vn(
        u,
        c,
        E,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[E]);
    if (i !== c)
      for (const E in i)
        (!t || !F(t, E)) && (delete i[E], a = !0);
  }
  a && ye(e, "set", "$attrs");
}
function dr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Mt(u))
        continue;
      const a = t[u];
      let m;
      r && F(r, m = Ge(u)) ? !i || !i.includes(m) ? n[m] = a : (c || (c = {}))[m] = a : Jt(e.emitsOptions, u) || (!(u in s) || a !== s[u]) && (s[u] = a, o = !0);
    }
  if (i) {
    const u = S(n), a = c || H;
    for (let m = 0; m < i.length; m++) {
      const E = i[m];
      n[E] = vn(
        r,
        u,
        E,
        a[E],
        e,
        !F(a, E)
      );
    }
  }
  return o;
}
function vn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = F(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && R(u)) {
        const { propsDefaults: a } = r;
        n in a ? s = a[n] : (tt(r), s = a[n] = u.call(
          null,
          t
        ), Be());
      } else
        s = u;
    }
    o[
      0
      /* shouldCast */
    ] && (i && !c ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === nt(n)) && (s = !0));
  }
  return s;
}
function hr(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!R(e)) {
    const m = (E) => {
      u = !0;
      const [v, P] = hr(E, t, !0);
      Q(o, v), P && c.push(...P);
    };
    !n && t.mixins.length && t.mixins.forEach(m), e.extends && m(e.extends), e.mixins && e.mixins.forEach(m);
  }
  if (!i && !u)
    return j(e) && s.set(e, ke), ke;
  if (T(i))
    for (let m = 0; m < i.length; m++) {
      const E = Ge(i[m]);
      ds(E) && (o[E] = H);
    }
  else if (i)
    for (const m in i) {
      const E = Ge(m);
      if (ds(E)) {
        const v = i[m], P = o[E] = T(v) || R(v) ? { type: v } : Q({}, v);
        if (P) {
          const K = gs(Boolean, P.type), N = gs(String, P.type);
          P[
            0
            /* shouldCast */
          ] = K > -1, P[
            1
            /* shouldCastTrue */
          ] = N < 0 || K < N, (K > -1 || F(P, "default")) && c.push(E);
        }
      }
    }
  const a = [o, c];
  return j(e) && s.set(e, a), a;
}
function ds(e) {
  return e[0] !== "$";
}
function hs(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function ps(e, t) {
  return hs(e) === hs(t);
}
function gs(e, t) {
  return T(t) ? t.findIndex((n) => ps(n, e)) : R(t) && ps(t, e) ? 0 : -1;
}
const pr = (e) => e[0] === "_" || e === "$stable", $n = (e) => T(e) ? e.map(ge) : [ge(e)], ro = (e, t, n) => {
  if (t._n)
    return t;
  const s = Oi((...r) => ($e.NODE_ENV, $n(t(...r))), n);
  return s._c = !1, s;
}, gr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (pr(r))
      continue;
    const i = e[r];
    if (R(i))
      t[r] = ro(r, i, s);
    else if (i != null) {
      const o = $n(i);
      t[r] = () => o;
    }
  }
}, mr = (e, t) => {
  const n = $n(t);
  e.slots.default = () => n;
}, io = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = S(t), Lt(t, "_", n)) : gr(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && mr(e, t);
  Lt(e.slots, Qt, 1);
}, oo = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = H;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = !1 : (Q(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, gr(t, r)), o = t;
  } else
    t && (mr(e, t), o = { default: 1 });
  if (i)
    for (const c in r)
      !pr(c) && o[c] == null && delete r[c];
};
function On(e, t, n, s, r = !1) {
  if (T(e)) {
    e.forEach(
      (v, P) => On(
        v,
        t && (T(t) ? t[P] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (St(s) && !r)
    return;
  const i = s.shapeFlag & 4 ? Gt(s.component) || s.component.proxy : s.el, o = r ? null : i, { i: c, r: u } = e, a = t && t.r, m = c.refs === H ? c.refs = {} : c.refs, E = c.setupState;
  if (a != null && a !== u && (W(a) ? (m[a] = null, F(E, a) && (E[a] = null)) : Z(a) && (a.value = null)), R(u))
    Re(u, c, 12, [o, m]);
  else {
    const v = W(u), P = Z(u);
    if (v || P) {
      const K = () => {
        if (e.f) {
          const N = v ? F(E, u) ? E[u] : m[u] : u.value;
          r ? T(N) && Rn(N, i) : T(N) ? N.includes(i) || N.push(i) : v ? (m[u] = [i], F(E, u) && (E[u] = m[u])) : (u.value = [i], e.k && (m[e.k] = u.value));
        } else
          v ? (m[u] = o, F(E, u) && (E[u] = o)) : P && (u.value = o, e.k && (m[e.k] = o));
      };
      o ? (K.id = -1, te(K, n)) : K();
    }
  }
}
const te = Mi;
function lo(e) {
  return co(e);
}
function co(e, t) {
  const n = pn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: c,
    createComment: u,
    setText: a,
    setElementText: m,
    parentNode: E,
    nextSibling: v,
    setScopeId: P = ue,
    insertStaticContent: K
  } = e, N = (l, f, d, h = null, p = null, b = null, y = !1, _ = null, x = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !ct(l, f) && (h = vt(l), de(l, p, b, !0), l = null), f.patchFlag === -2 && (x = !1, f.dynamicChildren = null);
    const { type: g, ref: O, shapeFlag: w } = f;
    switch (g) {
      case Zt:
        z(l, f, d, h);
        break;
      case We:
        Y(l, f, d, h);
        break;
      case fn:
        l == null && J(f, d, h, y);
        break;
      case oe:
        yt(
          l,
          f,
          d,
          h,
          p,
          b,
          y,
          _,
          x
        );
        break;
      default:
        w & 1 ? ve(
          l,
          f,
          d,
          h,
          p,
          b,
          y,
          _,
          x
        ) : w & 6 ? Et(
          l,
          f,
          d,
          h,
          p,
          b,
          y,
          _,
          x
        ) : (w & 64 || w & 128) && g.process(
          l,
          f,
          d,
          h,
          p,
          b,
          y,
          _,
          x,
          Ve
        );
    }
    O != null && p && On(O, l && l.ref, b, f || l, !f);
  }, z = (l, f, d, h) => {
    if (l == null)
      s(
        f.el = c(f.children),
        d,
        h
      );
    else {
      const p = f.el = l.el;
      f.children !== l.children && a(p, f.children);
    }
  }, Y = (l, f, d, h) => {
    l == null ? s(
      f.el = u(f.children || ""),
      d,
      h
    ) : f.el = l.el;
  }, J = (l, f, d, h) => {
    [l.el, l.anchor] = K(
      l.children,
      f,
      d,
      h,
      l.el,
      l.anchor
    );
  }, k = ({ el: l, anchor: f }, d, h) => {
    let p;
    for (; l && l !== f; )
      p = v(l), s(l, d, h), l = p;
    s(f, d, h);
  }, A = ({ el: l, anchor: f }) => {
    let d;
    for (; l && l !== f; )
      d = v(l), r(l), l = d;
    r(f);
  }, ve = (l, f, d, h, p, b, y, _, x) => {
    y = y || f.type === "svg", l == null ? it(
      f,
      d,
      h,
      p,
      b,
      y,
      _,
      x
    ) : tn(
      l,
      f,
      p,
      b,
      y,
      _,
      x
    );
  }, it = (l, f, d, h, p, b, y, _) => {
    let x, g;
    const { type: O, props: w, shapeFlag: C, transition: I, dirs: M } = l;
    if (x = l.el = o(
      l.type,
      b,
      w && w.is,
      w
    ), C & 8 ? m(x, l.children) : C & 16 && Ae(
      l.children,
      x,
      null,
      h,
      p,
      b && O !== "foreignObject",
      y,
      _
    ), M && Se(l, null, h, "created"), xt(x, l, l.scopeId, y, h), w) {
      for (const U in w)
        U !== "value" && !Mt(U) && i(
          x,
          U,
          null,
          w[U],
          b,
          l.children,
          h,
          p,
          _e
        );
      "value" in w && i(x, "value", null, w.value), (g = w.onVnodeBeforeMount) && pe(g, h, l);
    }
    M && Se(l, null, h, "beforeMount");
    const L = fo(p, I);
    L && I.beforeEnter(x), s(x, f, d), ((g = w && w.onVnodeMounted) || L || M) && te(() => {
      g && pe(g, h, l), L && I.enter(x), M && Se(l, null, h, "mounted");
    }, p);
  }, xt = (l, f, d, h, p) => {
    if (d && P(l, d), h)
      for (let b = 0; b < h.length; b++)
        P(l, h[b]);
    if (p) {
      let b = p.subTree;
      if (f === b) {
        const y = p.vnode;
        xt(
          l,
          y,
          y.scopeId,
          y.slotScopeIds,
          p.parent
        );
      }
    }
  }, Ae = (l, f, d, h, p, b, y, _, x = 0) => {
    for (let g = x; g < l.length; g++) {
      const O = l[g] = _ ? Te(l[g]) : ge(l[g]);
      N(
        null,
        O,
        f,
        d,
        h,
        p,
        b,
        y,
        _
      );
    }
  }, tn = (l, f, d, h, p, b, y) => {
    const _ = f.el = l.el;
    let { patchFlag: x, dynamicChildren: g, dirs: O } = f;
    x |= l.patchFlag & 16;
    const w = l.props || H, C = f.props || H;
    let I;
    d && Ue(d, !1), (I = C.onVnodeBeforeUpdate) && pe(I, d, f, l), O && Se(f, l, d, "beforeUpdate"), d && Ue(d, !0);
    const M = p && f.type !== "foreignObject";
    if (g ? Me(
      l.dynamicChildren,
      g,
      _,
      d,
      h,
      M,
      b
    ) : y || D(
      l,
      f,
      _,
      null,
      d,
      h,
      M,
      b,
      !1
    ), x > 0) {
      if (x & 16)
        ot(
          _,
          f,
          w,
          C,
          d,
          h,
          p
        );
      else if (x & 2 && w.class !== C.class && i(_, "class", null, C.class, p), x & 4 && i(_, "style", w.style, C.style, p), x & 8) {
        const L = f.dynamicProps;
        for (let U = 0; U < L.length; U++) {
          const $ = L[U], re = w[$], qe = C[$];
          (qe !== re || $ === "value") && i(
            _,
            $,
            re,
            qe,
            p,
            l.children,
            d,
            h,
            _e
          );
        }
      }
      x & 1 && l.children !== f.children && m(_, f.children);
    } else
      !y && g == null && ot(
        _,
        f,
        w,
        C,
        d,
        h,
        p
      );
    ((I = C.onVnodeUpdated) || O) && te(() => {
      I && pe(I, d, f, l), O && Se(f, l, d, "updated");
    }, h);
  }, Me = (l, f, d, h, p, b, y) => {
    for (let _ = 0; _ < f.length; _++) {
      const x = l[_], g = f[_], O = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === oe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ct(x, g) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? E(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      N(
        x,
        g,
        O,
        null,
        h,
        p,
        b,
        y,
        !0
      );
    }
  }, ot = (l, f, d, h, p, b, y) => {
    if (d !== h) {
      if (d !== H)
        for (const _ in d)
          !Mt(_) && !(_ in h) && i(
            l,
            _,
            d[_],
            null,
            y,
            f.children,
            p,
            b,
            _e
          );
      for (const _ in h) {
        if (Mt(_))
          continue;
        const x = h[_], g = d[_];
        x !== g && _ !== "value" && i(
          l,
          _,
          g,
          x,
          y,
          f.children,
          p,
          b,
          _e
        );
      }
      "value" in h && i(l, "value", d.value, h.value);
    }
  }, yt = (l, f, d, h, p, b, y, _, x) => {
    const g = f.el = l ? l.el : c(""), O = f.anchor = l ? l.anchor : c("");
    let { patchFlag: w, dynamicChildren: C, slotScopeIds: I } = f;
    I && (_ = _ ? _.concat(I) : I), l == null ? (s(g, d, h), s(O, d, h), Ae(
      f.children,
      d,
      O,
      p,
      b,
      y,
      _,
      x
    )) : w > 0 && w & 64 && C && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Me(
      l.dynamicChildren,
      C,
      d,
      p,
      b,
      y,
      _
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || p && f === p.subTree) && _r(
      l,
      f,
      !0
      /* shallow */
    )) : D(
      l,
      f,
      d,
      O,
      p,
      b,
      y,
      _,
      x
    );
  }, Et = (l, f, d, h, p, b, y, _, x) => {
    f.slotScopeIds = _, l == null ? f.shapeFlag & 512 ? p.ctx.activate(
      f,
      d,
      h,
      y,
      x
    ) : nn(
      f,
      d,
      h,
      p,
      b,
      y,
      x
    ) : Vn(l, f, x);
  }, nn = (l, f, d, h, p, b, y) => {
    const _ = l.component = wo(
      l,
      h,
      p
    );
    if (lr(l) && (_.ctx.renderer = Ve), vo(_), _.asyncDep) {
      if (p && p.registerDep(_, G), !l.el) {
        const x = _.subTree = Ee(We);
        Y(null, x, f, d);
      }
      return;
    }
    G(
      _,
      l,
      f,
      d,
      p,
      b,
      y
    );
  }, Vn = (l, f, d) => {
    const h = f.component = l.component;
    if (Ii(l, f, d))
      if (h.asyncDep && !h.asyncResolved) {
        B(h, f, d);
        return;
      } else
        h.next = f, bi(h.update), h.update();
    else
      f.el = l.el, h.vnode = f;
  }, G = (l, f, d, h, p, b, y) => {
    const _ = () => {
      if (l.isMounted) {
        let { next: O, bu: w, u: C, parent: I, vnode: M } = l, L = O, U;
        Ue(l, !1), O ? (O.el = M.el, B(l, O, y)) : O = M, w && Nt(w), (U = O.props && O.props.onVnodeBeforeUpdate) && pe(U, I, O, M), Ue(l, !0);
        const $ = ln(l), re = l.subTree;
        l.subTree = $, N(
          re,
          $,
          // parent may have changed if it's in a teleport
          E(re.el),
          // anchor may have changed if it's in a fragment
          vt(re),
          l,
          p,
          b
        ), O.el = $.el, L === null && Ri(l, $.el), C && te(C, p), (U = O.props && O.props.onVnodeUpdated) && te(
          () => pe(U, I, O, M),
          p
        );
      } else {
        let O;
        const { el: w, props: C } = f, { bm: I, m: M, parent: L } = l, U = St(f);
        if (Ue(l, !1), I && Nt(I), !U && (O = C && C.onVnodeBeforeMount) && pe(O, L, f), Ue(l, !0), w && rn) {
          const $ = () => {
            l.subTree = ln(l), rn(
              w,
              l.subTree,
              l,
              p,
              null
            );
          };
          U ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && $()
          ) : $();
        } else {
          const $ = l.subTree = ln(l);
          N(
            null,
            $,
            d,
            h,
            l,
            p,
            b
          ), f.el = $.el;
        }
        if (M && te(M, p), !U && (O = C && C.onVnodeMounted)) {
          const $ = f;
          te(
            () => pe(O, L, $),
            p
          );
        }
        (f.shapeFlag & 256 || L && St(L.vnode) && L.vnode.shapeFlag & 256) && l.a && te(l.a, p), l.isMounted = !0, f = d = h = null;
      }
    }, x = l.effect = new Fn(
      _,
      () => Bn(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => x.run();
    g.id = l.uid, Ue(l, !0), g();
  }, B = (l, f, d) => {
    f.component = l;
    const h = l.vnode.props;
    l.vnode = f, l.next = null, so(l, f.props, h, d), oo(l, f.children, d), st(), os(), rt();
  }, D = (l, f, d, h, p, b, y, _, x = !1) => {
    const g = l && l.children, O = l ? l.shapeFlag : 0, w = f.children, { patchFlag: C, shapeFlag: I } = f;
    if (C > 0) {
      if (C & 128) {
        wt(
          g,
          w,
          d,
          h,
          p,
          b,
          y,
          _,
          x
        );
        return;
      } else if (C & 256) {
        Ne(
          g,
          w,
          d,
          h,
          p,
          b,
          y,
          _,
          x
        );
        return;
      }
    }
    I & 8 ? (O & 16 && _e(g, p, b), w !== g && m(d, w)) : O & 16 ? I & 16 ? wt(
      g,
      w,
      d,
      h,
      p,
      b,
      y,
      _,
      x
    ) : _e(g, p, b, !0) : (O & 8 && m(d, ""), I & 16 && Ae(
      w,
      d,
      h,
      p,
      b,
      y,
      _,
      x
    ));
  }, Ne = (l, f, d, h, p, b, y, _, x) => {
    l = l || ke, f = f || ke;
    const g = l.length, O = f.length, w = Math.min(g, O);
    let C;
    for (C = 0; C < w; C++) {
      const I = f[C] = x ? Te(f[C]) : ge(f[C]);
      N(
        l[C],
        I,
        d,
        null,
        p,
        b,
        y,
        _,
        x
      );
    }
    g > O ? _e(
      l,
      p,
      b,
      !0,
      !1,
      w
    ) : Ae(
      f,
      d,
      h,
      p,
      b,
      y,
      _,
      x,
      w
    );
  }, wt = (l, f, d, h, p, b, y, _, x) => {
    let g = 0;
    const O = f.length;
    let w = l.length - 1, C = O - 1;
    for (; g <= w && g <= C; ) {
      const I = l[g], M = f[g] = x ? Te(f[g]) : ge(f[g]);
      if (ct(I, M))
        N(
          I,
          M,
          d,
          null,
          p,
          b,
          y,
          _,
          x
        );
      else
        break;
      g++;
    }
    for (; g <= w && g <= C; ) {
      const I = l[w], M = f[C] = x ? Te(f[C]) : ge(f[C]);
      if (ct(I, M))
        N(
          I,
          M,
          d,
          null,
          p,
          b,
          y,
          _,
          x
        );
      else
        break;
      w--, C--;
    }
    if (g > w) {
      if (g <= C) {
        const I = C + 1, M = I < O ? f[I].el : h;
        for (; g <= C; )
          N(
            null,
            f[g] = x ? Te(f[g]) : ge(f[g]),
            d,
            M,
            p,
            b,
            y,
            _,
            x
          ), g++;
      }
    } else if (g > C)
      for (; g <= w; )
        de(l[g], p, b, !0), g++;
    else {
      const I = g, M = g, L = /* @__PURE__ */ new Map();
      for (g = M; g <= C; g++) {
        const se = f[g] = x ? Te(f[g]) : ge(f[g]);
        se.key != null && L.set(se.key, g);
      }
      let U, $ = 0;
      const re = C - M + 1;
      let qe = !1, Jn = 0;
      const lt = new Array(re);
      for (g = 0; g < re; g++)
        lt[g] = 0;
      for (g = I; g <= w; g++) {
        const se = l[g];
        if ($ >= re) {
          de(se, p, b, !0);
          continue;
        }
        let he;
        if (se.key != null)
          he = L.get(se.key);
        else
          for (U = M; U <= C; U++)
            if (lt[U - M] === 0 && ct(se, f[U])) {
              he = U;
              break;
            }
        he === void 0 ? de(se, p, b, !0) : (lt[he - M] = g + 1, he >= Jn ? Jn = he : qe = !0, N(
          se,
          f[he],
          d,
          null,
          p,
          b,
          y,
          _,
          x
        ), $++);
      }
      const kn = qe ? uo(lt) : ke;
      for (U = kn.length - 1, g = re - 1; g >= 0; g--) {
        const se = M + g, he = f[se], Xn = se + 1 < O ? f[se + 1].el : h;
        lt[g] === 0 ? N(
          null,
          he,
          d,
          Xn,
          p,
          b,
          y,
          _,
          x
        ) : qe && (U < 0 || g !== kn[U] ? Fe(he, d, Xn, 2) : U--);
      }
    }
  }, Fe = (l, f, d, h, p = null) => {
    const { el: b, type: y, transition: _, children: x, shapeFlag: g } = l;
    if (g & 6) {
      Fe(l.component.subTree, f, d, h);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, d, h);
      return;
    }
    if (g & 64) {
      y.move(l, f, d, Ve);
      return;
    }
    if (y === oe) {
      s(b, f, d);
      for (let w = 0; w < x.length; w++)
        Fe(x[w], f, d, h);
      s(l.anchor, f, d);
      return;
    }
    if (y === fn) {
      k(l, f, d);
      return;
    }
    if (h !== 2 && g & 1 && _)
      if (h === 0)
        _.beforeEnter(b), s(b, f, d), te(() => _.enter(b), p);
      else {
        const { leave: w, delayLeave: C, afterLeave: I } = _, M = () => s(b, f, d), L = () => {
          w(b, () => {
            M(), I && I();
          });
        };
        C ? C(b, M, L) : L();
      }
    else
      s(b, f, d);
  }, de = (l, f, d, h = !1, p = !1) => {
    const {
      type: b,
      props: y,
      ref: _,
      children: x,
      dynamicChildren: g,
      shapeFlag: O,
      patchFlag: w,
      dirs: C
    } = l;
    if (_ != null && On(_, null, d, l, !0), O & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const I = O & 1 && C, M = !St(l);
    let L;
    if (M && (L = y && y.onVnodeBeforeUnmount) && pe(L, f, l), O & 6)
      Tr(l.component, d, h);
    else {
      if (O & 128) {
        l.suspense.unmount(d, h);
        return;
      }
      I && Se(l, null, f, "beforeUnmount"), O & 64 ? l.type.remove(
        l,
        f,
        d,
        p,
        Ve,
        h
      ) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== oe || w > 0 && w & 64) ? _e(
        g,
        f,
        d,
        !1,
        !0
      ) : (b === oe && w & 384 || !p && O & 16) && _e(x, f, d), h && qn(l);
    }
    (M && (L = y && y.onVnodeUnmounted) || I) && te(() => {
      L && pe(L, f, l), I && Se(l, null, f, "unmounted");
    }, d);
  }, qn = (l) => {
    const { type: f, el: d, anchor: h, transition: p } = l;
    if (f === oe) {
      Cr(d, h);
      return;
    }
    if (f === fn) {
      A(l);
      return;
    }
    const b = () => {
      r(d), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (l.shapeFlag & 1 && p && !p.persisted) {
      const { leave: y, delayLeave: _ } = p, x = () => y(d, b);
      _ ? _(l.el, b, x) : x();
    } else
      b();
  }, Cr = (l, f) => {
    let d;
    for (; l !== f; )
      d = v(l), r(l), l = d;
    r(f);
  }, Tr = (l, f, d) => {
    const { bum: h, scope: p, update: b, subTree: y, um: _ } = l;
    h && Nt(h), p.stop(), b && (b.active = !1, de(y, l, f, d)), _ && te(_, f), te(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, _e = (l, f, d, h = !1, p = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      de(l[y], f, d, h, p);
  }, vt = (l) => l.shapeFlag & 6 ? vt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : v(l.anchor || l.el), Yn = (l, f, d) => {
    l == null ? f._vnode && de(f._vnode, null, null, !0) : N(f._vnode || null, l, f, null, null, null, d), os(), nr(), f._vnode = l;
  }, Ve = {
    p: N,
    um: de,
    m: Fe,
    r: qn,
    mt: nn,
    mc: Ae,
    pc: D,
    pbc: Me,
    n: vt,
    o: e
  };
  let sn, rn;
  return t && ([sn, rn] = t(
    Ve
  )), {
    render: Yn,
    hydrate: sn,
    createApp: eo(Yn, sn)
  };
}
function Ue({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function fo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _r(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (T(s) && T(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Te(r[i]), c.el = o.el), n || _r(o, c)), c.type === Zt && (c.el = o.el);
    }
}
function uo(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, c;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const a = e[s];
    if (a !== 0) {
      if (r = n[n.length - 1], e[r] < a) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        c = i + o >> 1, e[n[c]] < a ? i = c + 1 : o = c;
      a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
const ao = (e) => e.__isTeleport, oe = Symbol.for("v-fgt"), Zt = Symbol.for("v-txt"), We = Symbol.for("v-cmt"), fn = Symbol.for("v-stc"), ht = [];
let fe = null;
function be(e = !1) {
  ht.push(fe = e ? null : []);
}
function ho() {
  ht.pop(), fe = ht[ht.length - 1] || null;
}
let _t = 1;
function ms(e) {
  _t += e;
}
function br(e) {
  return e.dynamicChildren = _t > 0 ? fe || ke : null, ho(), _t > 0 && fe && fe.push(e), e;
}
function Ce(e, t, n, s, r, i) {
  return br(
    V(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
      /* isBlock */
    )
  );
}
function po(e, t, n, s, r) {
  return br(
    Ee(
      e,
      t,
      n,
      s,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function go(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const mo = (...e) => yr(
  ...e
), Qt = "__vInternal", xr = ({ key: e }) => e ?? null, Dt = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? W(e) || Z(e) || R(e) ? { i: ce, r: e, k: t, f: !!n } : e : null);
function V(e, t = null, n = null, s = 0, r = null, i = e === oe ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xr(t),
    ref: t && Dt(t),
    scopeId: kt,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ce
  };
  return c ? (Wn(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= W(n) ? 8 : 16), _t > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const Ee = $e.NODE_ENV !== "production" ? mo : yr;
function yr(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Pi) && (e = We), go(e)) {
    const c = ze(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Wn(c, n), _t > 0 && !i && fe && (c.shapeFlag & 6 ? fe[fe.indexOf(e)] = c : fe.push(c)), c.patchFlag |= -2, c;
  }
  if (Io(e) && (e = e.__vccOpts), t) {
    t = _o(t);
    let { class: c, style: u } = t;
    c && !W(c) && (t.class = Mn(c)), j(u) && (ks(u) && !T(u) && (u = Q({}, u)), t.style = An(u));
  }
  const o = W(e) ? 1 : Ai(e) ? 128 : ao(e) ? 64 : j(e) ? 4 : R(e) ? 2 : 0;
  return V(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function _o(e) {
  return e ? ks(e) || Qt in e ? Q({}, e) : e : null;
}
function ze(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e, c = t ? xo(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && xr(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? T(r) ? r.concat(Dt(t)) : [r, Dt(t)] : Dt(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: $e.NODE_ENV !== "production" && i === -1 && T(o) ? o.map(Er) : o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== oe ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ze(e.ssContent),
    ssFallback: e.ssFallback && ze(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Er(e) {
  const t = ze(e);
  return T(e.children) && (t.children = e.children.map(Er)), t;
}
function at(e = " ", t = 0) {
  return Ee(Zt, null, e, t);
}
function bo(e = "", t = !1) {
  return t ? (be(), po(We, null, e)) : Ee(We, null, e);
}
function ge(e) {
  return e == null || typeof e == "boolean" ? Ee(We) : T(e) ? Ee(
    oe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Te(e) : Ee(Zt, null, String(e));
}
function Te(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ze(e);
}
function Wn(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (T(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Wn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(Qt in t) ? t._ctx = ce : r === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    R(t) ? (t = { default: t, _ctx: ce }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [at(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Mn([t.class, s.class]));
      else if (r === "style")
        t.style = An([t.style, s.style]);
      else if ($t(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(T(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function pe(e, t, n, s = null) {
  ae(e, t, 7, [
    n,
    s
  ]);
}
const yo = ar();
let Eo = 0;
function wo(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || yo, i = {
    uid: Eo++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new jr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: hr(s, r),
    emitsOptions: rr(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: H,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: H,
    data: H,
    props: H,
    attrs: H,
    slots: H,
    refs: H,
    setupState: H,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ei.bind(null, i), e.ce && e.ce(i), i;
}
let q = null, zn, Ye, _s = "__VUE_INSTANCE_SETTERS__";
(Ye = pn()[_s]) || (Ye = pn()[_s] = []), Ye.push((e) => q = e), zn = (e) => {
  Ye.length > 1 ? Ye.forEach((t) => t(e)) : Ye[0](e);
};
const tt = (e) => {
  zn(e), e.scope.on();
}, Be = () => {
  q && q.scope.off(), zn(null);
};
function wr(e) {
  return e.vnode.shapeFlag & 4;
}
let bt = !1;
function vo(e, t = !1) {
  bt = t;
  const { props: n, children: s } = e.vnode, r = wr(e);
  no(e, n, r, t), io(e, s);
  const i = r ? Oo(e, t) : void 0;
  return bt = !1, i;
}
function Oo(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Xs(new Proxy(e.ctx, Yi));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? To(e) : null;
    tt(e), st();
    const i = Re(
      s,
      e,
      0,
      [e.props, r]
    );
    if (rt(), Be(), Ns(i)) {
      if (i.then(Be, Be), t)
        return i.then((o) => {
          bs(e, o, t);
        }).catch((o) => {
          Yt(o, e, 0);
        });
      e.asyncDep = i;
    } else
      bs(e, i, t);
  } else
    vr(e, t);
}
function bs(e, t, n) {
  R(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = Gs(t)), vr(e, n);
}
let xs;
function vr(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && xs && !s.render) {
      const r = s.template || Kn(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config, { delimiters: c, compilerOptions: u } = s, a = Q(
          Q(
            {
              isCustomElement: i,
              delimiters: c
            },
            o
          ),
          u
        );
        s.render = xs(r, a);
      }
    }
    e.render = s.render || ue;
  }
  {
    tt(e), st();
    try {
      Ji(e);
    } finally {
      rt(), Be();
    }
  }
}
function Co(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return ne(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function To(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Co(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Gt(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Gs(Xs(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in dt)
          return dt[n](e);
      },
      has(t, n) {
        return n in t || n in dt;
      }
    }));
}
function Io(e) {
  return R(e) && "__vccOpts" in e;
}
const Or = (e, t) => pi(e, t, bt), Ro = Symbol.for("v-scx"), Po = () => Ut(Ro), Ao = "3.3.8", Mo = "http://www.w3.org/2000/svg", Le = typeof document < "u" ? document : null, ys = Le && /* @__PURE__ */ Le.createElement("template"), No = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? Le.createElementNS(Mo, e) : Le.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Le.createTextNode(e),
  createComment: (e) => Le.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Le.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      ys.innerHTML = s ? `<svg>${e}</svg>` : e;
      const c = ys.content;
      if (s) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Fo = Symbol("_vtc");
function So(e, t, n) {
  const s = e[Fo];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Uo = Symbol("_vod");
function Do(e, t, n) {
  const s = e.style, r = W(n);
  if (n && !r) {
    if (t && !W(t))
      for (const i in t)
        n[i] == null && Cn(s, i, "");
    for (const i in n)
      Cn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), Uo in e && (s.display = i);
  }
}
const Es = /\s*!important$/;
function Cn(e, t, n) {
  if (T(n))
    n.forEach((s) => Cn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Lo(e, t);
    Es.test(n) ? e.setProperty(
      nt(s),
      n.replace(Es, ""),
      "important"
    ) : e[s] = n;
  }
}
const ws = ["Webkit", "Moz", "ms"], un = {};
function Lo(e, t) {
  const n = un[t];
  if (n)
    return n;
  let s = Ge(t);
  if (s !== "filter" && s in e)
    return un[t] = s;
  s = Us(s);
  for (let r = 0; r < ws.length; r++) {
    const i = ws[r] + s;
    if (i in e)
      return un[t] = i;
  }
  return t;
}
const vs = "http://www.w3.org/1999/xlink";
function Ho(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(vs, t.slice(6, t.length)) : e.setAttributeNS(vs, t, n);
  else {
    const i = Hr(t);
    n == null || i && !Ds(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
  }
}
function jo(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), e[t] = n ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = n;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, m = n ?? "";
    a !== m && (e.value = m), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Ds(n) : n == null && a === "string" ? (n = "", u = !0) : a === "number" && (n = 0, u = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  u && e.removeAttribute(t);
}
function Je(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Bo(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Os = Symbol("_vei");
function Ko(e, t, n, s, r = null) {
  const i = e[Os] || (e[Os] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [c, u] = $o(t);
    if (s) {
      const a = i[t] = Vo(s, r);
      Je(e, c, a, u);
    } else
      o && (Bo(e, c, o, u), i[t] = void 0);
  }
}
const Cs = /(?:Once|Passive|Capture)$/;
function $o(e) {
  let t;
  if (Cs.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Cs); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nt(e.slice(2)), t];
}
let an = 0;
const Wo = /* @__PURE__ */ Promise.resolve(), zo = () => an || (Wo.then(() => an = 0), an = Date.now());
function Vo(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ae(
      qo(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = zo(), n;
}
function qo(e, t) {
  if (T(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const Ts = /^on[a-z]/, Yo = (e, t, n, s, r = !1, i, o, c, u) => {
  t === "class" ? So(e, s, r) : t === "style" ? Do(e, n, s) : $t(t) ? In(t) || Ko(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Jo(e, t, s, r)) ? jo(
    e,
    t,
    s,
    i,
    o,
    c,
    u
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Ho(e, t, s, r));
};
function Jo(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Ts.test(t) && R(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ts.test(t) && W(n) ? !1 : t in e;
}
const Is = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return T(t) ? (n) => Nt(t, n) : t;
};
function ko(e) {
  e.target.composing = !0;
}
function Rs(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const dn = Symbol("_assign"), Xo = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[dn] = Is(r);
    const i = s || r.props && r.props.type === "number";
    Je(e, t ? "change" : "input", (o) => {
      if (o.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), i && (c = hn(c)), e[dn](c);
    }), n && Je(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Je(e, "compositionstart", ko), Je(e, "compositionend", Rs), Je(e, "change", Rs));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: r } }, i) {
    if (e[dn] = Is(i), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (r || e.type === "number") && hn(e.value) === t))
      return;
    const o = t ?? "";
    e.value !== o && (e.value = o);
  }
}, Zo = /* @__PURE__ */ Q({ patchProp: Yo }, No);
let Ps;
function Qo() {
  return Ps || (Ps = lo(Zo));
}
const Go = (...e) => {
  const t = Qo().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = el(s);
    if (!r)
      return;
    const i = t._component;
    !R(i) && !i.render && !i.template && (i.template = r.innerHTML), r.innerHTML = "";
    const o = n(r, !1, r instanceof SVGElement);
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function el(e) {
  return W(e) ? document.querySelector(e) : e;
}
const tl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, en = (e) => (wi("data-v-db562887"), e = e(), vi(), e), nl = { id: "main" }, sl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h1", { class: "title" }, "Find Your Nightline", -1)), rl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h5", { class: "title" }, "Start typing your University's name to find your Nightline", -1)), il = { key: 0 }, ol = { id: "results-summary-text" }, ll = { id: "results-list" }, cl = {
  key: 0,
  class: "result"
}, fl = ["href"], ul = { key: 1 }, al = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h1", {
  class: "title",
  id: "no-nightline-text"
}, " Unfortunately, your institution is not covered by a Nightline. ", -1)), dl = { key: 2 }, hl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h4", { id: "results-summary-text" }, "No results found. Try full institution name?", -1)), pl = [
  hl
], gl = "https://www.samaritans.org", ml = "https://www.nightline.ac.uk/universities-student-unions/setting-up-a-nightline", _l = {
  __name: "App",
  props: {
    institutions: {
      required: !0,
      type: Array
    }
  },
  setup(e) {
    const t = e, n = is(""), s = is(!1), r = Or(() => {
      const i = n.value.toLowerCase().trim();
      return i ? t.institutions.filter((o) => o.name.toLowerCase().includes(i)) : [];
    });
    return Ft(n, async () => {
      s.value = !1;
    }), (i, o) => (be(), Ce("div", nl, [
      sl,
      rl,
      Fi(V("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => n.value = c),
        type: "text",
        id: "search-box",
        placeholder: "Your institution here",
        autocomplete: "off"
      }, null, 512), [
        [Xo, n.value]
      ]),
      !s.value && r.value.length > 0 && n.value.length > 0 ? (be(), Ce("section", il, [
        V("h4", ol, "Showing results for: " + Ot(n.value), 1),
        V("ul", ll, [
          (be(!0), Ce(oe, null, qi(r.value, (c) => (be(), Ce(oe, {
            key: c.name
          }, [
            c.nightline ? (be(), Ce("li", cl, [
              V("a", {
                href: c.nightlineWebsite ?? "#",
                target: "_blank"
              }, [
                V("h3", null, Ot(c.name), 1),
                V("h4", null, "Nightline: " + Ot(c.nightline), 1)
              ], 8, fl)
            ])) : (be(), Ce("li", {
              key: 1,
              onClick: o[1] || (o[1] = (u) => s.value = !0),
              class: "result"
            }, [
              V("h3", null, Ot(c.name), 1)
            ]))
          ], 64))), 128))
        ])
      ])) : s.value ? (be(), Ce("section", ul, [
        al,
        V("p", null, [
          at(" You could contact "),
          V("a", {
            href: gl,
            target: "_blank"
          }, "Samaritans"),
          at(" instead. ")
        ]),
        V("p", null, [
          at(" Or, refer to "),
          V("a", {
            href: ml,
            target: "_blank"
          }, "our setup guidance"),
          at(" if you are interested in setting up a Nightline. ")
        ])
      ])) : n.value.length > 0 ? (be(), Ce("section", dl, pl)) : bo("", !0)
    ]));
  }
}, bl = /* @__PURE__ */ tl(_l, [["__scopeId", "data-v-db562887"]]);
var As;
Go(bl, {
  institutions: window.nightlines ? (As = JSON.parse(window.nightlines)) == null ? void 0 : As.institutions : []
}).mount("#app");
