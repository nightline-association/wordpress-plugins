function Tn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let r = 0; r < s.length; r++)
    n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const L = {}, ke = [], ue = () => {
}, Ir = () => !1, Pr = /^on[^a-z]/, $t = (e) => Pr.test(e), In = (e) => e.startsWith("onUpdate:"), Q = Object.assign, Pn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Ar = Object.prototype.hasOwnProperty, S = (e, t) => Ar.call(e, t), T = Array.isArray, Xe = (e) => zt(e) === "[object Map]", Ns = (e) => zt(e) === "[object Set]", P = (e) => typeof e == "function", W = (e) => typeof e == "string", Wt = (e) => typeof e == "symbol", j = (e) => e !== null && typeof e == "object", Ms = (e) => (j(e) || P(e)) && P(e.then) && P(e.catch), Ss = Object.prototype.toString, zt = (e) => Ss.call(e), Rr = (e) => zt(e).slice(8, -1), Fs = (e) => zt(e) === "[object Object]", An = (e) => W(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nt = /* @__PURE__ */ Tn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Vt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Nr = /-(\w)/g, Ge = Vt((e) => e.replace(Nr, (t, n) => n ? n.toUpperCase() : "")), Mr = /\B([A-Z])/g, nt = Vt(
  (e) => e.replace(Mr, "-$1").toLowerCase()
), Hs = Vt((e) => e.charAt(0).toUpperCase() + e.slice(1)), on = Vt((e) => e ? `on${Hs(e)}` : ""), Ke = (e, t) => !Object.is(e, t), Mt = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Dt = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, pn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Zn;
const hn = () => Zn || (Zn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Rn(e) {
  if (T(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = W(s) ? Ur(s) : Rn(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (W(e) || j(e))
    return e;
}
const Sr = /;(?![^(]*\))/g, Fr = /:([^]+)/, Hr = /\/\*[^]*?\*\//g;
function Ur(e) {
  const t = {};
  return e.replace(Hr, "").split(Sr).forEach((n) => {
    if (n) {
      const s = n.split(Fr);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Nn(e) {
  let t = "";
  if (W(e))
    t = e;
  else if (T(e))
    for (let n = 0; n < e.length; n++) {
      const s = Nn(e[n]);
      s && (t += s + " ");
    }
  else if (j(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Dr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Lr = /* @__PURE__ */ Tn(Dr);
function Us(e) {
  return !!e || e === "";
}
const Ct = (e) => W(e) ? e : e == null ? "" : T(e) || j(e) && (e.toString === Ss || !P(e.toString)) ? JSON.stringify(e, Ds, 2) : String(e), Ds = (e, t) => t && t.__v_isRef ? Ds(e, t.value) : Xe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, r]) => (n[`${s} =>`] = r, n), {})
} : Ns(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : j(t) && !T(t) && !Fs(t) ? String(t) : t;
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
const Mn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ls = (e) => (e.w & Ae) > 0, js = (e) => (e.n & Ae) > 0, $r = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ae;
}, Wr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      Ls(r) && !js(r) ? r.delete(e) : t[n++] = r, r.w &= ~Ae, r.n &= ~Ae;
    }
    t.length = n;
  }
}, gn = /* @__PURE__ */ new WeakMap();
let ft = 0, Ae = 1;
const _n = 30;
let le;
const je = Symbol(""), mn = Symbol("");
class Sn {
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
      return this.parent = le, le = this, Ie = !0, Ae = 1 << ++ft, ft <= _n ? $r(this) : Qn(this), this.fn();
    } finally {
      ft <= _n && Wr(this), Ae = 1 << --ft, le = this.parent, Ie = n, this.parent = void 0, this.deferStop && this.stop();
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
    r || s.set(n, r = Mn()), Ks(r);
  }
}
function Ks(e, t) {
  let n = !1;
  ft <= _n ? js(e) || (e.n |= Ae, n = !Ls(e)) : n = !e.has(le), n && (e.add(le), le.deps.push(e));
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
    o.forEach((a, _) => {
      (_ === "length" || !Wt(_) && _ >= u) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        T(e) ? An(n) && c.push(o.get("length")) : (c.push(o.get(je)), Xe(e) && c.push(o.get(mn)));
        break;
      case "delete":
        T(e) || (c.push(o.get(je)), Xe(e) && c.push(o.get(mn)));
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
    bn(Mn(u));
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
      const s = F(this);
      for (let i = 0, o = this.length; i < o; i++)
        ne(s, "get", i + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(F)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      st();
      const s = F(this)[t].apply(this, n);
      return rt(), s;
    };
  }), e;
}
function qr(e) {
  const t = F(this);
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
      if (o && S(es, n))
        return Reflect.get(es, n, s);
      if (n === "hasOwnProperty")
        return qr;
    }
    const c = Reflect.get(t, n, s);
    return (Wt(n) ? $s.has(n) : zr(n)) || (r || ne(t, "get", n), i) ? c : Z(c) ? o && An(n) ? c : c.value : j(c) ? r ? Js(c) : Un(c) : c;
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
    if (!this._shallow && (!Lt(s) && !et(s) && (i = F(i), s = F(s)), !T(t) && Z(i) && !Z(s)))
      return i.value = s, !0;
    const o = T(t) && An(n) ? Number(n) < t.length : S(t, n), c = Reflect.set(t, n, s, r);
    return t === F(r) && (o ? Ke(s, i) && ye(t, "set", n, s) : ye(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = S(t, n);
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
), Fn = (e) => e, qt = (e) => Reflect.getPrototypeOf(e);
function Ot(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = F(e), i = F(t);
  n || (Ke(t, i) && ne(r, "get", t), ne(r, "get", i));
  const { has: o } = qt(r), c = s ? Fn : n ? Ln : ht;
  if (o.call(r, t))
    return c(e.get(t));
  if (o.call(r, i))
    return c(e.get(i));
  e !== r && e.get(t);
}
function Tt(e, t = !1) {
  const n = this.__v_raw, s = F(n), r = F(e);
  return t || (Ke(e, r) && ne(s, "has", e), ne(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function It(e, t = !1) {
  return e = e.__v_raw, !t && ne(F(e), "iterate", je), Reflect.get(e, "size", e);
}
function ts(e) {
  e = F(e);
  const t = F(this);
  return qt(t).has.call(t, e) || (t.add(e), ye(t, "add", e, e)), this;
}
function ns(e, t) {
  t = F(t);
  const n = F(this), { has: s, get: r } = qt(n);
  let i = s.call(n, e);
  i || (e = F(e), i = s.call(n, e));
  const o = r.call(n, e);
  return n.set(e, t), i ? Ke(t, o) && ye(n, "set", e, t) : ye(n, "add", e, t), this;
}
function ss(e) {
  const t = F(this), { has: n, get: s } = qt(t);
  let r = n.call(t, e);
  r || (e = F(e), r = n.call(t, e)), s && s.call(t, e);
  const i = t.delete(e);
  return r && ye(t, "delete", e, void 0), i;
}
function rs() {
  const e = F(this), t = e.size !== 0, n = e.clear();
  return t && ye(e, "clear", void 0, void 0), n;
}
function Pt(e, t) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = F(o), u = t ? Fn : e ? Ln : ht;
    return !e && ne(c, "iterate", je), o.forEach((a, _) => s.call(r, u(a), u(_), i));
  };
}
function At(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = F(r), o = Xe(i), c = e === "entries" || e === Symbol.iterator && o, u = e === "keys" && o, a = r[e](...s), _ = n ? Fn : t ? Ln : ht;
    return !t && ne(
      i,
      "iterate",
      u ? mn : je
    ), {
      // iterator protocol
      next() {
        const { value: E, done: w } = a.next();
        return w ? { value: E, done: w } : {
          value: c ? [_(E[0]), _(E[1])] : _(E),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ce(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zr() {
  const e = {
    get(i) {
      return Ot(this, i);
    },
    get size() {
      return It(this);
    },
    has: Tt,
    add: ts,
    set: ns,
    delete: ss,
    clear: rs,
    forEach: Pt(!1, !1)
  }, t = {
    get(i) {
      return Ot(this, i, !1, !0);
    },
    get size() {
      return It(this);
    },
    has: Tt,
    add: ts,
    set: ns,
    delete: ss,
    clear: rs,
    forEach: Pt(!1, !0)
  }, n = {
    get(i) {
      return Ot(this, i, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: Pt(!0, !1)
  }, s = {
    get(i) {
      return Ot(this, i, !0, !0);
    },
    get size() {
      return It(this, !0);
    },
    has(i) {
      return Tt.call(this, i, !0);
    },
    add: Ce("add"),
    set: Ce("set"),
    delete: Ce("delete"),
    clear: Ce("clear"),
    forEach: Pt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
    e[i] = At(
      i,
      !1,
      !1
    ), n[i] = At(
      i,
      !0,
      !1
    ), t[i] = At(
      i,
      !1,
      !0
    ), s[i] = At(
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
function Hn(e, t) {
  const n = t ? e ? ti : ei : e ? Gr : Qr;
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    S(n, r) && r in s ? n : s,
    r,
    i
  );
}
const ni = {
  get: /* @__PURE__ */ Hn(!1, !1)
}, si = {
  get: /* @__PURE__ */ Hn(!1, !0)
}, ri = {
  get: /* @__PURE__ */ Hn(!0, !1)
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oi(Rr(e));
}
function Un(e) {
  return et(e) ? e : Dn(
    e,
    !1,
    Jr,
    ni,
    Vs
  );
}
function ci(e) {
  return Dn(
    e,
    !1,
    Xr,
    si,
    qs
  );
}
function Js(e) {
  return Dn(
    e,
    !0,
    kr,
    ri,
    Ys
  );
}
function Dn(e, t, n, s, r) {
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
function Lt(e) {
  return !!(e && e.__v_isShallow);
}
function ks(e) {
  return Ze(e) || et(e);
}
function F(e) {
  const t = e && e.__v_raw;
  return t ? F(t) : e;
}
function Xs(e) {
  return Dt(e, "__v_skip", !0), e;
}
const ht = (e) => j(e) ? Un(e) : e, Ln = (e) => j(e) ? Js(e) : e;
function Zs(e) {
  Ie && le && (e = F(e), Ks(e.dep || (e.dep = Mn())));
}
function Qs(e, t) {
  e = F(e);
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
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : F(t), this._value = n ? t : ht(t);
  }
  get value() {
    return Zs(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Lt(t) || et(t);
    t = n ? t : F(t), Ke(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ht(t), Qs(this));
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
class pi {
  constructor(t, n, s, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Sn(t, () => {
      this._dirty || (this._dirty = !0, Qs(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = F(this);
    return Zs(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function hi(e, t, n = !1) {
  let s, r;
  const i = P(e);
  return i ? (s = e, r = ue) : (s = e.get, r = e.set), new pi(s, r, i || !r, n);
}
var $e = { HERD_PHP_81_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/81/", MANPATH: "/opt/homebrew/share/man::", HERD_PHP_80_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/80/", NODE: "/opt/homebrew/Cellar/node/21.6.1/bin/node", INIT_CWD: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", TERM: "xterm-256color", SHELL: "/bin/zsh", HOMEBREW_REPOSITORY: "/opt/homebrew", TMPDIR: "/var/folders/z9/8822xnfn24n5hcphxthnkk8w0000gn/T/", npm_config_global_prefix: "/opt/homebrew", COLOR: "1", TERM_SESSION_ID: "2c140e0a-7f24-4d41-8ed9-f81ae3cbc0de", npm_config_noproxy: "", npm_config_local_prefix: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", HERD_PHP_83_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/83/", ZSH: "/Users/oliver/.oh-my-zsh", USER: "oliver", LS_COLORS: "di=1;36:ln=35:so=32:pi=33:ex=31:bd=34;46:cd=34;43:su=30;41:sg=30;46:tw=30;42:ow=30;43", COMMAND_MODE: "unix2003", npm_config_globalconfig: "/opt/homebrew/etc/npmrc", SSH_AUTH_SOCK: "/private/tmp/com.apple.launchd.9ryXBWcqyH/Listeners", __CF_USER_TEXT_ENCODING: "0x1F5:0x0:0x2", npm_execpath: "/opt/homebrew/lib/node_modules/npm/bin/npm-cli.js", HERD_PHP_82_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/82/", PAGER: "less", LSCOLORS: "Gxfxcxdxbxegedabagacad", PATH: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/node_modules/.bin:/Users/oliver/Projects/nightline/wordpress-plugins/node_modules/.bin:/Users/oliver/Projects/nightline/node_modules/.bin:/Users/oliver/Projects/node_modules/.bin:/Users/oliver/node_modules/.bin:/Users/node_modules/.bin:/node_modules/.bin:/opt/homebrew/lib/node_modules/npm/node_modules/@npmcli/run-script/lib/node-gyp-bin:/Users/oliver/Library/Application Support/Herd/bin:/Users/oliver/Library/Application Support/Herd/bin/:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Users/oliver/Library/Application Support/JetBrains/Toolbox/scripts", TERMINAL_EMULATOR: "JetBrains-JediTerm", npm_package_json: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/package.json", _: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline/node_modules/.bin/vite", npm_config_userconfig: "/Users/oliver/.npmrc", npm_config_init_module: "/Users/oliver/.npm-init.js", __CFBundleIdentifier: "com.jetbrains.PhpStorm", npm_command: "run-script", PWD: "/Users/oliver/Projects/nightline/wordpress-plugins/find-my-nightline", npm_lifecycle_event: "build", EDITOR: "vi", npm_package_name: "find-my-nightline", npm_config_npm_version: "10.4.0", XPC_FLAGS: "0x0", npm_config_node_gyp: "/opt/homebrew/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js", npm_package_version: "0.1.0", XPC_SERVICE_NAME: "0", SHLVL: "2", HOME: "/Users/oliver", HOMEBREW_PREFIX: "/opt/homebrew", IDEA_INITIAL_DIRECTORY: "/", npm_config_cache: "/Users/oliver/.npm", LESS: "-R", LOGNAME: "oliver", npm_lifecycle_script: "vite build", LC_CTYPE: "UTF-8", npm_config_user_agent: "npm/10.4.0 node/v21.6.1 darwin arm64 workspaces/false", HERD_PHP_74_INI_SCAN_DIR: "/Users/oliver/Library/Application Support/Herd/config/php/74/", INFOPATH: "/opt/homebrew/share/info:", HOMEBREW_CELLAR: "/opt/homebrew/Cellar", npm_node_execpath: "/opt/homebrew/Cellar/node/21.6.1/bin/node", npm_config_prefix: "/opt/homebrew", NODE_ENV: "production" };
function Pe(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    Yt(i, t, n);
  }
  return r;
}
function ae(e, t, n, s) {
  if (P(e)) {
    const i = Pe(e, t, n, s);
    return i && Ms(i) && i.catch((o) => {
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
        for (let _ = 0; _ < a.length; _++)
          if (a[_](e, o, c) === !1)
            return;
      }
      i = i.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Pe(
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
let _e = 0;
const Qe = [];
let xe = null, Ue = 0;
const er = /* @__PURE__ */ Promise.resolve();
let jn = null;
function _i(e) {
  const t = jn || er;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function mi(e) {
  let t = _e + 1, n = X.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = X[s], i = _t(r);
    i < e || i === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function Bn(e) {
  (!X.length || !X.includes(
    e,
    gt && e.allowRecurse ? _e + 1 : _e
  )) && (e.id == null ? X.push(e) : X.splice(mi(e.id), 0, e), tr());
}
function tr() {
  !gt && !xn && (xn = !0, jn = er.then(sr));
}
function bi(e) {
  const t = X.indexOf(e);
  t > _e && X.splice(t, 1);
}
function xi(e) {
  T(e) ? Qe.push(...e) : (!xe || !xe.includes(
    e,
    e.allowRecurse ? Ue + 1 : Ue
  )) && Qe.push(e), tr();
}
function os(e, t = gt ? _e + 1 : 0) {
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
    for (xe = t, xe.sort((n, s) => _t(n) - _t(s)), Ue = 0; Ue < xe.length; Ue++)
      xe[Ue]();
    xe = null, Ue = 0;
  }
}
const _t = (e) => e.id == null ? 1 / 0 : e.id, yi = (e, t) => {
  const n = _t(e) - _t(t);
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
    for (_e = 0; _e < X.length; _e++) {
      const n = X[_e];
      n && n.active !== !1 && ($e.NODE_ENV !== "production" && t(n), Pe(n, null, 14));
    }
  } finally {
    _e = 0, X.length = 0, nr(), gt = !1, jn = null, (X.length || Qe.length) && sr();
  }
}
function Ei(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || L;
  let r = n;
  const i = t.startsWith("update:"), o = i && t.slice(7);
  if (o && o in s) {
    const _ = `${o === "modelValue" ? "model" : o}Modifiers`, { number: E, trim: w } = s[_] || L;
    w && (r = n.map((A) => W(A) ? A.trim() : A)), E && (r = n.map(pn));
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
  if (!P(e)) {
    const u = (a) => {
      const _ = rr(a, t, !0);
      _ && (c = !0, Q(o, _));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !c ? (j(e) && s.set(e, null), null) : (T(i) ? i.forEach((u) => o[u] = null) : Q(o, i), j(e) && s.set(e, o), o);
}
function Jt(e, t) {
  return !e || !$t(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), S(e, t[0].toLowerCase() + t.slice(1)) || S(e, nt(t)) || S(e, t));
}
let ce = null, kt = null;
function jt(e) {
  const t = ce;
  return ce = e, kt = e && e.type.__scopeId || null, t;
}
function vi(e) {
  kt = e;
}
function wi() {
  kt = null;
}
function Ci(e, t = ce, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && _s(-1);
    const i = jt(t);
    let o;
    try {
      o = e(...r);
    } finally {
      jt(i), s._d && _s(1);
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
    render: _,
    renderCache: E,
    data: w,
    setupState: A,
    ctx: K,
    inheritAttrs: M
  } = e;
  let z, Y;
  const J = jt(e);
  try {
    if (n.shapeFlag & 4) {
      const R = r || s;
      z = ge(
        _.call(
          R,
          R,
          E,
          i,
          A,
          w,
          K
        )
      ), Y = u;
    } else {
      const R = t;
      $e.NODE_ENV, z = ge(
        R.length > 1 ? R(
          i,
          $e.NODE_ENV !== "production" ? {
            get attrs() {
              return u;
            },
            slots: c,
            emit: a
          } : { attrs: u, slots: c, emit: a }
        ) : R(
          i,
          null
          /* we know it doesn't need it */
        )
      ), Y = t.props ? u : Oi(u);
    }
  } catch (R) {
    pt.length = 0, Yt(R, e, 1), z = Ee(We);
  }
  let k = z;
  if (Y && M !== !1) {
    const R = Object.keys(Y), { shapeFlag: we } = k;
    R.length && we & 7 && (o && R.some(In) && (Y = Ti(
      Y,
      o
    )), k = ze(k, Y));
  }
  return n.dirs && (k = ze(k), k.dirs = k.dirs ? k.dirs.concat(n.dirs) : n.dirs), n.transition && (k.transition = n.transition), z = k, jt(J), z;
}
const Oi = (e) => {
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
      const _ = t.dynamicProps;
      for (let E = 0; E < _.length; E++) {
        const w = _[E];
        if (o[w] !== s[w] && !Jt(a, w))
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
function Pi({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const Ai = Symbol.for("v-ndc"), Ri = (e) => e.__isSuspense;
function Ni(e, t) {
  t && t.pendingBranch ? T(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const Rt = {};
function St(e, t, n) {
  return $e.NODE_ENV !== "production" && P(t), ir(e, t, n);
}
function ir(e, t, { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = L) {
  var c;
  const u = Kr() === ((c = q) == null ? void 0 : c.scope) ? q : null;
  let a, _ = !1, E = !1;
  if (Z(e) ? (a = () => e.value, _ = Lt(e)) : Ze(e) ? (a = () => e, s = !0) : T(e) ? (E = !0, _ = e.some((R) => Ze(R) || Lt(R)), a = () => e.map((R) => {
    if (Z(R))
      return R.value;
    if (Ze(R))
      return Le(R);
    if (P(R))
      return Pe(R, u, 2);
  })) : P(e) ? t ? a = () => Pe(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted))
      return w && w(), ae(
        e,
        u,
        3,
        [A]
      );
  } : a = ue, t && s) {
    const R = a;
    a = () => Le(R());
  }
  let w, A = (R) => {
    w = J.onStop = () => {
      Pe(R, u, 4);
    };
  }, K;
  if (bt)
    if (A = ue, t ? n && ae(t, u, 3, [
      a(),
      E ? [] : void 0,
      A
    ]) : a(), r === "sync") {
      const R = Ao();
      K = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return ue;
  let M = E ? new Array(e.length).fill(Rt) : Rt;
  const z = () => {
    if (J.active)
      if (t) {
        const R = J.run();
        (s || _ || (E ? R.some((we, it) => Ke(we, M[it])) : Ke(R, M))) && (w && w(), ae(t, u, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          M === Rt ? void 0 : E && M[0] === Rt ? [] : M,
          A
        ]), M = R);
      } else
        J.run();
  };
  z.allowRecurse = !!t;
  let Y;
  r === "sync" ? Y = z : r === "post" ? Y = () => te(z, u && u.suspense) : (z.pre = !0, u && (z.id = u.uid), Y = () => Bn(z));
  const J = new Sn(a, Y);
  t ? n ? z() : M = J.run() : r === "post" ? te(
    J.run.bind(J),
    u && u.suspense
  ) : J.run();
  const k = () => {
    J.stop(), u && u.scope && Pn(u.scope.effects, J);
  };
  return K && K.push(k), k;
}
function Mi(e, t, n) {
  const s = this.proxy, r = W(e) ? e.includes(".") ? or(s, e) : () => s[e] : e.bind(s, s);
  let i;
  P(t) ? i = t : (i = t.handler, n = t);
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
function Le(e, t) {
  if (!j(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Z(e))
    Le(e.value, t);
  else if (T(e))
    for (let n = 0; n < e.length; n++)
      Le(e[n], t);
  else if (Ns(e) || Xe(e))
    e.forEach((n) => {
      Le(n, t);
    });
  else if (Fs(e))
    for (const n in e)
      Le(e[n], t);
  return e;
}
function Si(e, t) {
  const n = ce;
  if (n === null)
    return e;
  const s = Gt(n) || n.proxy, r = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, c, u, a = L] = t[i];
    o && (P(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Le(c), r.push({
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
function Fe(e, t, n, s) {
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
const Ft = (e) => !!e.type.__asyncLoader, lr = (e) => e.type.__isKeepAlive;
function Fi(e, t) {
  cr(e, "a", t);
}
function Hi(e, t) {
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
      lr(r.parent.vnode) && Ui(s, t, n, r), r = r.parent;
  }
}
function Ui(e, t, n, s) {
  const r = Xt(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  fr(() => {
    Pn(s[t], r);
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
const ve = (e) => (t, n = q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!bt || e === "sp") && Xt(e, (...s) => t(...s), n)
), Di = ve("bm"), Li = ve("m"), ji = ve("bu"), Bi = ve("u"), Ki = ve("bum"), fr = ve("um"), $i = ve("sp"), Wi = ve(
  "rtg"
), zi = ve(
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
const yn = (e) => e ? vr(e) ? Gt(e) || e.proxy : yn(e.parent) : null, dt = (
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
    $nextTick: (e) => e.n || (e.n = _i.bind(e.proxy)),
    $watch: (e) => Mi.bind(e)
  })
), cn = (e, t) => e !== L && !e.__isScriptSetup && S(e, t), Yi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: c, appContext: u } = e;
    let a;
    if (t[0] !== "$") {
      const A = o[t];
      if (A !== void 0)
        switch (A) {
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
        if (r !== L && S(r, t))
          return o[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && S(a, t)
        )
          return o[t] = 3, i[t];
        if (n !== L && S(n, t))
          return o[t] = 4, n[t];
        En && (o[t] = 0);
      }
    }
    const _ = dt[t];
    let E, w;
    if (_)
      return t === "$attrs" && ne(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (E = c.__cssModules) && (E = E[t])
    )
      return E;
    if (n !== L && S(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      w = u.config.globalProperties, S(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return cn(r, t) ? (r[t] = n, !0) : s !== L && S(s, t) ? (s[t] = n, !0) : S(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: i }
  }, o) {
    let c;
    return !!n[o] || e !== L && S(e, o) || cn(t, o) || (c = i[0]) && S(c, o) || S(s, o) || S(dt, o) || S(r.config.globalProperties, o);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : S(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
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
    created: _,
    beforeMount: E,
    mounted: w,
    beforeUpdate: A,
    updated: K,
    activated: M,
    deactivated: z,
    beforeDestroy: Y,
    beforeUnmount: J,
    destroyed: k,
    unmounted: R,
    render: we,
    renderTracked: it,
    renderTriggered: xt,
    errorCaptured: Re,
    serverPrefetch: tn,
    // public API
    expose: Ne,
    inheritAttrs: ot,
    // assets
    components: yt,
    directives: Et,
    filters: nn
  } = t;
  if (a && ki(a, s, null), o)
    for (const B in o) {
      const U = o[B];
      P(U) && (s[B] = U.bind(n));
    }
  if (r) {
    const B = r.call(n, n);
    j(B) && (e.data = Un(B));
  }
  if (En = !0, i)
    for (const B in i) {
      const U = i[B], Me = P(U) ? U.bind(n, n) : P(U.get) ? U.get.bind(n, n) : ue, vt = !P(U) && P(U.set) ? U.set.bind(n) : ue, Se = Cr({
        get: Me,
        set: vt
      });
      Object.defineProperty(s, B, {
        enumerable: !0,
        configurable: !0,
        get: () => Se.value,
        set: (de) => Se.value = de
      });
    }
  if (c)
    for (const B in c)
      ur(c[B], s, n, B);
  if (u) {
    const B = P(u) ? u.call(n) : u;
    Reflect.ownKeys(B).forEach((U) => {
      to(U, B[U]);
    });
  }
  _ && fs(_, e, "c");
  function G(B, U) {
    T(U) ? U.forEach((Me) => B(Me.bind(n))) : U && B(U.bind(n));
  }
  if (G(Di, E), G(Li, w), G(ji, A), G(Bi, K), G(Fi, M), G(Hi, z), G(Vi, Re), G(zi, it), G(Wi, xt), G(Ki, J), G(fr, R), G($i, tn), T(Ne))
    if (Ne.length) {
      const B = e.exposed || (e.exposed = {});
      Ne.forEach((U) => {
        Object.defineProperty(B, U, {
          get: () => n[U],
          set: (Me) => n[U] = Me
        });
      });
    } else
      e.exposed || (e.exposed = {});
  we && e.render === ue && (e.render = we), ot != null && (e.inheritAttrs = ot), yt && (e.components = yt), Et && (e.directives = Et);
}
function ki(e, t, n = ue) {
  T(e) && (e = vn(e));
  for (const s in e) {
    const r = e[s];
    let i;
    j(r) ? "default" in r ? i = Ht(
      r.from || s,
      r.default,
      !0
      /* treat default function as factory */
    ) : i = Ht(r.from || s) : i = Ht(r), Z(i) ? Object.defineProperty(t, s, {
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
    P(i) && St(r, i);
  } else if (P(e))
    St(r, e.bind(n));
  else if (j(e))
    if (T(e))
      e.forEach((i) => ur(i, t, n, s));
    else {
      const i = P(e.handler) ? e.handler.bind(n) : t[e.handler];
      P(i) && St(r, i, e);
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
      P(e) ? e.call(this, this) : e,
      P(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Zi(e, t) {
  return ut(vn(e), vn(t));
}
function vn(e) {
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
    P(s) || (s = Q({}, s)), r != null && !j(r) && (r = null);
    const i = ar(), o = /* @__PURE__ */ new WeakSet();
    let c = !1;
    const u = i.app = {
      _uid: Gi++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Ro,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ..._) {
        return o.has(a) || (a && P(a.install) ? (o.add(a), a.install(u, ..._)) : P(a) && (o.add(a), a(u, ..._))), u;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), u;
      },
      component(a, _) {
        return _ ? (i.components[a] = _, u) : i.components[a];
      },
      directive(a, _) {
        return _ ? (i.directives[a] = _, u) : i.directives[a];
      },
      mount(a, _, E) {
        if (!c) {
          const w = Ee(s, r);
          return w.appContext = i, _ && t ? t(w, a) : e(w, a, E), c = !0, u._container = a, a.__vue_app__ = u, Gt(w.component) || w.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, _) {
        return i.provides[a] = _, u;
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
function Ht(e, t, n = !1) {
  const s = q || ce;
  if (s || Kt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Kt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && P(t) ? t.call(s && s.proxy) : t;
  }
}
function no(e, t, n, s = !1) {
  const r = {}, i = {};
  Dt(i, Qt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), dr(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : ci(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function so(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, c = F(r), [u] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const _ = e.vnode.dynamicProps;
      for (let E = 0; E < _.length; E++) {
        let w = _[E];
        if (Jt(e.emitsOptions, w))
          continue;
        const A = t[w];
        if (u)
          if (S(i, w))
            A !== i[w] && (i[w] = A, a = !0);
          else {
            const K = Ge(w);
            r[K] = wn(
              u,
              c,
              K,
              A,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          A !== i[w] && (i[w] = A, a = !0);
      }
    }
  } else {
    dr(e, t, r, i) && (a = !0);
    let _;
    for (const E in c)
      (!t || // for camelCase
      !S(t, E) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = nt(E)) === E || !S(t, _))) && (u ? n && // for camelCase
      (n[E] !== void 0 || // for kebab-case
      n[_] !== void 0) && (r[E] = wn(
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
        (!t || !S(t, E)) && (delete i[E], a = !0);
  }
  a && ye(e, "set", "$attrs");
}
function dr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, c;
  if (t)
    for (let u in t) {
      if (Nt(u))
        continue;
      const a = t[u];
      let _;
      r && S(r, _ = Ge(u)) ? !i || !i.includes(_) ? n[_] = a : (c || (c = {}))[_] = a : Jt(e.emitsOptions, u) || (!(u in s) || a !== s[u]) && (s[u] = a, o = !0);
    }
  if (i) {
    const u = F(n), a = c || L;
    for (let _ = 0; _ < i.length; _++) {
      const E = i[_];
      n[E] = wn(
        r,
        u,
        E,
        a[E],
        e,
        !S(a, E)
      );
    }
  }
  return o;
}
function wn(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const c = S(o, "default");
    if (c && s === void 0) {
      const u = o.default;
      if (o.type !== Function && !o.skipFactory && P(u)) {
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
function pr(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, c = [];
  let u = !1;
  if (!P(e)) {
    const _ = (E) => {
      u = !0;
      const [w, A] = pr(E, t, !0);
      Q(o, w), A && c.push(...A);
    };
    !n && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!i && !u)
    return j(e) && s.set(e, ke), ke;
  if (T(i))
    for (let _ = 0; _ < i.length; _++) {
      const E = Ge(i[_]);
      ds(E) && (o[E] = L);
    }
  else if (i)
    for (const _ in i) {
      const E = Ge(_);
      if (ds(E)) {
        const w = i[_], A = o[E] = T(w) || P(w) ? { type: w } : Q({}, w);
        if (A) {
          const K = gs(Boolean, A.type), M = gs(String, A.type);
          A[
            0
            /* shouldCast */
          ] = K > -1, A[
            1
            /* shouldCastTrue */
          ] = M < 0 || K < M, (K > -1 || S(A, "default")) && c.push(E);
        }
      }
    }
  const a = [o, c];
  return j(e) && s.set(e, a), a;
}
function ds(e) {
  return e[0] !== "$";
}
function ps(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function hs(e, t) {
  return ps(e) === ps(t);
}
function gs(e, t) {
  return T(t) ? t.findIndex((n) => hs(n, e)) : P(t) && hs(t, e) ? 0 : -1;
}
const hr = (e) => e[0] === "_" || e === "$stable", $n = (e) => T(e) ? e.map(ge) : [ge(e)], ro = (e, t, n) => {
  if (t._n)
    return t;
  const s = Ci((...r) => ($e.NODE_ENV, $n(t(...r))), n);
  return s._c = !1, s;
}, gr = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (hr(r))
      continue;
    const i = e[r];
    if (P(i))
      t[r] = ro(r, i, s);
    else if (i != null) {
      const o = $n(i);
      t[r] = () => o;
    }
  }
}, _r = (e, t) => {
  const n = $n(t);
  e.slots.default = () => n;
}, io = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = F(t), Dt(t, "_", n)) : gr(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && _r(e, t);
  Dt(e.slots, Qt, 1);
}, oo = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = L;
  if (s.shapeFlag & 32) {
    const c = t._;
    c ? n && c === 1 ? i = !1 : (Q(r, t), !n && c === 1 && delete r._) : (i = !t.$stable, gr(t, r)), o = t;
  } else
    t && (_r(e, t), o = { default: 1 });
  if (i)
    for (const c in r)
      !hr(c) && o[c] == null && delete r[c];
};
function Cn(e, t, n, s, r = !1) {
  if (T(e)) {
    e.forEach(
      (w, A) => Cn(
        w,
        t && (T(t) ? t[A] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Ft(s) && !r)
    return;
  const i = s.shapeFlag & 4 ? Gt(s.component) || s.component.proxy : s.el, o = r ? null : i, { i: c, r: u } = e, a = t && t.r, _ = c.refs === L ? c.refs = {} : c.refs, E = c.setupState;
  if (a != null && a !== u && (W(a) ? (_[a] = null, S(E, a) && (E[a] = null)) : Z(a) && (a.value = null)), P(u))
    Pe(u, c, 12, [o, _]);
  else {
    const w = W(u), A = Z(u);
    if (w || A) {
      const K = () => {
        if (e.f) {
          const M = w ? S(E, u) ? E[u] : _[u] : u.value;
          r ? T(M) && Pn(M, i) : T(M) ? M.includes(i) || M.push(i) : w ? (_[u] = [i], S(E, u) && (E[u] = _[u])) : (u.value = [i], e.k && (_[e.k] = u.value));
        } else
          w ? (_[u] = o, S(E, u) && (E[u] = o)) : A && (u.value = o, e.k && (_[e.k] = o));
      };
      o ? (K.id = -1, te(K, n)) : K();
    }
  }
}
const te = Ni;
function lo(e) {
  return co(e);
}
function co(e, t) {
  const n = hn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: c,
    createComment: u,
    setText: a,
    setElementText: _,
    parentNode: E,
    nextSibling: w,
    setScopeId: A = ue,
    insertStaticContent: K
  } = e, M = (l, f, d, p = null, h = null, b = null, y = !1, m = null, x = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !ct(l, f) && (p = wt(l), de(l, h, b, !0), l = null), f.patchFlag === -2 && (x = !1, f.dynamicChildren = null);
    const { type: g, ref: C, shapeFlag: v } = f;
    switch (g) {
      case Zt:
        z(l, f, d, p);
        break;
      case We:
        Y(l, f, d, p);
        break;
      case fn:
        l == null && J(f, d, p, y);
        break;
      case oe:
        yt(
          l,
          f,
          d,
          p,
          h,
          b,
          y,
          m,
          x
        );
        break;
      default:
        v & 1 ? we(
          l,
          f,
          d,
          p,
          h,
          b,
          y,
          m,
          x
        ) : v & 6 ? Et(
          l,
          f,
          d,
          p,
          h,
          b,
          y,
          m,
          x
        ) : (v & 64 || v & 128) && g.process(
          l,
          f,
          d,
          p,
          h,
          b,
          y,
          m,
          x,
          Ve
        );
    }
    C != null && h && Cn(C, l && l.ref, b, f || l, !f);
  }, z = (l, f, d, p) => {
    if (l == null)
      s(
        f.el = c(f.children),
        d,
        p
      );
    else {
      const h = f.el = l.el;
      f.children !== l.children && a(h, f.children);
    }
  }, Y = (l, f, d, p) => {
    l == null ? s(
      f.el = u(f.children || ""),
      d,
      p
    ) : f.el = l.el;
  }, J = (l, f, d, p) => {
    [l.el, l.anchor] = K(
      l.children,
      f,
      d,
      p,
      l.el,
      l.anchor
    );
  }, k = ({ el: l, anchor: f }, d, p) => {
    let h;
    for (; l && l !== f; )
      h = w(l), s(l, d, p), l = h;
    s(f, d, p);
  }, R = ({ el: l, anchor: f }) => {
    let d;
    for (; l && l !== f; )
      d = w(l), r(l), l = d;
    r(f);
  }, we = (l, f, d, p, h, b, y, m, x) => {
    y = y || f.type === "svg", l == null ? it(
      f,
      d,
      p,
      h,
      b,
      y,
      m,
      x
    ) : tn(
      l,
      f,
      h,
      b,
      y,
      m,
      x
    );
  }, it = (l, f, d, p, h, b, y, m) => {
    let x, g;
    const { type: C, props: v, shapeFlag: O, transition: I, dirs: N } = l;
    if (x = l.el = o(
      l.type,
      b,
      v && v.is,
      v
    ), O & 8 ? _(x, l.children) : O & 16 && Re(
      l.children,
      x,
      null,
      p,
      h,
      b && C !== "foreignObject",
      y,
      m
    ), N && Fe(l, null, p, "created"), xt(x, l, l.scopeId, y, p), v) {
      for (const H in v)
        H !== "value" && !Nt(H) && i(
          x,
          H,
          null,
          v[H],
          b,
          l.children,
          p,
          h,
          me
        );
      "value" in v && i(x, "value", null, v.value), (g = v.onVnodeBeforeMount) && he(g, p, l);
    }
    N && Fe(l, null, p, "beforeMount");
    const D = fo(h, I);
    D && I.beforeEnter(x), s(x, f, d), ((g = v && v.onVnodeMounted) || D || N) && te(() => {
      g && he(g, p, l), D && I.enter(x), N && Fe(l, null, p, "mounted");
    }, h);
  }, xt = (l, f, d, p, h) => {
    if (d && A(l, d), p)
      for (let b = 0; b < p.length; b++)
        A(l, p[b]);
    if (h) {
      let b = h.subTree;
      if (f === b) {
        const y = h.vnode;
        xt(
          l,
          y,
          y.scopeId,
          y.slotScopeIds,
          h.parent
        );
      }
    }
  }, Re = (l, f, d, p, h, b, y, m, x = 0) => {
    for (let g = x; g < l.length; g++) {
      const C = l[g] = m ? Te(l[g]) : ge(l[g]);
      M(
        null,
        C,
        f,
        d,
        p,
        h,
        b,
        y,
        m
      );
    }
  }, tn = (l, f, d, p, h, b, y) => {
    const m = f.el = l.el;
    let { patchFlag: x, dynamicChildren: g, dirs: C } = f;
    x |= l.patchFlag & 16;
    const v = l.props || L, O = f.props || L;
    let I;
    d && He(d, !1), (I = O.onVnodeBeforeUpdate) && he(I, d, f, l), C && Fe(f, l, d, "beforeUpdate"), d && He(d, !0);
    const N = h && f.type !== "foreignObject";
    if (g ? Ne(
      l.dynamicChildren,
      g,
      m,
      d,
      p,
      N,
      b
    ) : y || U(
      l,
      f,
      m,
      null,
      d,
      p,
      N,
      b,
      !1
    ), x > 0) {
      if (x & 16)
        ot(
          m,
          f,
          v,
          O,
          d,
          p,
          h
        );
      else if (x & 2 && v.class !== O.class && i(m, "class", null, O.class, h), x & 4 && i(m, "style", v.style, O.style, h), x & 8) {
        const D = f.dynamicProps;
        for (let H = 0; H < D.length; H++) {
          const $ = D[H], re = v[$], qe = O[$];
          (qe !== re || $ === "value") && i(
            m,
            $,
            re,
            qe,
            h,
            l.children,
            d,
            p,
            me
          );
        }
      }
      x & 1 && l.children !== f.children && _(m, f.children);
    } else
      !y && g == null && ot(
        m,
        f,
        v,
        O,
        d,
        p,
        h
      );
    ((I = O.onVnodeUpdated) || C) && te(() => {
      I && he(I, d, f, l), C && Fe(f, l, d, "updated");
    }, p);
  }, Ne = (l, f, d, p, h, b, y) => {
    for (let m = 0; m < f.length; m++) {
      const x = l[m], g = f[m], C = (
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
      M(
        x,
        g,
        C,
        null,
        p,
        h,
        b,
        y,
        !0
      );
    }
  }, ot = (l, f, d, p, h, b, y) => {
    if (d !== p) {
      if (d !== L)
        for (const m in d)
          !Nt(m) && !(m in p) && i(
            l,
            m,
            d[m],
            null,
            y,
            f.children,
            h,
            b,
            me
          );
      for (const m in p) {
        if (Nt(m))
          continue;
        const x = p[m], g = d[m];
        x !== g && m !== "value" && i(
          l,
          m,
          g,
          x,
          y,
          f.children,
          h,
          b,
          me
        );
      }
      "value" in p && i(l, "value", d.value, p.value);
    }
  }, yt = (l, f, d, p, h, b, y, m, x) => {
    const g = f.el = l ? l.el : c(""), C = f.anchor = l ? l.anchor : c("");
    let { patchFlag: v, dynamicChildren: O, slotScopeIds: I } = f;
    I && (m = m ? m.concat(I) : I), l == null ? (s(g, d, p), s(C, d, p), Re(
      f.children,
      d,
      C,
      h,
      b,
      y,
      m,
      x
    )) : v > 0 && v & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Ne(
      l.dynamicChildren,
      O,
      d,
      h,
      b,
      y,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || h && f === h.subTree) && mr(
      l,
      f,
      !0
      /* shallow */
    )) : U(
      l,
      f,
      d,
      C,
      h,
      b,
      y,
      m,
      x
    );
  }, Et = (l, f, d, p, h, b, y, m, x) => {
    f.slotScopeIds = m, l == null ? f.shapeFlag & 512 ? h.ctx.activate(
      f,
      d,
      p,
      y,
      x
    ) : nn(
      f,
      d,
      p,
      h,
      b,
      y,
      x
    ) : Vn(l, f, x);
  }, nn = (l, f, d, p, h, b, y) => {
    const m = l.component = vo(
      l,
      p,
      h
    );
    if (lr(l) && (m.ctx.renderer = Ve), wo(m), m.asyncDep) {
      if (h && h.registerDep(m, G), !l.el) {
        const x = m.subTree = Ee(We);
        Y(null, x, f, d);
      }
      return;
    }
    G(
      m,
      l,
      f,
      d,
      h,
      b,
      y
    );
  }, Vn = (l, f, d) => {
    const p = f.component = l.component;
    if (Ii(l, f, d))
      if (p.asyncDep && !p.asyncResolved) {
        B(p, f, d);
        return;
      } else
        p.next = f, bi(p.update), p.update();
    else
      f.el = l.el, p.vnode = f;
  }, G = (l, f, d, p, h, b, y) => {
    const m = () => {
      if (l.isMounted) {
        let { next: C, bu: v, u: O, parent: I, vnode: N } = l, D = C, H;
        He(l, !1), C ? (C.el = N.el, B(l, C, y)) : C = N, v && Mt(v), (H = C.props && C.props.onVnodeBeforeUpdate) && he(H, I, C, N), He(l, !0);
        const $ = ln(l), re = l.subTree;
        l.subTree = $, M(
          re,
          $,
          // parent may have changed if it's in a teleport
          E(re.el),
          // anchor may have changed if it's in a fragment
          wt(re),
          l,
          h,
          b
        ), C.el = $.el, D === null && Pi(l, $.el), O && te(O, h), (H = C.props && C.props.onVnodeUpdated) && te(
          () => he(H, I, C, N),
          h
        );
      } else {
        let C;
        const { el: v, props: O } = f, { bm: I, m: N, parent: D } = l, H = Ft(f);
        if (He(l, !1), I && Mt(I), !H && (C = O && O.onVnodeBeforeMount) && he(C, D, f), He(l, !0), v && rn) {
          const $ = () => {
            l.subTree = ln(l), rn(
              v,
              l.subTree,
              l,
              h,
              null
            );
          };
          H ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && $()
          ) : $();
        } else {
          const $ = l.subTree = ln(l);
          M(
            null,
            $,
            d,
            p,
            l,
            h,
            b
          ), f.el = $.el;
        }
        if (N && te(N, h), !H && (C = O && O.onVnodeMounted)) {
          const $ = f;
          te(
            () => he(C, D, $),
            h
          );
        }
        (f.shapeFlag & 256 || D && Ft(D.vnode) && D.vnode.shapeFlag & 256) && l.a && te(l.a, h), l.isMounted = !0, f = d = p = null;
      }
    }, x = l.effect = new Sn(
      m,
      () => Bn(g),
      l.scope
      // track it in component's effect scope
    ), g = l.update = () => x.run();
    g.id = l.uid, He(l, !0), g();
  }, B = (l, f, d) => {
    f.component = l;
    const p = l.vnode.props;
    l.vnode = f, l.next = null, so(l, f.props, p, d), oo(l, f.children, d), st(), os(), rt();
  }, U = (l, f, d, p, h, b, y, m, x = !1) => {
    const g = l && l.children, C = l ? l.shapeFlag : 0, v = f.children, { patchFlag: O, shapeFlag: I } = f;
    if (O > 0) {
      if (O & 128) {
        vt(
          g,
          v,
          d,
          p,
          h,
          b,
          y,
          m,
          x
        );
        return;
      } else if (O & 256) {
        Me(
          g,
          v,
          d,
          p,
          h,
          b,
          y,
          m,
          x
        );
        return;
      }
    }
    I & 8 ? (C & 16 && me(g, h, b), v !== g && _(d, v)) : C & 16 ? I & 16 ? vt(
      g,
      v,
      d,
      p,
      h,
      b,
      y,
      m,
      x
    ) : me(g, h, b, !0) : (C & 8 && _(d, ""), I & 16 && Re(
      v,
      d,
      p,
      h,
      b,
      y,
      m,
      x
    ));
  }, Me = (l, f, d, p, h, b, y, m, x) => {
    l = l || ke, f = f || ke;
    const g = l.length, C = f.length, v = Math.min(g, C);
    let O;
    for (O = 0; O < v; O++) {
      const I = f[O] = x ? Te(f[O]) : ge(f[O]);
      M(
        l[O],
        I,
        d,
        null,
        h,
        b,
        y,
        m,
        x
      );
    }
    g > C ? me(
      l,
      h,
      b,
      !0,
      !1,
      v
    ) : Re(
      f,
      d,
      p,
      h,
      b,
      y,
      m,
      x,
      v
    );
  }, vt = (l, f, d, p, h, b, y, m, x) => {
    let g = 0;
    const C = f.length;
    let v = l.length - 1, O = C - 1;
    for (; g <= v && g <= O; ) {
      const I = l[g], N = f[g] = x ? Te(f[g]) : ge(f[g]);
      if (ct(I, N))
        M(
          I,
          N,
          d,
          null,
          h,
          b,
          y,
          m,
          x
        );
      else
        break;
      g++;
    }
    for (; g <= v && g <= O; ) {
      const I = l[v], N = f[O] = x ? Te(f[O]) : ge(f[O]);
      if (ct(I, N))
        M(
          I,
          N,
          d,
          null,
          h,
          b,
          y,
          m,
          x
        );
      else
        break;
      v--, O--;
    }
    if (g > v) {
      if (g <= O) {
        const I = O + 1, N = I < C ? f[I].el : p;
        for (; g <= O; )
          M(
            null,
            f[g] = x ? Te(f[g]) : ge(f[g]),
            d,
            N,
            h,
            b,
            y,
            m,
            x
          ), g++;
      }
    } else if (g > O)
      for (; g <= v; )
        de(l[g], h, b, !0), g++;
    else {
      const I = g, N = g, D = /* @__PURE__ */ new Map();
      for (g = N; g <= O; g++) {
        const se = f[g] = x ? Te(f[g]) : ge(f[g]);
        se.key != null && D.set(se.key, g);
      }
      let H, $ = 0;
      const re = O - N + 1;
      let qe = !1, Jn = 0;
      const lt = new Array(re);
      for (g = 0; g < re; g++)
        lt[g] = 0;
      for (g = I; g <= v; g++) {
        const se = l[g];
        if ($ >= re) {
          de(se, h, b, !0);
          continue;
        }
        let pe;
        if (se.key != null)
          pe = D.get(se.key);
        else
          for (H = N; H <= O; H++)
            if (lt[H - N] === 0 && ct(se, f[H])) {
              pe = H;
              break;
            }
        pe === void 0 ? de(se, h, b, !0) : (lt[pe - N] = g + 1, pe >= Jn ? Jn = pe : qe = !0, M(
          se,
          f[pe],
          d,
          null,
          h,
          b,
          y,
          m,
          x
        ), $++);
      }
      const kn = qe ? uo(lt) : ke;
      for (H = kn.length - 1, g = re - 1; g >= 0; g--) {
        const se = N + g, pe = f[se], Xn = se + 1 < C ? f[se + 1].el : p;
        lt[g] === 0 ? M(
          null,
          pe,
          d,
          Xn,
          h,
          b,
          y,
          m,
          x
        ) : qe && (H < 0 || g !== kn[H] ? Se(pe, d, Xn, 2) : H--);
      }
    }
  }, Se = (l, f, d, p, h = null) => {
    const { el: b, type: y, transition: m, children: x, shapeFlag: g } = l;
    if (g & 6) {
      Se(l.component.subTree, f, d, p);
      return;
    }
    if (g & 128) {
      l.suspense.move(f, d, p);
      return;
    }
    if (g & 64) {
      y.move(l, f, d, Ve);
      return;
    }
    if (y === oe) {
      s(b, f, d);
      for (let v = 0; v < x.length; v++)
        Se(x[v], f, d, p);
      s(l.anchor, f, d);
      return;
    }
    if (y === fn) {
      k(l, f, d);
      return;
    }
    if (p !== 2 && g & 1 && m)
      if (p === 0)
        m.beforeEnter(b), s(b, f, d), te(() => m.enter(b), h);
      else {
        const { leave: v, delayLeave: O, afterLeave: I } = m, N = () => s(b, f, d), D = () => {
          v(b, () => {
            N(), I && I();
          });
        };
        O ? O(b, N, D) : D();
      }
    else
      s(b, f, d);
  }, de = (l, f, d, p = !1, h = !1) => {
    const {
      type: b,
      props: y,
      ref: m,
      children: x,
      dynamicChildren: g,
      shapeFlag: C,
      patchFlag: v,
      dirs: O
    } = l;
    if (m != null && Cn(m, null, d, l, !0), C & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const I = C & 1 && O, N = !Ft(l);
    let D;
    if (N && (D = y && y.onVnodeBeforeUnmount) && he(D, f, l), C & 6)
      Tr(l.component, d, p);
    else {
      if (C & 128) {
        l.suspense.unmount(d, p);
        return;
      }
      I && Fe(l, null, f, "beforeUnmount"), C & 64 ? l.type.remove(
        l,
        f,
        d,
        h,
        Ve,
        p
      ) : g && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== oe || v > 0 && v & 64) ? me(
        g,
        f,
        d,
        !1,
        !0
      ) : (b === oe && v & 384 || !h && C & 16) && me(x, f, d), p && qn(l);
    }
    (N && (D = y && y.onVnodeUnmounted) || I) && te(() => {
      D && he(D, f, l), I && Fe(l, null, f, "unmounted");
    }, d);
  }, qn = (l) => {
    const { type: f, el: d, anchor: p, transition: h } = l;
    if (f === oe) {
      Or(d, p);
      return;
    }
    if (f === fn) {
      R(l);
      return;
    }
    const b = () => {
      r(d), h && !h.persisted && h.afterLeave && h.afterLeave();
    };
    if (l.shapeFlag & 1 && h && !h.persisted) {
      const { leave: y, delayLeave: m } = h, x = () => y(d, b);
      m ? m(l.el, b, x) : x();
    } else
      b();
  }, Or = (l, f) => {
    let d;
    for (; l !== f; )
      d = w(l), r(l), l = d;
    r(f);
  }, Tr = (l, f, d) => {
    const { bum: p, scope: h, update: b, subTree: y, um: m } = l;
    p && Mt(p), h.stop(), b && (b.active = !1, de(y, l, f, d)), m && te(m, f), te(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, me = (l, f, d, p = !1, h = !1, b = 0) => {
    for (let y = b; y < l.length; y++)
      de(l[y], f, d, p, h);
  }, wt = (l) => l.shapeFlag & 6 ? wt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : w(l.anchor || l.el), Yn = (l, f, d) => {
    l == null ? f._vnode && de(f._vnode, null, null, !0) : M(f._vnode || null, l, f, null, null, null, d), os(), nr(), f._vnode = l;
  }, Ve = {
    p: M,
    um: de,
    m: Se,
    r: qn,
    mt: nn,
    mc: Re,
    pc: U,
    pbc: Ne,
    n: wt,
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
function He({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function fo(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function mr(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (T(s) && T(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let c = r[i];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[i] = Te(r[i]), c.el = o.el), n || mr(o, c)), c.type === Zt && (c.el = o.el);
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
const ao = (e) => e.__isTeleport, oe = Symbol.for("v-fgt"), Zt = Symbol.for("v-txt"), We = Symbol.for("v-cmt"), fn = Symbol.for("v-stc"), pt = [];
let fe = null;
function be(e = !1) {
  pt.push(fe = e ? null : []);
}
function po() {
  pt.pop(), fe = pt[pt.length - 1] || null;
}
let mt = 1;
function _s(e) {
  mt += e;
}
function br(e) {
  return e.dynamicChildren = mt > 0 ? fe || ke : null, po(), mt > 0 && fe && fe.push(e), e;
}
function Oe(e, t, n, s, r, i) {
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
function ho(e, t, n, s, r) {
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
const _o = (...e) => yr(
  ...e
), Qt = "__vInternal", xr = ({ key: e }) => e ?? null, Ut = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? W(e) || Z(e) || P(e) ? { i: ce, r: e, k: t, f: !!n } : e : null);
function V(e, t = null, n = null, s = 0, r = null, i = e === oe ? 0 : 1, o = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && xr(t),
    ref: t && Ut(t),
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
  return c ? (Wn(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= W(n) ? 8 : 16), mt > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const Ee = $e.NODE_ENV !== "production" ? _o : yr;
function yr(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Ai) && (e = We), go(e)) {
    const c = ze(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Wn(c, n), mt > 0 && !i && fe && (c.shapeFlag & 6 ? fe[fe.indexOf(e)] = c : fe.push(c)), c.patchFlag |= -2, c;
  }
  if (Io(e) && (e = e.__vccOpts), t) {
    t = mo(t);
    let { class: c, style: u } = t;
    c && !W(c) && (t.class = Nn(c)), j(u) && (ks(u) && !T(u) && (u = Q({}, u)), t.style = Rn(u));
  }
  const o = W(e) ? 1 : Ri(e) ? 128 : ao(e) ? 64 : j(e) ? 4 : P(e) ? 2 : 0;
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
function mo(e) {
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
      n && r ? T(r) ? r.concat(Ut(t)) : [r, Ut(t)] : Ut(t)
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
  return t ? (be(), ho(We, null, e)) : Ee(We, null, e);
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
    P(t) ? (t = { default: t, _ctx: ce }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [at(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xo(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Nn([t.class, s.class]));
      else if (r === "style")
        t.style = Rn([t.style, s.style]);
      else if ($t(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(T(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function he(e, t, n, s = null) {
  ae(e, t, 7, [
    n,
    s
  ]);
}
const yo = ar();
let Eo = 0;
function vo(e, t, n) {
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
    propsOptions: pr(s, r),
    emitsOptions: rr(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: L,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: L,
    data: L,
    props: L,
    attrs: L,
    slots: L,
    refs: L,
    setupState: L,
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
let q = null, zn, Ye, ms = "__VUE_INSTANCE_SETTERS__";
(Ye = hn()[ms]) || (Ye = hn()[ms] = []), Ye.push((e) => q = e), zn = (e) => {
  Ye.length > 1 ? Ye.forEach((t) => t(e)) : Ye[0](e);
};
const tt = (e) => {
  zn(e), e.scope.on();
}, Be = () => {
  q && q.scope.off(), zn(null);
};
function vr(e) {
  return e.vnode.shapeFlag & 4;
}
let bt = !1;
function wo(e, t = !1) {
  bt = t;
  const { props: n, children: s } = e.vnode, r = vr(e);
  no(e, n, r, t), io(e, s);
  const i = r ? Co(e, t) : void 0;
  return bt = !1, i;
}
function Co(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Xs(new Proxy(e.ctx, Yi));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? To(e) : null;
    tt(e), st();
    const i = Pe(
      s,
      e,
      0,
      [e.props, r]
    );
    if (rt(), Be(), Ms(i)) {
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
    wr(e, t);
}
function bs(e, t, n) {
  P(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : j(t) && (e.setupState = Gs(t)), wr(e, n);
}
let xs;
function wr(e, t, n) {
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
function Oo(e) {
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
      return Oo(e);
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
  return P(e) && "__vccOpts" in e;
}
const Cr = (e, t) => hi(e, t, bt), Po = Symbol.for("v-scx"), Ao = () => Ht(Po), Ro = "3.3.8", No = "http://www.w3.org/2000/svg", De = typeof document < "u" ? document : null, ys = De && /* @__PURE__ */ De.createElement("template"), Mo = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t ? De.createElementNS(No, e) : De.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => De.createTextNode(e),
  createComment: (e) => De.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => De.querySelector(e),
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
}, So = Symbol("_vtc");
function Fo(e, t, n) {
  const s = e[So];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ho = Symbol("_vod");
function Uo(e, t, n) {
  const s = e.style, r = W(n);
  if (n && !r) {
    if (t && !W(t))
      for (const i in t)
        n[i] == null && On(s, i, "");
    for (const i in n)
      On(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), Ho in e && (s.display = i);
  }
}
const Es = /\s*!important$/;
function On(e, t, n) {
  if (T(n))
    n.forEach((s) => On(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Do(e, t);
    Es.test(n) ? e.setProperty(
      nt(s),
      n.replace(Es, ""),
      "important"
    ) : e[s] = n;
  }
}
const vs = ["Webkit", "Moz", "ms"], un = {};
function Do(e, t) {
  const n = un[t];
  if (n)
    return n;
  let s = Ge(t);
  if (s !== "filter" && s in e)
    return un[t] = s;
  s = Hs(s);
  for (let r = 0; r < vs.length; r++) {
    const i = vs[r] + s;
    if (i in e)
      return un[t] = i;
  }
  return t;
}
const ws = "http://www.w3.org/1999/xlink";
function Lo(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(ws, t.slice(6, t.length)) : e.setAttributeNS(ws, t, n);
  else {
    const i = Lr(t);
    n == null || i && !Us(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : n);
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
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, _ = n ?? "";
    a !== _ && (e.value = _), n == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean" ? n = Us(n) : n == null && a === "string" ? (n = "", u = !0) : a === "number" && (n = 0, u = !0);
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
const Cs = Symbol("_vei");
function Ko(e, t, n, s, r = null) {
  const i = e[Cs] || (e[Cs] = {}), o = i[t];
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
const Os = /(?:Once|Passive|Capture)$/;
function $o(e) {
  let t;
  if (Os.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Os); )
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
  t === "class" ? Fo(e, s, r) : t === "style" ? Uo(e, n, s) : $t(t) ? In(t) || Ko(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Jo(e, t, s, r)) ? jo(
    e,
    t,
    s,
    i,
    o,
    c,
    u
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), Lo(e, t, s, r));
};
function Jo(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && Ts.test(t) && P(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Ts.test(t) && W(n) ? !1 : t in e;
}
const Is = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return T(t) ? (n) => Mt(t, n) : t;
};
function ko(e) {
  e.target.composing = !0;
}
function Ps(e) {
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
      n && (c = c.trim()), i && (c = pn(c)), e[dn](c);
    }), n && Je(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Je(e, "compositionstart", ko), Je(e, "compositionend", Ps), Je(e, "change", Ps));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: r } }, i) {
    if (e[dn] = Is(i), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (r || e.type === "number") && pn(e.value) === t))
      return;
    const o = t ?? "";
    e.value !== o && (e.value = o);
  }
}, Zo = /* @__PURE__ */ Q({ patchProp: Yo }, Mo);
let As;
function Qo() {
  return As || (As = lo(Zo));
}
const Go = (...e) => {
  const t = Qo().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = el(s);
    if (!r)
      return;
    const i = t._component;
    !P(i) && !i.render && !i.template && (i.template = r.innerHTML), r.innerHTML = "";
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
}, en = (e) => (vi("data-v-c6fa26d5"), e = e(), wi(), e), nl = { id: "main" }, sl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h1", { class: "title" }, "Find Your Nightline", -1)), rl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("p", { class: "title" }, "Start typing your University's name to find your Nightline", -1)), il = { key: 0 }, ol = { id: "results-summary-text" }, ll = { id: "results-list" }, cl = {
  key: 0,
  class: "result"
}, fl = ["href"], ul = { key: 1 }, al = /* @__PURE__ */ en(() => /* @__PURE__ */ V("h2", {
  class: "title",
  id: "no-nightline-text"
}, " Unfortunately, your institution is not covered by a Nightline. ", -1)), dl = { key: 2 }, pl = /* @__PURE__ */ en(() => /* @__PURE__ */ V("p", { id: "results-summary-text" }, "No results found. Try full institution name?", -1)), hl = [
  pl
], gl = "https://www.samaritans.org", _l = "https://www.nightline.ac.uk/universities-student-unions/setting-up-a-nightline", ml = {
  __name: "App",
  props: {
    institutions: {
      required: !0,
      type: Array
    }
  },
  setup(e) {
    const t = e, n = is(""), s = is(!1), r = Cr(() => {
      const i = n.value.toLowerCase().trim();
      return i ? t.institutions.filter((o) => o.name.toLowerCase().includes(i)) : [];
    });
    return St(n, async () => {
      s.value = !1;
    }), (i, o) => (be(), Oe("div", nl, [
      sl,
      rl,
      Si(V("input", {
        "onUpdate:modelValue": o[0] || (o[0] = (c) => n.value = c),
        type: "text",
        id: "search-box",
        placeholder: "Your institution here",
        autocomplete: "off"
      }, null, 512), [
        [Xo, n.value]
      ]),
      !s.value && r.value.length > 0 && n.value.length > 0 ? (be(), Oe("section", il, [
        V("h2", ol, "Showing results for: " + Ct(n.value), 1),
        V("ul", ll, [
          (be(!0), Oe(oe, null, qi(r.value, (c) => (be(), Oe(oe, {
            key: c.name
          }, [
            c.nightline ? (be(), Oe("li", cl, [
              V("a", {
                href: c.nightlineWebsite ?? "#",
                target: "_blank"
              }, [
                V("h3", null, Ct(c.name), 1),
                V("h4", null, "Nightline: " + Ct(c.nightline), 1)
              ], 8, fl)
            ])) : (be(), Oe("li", {
              key: 1,
              onClick: o[1] || (o[1] = (u) => s.value = !0),
              class: "result"
            }, [
              V("h3", null, Ct(c.name), 1)
            ]))
          ], 64))), 128))
        ])
      ])) : s.value ? (be(), Oe("section", ul, [
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
            href: _l,
            target: "_blank"
          }, "our setup guidance"),
          at(" if you are interested in setting up a Nightline. ")
        ])
      ])) : n.value.length > 0 ? (be(), Oe("section", dl, hl)) : bo("", !0)
    ]));
  }
}, bl = /* @__PURE__ */ tl(ml, [["__scopeId", "data-v-c6fa26d5"]]);
var Rs;
Go(bl, {
  institutions: window.nightlines ? (Rs = JSON.parse(window.nightlines)) == null ? void 0 : Rs.institutions : []
}).mount("#app");
