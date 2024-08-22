function As(e, t) {
  const s = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let r = 0; r < n.length; r++)
    s[n[r]] = !0;
  return t ? (r) => !!s[r.toLowerCase()] : (r) => !!s[r];
}
const H = {}, Ye = [], ue = () => {
}, wr = () => !1, Sr = /^on[^a-z]/, Bt = (e) => Sr.test(e), vs = (e) => e.startsWith("onUpdate:"), Z = Object.assign, ws = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Dr = Object.prototype.hasOwnProperty, M = (e, t) => Dr.call(e, t), v = Array.isArray, Qe = (e) => Vt(e) === "[object Map]", Tn = (e) => Vt(e) === "[object Set]", S = (e) => typeof e == "function", K = (e) => typeof e == "string", Kt = (e) => typeof e == "symbol", J = (e) => e !== null && typeof e == "object", In = (e) => (J(e) || S(e)) && S(e.then) && S(e.catch), Mn = Object.prototype.toString, Vt = (e) => Mn.call(e), Rr = (e) => Vt(e).slice(8, -1), Nn = (e) => Vt(e) === "[object Object]", Ss = (e) => K(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Tt = /* @__PURE__ */ As(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $t = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (s) => t[s] || (t[s] = e(s));
}, Tr = /-(\w)/g, et = $t((e) => e.replace(Tr, (t, s) => s ? s.toUpperCase() : "")), Ir = /\B([A-Z])/g, nt = $t(
  (e) => e.replace(Ir, "-$1").toLowerCase()
), Fn = $t((e) => e.charAt(0).toUpperCase() + e.slice(1)), os = $t((e) => e ? `on${Fn(e)}` : ""), We = (e, t) => !Object.is(e, t), It = (e, t) => {
  for (let s = 0; s < e.length; s++)
    e[s](t);
}, Lt = (e, t, s) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: s
  });
}, ds = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Ys;
const hs = () => Ys || (Ys = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ds(e) {
  if (v(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = K(n) ? Ur(n) : Ds(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (K(e) || J(e))
    return e;
}
const Mr = /;(?![^(]*\))/g, Nr = /:([^]+)/, Fr = /\/\*[^]*?\*\//g;
function Ur(e) {
  const t = {};
  return e.replace(Fr, "").split(Mr).forEach((s) => {
    if (s) {
      const n = s.split(Nr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Rs(e) {
  let t = "";
  if (K(e))
    t = e;
  else if (v(e))
    for (let s = 0; s < e.length; s++) {
      const n = Rs(e[s]);
      n && (t += n + " ");
    }
  else if (J(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Lr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Hr = /* @__PURE__ */ As(Lr);
function Un(e) {
  return !!e || e === "";
}
const Pt = (e) => K(e) ? e : e == null ? "" : v(e) || J(e) && (e.toString === Mn || !S(e.toString)) ? JSON.stringify(e, Ln, 2) : String(e), Ln = (e, t) => t && t.__v_isRef ? Ln(e, t.value) : Qe(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, r]) => (s[`${n} =>`] = r, s), {})
} : Tn(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : J(t) && !v(t) && !Nn(t) ? String(t) : t;
let oe;
class Jr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = oe, !t && oe && (this.index = (oe.scopes || (oe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const s = oe;
      try {
        return oe = this, t();
      } finally {
        oe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    oe = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    oe = this.parent;
  }
  stop(t) {
    if (this._active) {
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.scopes)
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function jr(e, t = oe) {
  t && t.active && t.effects.push(e);
}
function Wr() {
  return oe;
}
const Ts = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Hn = (e) => (e.w & De) > 0, Jn = (e) => (e.n & De) > 0, Br = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= De;
}, Kr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let s = 0;
    for (let n = 0; n < t.length; n++) {
      const r = t[n];
      Hn(r) && !Jn(r) ? r.delete(e) : t[s++] = r, r.w &= ~De, r.n &= ~De;
    }
    t.length = s;
  }
}, ps = /* @__PURE__ */ new WeakMap();
let ut = 0, De = 1;
const ms = 30;
let le;
const Je = Symbol(""), _s = Symbol("");
class Is {
  constructor(t, s = null, n) {
    this.fn = t, this.scheduler = s, this.active = !0, this.deps = [], this.parent = void 0, jr(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = le, s = we;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = le, le = this, we = !0, De = 1 << ++ut, ut <= ms ? Br(this) : Qs(this), this.fn();
    } finally {
      ut <= ms && Kr(this), De = 1 << --ut, le = this.parent, we = s, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    le === this ? this.deferStop = !0 : this.active && (Qs(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Qs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let s = 0; s < t.length; s++)
      t[s].delete(e);
    t.length = 0;
  }
}
let we = !0;
const jn = [];
function rt() {
  jn.push(we), we = !1;
}
function ot() {
  const e = jn.pop();
  we = e === void 0 ? !0 : e;
}
function se(e, t, s) {
  if (we && le) {
    let n = ps.get(e);
    n || ps.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || n.set(s, r = Ts()), Wn(r);
  }
}
function Wn(e, t) {
  let s = !1;
  ut <= ms ? Jn(e) || (e.n |= De, s = !Hn(e)) : s = !e.has(le), s && (e.add(le), le.deps.push(e));
}
function Ee(e, t, s, n, r, o) {
  const i = ps.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (s === "length" && v(e)) {
    const u = Number(n);
    i.forEach((a, _) => {
      (_ === "length" || !Kt(_) && _ >= u) && c.push(a);
    });
  } else
    switch (s !== void 0 && c.push(i.get(s)), t) {
      case "add":
        v(e) ? Ss(s) && c.push(i.get("length")) : (c.push(i.get(Je)), Qe(e) && c.push(i.get(_s)));
        break;
      case "delete":
        v(e) || (c.push(i.get(Je)), Qe(e) && c.push(i.get(_s)));
        break;
      case "set":
        Qe(e) && c.push(i.get(Je));
        break;
    }
  if (c.length === 1)
    c[0] && gs(c[0]);
  else {
    const u = [];
    for (const a of c)
      a && u.push(...a);
    gs(Ts(u));
  }
}
function gs(e, t) {
  const s = v(e) ? e : [...e];
  for (const n of s)
    n.computed && Zs(n);
  for (const n of s)
    n.computed || Zs(n);
}
function Zs(e, t) {
  (e !== le || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Vr = /* @__PURE__ */ As("__proto__,__v_isRef,__isVue"), Bn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Kt)
), Gs = /* @__PURE__ */ $r();
function $r() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...s) {
      const n = N(this);
      for (let o = 0, i = this.length; o < i; o++)
        se(n, "get", o + "");
      const r = n[t](...s);
      return r === -1 || r === !1 ? n[t](...s.map(N)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...s) {
      rt();
      const n = N(this)[t].apply(this, s);
      return ot(), n;
    };
  }), e;
}
function kr(e) {
  const t = N(this);
  return se(t, "has", e), t.hasOwnProperty(e);
}
class Kn {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._shallow = s;
  }
  get(t, s, n) {
    const r = this._isReadonly, o = this._shallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw" && n === (r ? o ? oo : zn : o ? kn : $n).get(t))
      return t;
    const i = v(t);
    if (!r) {
      if (i && M(Gs, s))
        return Reflect.get(Gs, s, n);
      if (s === "hasOwnProperty")
        return kr;
    }
    const c = Reflect.get(t, s, n);
    return (Kt(s) ? Bn.has(s) : Vr(s)) || (r || se(t, "get", s), o) ? c : Q(c) ? i && Ss(s) ? c : c.value : J(c) ? r ? Xn(c) : Fs(c) : c;
  }
}
class Vn extends Kn {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    if (tt(o) && Q(o) && !Q(n))
      return !1;
    if (!this._shallow && (!Ht(n) && !tt(n) && (o = N(o), n = N(n)), !v(t) && Q(o) && !Q(n)))
      return o.value = n, !0;
    const i = v(t) && Ss(s) ? Number(s) < t.length : M(t, s), c = Reflect.set(t, s, n, r);
    return t === N(r) && (i ? We(n, o) && Ee(t, "set", s, n) : Ee(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = M(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Ee(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Kt(s) || !Bn.has(s)) && se(t, "has", s), n;
  }
  ownKeys(t) {
    return se(
      t,
      "iterate",
      v(t) ? "length" : Je
    ), Reflect.ownKeys(t);
  }
}
class zr extends Kn {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Xr = /* @__PURE__ */ new Vn(), qr = /* @__PURE__ */ new zr(), Yr = /* @__PURE__ */ new Vn(
  !0
), Ms = (e) => e, kt = (e) => Reflect.getPrototypeOf(e);
function At(e, t, s = !1, n = !1) {
  e = e.__v_raw;
  const r = N(e), o = N(t);
  s || (We(t, o) && se(r, "get", t), se(r, "get", o));
  const { has: i } = kt(r), c = n ? Ms : s ? Ls : pt;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, o))
    return c(e.get(o));
  e !== r && e.get(t);
}
function vt(e, t = !1) {
  const s = this.__v_raw, n = N(s), r = N(e);
  return t || (We(e, r) && se(n, "has", e), se(n, "has", r)), e === r ? s.has(e) : s.has(e) || s.has(r);
}
function wt(e, t = !1) {
  return e = e.__v_raw, !t && se(N(e), "iterate", Je), Reflect.get(e, "size", e);
}
function en(e) {
  e = N(e);
  const t = N(this);
  return kt(t).has.call(t, e) || (t.add(e), Ee(t, "add", e, e)), this;
}
function tn(e, t) {
  t = N(t);
  const s = N(this), { has: n, get: r } = kt(s);
  let o = n.call(s, e);
  o || (e = N(e), o = n.call(s, e));
  const i = r.call(s, e);
  return s.set(e, t), o ? We(t, i) && Ee(s, "set", e, t) : Ee(s, "add", e, t), this;
}
function sn(e) {
  const t = N(this), { has: s, get: n } = kt(t);
  let r = s.call(t, e);
  r || (e = N(e), r = s.call(t, e)), n && n.call(t, e);
  const o = t.delete(e);
  return r && Ee(t, "delete", e, void 0), o;
}
function nn() {
  const e = N(this), t = e.size !== 0, s = e.clear();
  return t && Ee(e, "clear", void 0, void 0), s;
}
function St(e, t) {
  return function(n, r) {
    const o = this, i = o.__v_raw, c = N(i), u = t ? Ms : e ? Ls : pt;
    return !e && se(c, "iterate", Je), i.forEach((a, _) => n.call(r, u(a), u(_), o));
  };
}
function Dt(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = N(r), i = Qe(o), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = r[e](...n), _ = s ? Ms : t ? Ls : pt;
    return !t && se(
      o,
      "iterate",
      u ? _s : Je
    ), {
      // iterator protocol
      next() {
        const { value: x, done: O } = a.next();
        return O ? { value: x, done: O } : {
          value: c ? [_(x[0]), _(x[1])] : _(x),
          done: O
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Pe(e) {
  return function(...t) {
    return e === "delete" ? !1 : this;
  };
}
function Qr() {
  const e = {
    get(o) {
      return At(this, o);
    },
    get size() {
      return wt(this);
    },
    has: vt,
    add: en,
    set: tn,
    delete: sn,
    clear: nn,
    forEach: St(!1, !1)
  }, t = {
    get(o) {
      return At(this, o, !1, !0);
    },
    get size() {
      return wt(this);
    },
    has: vt,
    add: en,
    set: tn,
    delete: sn,
    clear: nn,
    forEach: St(!1, !0)
  }, s = {
    get(o) {
      return At(this, o, !0);
    },
    get size() {
      return wt(this, !0);
    },
    has(o) {
      return vt.call(this, o, !0);
    },
    add: Pe("add"),
    set: Pe("set"),
    delete: Pe("delete"),
    clear: Pe("clear"),
    forEach: St(!0, !1)
  }, n = {
    get(o) {
      return At(this, o, !0, !0);
    },
    get size() {
      return wt(this, !0);
    },
    has(o) {
      return vt.call(this, o, !0);
    },
    add: Pe("add"),
    set: Pe("set"),
    delete: Pe("delete"),
    clear: Pe("clear"),
    forEach: St(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Dt(
      o,
      !1,
      !1
    ), s[o] = Dt(
      o,
      !0,
      !1
    ), t[o] = Dt(
      o,
      !1,
      !0
    ), n[o] = Dt(
      o,
      !0,
      !0
    );
  }), [
    e,
    s,
    t,
    n
  ];
}
const [
  Zr,
  Gr,
  eo,
  to
] = /* @__PURE__ */ Qr();
function Ns(e, t) {
  const s = t ? e ? to : eo : e ? Gr : Zr;
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    M(s, r) && r in n ? s : n,
    r,
    o
  );
}
const so = {
  get: /* @__PURE__ */ Ns(!1, !1)
}, no = {
  get: /* @__PURE__ */ Ns(!1, !0)
}, ro = {
  get: /* @__PURE__ */ Ns(!0, !1)
}, $n = /* @__PURE__ */ new WeakMap(), kn = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap();
function io(e) {
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
function lo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : io(Rr(e));
}
function Fs(e) {
  return tt(e) ? e : Us(
    e,
    !1,
    Xr,
    so,
    $n
  );
}
function co(e) {
  return Us(
    e,
    !1,
    Yr,
    no,
    kn
  );
}
function Xn(e) {
  return Us(
    e,
    !0,
    qr,
    ro,
    zn
  );
}
function Us(e, t, s, n, r) {
  if (!J(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = lo(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? n : s
  );
  return r.set(e, c), c;
}
function Ze(e) {
  return tt(e) ? Ze(e.__v_raw) : !!(e && e.__v_isReactive);
}
function tt(e) {
  return !!(e && e.__v_isReadonly);
}
function Ht(e) {
  return !!(e && e.__v_isShallow);
}
function qn(e) {
  return Ze(e) || tt(e);
}
function N(e) {
  const t = e && e.__v_raw;
  return t ? N(t) : e;
}
function Yn(e) {
  return Lt(e, "__v_skip", !0), e;
}
const pt = (e) => J(e) ? Fs(e) : e, Ls = (e) => J(e) ? Xn(e) : e;
function Qn(e) {
  we && le && (e = N(e), Wn(e.dep || (e.dep = Ts())));
}
function Zn(e, t) {
  e = N(e);
  const s = e.dep;
  s && gs(s);
}
function Q(e) {
  return !!(e && e.__v_isRef === !0);
}
function rn(e) {
  return fo(e, !1);
}
function fo(e, t) {
  return Q(e) ? e : new uo(e, t);
}
class uo {
  constructor(t, s) {
    this.__v_isShallow = s, this.dep = void 0, this.__v_isRef = !0, this._rawValue = s ? t : N(t), this._value = s ? t : pt(t);
  }
  get value() {
    return Qn(this), this._value;
  }
  set value(t) {
    const s = this.__v_isShallow || Ht(t) || tt(t);
    t = s ? t : N(t), We(t, this._rawValue) && (this._rawValue = t, this._value = s ? t : pt(t), Zn(this));
  }
}
function ao(e) {
  return Q(e) ? e.value : e;
}
const ho = {
  get: (e, t, s) => ao(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return Q(r) && !Q(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Gn(e) {
  return Ze(e) ? e : new Proxy(e, ho);
}
class po {
  constructor(t, s, n, r) {
    this._setter = s, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Is(t, () => {
      this._dirty || (this._dirty = !0, Zn(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = n;
  }
  get value() {
    const t = N(this);
    return Qn(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function mo(e, t, s = !1) {
  let n, r;
  const o = S(e);
  return o ? (n = e, r = ue) : (n = e.get, r = e.set), new po(n, r, o || !r, s);
}
var Be = { ALLUSERSPROFILE: "C:\\ProgramData", APPDATA: "C:\\Users\\Joshua\\AppData\\Roaming", CHROME_CRASHPAD_PIPE_NAME: "\\\\.\\pipe\\crashpad_18624_VDXLWTQOWCJYMETB", COLOR: "1", COLORTERM: "truecolor", CommonProgramFiles: "C:\\Program Files\\Common Files", "CommonProgramFiles(x86)": "C:\\Program Files (x86)\\Common Files", CommonProgramW6432: "C:\\Program Files\\Common Files", COMPUTERNAME: "JERICHO-HUB", ComSpec: "C:\\WINDOWS\\system32\\cmd.exe", DriverData: "C:\\Windows\\System32\\Drivers\\DriverData", EDITOR: "C:\\WINDOWS\\notepad.exe", EFC_5732: "1", FNM_ARCH: "x64", FNM_COREPACK_ENABLED: "false", FNM_DIR: "C:\\Users\\Joshua\\AppData\\Roaming\\fnm", FNM_LOGLEVEL: "info", FNM_MULTISHELL_PATH: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294", FNM_NODE_DIST_MIRROR: "https://nodejs.org/dist", FNM_RESOLVE_ENGINES: "false", FNM_VERSION_FILE_STRATEGY: "local", GIT_ASKPASS: "c:\\Users\\Joshua\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh", HOME: "C:\\Users\\Joshua", HOMEDRIVE: "C:", HOMEPATH: "\\Users\\Joshua", INIT_CWD: "C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\wordpress-plugins\\find-my-nightline", JAVA_HOME: "C:\\Program Files\\Amazon Corretto\\jdk11.0.12_7", LANG: "en_US.UTF-8", LOCALAPPDATA: "C:\\Users\\Joshua\\AppData\\Local", LOGONSERVER: "\\\\JERICHO-HUB", NODE: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\node.exe", NODE_ENV: "production", NODE_EXE: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\\\node.exe", NPM_CLI_JS: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\node_modules\\npm\\bin\\npm-cli.js", npm_command: "run-script", npm_config_cache: "C:\\Users\\Joshua\\AppData\\Local\\npm-cache", npm_config_globalconfig: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\etc\\npmrc", npm_config_global_prefix: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294", npm_config_init_module: "C:\\Users\\Joshua\\.npm-init.js", npm_config_local_prefix: "C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\wordpress-plugins\\find-my-nightline", npm_config_node_gyp: "C:\\Users\\Joshua\\AppData\\Roaming\\fnm\\node-versions\\v20.17.0\\installation\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js", npm_config_noproxy: "", npm_config_npm_version: "10.8.2", npm_config_prefix: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294", npm_config_userconfig: "C:\\Users\\Joshua\\.npmrc", npm_config_user_agent: "npm/10.8.2 node/v20.17.0 win32 x64 workspaces/false", npm_execpath: "C:\\Users\\Joshua\\AppData\\Roaming\\fnm\\node-versions\\v20.17.0\\installation\\node_modules\\npm\\bin\\npm-cli.js", npm_lifecycle_event: "build", npm_lifecycle_script: "vite build", npm_node_execpath: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\node.exe", npm_package_json: "C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\wordpress-plugins\\find-my-nightline\\package.json", npm_package_name: "find-my-nightline", npm_package_version: "0.1.0", NPM_PREFIX_JS: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\\\node_modules\\npm\\bin\\npm-prefix.js", NPM_PREFIX_NPM_CLI_JS: "C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294\\node_modules\\npm\\bin\\npm-cli.js", NUMBER_OF_PROCESSORS: "8", OneDrive: "C:\\Users\\Joshua\\OneDrive", OneDriveConsumer: "C:\\Users\\Joshua\\OneDrive", ORIGINAL_XDG_CURRENT_DESKTOP: "undefined", OS: "Windows_NT", Path: "C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\wordpress-plugins\\find-my-nightline\\node_modules\\.bin;C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\wordpress-plugins\\node_modules\\.bin;C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\NLA\\node_modules\\.bin;C:\\Users\\Joshua\\OneDrive\\Documents\\Projects\\node_modules\\.bin;C:\\Users\\Joshua\\OneDrive\\Documents\\node_modules\\.bin;C:\\Users\\Joshua\\OneDrive\\node_modules\\.bin;C:\\Users\\Joshua\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Users\\Joshua\\AppData\\Roaming\\fnm\\node-versions\\v20.17.0\\installation\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\11216_1724342597294;C:\\Users\\Joshua\\AppData\\Local\\fnm_multishells\\9980_1724340077790;C:\\Program Files\\Amazon Corretto\\jdk11.0.12_7\\bin;C:\\Program Files\\Eclipse Foundation\\jdk-11.0.12.7-hotspot\\bin;C:\\Program Files\\Python39\\Scripts\\;C:\\Program Files\\Python39\\;C:\\WINDOWS\\system32;C:\\WINDOWS;C:\\WINDOWS\\System32\\Wbem;C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\;C:\\WINDOWS\\System32\\OpenSSH\\;C:\\Program Files (x86)\\Pulse Secure\\VC142.CRT\\X64\\;C:\\Program Files (x86)\\Pulse Secure\\VC142.CRT\\X86\\;C:\\Program Files\\dotnet\\;C:\\Program Files\\Amazon Corretto\\jdk11.0.12_7\\bin;C:\\HashiCorp\\Vagrant\\bin;C:\\Program Files\\Git\\cmd;C:\\Program Files\\Kathara;;C:\\Program Files\\Docker\\Docker\\resources\\bin;C:\\Users\\Joshua\\.cargo\\bin;C:\\Ruby31-x64\\bin;C:\\Users\\Joshua\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Joshua\\AppData\\Local\\gitkraken\\bin;C:\\Users\\Joshua\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64\\;C:\\Libraries\\ffmpeg\\bin;C:\\Users\\Joshua\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Joshua\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\Joshua\\AppData\\Roaming\\Python\\Scripts;C:\\Users\\Joshua\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe;C:\\xampp\\php;", PATHEXT: ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.PY;.PYW;.RB;.RBW;.CPL", PROCESSOR_ARCHITECTURE: "AMD64", PROCESSOR_IDENTIFIER: "Intel64 Family 6 Model 58 Stepping 9, GenuineIntel", PROCESSOR_LEVEL: "6", PROCESSOR_REVISION: "3a09", ProgramData: "C:\\ProgramData", ProgramFiles: "C:\\Program Files", "ProgramFiles(x86)": "C:\\Program Files (x86)", ProgramW6432: "C:\\Program Files", PROMPT: "$P$G", PSModulePath: "C:\\Users\\Joshua\\OneDrive\\Documents\\WindowsPowerShell\\Modules;C:\\Program Files\\WindowsPowerShell\\Modules;C:\\WINDOWS\\system32\\WindowsPowerShell\\v1.0\\Modules", PUBLIC: "C:\\Users\\Public", SESSIONNAME: "Console", SystemDrive: "C:", SystemRoot: "C:\\WINDOWS", TEMP: "C:\\Users\\Joshua\\AppData\\Local\\Temp", TERM_PROGRAM: "vscode", TERM_PROGRAM_VERSION: "1.92.2", TMP: "C:\\Users\\Joshua\\AppData\\Local\\Temp", USERDOMAIN: "JERICHO-HUB", USERDOMAIN_ROAMINGPROFILE: "JERICHO-HUB", USERNAME: "Joshua", USERPROFILE: "C:\\Users\\Joshua", VBOX_MSI_INSTALL_PATH: "C:\\Program Files\\Oracle\\VirtualBox\\", VSCODE_GIT_ASKPASS_EXTRA_ARGS: "", VSCODE_GIT_ASKPASS_MAIN: "c:\\Users\\Joshua\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js", VSCODE_GIT_ASKPASS_NODE: "C:\\Users\\Joshua\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe", VSCODE_GIT_IPC_HANDLE: "\\\\.\\pipe\\vscode-git-576996789c-sock", VSCODE_INJECTION: "1", VSCODE_NONCE: "2cb46279-abfa-4d6b-acd4-e342218bde81", VSCODE_STABLE: "1", windir: "C:\\WINDOWS", __PSLockDownPolicy: "0" };
function Se(e, t, s, n) {
  let r;
  try {
    r = n ? e(...n) : e();
  } catch (o) {
    zt(o, t, s);
  }
  return r;
}
function ae(e, t, s, n) {
  if (S(e)) {
    const o = Se(e, t, s, n);
    return o && In(o) && o.catch((i) => {
      zt(i, t, s);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(ae(e[o], t, s, n));
  return r;
}
function zt(e, t, s, n = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, c = s;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let _ = 0; _ < a.length; _++)
          if (a[_](e, i, c) === !1)
            return;
      }
      o = o.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Se(
        u,
        null,
        10,
        [e, i, c]
      );
      return;
    }
  }
  _o(e, s, r, n);
}
function _o(e, t, s, n = !0) {
  console.error(e);
}
let mt = !1, bs = !1;
const Y = [];
let _e = 0;
const Ge = [];
let Ce = null, Ue = 0;
const er = /* @__PURE__ */ Promise.resolve();
let Hs = null;
function go(e) {
  const t = Hs || er;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function bo(e) {
  let t = _e + 1, s = Y.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = Y[n], o = _t(r);
    o < e || o === e && r.pre ? t = n + 1 : s = n;
  }
  return t;
}
function Js(e) {
  (!Y.length || !Y.includes(
    e,
    mt && e.allowRecurse ? _e + 1 : _e
  )) && (e.id == null ? Y.push(e) : Y.splice(bo(e.id), 0, e), tr());
}
function tr() {
  !mt && !bs && (bs = !0, Hs = er.then(nr));
}
function Co(e) {
  const t = Y.indexOf(e);
  t > _e && Y.splice(t, 1);
}
function Eo(e) {
  v(e) ? Ge.push(...e) : (!Ce || !Ce.includes(
    e,
    e.allowRecurse ? Ue + 1 : Ue
  )) && Ge.push(e), tr();
}
function on(e, t = mt ? _e + 1 : 0) {
  for (; t < Y.length; t++) {
    const s = Y[t];
    s && s.pre && (Y.splice(t, 1), t--, s());
  }
}
function sr(e) {
  if (Ge.length) {
    const t = [...new Set(Ge)];
    if (Ge.length = 0, Ce) {
      Ce.push(...t);
      return;
    }
    for (Ce = t, Ce.sort((s, n) => _t(s) - _t(n)), Ue = 0; Ue < Ce.length; Ue++)
      Ce[Ue]();
    Ce = null, Ue = 0;
  }
}
const _t = (e) => e.id == null ? 1 / 0 : e.id, xo = (e, t) => {
  const s = _t(e) - _t(t);
  if (s === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return s;
};
function nr(e) {
  bs = !1, mt = !0, Y.sort(xo);
  const t = ue;
  try {
    for (_e = 0; _e < Y.length; _e++) {
      const s = Y[_e];
      s && s.active !== !1 && (Be.NODE_ENV !== "production" && t(s), Se(s, null, 14));
    }
  } finally {
    _e = 0, Y.length = 0, sr(), mt = !1, Hs = null, (Y.length || Ge.length) && nr();
  }
}
function yo(e, t, ...s) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || H;
  let r = s;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in n) {
    const _ = `${i === "modelValue" ? "model" : i}Modifiers`, { number: x, trim: O } = n[_] || H;
    O && (r = s.map((D) => K(D) ? D.trim() : D)), x && (r = s.map(ds));
  }
  let c, u = n[c = os(t)] || // also try camelCase event handler (#2249)
  n[c = os(et(t))];
  !u && o && (u = n[c = os(nt(t))]), u && ae(
    u,
    e,
    6,
    r
  );
  const a = n[c + "Once"];
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
function rr(e, t, s = !1) {
  const n = t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, c = !1;
  if (!S(e)) {
    const u = (a) => {
      const _ = rr(a, t, !0);
      _ && (c = !0, Z(i, _));
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !o && !c ? (J(e) && n.set(e, null), null) : (v(o) ? o.forEach((u) => i[u] = null) : Z(i, o), J(e) && n.set(e, i), i);
}
function Xt(e, t) {
  return !e || !Bt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), M(e, t[0].toLowerCase() + t.slice(1)) || M(e, nt(t)) || M(e, t));
}
let ce = null, qt = null;
function Jt(e) {
  const t = ce;
  return ce = e, qt = e && e.type.__scopeId || null, t;
}
function Oo(e) {
  qt = e;
}
function Po() {
  qt = null;
}
function Ao(e, t = ce, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && _n(-1);
    const o = Jt(t);
    let i;
    try {
      i = e(...r);
    } finally {
      Jt(o), n._d && _n(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function is(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: c,
    attrs: u,
    emit: a,
    render: _,
    renderCache: x,
    data: O,
    setupState: D,
    ctx: W,
    inheritAttrs: I
  } = e;
  let V, z;
  const X = Jt(e);
  try {
    if (s.shapeFlag & 4) {
      const R = r || n;
      V = me(
        _.call(
          R,
          R,
          x,
          o,
          D,
          O,
          W
        )
      ), z = u;
    } else {
      const R = t;
      Be.NODE_ENV, V = me(
        R.length > 1 ? R(
          o,
          Be.NODE_ENV !== "production" ? {
            get attrs() {
              return u;
            },
            slots: c,
            emit: a
          } : { attrs: u, slots: c, emit: a }
        ) : R(
          o,
          null
          /* we know it doesn't need it */
        )
      ), z = t.props ? u : vo(u);
    }
  } catch (R) {
    ht.length = 0, zt(R, e, 1), V = xe(Ke);
  }
  let q = V;
  if (z && I !== !1) {
    const R = Object.keys(z), { shapeFlag: Oe } = q;
    R.length && Oe & 7 && (i && R.some(vs) && (z = wo(
      z,
      i
    )), q = Ve(q, z));
  }
  return s.dirs && (q = Ve(q), q.dirs = q.dirs ? q.dirs.concat(s.dirs) : s.dirs), s.transition && (q.transition = s.transition), V = q, Jt(X), V;
}
const vo = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Bt(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, wo = (e, t) => {
  const s = {};
  for (const n in e)
    (!vs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function So(e, t, s) {
  const { props: n, children: r, component: o } = e, { props: i, children: c, patchFlag: u } = t, a = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return n ? ln(n, i, a) : !!i;
    if (u & 8) {
      const _ = t.dynamicProps;
      for (let x = 0; x < _.length; x++) {
        const O = _[x];
        if (i[O] !== n[O] && !Xt(a, O))
          return !0;
      }
    }
  } else
    return (r || c) && (!c || !c.$stable) ? !0 : n === i ? !1 : n ? i ? ln(n, i, a) : !0 : !!i;
  return !1;
}
function ln(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (t[o] !== e[o] && !Xt(s, o))
      return !0;
  }
  return !1;
}
function Do({ vnode: e, parent: t }, s) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = s, t = t.parent;
}
const Ro = Symbol.for("v-ndc"), To = (e) => e.__isSuspense;
function Io(e, t) {
  t && t.pendingBranch ? v(e) ? t.effects.push(...e) : t.effects.push(e) : Eo(e);
}
const Rt = {};
function Mt(e, t, s) {
  return Be.NODE_ENV !== "production" && S(t), or(e, t, s);
}
function or(e, t, { immediate: s, deep: n, flush: r, onTrack: o, onTrigger: i } = H) {
  var c;
  const u = Wr() === ((c = k) == null ? void 0 : c.scope) ? k : null;
  let a, _ = !1, x = !1;
  if (Q(e) ? (a = () => e.value, _ = Ht(e)) : Ze(e) ? (a = () => e, n = !0) : v(e) ? (x = !0, _ = e.some((R) => Ze(R) || Ht(R)), a = () => e.map((R) => {
    if (Q(R))
      return R.value;
    if (Ze(R))
      return He(R);
    if (S(R))
      return Se(R, u, 2);
  })) : S(e) ? t ? a = () => Se(e, u, 2) : a = () => {
    if (!(u && u.isUnmounted))
      return O && O(), ae(
        e,
        u,
        3,
        [D]
      );
  } : a = ue, t && n) {
    const R = a;
    a = () => He(R());
  }
  let O, D = (R) => {
    O = X.onStop = () => {
      Se(R, u, 4);
    };
  }, W;
  if (bt)
    if (D = ue, t ? s && ae(t, u, 3, [
      a(),
      x ? [] : void 0,
      D
    ]) : a(), r === "sync") {
      const R = Di();
      W = R.__watcherHandles || (R.__watcherHandles = []);
    } else
      return ue;
  let I = x ? new Array(e.length).fill(Rt) : Rt;
  const V = () => {
    if (X.active)
      if (t) {
        const R = X.run();
        (n || _ || (x ? R.some((Oe, it) => We(Oe, I[it])) : We(R, I))) && (O && O(), ae(t, u, 3, [
          R,
          // pass undefined as the old value when it's changed for the first time
          I === Rt ? void 0 : x && I[0] === Rt ? [] : I,
          D
        ]), I = R);
      } else
        X.run();
  };
  V.allowRecurse = !!t;
  let z;
  r === "sync" ? z = V : r === "post" ? z = () => te(V, u && u.suspense) : (V.pre = !0, u && (V.id = u.uid), z = () => Js(V));
  const X = new Is(a, z);
  t ? s ? V() : I = X.run() : r === "post" ? te(
    X.run.bind(X),
    u && u.suspense
  ) : X.run();
  const q = () => {
    X.stop(), u && u.scope && ws(u.scope.effects, X);
  };
  return W && W.push(q), q;
}
function Mo(e, t, s) {
  const n = this.proxy, r = K(e) ? e.includes(".") ? ir(n, e) : () => n[e] : e.bind(n, n);
  let o;
  S(t) ? o = t : (o = t.handler, s = t);
  const i = k;
  st(this);
  const c = or(r, o.bind(n), s);
  return i ? st(i) : je(), c;
}
function ir(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
function He(e, t) {
  if (!J(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), Q(e))
    He(e.value, t);
  else if (v(e))
    for (let s = 0; s < e.length; s++)
      He(e[s], t);
  else if (Tn(e) || Qe(e))
    e.forEach((s) => {
      He(s, t);
    });
  else if (Nn(e))
    for (const s in e)
      He(e[s], t);
  return e;
}
function No(e, t) {
  const s = ce;
  if (s === null)
    return e;
  const n = Gt(s) || s.proxy, r = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, c, u, a = H] = t[o];
    i && (S(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && He(c), r.push({
      dir: i,
      instance: n,
      value: c,
      oldValue: void 0,
      arg: u,
      modifiers: a
    }));
  }
  return e;
}
function Ne(e, t, s, n) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const c = r[i];
    o && (c.oldValue = o[i].value);
    let u = c.dir[n];
    u && (rt(), ae(u, s, 8, [
      e.el,
      c,
      e,
      t
    ]), ot());
  }
}
const Nt = (e) => !!e.type.__asyncLoader, lr = (e) => e.type.__isKeepAlive;
function Fo(e, t) {
  cr(e, "a", t);
}
function Uo(e, t) {
  cr(e, "da", t);
}
function cr(e, t, s = k) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Yt(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      lr(r.parent.vnode) && Lo(n, t, s, r), r = r.parent;
  }
}
function Lo(e, t, s, n) {
  const r = Yt(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  fr(() => {
    ws(n[t], r);
  }, s);
}
function Yt(e, t, s = k, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (s.isUnmounted)
        return;
      rt(), st(s);
      const c = ae(t, s, e, i);
      return je(), ot(), c;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const ye = (e) => (t, s = k) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!bt || e === "sp") && Yt(e, (...n) => t(...n), s)
), Ho = ye("bm"), Jo = ye("m"), jo = ye("bu"), Wo = ye("u"), Bo = ye("bum"), fr = ye("um"), Ko = ye("sp"), Vo = ye(
  "rtg"
), $o = ye(
  "rtc"
);
function ko(e, t = k) {
  Yt("ec", e, t);
}
function zo(e, t, s, n) {
  let r;
  const o = s && s[n];
  if (v(e) || K(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (J(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, c) => t(i, c, void 0, o && o[c])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let c = 0, u = i.length; c < u; c++) {
        const a = i[c];
        r[c] = t(e[a], a, c, o && o[c]);
      }
    }
  else
    r = [];
  return s && (s[n] = r), r;
}
const Cs = (e) => e ? yr(e) ? Gt(e) || e.proxy : Cs(e.parent) : null, dt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Z(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Cs(e.parent),
    $root: (e) => Cs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => js(e),
    $forceUpdate: (e) => e.f || (e.f = () => Js(e.update)),
    $nextTick: (e) => e.n || (e.n = go.bind(e.proxy)),
    $watch: (e) => Mo.bind(e)
  })
), ls = (e, t) => e !== H && !e.__isScriptSetup && M(e, t), Xo = {
  get({ _: e }, t) {
    const { ctx: s, setupState: n, data: r, props: o, accessCache: i, type: c, appContext: u } = e;
    let a;
    if (t[0] !== "$") {
      const D = i[t];
      if (D !== void 0)
        switch (D) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (ls(n, t))
          return i[t] = 1, n[t];
        if (r !== H && M(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && M(a, t)
        )
          return i[t] = 3, o[t];
        if (s !== H && M(s, t))
          return i[t] = 4, s[t];
        Es && (i[t] = 0);
      }
    }
    const _ = dt[t];
    let x, O;
    if (_)
      return t === "$attrs" && se(e, "get", t), _(e);
    if (
      // css module (injected by vue-loader)
      (x = c.__cssModules) && (x = x[t])
    )
      return x;
    if (s !== H && M(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      O = u.config.globalProperties, M(O, t)
    )
      return O[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return ls(r, t) ? (r[t] = s, !0) : n !== H && M(n, t) ? (n[t] = s, !0) : M(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!s[i] || e !== H && M(e, i) || ls(t, i) || (c = o[0]) && M(c, i) || M(n, i) || M(dt, i) || M(r.config.globalProperties, i);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : M(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function cn(e) {
  return v(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Es = !0;
function qo(e) {
  const t = js(e), s = e.proxy, n = e.ctx;
  Es = !1, t.beforeCreate && fn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: c,
    provide: u,
    inject: a,
    // lifecycle
    created: _,
    beforeMount: x,
    mounted: O,
    beforeUpdate: D,
    updated: W,
    activated: I,
    deactivated: V,
    beforeDestroy: z,
    beforeUnmount: X,
    destroyed: q,
    unmounted: R,
    render: Oe,
    renderTracked: it,
    renderTriggered: Ct,
    errorCaptured: Re,
    serverPrefetch: ts,
    // public API
    expose: Te,
    inheritAttrs: lt,
    // assets
    components: Et,
    directives: xt,
    filters: ss
  } = t;
  if (a && Yo(a, n, null), i)
    for (const j in i) {
      const U = i[j];
      S(U) && (n[j] = U.bind(s));
    }
  if (r) {
    const j = r.call(s, s);
    J(j) && (e.data = Fs(j));
  }
  if (Es = !0, o)
    for (const j in o) {
      const U = o[j], Ie = S(U) ? U.bind(s, s) : S(U.get) ? U.get.bind(s, s) : ue, yt = !S(U) && S(U.set) ? U.set.bind(s) : ue, Me = Pr({
        get: Ie,
        set: yt
      });
      Object.defineProperty(n, j, {
        enumerable: !0,
        configurable: !0,
        get: () => Me.value,
        set: (de) => Me.value = de
      });
    }
  if (c)
    for (const j in c)
      ur(c[j], n, s, j);
  if (u) {
    const j = S(u) ? u.call(s) : u;
    Reflect.ownKeys(j).forEach((U) => {
      si(U, j[U]);
    });
  }
  _ && fn(_, e, "c");
  function G(j, U) {
    v(U) ? U.forEach((Ie) => j(Ie.bind(s))) : U && j(U.bind(s));
  }
  if (G(Ho, x), G(Jo, O), G(jo, D), G(Wo, W), G(Fo, I), G(Uo, V), G(ko, Re), G($o, it), G(Vo, Ct), G(Bo, X), G(fr, R), G(Ko, ts), v(Te))
    if (Te.length) {
      const j = e.exposed || (e.exposed = {});
      Te.forEach((U) => {
        Object.defineProperty(j, U, {
          get: () => s[U],
          set: (Ie) => s[U] = Ie
        });
      });
    } else
      e.exposed || (e.exposed = {});
  Oe && e.render === ue && (e.render = Oe), lt != null && (e.inheritAttrs = lt), Et && (e.components = Et), xt && (e.directives = xt);
}
function Yo(e, t, s = ue) {
  v(e) && (e = xs(e));
  for (const n in e) {
    const r = e[n];
    let o;
    J(r) ? "default" in r ? o = Ft(
      r.from || n,
      r.default,
      !0
      /* treat default function as factory */
    ) : o = Ft(r.from || n) : o = Ft(r), Q(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function fn(e, t, s) {
  ae(
    v(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function ur(e, t, s, n) {
  const r = n.includes(".") ? ir(s, n) : () => s[n];
  if (K(e)) {
    const o = t[e];
    S(o) && Mt(r, o);
  } else if (S(e))
    Mt(r, e.bind(s));
  else if (J(e))
    if (v(e))
      e.forEach((o) => ur(o, t, s, n));
    else {
      const o = S(e.handler) ? e.handler.bind(s) : t[e.handler];
      S(o) && Mt(r, o, e);
    }
}
function js(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let u;
  return c ? u = c : !r.length && !s && !n ? u = t : (u = {}, r.length && r.forEach(
    (a) => jt(u, a, i, !0)
  ), jt(u, t, i)), J(t) && o.set(t, u), u;
}
function jt(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && jt(e, o, s, !0), r && r.forEach(
    (i) => jt(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const c = Qo[i] || s && s[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Qo = {
  data: un,
  props: an,
  emits: an,
  // objects
  methods: at,
  computed: at,
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
  components: at,
  directives: at,
  // watch
  watch: Go,
  // provide / inject
  provide: un,
  inject: Zo
};
function un(e, t) {
  return t ? e ? function() {
    return Z(
      S(e) ? e.call(this, this) : e,
      S(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Zo(e, t) {
  return at(xs(e), xs(t));
}
function xs(e) {
  if (v(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function at(e, t) {
  return e ? Z(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function an(e, t) {
  return e ? v(e) && v(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Z(
    /* @__PURE__ */ Object.create(null),
    cn(e),
    cn(t ?? {})
  ) : t;
}
function Go(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const s = Z(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = ee(e[n], t[n]);
  return s;
}
function ar() {
  return {
    app: null,
    config: {
      isNativeTag: wr,
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
let ei = 0;
function ti(e, t) {
  return function(n, r = null) {
    S(n) || (n = Z({}, n)), r != null && !J(r) && (r = null);
    const o = ar(), i = /* @__PURE__ */ new WeakSet();
    let c = !1;
    const u = o.app = {
      _uid: ei++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Ri,
      get config() {
        return o.config;
      },
      set config(a) {
      },
      use(a, ..._) {
        return i.has(a) || (a && S(a.install) ? (i.add(a), a.install(u, ..._)) : S(a) && (i.add(a), a(u, ..._))), u;
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), u;
      },
      component(a, _) {
        return _ ? (o.components[a] = _, u) : o.components[a];
      },
      directive(a, _) {
        return _ ? (o.directives[a] = _, u) : o.directives[a];
      },
      mount(a, _, x) {
        if (!c) {
          const O = xe(n, r);
          return O.appContext = o, _ && t ? t(O, a) : e(O, a, x), c = !0, u._container = a, a.__vue_app__ = u, Gt(O.component) || O.component.proxy;
        }
      },
      unmount() {
        c && (e(null, u._container), delete u._container.__vue_app__);
      },
      provide(a, _) {
        return o.provides[a] = _, u;
      },
      runWithContext(a) {
        Wt = u;
        try {
          return a();
        } finally {
          Wt = null;
        }
      }
    };
    return u;
  };
}
let Wt = null;
function si(e, t) {
  if (k) {
    let s = k.provides;
    const n = k.parent && k.parent.provides;
    n === s && (s = k.provides = Object.create(n)), s[e] = t;
  }
}
function Ft(e, t, s = !1) {
  const n = k || ce;
  if (n || Wt) {
    const r = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : Wt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && S(t) ? t.call(n && n.proxy) : t;
  }
}
function ni(e, t, s, n = !1) {
  const r = {}, o = {};
  Lt(o, Zt, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), dr(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : co(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function ri(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, c = N(r), [u] = e.propsOptions;
  let a = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const _ = e.vnode.dynamicProps;
      for (let x = 0; x < _.length; x++) {
        let O = _[x];
        if (Xt(e.emitsOptions, O))
          continue;
        const D = t[O];
        if (u)
          if (M(o, O))
            D !== o[O] && (o[O] = D, a = !0);
          else {
            const W = et(O);
            r[W] = ys(
              u,
              c,
              W,
              D,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          D !== o[O] && (o[O] = D, a = !0);
      }
    }
  } else {
    dr(e, t, r, o) && (a = !0);
    let _;
    for (const x in c)
      (!t || // for camelCase
      !M(t, x) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((_ = nt(x)) === x || !M(t, _))) && (u ? s && // for camelCase
      (s[x] !== void 0 || // for kebab-case
      s[_] !== void 0) && (r[x] = ys(
        u,
        c,
        x,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete r[x]);
    if (o !== c)
      for (const x in o)
        (!t || !M(t, x)) && (delete o[x], a = !0);
  }
  a && Ee(e, "set", "$attrs");
}
function dr(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, c;
  if (t)
    for (let u in t) {
      if (Tt(u))
        continue;
      const a = t[u];
      let _;
      r && M(r, _ = et(u)) ? !o || !o.includes(_) ? s[_] = a : (c || (c = {}))[_] = a : Xt(e.emitsOptions, u) || (!(u in n) || a !== n[u]) && (n[u] = a, i = !0);
    }
  if (o) {
    const u = N(s), a = c || H;
    for (let _ = 0; _ < o.length; _++) {
      const x = o[_];
      s[x] = ys(
        r,
        u,
        x,
        a[x],
        e,
        !M(a, x)
      );
    }
  }
  return i;
}
function ys(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const c = M(i, "default");
    if (c && n === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && S(u)) {
        const { propsDefaults: a } = r;
        s in a ? n = a[s] : (st(r), n = a[s] = u.call(
          null,
          t
        ), je());
      } else
        n = u;
    }
    i[
      0
      /* shouldCast */
    ] && (o && !c ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === nt(s)) && (n = !0));
  }
  return n;
}
function hr(e, t, s = !1) {
  const n = t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, c = [];
  let u = !1;
  if (!S(e)) {
    const _ = (x) => {
      u = !0;
      const [O, D] = hr(x, t, !0);
      Z(i, O), D && c.push(...D);
    };
    !s && t.mixins.length && t.mixins.forEach(_), e.extends && _(e.extends), e.mixins && e.mixins.forEach(_);
  }
  if (!o && !u)
    return J(e) && n.set(e, Ye), Ye;
  if (v(o))
    for (let _ = 0; _ < o.length; _++) {
      const x = et(o[_]);
      dn(x) && (i[x] = H);
    }
  else if (o)
    for (const _ in o) {
      const x = et(_);
      if (dn(x)) {
        const O = o[_], D = i[x] = v(O) || S(O) ? { type: O } : Z({}, O);
        if (D) {
          const W = mn(Boolean, D.type), I = mn(String, D.type);
          D[
            0
            /* shouldCast */
          ] = W > -1, D[
            1
            /* shouldCastTrue */
          ] = I < 0 || W < I, (W > -1 || M(D, "default")) && c.push(x);
        }
      }
    }
  const a = [i, c];
  return J(e) && n.set(e, a), a;
}
function dn(e) {
  return e[0] !== "$";
}
function hn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function pn(e, t) {
  return hn(e) === hn(t);
}
function mn(e, t) {
  return v(t) ? t.findIndex((s) => pn(s, e)) : S(t) && pn(t, e) ? 0 : -1;
}
const pr = (e) => e[0] === "_" || e === "$stable", Ws = (e) => v(e) ? e.map(me) : [me(e)], oi = (e, t, s) => {
  if (t._n)
    return t;
  const n = Ao((...r) => (Be.NODE_ENV, Ws(t(...r))), s);
  return n._c = !1, n;
}, mr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (pr(r))
      continue;
    const o = e[r];
    if (S(o))
      t[r] = oi(r, o, n);
    else if (o != null) {
      const i = Ws(o);
      t[r] = () => i;
    }
  }
}, _r = (e, t) => {
  const s = Ws(t);
  e.slots.default = () => s;
}, ii = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (e.slots = N(t), Lt(t, "_", s)) : mr(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && _r(e, t);
  Lt(e.slots, Zt, 1);
}, li = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = H;
  if (n.shapeFlag & 32) {
    const c = t._;
    c ? s && c === 1 ? o = !1 : (Z(r, t), !s && c === 1 && delete r._) : (o = !t.$stable, mr(t, r)), i = t;
  } else
    t && (_r(e, t), i = { default: 1 });
  if (o)
    for (const c in r)
      !pr(c) && i[c] == null && delete r[c];
};
function Os(e, t, s, n, r = !1) {
  if (v(e)) {
    e.forEach(
      (O, D) => Os(
        O,
        t && (v(t) ? t[D] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Nt(n) && !r)
    return;
  const o = n.shapeFlag & 4 ? Gt(n.component) || n.component.proxy : n.el, i = r ? null : o, { i: c, r: u } = e, a = t && t.r, _ = c.refs === H ? c.refs = {} : c.refs, x = c.setupState;
  if (a != null && a !== u && (K(a) ? (_[a] = null, M(x, a) && (x[a] = null)) : Q(a) && (a.value = null)), S(u))
    Se(u, c, 12, [i, _]);
  else {
    const O = K(u), D = Q(u);
    if (O || D) {
      const W = () => {
        if (e.f) {
          const I = O ? M(x, u) ? x[u] : _[u] : u.value;
          r ? v(I) && ws(I, o) : v(I) ? I.includes(o) || I.push(o) : O ? (_[u] = [o], M(x, u) && (x[u] = _[u])) : (u.value = [o], e.k && (_[e.k] = u.value));
        } else
          O ? (_[u] = i, M(x, u) && (x[u] = i)) : D && (u.value = i, e.k && (_[e.k] = i));
      };
      i ? (W.id = -1, te(W, s)) : W();
    }
  }
}
const te = Io;
function ci(e) {
  return fi(e);
}
function fi(e, t) {
  const s = hs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: c,
    createComment: u,
    setText: a,
    setElementText: _,
    parentNode: x,
    nextSibling: O,
    setScopeId: D = ue,
    insertStaticContent: W
  } = e, I = (l, f, d, h = null, p = null, b = null, E = !1, g = null, C = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !ft(l, f) && (h = Ot(l), de(l, p, b, !0), l = null), f.patchFlag === -2 && (C = !1, f.dynamicChildren = null);
    const { type: m, ref: P, shapeFlag: y } = f;
    switch (m) {
      case Qt:
        V(l, f, d, h);
        break;
      case Ke:
        z(l, f, d, h);
        break;
      case cs:
        l == null && X(f, d, h, E);
        break;
      case ie:
        Et(
          l,
          f,
          d,
          h,
          p,
          b,
          E,
          g,
          C
        );
        break;
      default:
        y & 1 ? Oe(
          l,
          f,
          d,
          h,
          p,
          b,
          E,
          g,
          C
        ) : y & 6 ? xt(
          l,
          f,
          d,
          h,
          p,
          b,
          E,
          g,
          C
        ) : (y & 64 || y & 128) && m.process(
          l,
          f,
          d,
          h,
          p,
          b,
          E,
          g,
          C,
          $e
        );
    }
    P != null && p && Os(P, l && l.ref, b, f || l, !f);
  }, V = (l, f, d, h) => {
    if (l == null)
      n(
        f.el = c(f.children),
        d,
        h
      );
    else {
      const p = f.el = l.el;
      f.children !== l.children && a(p, f.children);
    }
  }, z = (l, f, d, h) => {
    l == null ? n(
      f.el = u(f.children || ""),
      d,
      h
    ) : f.el = l.el;
  }, X = (l, f, d, h) => {
    [l.el, l.anchor] = W(
      l.children,
      f,
      d,
      h,
      l.el,
      l.anchor
    );
  }, q = ({ el: l, anchor: f }, d, h) => {
    let p;
    for (; l && l !== f; )
      p = O(l), n(l, d, h), l = p;
    n(f, d, h);
  }, R = ({ el: l, anchor: f }) => {
    let d;
    for (; l && l !== f; )
      d = O(l), r(l), l = d;
    r(f);
  }, Oe = (l, f, d, h, p, b, E, g, C) => {
    E = E || f.type === "svg", l == null ? it(
      f,
      d,
      h,
      p,
      b,
      E,
      g,
      C
    ) : ts(
      l,
      f,
      p,
      b,
      E,
      g,
      C
    );
  }, it = (l, f, d, h, p, b, E, g) => {
    let C, m;
    const { type: P, props: y, shapeFlag: A, transition: w, dirs: T } = l;
    if (C = l.el = i(
      l.type,
      b,
      y && y.is,
      y
    ), A & 8 ? _(C, l.children) : A & 16 && Re(
      l.children,
      C,
      null,
      h,
      p,
      b && P !== "foreignObject",
      E,
      g
    ), T && Ne(l, null, h, "created"), Ct(C, l, l.scopeId, E, h), y) {
      for (const F in y)
        F !== "value" && !Tt(F) && o(
          C,
          F,
          null,
          y[F],
          b,
          l.children,
          h,
          p,
          ge
        );
      "value" in y && o(C, "value", null, y.value), (m = y.onVnodeBeforeMount) && pe(m, h, l);
    }
    T && Ne(l, null, h, "beforeMount");
    const L = ui(p, w);
    L && w.beforeEnter(C), n(C, f, d), ((m = y && y.onVnodeMounted) || L || T) && te(() => {
      m && pe(m, h, l), L && w.enter(C), T && Ne(l, null, h, "mounted");
    }, p);
  }, Ct = (l, f, d, h, p) => {
    if (d && D(l, d), h)
      for (let b = 0; b < h.length; b++)
        D(l, h[b]);
    if (p) {
      let b = p.subTree;
      if (f === b) {
        const E = p.vnode;
        Ct(
          l,
          E,
          E.scopeId,
          E.slotScopeIds,
          p.parent
        );
      }
    }
  }, Re = (l, f, d, h, p, b, E, g, C = 0) => {
    for (let m = C; m < l.length; m++) {
      const P = l[m] = g ? ve(l[m]) : me(l[m]);
      I(
        null,
        P,
        f,
        d,
        h,
        p,
        b,
        E,
        g
      );
    }
  }, ts = (l, f, d, h, p, b, E) => {
    const g = f.el = l.el;
    let { patchFlag: C, dynamicChildren: m, dirs: P } = f;
    C |= l.patchFlag & 16;
    const y = l.props || H, A = f.props || H;
    let w;
    d && Fe(d, !1), (w = A.onVnodeBeforeUpdate) && pe(w, d, f, l), P && Ne(f, l, d, "beforeUpdate"), d && Fe(d, !0);
    const T = p && f.type !== "foreignObject";
    if (m ? Te(
      l.dynamicChildren,
      m,
      g,
      d,
      h,
      T,
      b
    ) : E || U(
      l,
      f,
      g,
      null,
      d,
      h,
      T,
      b,
      !1
    ), C > 0) {
      if (C & 16)
        lt(
          g,
          f,
          y,
          A,
          d,
          h,
          p
        );
      else if (C & 2 && y.class !== A.class && o(g, "class", null, A.class, p), C & 4 && o(g, "style", y.style, A.style, p), C & 8) {
        const L = f.dynamicProps;
        for (let F = 0; F < L.length; F++) {
          const B = L[F], re = y[B], ke = A[B];
          (ke !== re || B === "value") && o(
            g,
            B,
            re,
            ke,
            p,
            l.children,
            d,
            h,
            ge
          );
        }
      }
      C & 1 && l.children !== f.children && _(g, f.children);
    } else
      !E && m == null && lt(
        g,
        f,
        y,
        A,
        d,
        h,
        p
      );
    ((w = A.onVnodeUpdated) || P) && te(() => {
      w && pe(w, d, f, l), P && Ne(f, l, d, "updated");
    }, h);
  }, Te = (l, f, d, h, p, b, E) => {
    for (let g = 0; g < f.length; g++) {
      const C = l[g], m = f[g], P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        C.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (C.type === ie || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ft(C, m) || // - In the case of a component, it could contain anything.
        C.shapeFlag & 70) ? x(C.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      I(
        C,
        m,
        P,
        null,
        h,
        p,
        b,
        E,
        !0
      );
    }
  }, lt = (l, f, d, h, p, b, E) => {
    if (d !== h) {
      if (d !== H)
        for (const g in d)
          !Tt(g) && !(g in h) && o(
            l,
            g,
            d[g],
            null,
            E,
            f.children,
            p,
            b,
            ge
          );
      for (const g in h) {
        if (Tt(g))
          continue;
        const C = h[g], m = d[g];
        C !== m && g !== "value" && o(
          l,
          g,
          m,
          C,
          E,
          f.children,
          p,
          b,
          ge
        );
      }
      "value" in h && o(l, "value", d.value, h.value);
    }
  }, Et = (l, f, d, h, p, b, E, g, C) => {
    const m = f.el = l ? l.el : c(""), P = f.anchor = l ? l.anchor : c("");
    let { patchFlag: y, dynamicChildren: A, slotScopeIds: w } = f;
    w && (g = g ? g.concat(w) : w), l == null ? (n(m, d, h), n(P, d, h), Re(
      f.children,
      d,
      P,
      p,
      b,
      E,
      g,
      C
    )) : y > 0 && y & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Te(
      l.dynamicChildren,
      A,
      d,
      p,
      b,
      E,
      g
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || p && f === p.subTree) && gr(
      l,
      f,
      !0
      /* shallow */
    )) : U(
      l,
      f,
      d,
      P,
      p,
      b,
      E,
      g,
      C
    );
  }, xt = (l, f, d, h, p, b, E, g, C) => {
    f.slotScopeIds = g, l == null ? f.shapeFlag & 512 ? p.ctx.activate(
      f,
      d,
      h,
      E,
      C
    ) : ss(
      f,
      d,
      h,
      p,
      b,
      E,
      C
    ) : Vs(l, f, C);
  }, ss = (l, f, d, h, p, b, E) => {
    const g = l.component = yi(
      l,
      h,
      p
    );
    if (lr(l) && (g.ctx.renderer = $e), Oi(g), g.asyncDep) {
      if (p && p.registerDep(g, G), !l.el) {
        const C = g.subTree = xe(Ke);
        z(null, C, f, d);
      }
      return;
    }
    G(
      g,
      l,
      f,
      d,
      p,
      b,
      E
    );
  }, Vs = (l, f, d) => {
    const h = f.component = l.component;
    if (So(l, f, d))
      if (h.asyncDep && !h.asyncResolved) {
        j(h, f, d);
        return;
      } else
        h.next = f, Co(h.update), h.update();
    else
      f.el = l.el, h.vnode = f;
  }, G = (l, f, d, h, p, b, E) => {
    const g = () => {
      if (l.isMounted) {
        let { next: P, bu: y, u: A, parent: w, vnode: T } = l, L = P, F;
        Fe(l, !1), P ? (P.el = T.el, j(l, P, E)) : P = T, y && It(y), (F = P.props && P.props.onVnodeBeforeUpdate) && pe(F, w, P, T), Fe(l, !0);
        const B = is(l), re = l.subTree;
        l.subTree = B, I(
          re,
          B,
          // parent may have changed if it's in a teleport
          x(re.el),
          // anchor may have changed if it's in a fragment
          Ot(re),
          l,
          p,
          b
        ), P.el = B.el, L === null && Do(l, B.el), A && te(A, p), (F = P.props && P.props.onVnodeUpdated) && te(
          () => pe(F, w, P, T),
          p
        );
      } else {
        let P;
        const { el: y, props: A } = f, { bm: w, m: T, parent: L } = l, F = Nt(f);
        if (Fe(l, !1), w && It(w), !F && (P = A && A.onVnodeBeforeMount) && pe(P, L, f), Fe(l, !0), y && rs) {
          const B = () => {
            l.subTree = is(l), rs(
              y,
              l.subTree,
              l,
              p,
              null
            );
          };
          F ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && B()
          ) : B();
        } else {
          const B = l.subTree = is(l);
          I(
            null,
            B,
            d,
            h,
            l,
            p,
            b
          ), f.el = B.el;
        }
        if (T && te(T, p), !F && (P = A && A.onVnodeMounted)) {
          const B = f;
          te(
            () => pe(P, L, B),
            p
          );
        }
        (f.shapeFlag & 256 || L && Nt(L.vnode) && L.vnode.shapeFlag & 256) && l.a && te(l.a, p), l.isMounted = !0, f = d = h = null;
      }
    }, C = l.effect = new Is(
      g,
      () => Js(m),
      l.scope
      // track it in component's effect scope
    ), m = l.update = () => C.run();
    m.id = l.uid, Fe(l, !0), m();
  }, j = (l, f, d) => {
    f.component = l;
    const h = l.vnode.props;
    l.vnode = f, l.next = null, ri(l, f.props, h, d), li(l, f.children, d), rt(), on(), ot();
  }, U = (l, f, d, h, p, b, E, g, C = !1) => {
    const m = l && l.children, P = l ? l.shapeFlag : 0, y = f.children, { patchFlag: A, shapeFlag: w } = f;
    if (A > 0) {
      if (A & 128) {
        yt(
          m,
          y,
          d,
          h,
          p,
          b,
          E,
          g,
          C
        );
        return;
      } else if (A & 256) {
        Ie(
          m,
          y,
          d,
          h,
          p,
          b,
          E,
          g,
          C
        );
        return;
      }
    }
    w & 8 ? (P & 16 && ge(m, p, b), y !== m && _(d, y)) : P & 16 ? w & 16 ? yt(
      m,
      y,
      d,
      h,
      p,
      b,
      E,
      g,
      C
    ) : ge(m, p, b, !0) : (P & 8 && _(d, ""), w & 16 && Re(
      y,
      d,
      h,
      p,
      b,
      E,
      g,
      C
    ));
  }, Ie = (l, f, d, h, p, b, E, g, C) => {
    l = l || Ye, f = f || Ye;
    const m = l.length, P = f.length, y = Math.min(m, P);
    let A;
    for (A = 0; A < y; A++) {
      const w = f[A] = C ? ve(f[A]) : me(f[A]);
      I(
        l[A],
        w,
        d,
        null,
        p,
        b,
        E,
        g,
        C
      );
    }
    m > P ? ge(
      l,
      p,
      b,
      !0,
      !1,
      y
    ) : Re(
      f,
      d,
      h,
      p,
      b,
      E,
      g,
      C,
      y
    );
  }, yt = (l, f, d, h, p, b, E, g, C) => {
    let m = 0;
    const P = f.length;
    let y = l.length - 1, A = P - 1;
    for (; m <= y && m <= A; ) {
      const w = l[m], T = f[m] = C ? ve(f[m]) : me(f[m]);
      if (ft(w, T))
        I(
          w,
          T,
          d,
          null,
          p,
          b,
          E,
          g,
          C
        );
      else
        break;
      m++;
    }
    for (; m <= y && m <= A; ) {
      const w = l[y], T = f[A] = C ? ve(f[A]) : me(f[A]);
      if (ft(w, T))
        I(
          w,
          T,
          d,
          null,
          p,
          b,
          E,
          g,
          C
        );
      else
        break;
      y--, A--;
    }
    if (m > y) {
      if (m <= A) {
        const w = A + 1, T = w < P ? f[w].el : h;
        for (; m <= A; )
          I(
            null,
            f[m] = C ? ve(f[m]) : me(f[m]),
            d,
            T,
            p,
            b,
            E,
            g,
            C
          ), m++;
      }
    } else if (m > A)
      for (; m <= y; )
        de(l[m], p, b, !0), m++;
    else {
      const w = m, T = m, L = /* @__PURE__ */ new Map();
      for (m = T; m <= A; m++) {
        const ne = f[m] = C ? ve(f[m]) : me(f[m]);
        ne.key != null && L.set(ne.key, m);
      }
      let F, B = 0;
      const re = A - T + 1;
      let ke = !1, zs = 0;
      const ct = new Array(re);
      for (m = 0; m < re; m++)
        ct[m] = 0;
      for (m = w; m <= y; m++) {
        const ne = l[m];
        if (B >= re) {
          de(ne, p, b, !0);
          continue;
        }
        let he;
        if (ne.key != null)
          he = L.get(ne.key);
        else
          for (F = T; F <= A; F++)
            if (ct[F - T] === 0 && ft(ne, f[F])) {
              he = F;
              break;
            }
        he === void 0 ? de(ne, p, b, !0) : (ct[he - T] = m + 1, he >= zs ? zs = he : ke = !0, I(
          ne,
          f[he],
          d,
          null,
          p,
          b,
          E,
          g,
          C
        ), B++);
      }
      const Xs = ke ? ai(ct) : Ye;
      for (F = Xs.length - 1, m = re - 1; m >= 0; m--) {
        const ne = T + m, he = f[ne], qs = ne + 1 < P ? f[ne + 1].el : h;
        ct[m] === 0 ? I(
          null,
          he,
          d,
          qs,
          p,
          b,
          E,
          g,
          C
        ) : ke && (F < 0 || m !== Xs[F] ? Me(he, d, qs, 2) : F--);
      }
    }
  }, Me = (l, f, d, h, p = null) => {
    const { el: b, type: E, transition: g, children: C, shapeFlag: m } = l;
    if (m & 6) {
      Me(l.component.subTree, f, d, h);
      return;
    }
    if (m & 128) {
      l.suspense.move(f, d, h);
      return;
    }
    if (m & 64) {
      E.move(l, f, d, $e);
      return;
    }
    if (E === ie) {
      n(b, f, d);
      for (let y = 0; y < C.length; y++)
        Me(C[y], f, d, h);
      n(l.anchor, f, d);
      return;
    }
    if (E === cs) {
      q(l, f, d);
      return;
    }
    if (h !== 2 && m & 1 && g)
      if (h === 0)
        g.beforeEnter(b), n(b, f, d), te(() => g.enter(b), p);
      else {
        const { leave: y, delayLeave: A, afterLeave: w } = g, T = () => n(b, f, d), L = () => {
          y(b, () => {
            T(), w && w();
          });
        };
        A ? A(b, T, L) : L();
      }
    else
      n(b, f, d);
  }, de = (l, f, d, h = !1, p = !1) => {
    const {
      type: b,
      props: E,
      ref: g,
      children: C,
      dynamicChildren: m,
      shapeFlag: P,
      patchFlag: y,
      dirs: A
    } = l;
    if (g != null && Os(g, null, d, l, !0), P & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const w = P & 1 && A, T = !Nt(l);
    let L;
    if (T && (L = E && E.onVnodeBeforeUnmount) && pe(L, f, l), P & 6)
      vr(l.component, d, h);
    else {
      if (P & 128) {
        l.suspense.unmount(d, h);
        return;
      }
      w && Ne(l, null, f, "beforeUnmount"), P & 64 ? l.type.remove(
        l,
        f,
        d,
        p,
        $e,
        h
      ) : m && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== ie || y > 0 && y & 64) ? ge(
        m,
        f,
        d,
        !1,
        !0
      ) : (b === ie && y & 384 || !p && P & 16) && ge(C, f, d), h && $s(l);
    }
    (T && (L = E && E.onVnodeUnmounted) || w) && te(() => {
      L && pe(L, f, l), w && Ne(l, null, f, "unmounted");
    }, d);
  }, $s = (l) => {
    const { type: f, el: d, anchor: h, transition: p } = l;
    if (f === ie) {
      Ar(d, h);
      return;
    }
    if (f === cs) {
      R(l);
      return;
    }
    const b = () => {
      r(d), p && !p.persisted && p.afterLeave && p.afterLeave();
    };
    if (l.shapeFlag & 1 && p && !p.persisted) {
      const { leave: E, delayLeave: g } = p, C = () => E(d, b);
      g ? g(l.el, b, C) : C();
    } else
      b();
  }, Ar = (l, f) => {
    let d;
    for (; l !== f; )
      d = O(l), r(l), l = d;
    r(f);
  }, vr = (l, f, d) => {
    const { bum: h, scope: p, update: b, subTree: E, um: g } = l;
    h && It(h), p.stop(), b && (b.active = !1, de(E, l, f, d)), g && te(g, f), te(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, ge = (l, f, d, h = !1, p = !1, b = 0) => {
    for (let E = b; E < l.length; E++)
      de(l[E], f, d, h, p);
  }, Ot = (l) => l.shapeFlag & 6 ? Ot(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : O(l.anchor || l.el), ks = (l, f, d) => {
    l == null ? f._vnode && de(f._vnode, null, null, !0) : I(f._vnode || null, l, f, null, null, null, d), on(), sr(), f._vnode = l;
  }, $e = {
    p: I,
    um: de,
    m: Me,
    r: $s,
    mt: ss,
    mc: Re,
    pc: U,
    pbc: Te,
    n: Ot,
    o: e
  };
  let ns, rs;
  return t && ([ns, rs] = t(
    $e
  )), {
    render: ks,
    hydrate: ns,
    createApp: ti(ks, ns)
  };
}
function Fe({ effect: e, update: t }, s) {
  e.allowRecurse = t.allowRecurse = s;
}
function ui(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function gr(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (v(n) && v(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let c = r[o];
      c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = r[o] = ve(r[o]), c.el = i.el), s || gr(i, c)), c.type === Qt && (c.el = i.el);
    }
}
function ai(e) {
  const t = e.slice(), s = [0];
  let n, r, o, i, c;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const a = e[n];
    if (a !== 0) {
      if (r = s[s.length - 1], e[r] < a) {
        t[n] = r, s.push(n);
        continue;
      }
      for (o = 0, i = s.length - 1; o < i; )
        c = o + i >> 1, e[s[c]] < a ? o = c + 1 : i = c;
      a < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, i = s[o - 1]; o-- > 0; )
    s[o] = i, i = t[i];
  return s;
}
const di = (e) => e.__isTeleport, ie = Symbol.for("v-fgt"), Qt = Symbol.for("v-txt"), Ke = Symbol.for("v-cmt"), cs = Symbol.for("v-stc"), ht = [];
let fe = null;
function be(e = !1) {
  ht.push(fe = e ? null : []);
}
function hi() {
  ht.pop(), fe = ht[ht.length - 1] || null;
}
let gt = 1;
function _n(e) {
  gt += e;
}
function br(e) {
  return e.dynamicChildren = gt > 0 ? fe || Ye : null, hi(), gt > 0 && fe && fe.push(e), e;
}
function Ae(e, t, s, n, r, o) {
  return br(
    $(
      e,
      t,
      s,
      n,
      r,
      o,
      !0
      /* isBlock */
    )
  );
}
function pi(e, t, s, n, r) {
  return br(
    xe(
      e,
      t,
      s,
      n,
      r,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function mi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ft(e, t) {
  return e.type === t.type && e.key === t.key;
}
const _i = (...e) => Er(
  ...e
), Zt = "__vInternal", Cr = ({ key: e }) => e ?? null, Ut = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? K(e) || Q(e) || S(e) ? { i: ce, r: e, k: t, f: !!s } : e : null);
function $(e, t = null, s = null, n = 0, r = null, o = e === ie ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Cr(t),
    ref: t && Ut(t),
    scopeId: qt,
    slotScopeIds: null,
    children: s,
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
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ce
  };
  return c ? (Bs(u, s), o & 128 && e.normalize(u)) : s && (u.shapeFlag |= K(s) ? 8 : 16), gt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  fe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && fe.push(u), u;
}
const xe = Be.NODE_ENV !== "production" ? _i : Er;
function Er(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === Ro) && (e = Ke), mi(e)) {
    const c = Ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Bs(c, s), gt > 0 && !o && fe && (c.shapeFlag & 6 ? fe[fe.indexOf(e)] = c : fe.push(c)), c.patchFlag |= -2, c;
  }
  if (wi(e) && (e = e.__vccOpts), t) {
    t = gi(t);
    let { class: c, style: u } = t;
    c && !K(c) && (t.class = Rs(c)), J(u) && (qn(u) && !v(u) && (u = Z({}, u)), t.style = Ds(u));
  }
  const i = K(e) ? 1 : To(e) ? 128 : di(e) ? 64 : J(e) ? 4 : S(e) ? 2 : 0;
  return $(
    e,
    t,
    s,
    n,
    r,
    i,
    o,
    !0
  );
}
function gi(e) {
  return e ? qn(e) || Zt in e ? Z({}, e) : e : null;
}
function Ve(e, t, s = !1) {
  const { props: n, ref: r, patchFlag: o, children: i } = e, c = t ? Ci(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Cr(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && r ? v(r) ? r.concat(Ut(t)) : [r, Ut(t)] : Ut(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: Be.NODE_ENV !== "production" && o === -1 && v(i) ? i.map(xr) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ie ? o === -1 ? 16 : o | 16 : o,
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
    ssContent: e.ssContent && Ve(e.ssContent),
    ssFallback: e.ssFallback && Ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function xr(e) {
  const t = Ve(e);
  return v(e.children) && (t.children = e.children.map(xr)), t;
}
function Xe(e = " ", t = 0) {
  return xe(Qt, null, e, t);
}
function bi(e = "", t = !1) {
  return t ? (be(), pi(Ke, null, e)) : xe(Ke, null, e);
}
function me(e) {
  return e == null || typeof e == "boolean" ? xe(Ke) : v(e) ? xe(
    ie,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? ve(e) : xe(Qt, null, String(e));
}
function ve(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ve(e);
}
function Bs(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (v(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Bs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !(Zt in t) ? t._ctx = ce : r === 3 && ce && (ce.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    S(t) ? (t = { default: t, _ctx: ce }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Xe(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Ci(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Rs([t.class, n.class]));
      else if (r === "style")
        t.style = Ds([t.style, n.style]);
      else if (Bt(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(v(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = n[r]);
  }
  return t;
}
function pe(e, t, s, n = null) {
  ae(e, t, 7, [
    s,
    n
  ]);
}
const Ei = ar();
let xi = 0;
function yi(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Ei, o = {
    uid: xi++,
    vnode: e,
    type: n,
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
    scope: new Jr(
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
    propsOptions: hr(n, r),
    emitsOptions: rr(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: H,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
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
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = yo.bind(null, o), e.ce && e.ce(o), o;
}
let k = null, Ks, ze, gn = "__VUE_INSTANCE_SETTERS__";
(ze = hs()[gn]) || (ze = hs()[gn] = []), ze.push((e) => k = e), Ks = (e) => {
  ze.length > 1 ? ze.forEach((t) => t(e)) : ze[0](e);
};
const st = (e) => {
  Ks(e), e.scope.on();
}, je = () => {
  k && k.scope.off(), Ks(null);
};
function yr(e) {
  return e.vnode.shapeFlag & 4;
}
let bt = !1;
function Oi(e, t = !1) {
  bt = t;
  const { props: s, children: n } = e.vnode, r = yr(e);
  ni(e, s, r, t), ii(e, n);
  const o = r ? Pi(e, t) : void 0;
  return bt = !1, o;
}
function Pi(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Yn(new Proxy(e.ctx, Xo));
  const { setup: n } = s;
  if (n) {
    const r = e.setupContext = n.length > 1 ? vi(e) : null;
    st(e), rt();
    const o = Se(
      n,
      e,
      0,
      [e.props, r]
    );
    if (ot(), je(), In(o)) {
      if (o.then(je, je), t)
        return o.then((i) => {
          bn(e, i, t);
        }).catch((i) => {
          zt(i, e, 0);
        });
      e.asyncDep = o;
    } else
      bn(e, o, t);
  } else
    Or(e, t);
}
function bn(e, t, s) {
  S(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : J(t) && (e.setupState = Gn(t)), Or(e, s);
}
let Cn;
function Or(e, t, s) {
  const n = e.type;
  if (!e.render) {
    if (!t && Cn && !n.render) {
      const r = n.template || js(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: c, compilerOptions: u } = n, a = Z(
          Z(
            {
              isCustomElement: o,
              delimiters: c
            },
            i
          ),
          u
        );
        n.render = Cn(r, a);
      }
    }
    e.render = n.render || ue;
  }
  {
    st(e), rt();
    try {
      qo(e);
    } finally {
      ot(), je();
    }
  }
}
function Ai(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, s) {
        return se(e, "get", "$attrs"), t[s];
      }
    }
  ));
}
function vi(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    get attrs() {
      return Ai(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Gt(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Gn(Yn(e.exposed)), {
      get(t, s) {
        if (s in t)
          return t[s];
        if (s in dt)
          return dt[s](e);
      },
      has(t, s) {
        return s in t || s in dt;
      }
    }));
}
function wi(e) {
  return S(e) && "__vccOpts" in e;
}
const Pr = (e, t) => mo(e, t, bt), Si = Symbol.for("v-scx"), Di = () => Ft(Si), Ri = "3.3.8", Ti = "http://www.w3.org/2000/svg", Le = typeof document < "u" ? document : null, En = Le && /* @__PURE__ */ Le.createElement("template"), Ii = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t ? Le.createElementNS(Ti, e) : Le.createElement(e, s ? { is: s } : void 0);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
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
  insertStaticContent(e, t, s, n, r, o) {
    const i = s ? s.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      En.innerHTML = n ? `<svg>${e}</svg>` : e;
      const c = En.content;
      if (n) {
        const u = c.firstChild;
        for (; u.firstChild; )
          c.appendChild(u.firstChild);
        c.removeChild(u);
      }
      t.insertBefore(c, s);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Mi = Symbol("_vtc");
function Ni(e, t, s) {
  const n = e[Mi];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Fi = Symbol("_vod");
function Ui(e, t, s) {
  const n = e.style, r = K(s);
  if (s && !r) {
    if (t && !K(t))
      for (const o in t)
        s[o] == null && Ps(n, o, "");
    for (const o in s)
      Ps(n, o, s[o]);
  } else {
    const o = n.display;
    r ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"), Fi in e && (n.display = o);
  }
}
const xn = /\s*!important$/;
function Ps(e, t, s) {
  if (v(s))
    s.forEach((n) => Ps(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Li(e, t);
    xn.test(s) ? e.setProperty(
      nt(n),
      s.replace(xn, ""),
      "important"
    ) : e[n] = s;
  }
}
const yn = ["Webkit", "Moz", "ms"], fs = {};
function Li(e, t) {
  const s = fs[t];
  if (s)
    return s;
  let n = et(t);
  if (n !== "filter" && n in e)
    return fs[t] = n;
  n = Fn(n);
  for (let r = 0; r < yn.length; r++) {
    const o = yn[r] + n;
    if (o in e)
      return fs[t] = o;
  }
  return t;
}
const On = "http://www.w3.org/1999/xlink";
function Hi(e, t, s, n, r) {
  if (n && t.startsWith("xlink:"))
    s == null ? e.removeAttributeNS(On, t.slice(6, t.length)) : e.setAttributeNS(On, t, s);
  else {
    const o = Hr(t);
    s == null || o && !Un(s) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : s);
  }
}
function Ji(e, t, s, n, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    n && i(n, r, o), e[t] = s ?? "";
    return;
  }
  const c = e.tagName;
  if (t === "value" && c !== "PROGRESS" && // custom elements may use _value internally
  !c.includes("-")) {
    e._value = s;
    const a = c === "OPTION" ? e.getAttribute("value") : e.value, _ = s ?? "";
    a !== _ && (e.value = _), s == null && e.removeAttribute(t);
    return;
  }
  let u = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = Un(s) : s == null && a === "string" ? (s = "", u = !0) : a === "number" && (s = 0, u = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  u && e.removeAttribute(t);
}
function qe(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function ji(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Pn = Symbol("_vei");
function Wi(e, t, s, n, r = null) {
  const o = e[Pn] || (e[Pn] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [c, u] = Bi(t);
    if (n) {
      const a = o[t] = $i(n, r);
      qe(e, c, a, u);
    } else
      i && (ji(e, c, i, u), o[t] = void 0);
  }
}
const An = /(?:Once|Passive|Capture)$/;
function Bi(e) {
  let t;
  if (An.test(e)) {
    t = {};
    let n;
    for (; n = e.match(An); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : nt(e.slice(2)), t];
}
let us = 0;
const Ki = /* @__PURE__ */ Promise.resolve(), Vi = () => us || (Ki.then(() => us = 0), us = Date.now());
function $i(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    ae(
      ki(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Vi(), s;
}
function ki(e, t) {
  if (v(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map((n) => (r) => !r._stopped && n && n(r));
  } else
    return t;
}
const vn = /^on[a-z]/, zi = (e, t, s, n, r = !1, o, i, c, u) => {
  t === "class" ? Ni(e, n, r) : t === "style" ? Ui(e, s, n) : Bt(t) ? vs(t) || Wi(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Xi(e, t, n, r)) ? Ji(
    e,
    t,
    n,
    o,
    i,
    c,
    u
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Hi(e, t, n, r));
};
function Xi(e, t, s, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && vn.test(t) && S(s)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || vn.test(t) && K(s) ? !1 : t in e;
}
const wn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return v(t) ? (s) => It(t, s) : t;
};
function qi(e) {
  e.target.composing = !0;
}
function Sn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const as = Symbol("_assign"), Yi = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, r) {
    e[as] = wn(r);
    const o = n || r.props && r.props.type === "number";
    qe(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let c = e.value;
      s && (c = c.trim()), o && (c = ds(c)), e[as](c);
    }), s && qe(e, "change", () => {
      e.value = e.value.trim();
    }), t || (qe(e, "compositionstart", qi), qe(e, "compositionend", Sn), qe(e, "change", Sn));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: s, trim: n, number: r } }, o) {
    if (e[as] = wn(o), e.composing || document.activeElement === e && e.type !== "range" && (s || n && e.value.trim() === t || (r || e.type === "number") && ds(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, Qi = /* @__PURE__ */ Z({ patchProp: zi }, Ii);
let Dn;
function Zi() {
  return Dn || (Dn = ci(Qi));
}
const Gi = (...e) => {
  const t = Zi().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = el(n);
    if (!r)
      return;
    const o = t._component;
    !S(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const i = s(r, !1, r instanceof SVGElement);
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function el(e) {
  return K(e) ? document.querySelector(e) : e;
}
const tl = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, es = (e) => (Oo("data-v-4d9eb17f"), e = e(), Po(), e), sl = { id: "main" }, nl = /* @__PURE__ */ es(() => /* @__PURE__ */ $("h1", { class: "title" }, "Find Your Nightline", -1)), rl = /* @__PURE__ */ es(() => /* @__PURE__ */ $("p", { class: "title" }, "Start typing the name of your university to find your Nightline.", -1)), ol = { key: 0 }, il = { class: "results-summary-text" }, ll = { class: "results-list" }, cl = {
  key: 0,
  class: "result"
}, fl = ["href"], ul = { class: "institution" }, al = { class: "nightline" }, dl = { class: "institution" }, hl = {
  key: 1,
  class: "no-nightline"
}, pl = /* @__PURE__ */ es(() => /* @__PURE__ */ $("h2", null, " Unfortunately, your institution is not yet covered by a Nightline. ", -1)), ml = { key: 2 }, _l = /* @__PURE__ */ es(() => /* @__PURE__ */ $("p", { id: "results-summary-text" }, "No results found. Try full institution name?", -1)), gl = [
  _l
], bl = "https://www.samaritans.org", Cl = "https://www.nightline.ac.uk/universities-student-unions/setting-up-a-nightline", El = {
  __name: "App",
  props: {
    institutions: {
      required: !0,
      type: Array
    }
  },
  setup(e) {
    const t = e, s = rn(""), n = rn(!1), r = Pr(() => {
      const o = s.value.toLowerCase().trim();
      return o ? t.institutions.filter((i) => i.name.toLowerCase().includes(o)) : [];
    });
    return Mt(s, async () => {
      n.value = !1;
    }), (o, i) => (be(), Ae("div", sl, [
      nl,
      rl,
      No($("input", {
        "onUpdate:modelValue": i[0] || (i[0] = (c) => s.value = c),
        type: "text",
        id: "search-box",
        placeholder: "University of...",
        autocomplete: "off"
      }, null, 512), [
        [Yi, s.value]
      ]),
      !n.value && r.value.length > 0 && s.value.length > 0 ? (be(), Ae("section", ol, [
        $("p", il, [
          Xe("Showing results for: "),
          $("span", null, Pt(s.value), 1)
        ]),
        $("ul", ll, [
          (be(!0), Ae(ie, null, zo(r.value, (c) => (be(), Ae(ie, {
            key: c.name
          }, [
            c.nightline ? (be(), Ae("li", cl, [
              $("a", {
                href: c.nightlineWebsite ?? "#",
                target: "_blank"
              }, [
                $("p", ul, Pt(c.name), 1),
                $("p", al, "Nightline: " + Pt(c.nightline), 1)
              ], 8, fl)
            ])) : (be(), Ae("li", {
              key: 1,
              onClick: i[1] || (i[1] = (u) => n.value = !0),
              class: "result"
            }, [
              $("p", dl, Pt(c.name), 1)
            ]))
          ], 64))), 128))
        ])
      ])) : n.value ? (be(), Ae("section", hl, [
        pl,
        $("p", null, [
          Xe(" To speak to someone, you could "),
          $("a", {
            href: bl,
            target: "_blank"
          }, "contact the Samaritans"),
          Xe(" instead. ")
        ]),
        $("p", null, [
          Xe(" Alternatively, you can refer to "),
          $("a", {
            href: Cl,
            target: "_blank"
          }, "our setup guidance"),
          Xe(" if you are interested in setting up a Nightline. ")
        ])
      ])) : s.value.length > 0 ? (be(), Ae("section", ml, gl)) : bi("", !0)
    ]));
  }
}, xl = /* @__PURE__ */ tl(El, [["__scopeId", "data-v-4d9eb17f"]]);
var Rn;
Gi(xl, {
  institutions: window.nightlines ? (Rn = JSON.parse(window.nightlines)) == null ? void 0 : Rn.institutions : []
}).mount("#app");
