// build/worker/shim.mjs
import D from "./d6c2462573327b5eb14b0726249e105d63bed8be-index.wasm";
import Ce from "./d6c2462573327b5eb14b0726249e105d63bed8be-index.wasm";
var W = Object.defineProperty;
var B = (e, t) => {
  for (var n in t)
    W(e, n, { get: t[n], enumerable: true });
};
var p = {};
B(p, { IntoUnderlyingByteSource: () => q, IntoUnderlyingSink: () => L, IntoUnderlyingSource: () => x, MinifyConfig: () => S, PipeOptions: () => C, PolishConfig: () => X, QueuingStrategy: () => y, R2Range: () => F, ReadableStreamGetReaderOptions: () => v, RequestRedirect: () => Y, __wbg_arrayBuffer_a5b60c78aa3a64ee: () => Mt, __wbg_arrayBuffer_ad321bb07b24265d: () => it, __wbg_buffer_2b87f8d382772412: () => yt, __wbg_buffer_4e79326814bdd393: () => pe, __wbg_buffer_55ba7a6b1b92e2ac: () => Kt, __wbg_byobRequest_08c18cee35def1f4: () => ue, __wbg_byteLength_5299848ed3264181: () => be, __wbg_byteOffset_b69b0a07afccce19: () => de, __wbg_call_557a2f2deacc4912: () => Vt, __wbg_call_587b30eea3e09332: () => ct, __wbg_cause_52959bcad93f9e0f: () => xe, __wbg_cf_703652f0d2c5b8d1: () => tt, __wbg_close_da7e6fb9d9851e5a: () => ae, __wbg_close_e9110ca16e2567db: () => se, __wbg_constructor_f2623999a1f453eb: () => je, __wbg_crypto_d05b68a3572bb8ca: () => Lt, __wbg_enqueue_d71a1a518e21f5c3: () => ie, __wbg_error_a7e23606158b68b9: () => we, __wbg_getRandomValues_7e42b4fb8779dc6d: () => Qt, __wbg_get_da8ec06c7e500e0c: () => At, __wbg_get_f53c921291c381bd: () => me, __wbg_globalThis_b70c095388441f2d: () => zt, __wbg_global_1c72617491ed7194: () => It, __wbg_headers_1eff4f53324496e6: () => Q, __wbg_instanceof_Error_fac23a8832b241da: () => le, __wbg_length_0aab7ffd65ad19ed: () => ft, __wbg_log_dc06ec929fc95a20: () => Ot, __wbg_method_e15eb9cf1c32cdbb: () => Z, __wbg_msCrypto_10fc94afee92bd76: () => Bt, __wbg_name_2a8bae31363c6a51: () => ke, __wbg_new_09938a7d020f049b: () => ut, __wbg_new_143b41b4342650bb: () => Oe, __wbg_new_2b55e405e4af4986: () => qt, __wbg_new_2b6fea4ea03b1b95: () => xt, __wbg_new_46ad1d5f9580ad0f: () => gt, __wbg_new_87297f22973157c8: () => ge, __wbg_newbigint_c3a6a615aa10ce63: () => at, __wbg_newnoargs_c9e6043b8ad84109: () => Ut, __wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b: () => Yt, __wbg_newwithheaders_5ba3c8c978d07800: () => Te, __wbg_newwithlength_89eeca401d8918c2: () => rt, __wbg_newwithoptbuffersourceandinit_6c49960a834dd7cf: () => _t, __wbg_newwithoptreadablestreamandinit_d238e5b972c7b57f: () => ot, __wbg_newwithoptstrandinit_ff70839f3334d3aa: () => nt, __wbg_newwithsource_620c192b0682807b: () => pt, __wbg_node_43b1089f407e4ec2: () => vt, __wbg_pipeTo_15298d2870ad44dc: () => lt, __wbg_process_b02b3570280d0366: () => Ct, __wbg_put_b5bda0626d16ab51: () => mt, __wbg_randomFillSync_b70ccbdf4926a99d: () => Zt, __wbg_readable_f4de67129615af84: () => ht, __wbg_require_9a7e0f667ead4995: () => $t, __wbg_resolve_ae38ad63c43ff98b: () => oe, __wbg_respond_8fadc5f5c9d95422: () => ce, __wbg_self_742dd6eab3e9211e: () => Dt, __wbg_set_07da13cc24b69217: () => Pt, __wbg_set_3698e3ca519b3c3c: () => Xt, __wbg_set_76353df4722f4954: () => ye, __wbg_subarray_d82be056deb4ad27: () => Gt, __wbg_then_835b073a479138e5: () => _e, __wbg_then_8df675b8bb5d5e3c: () => re, __wbg_toString_506566b763774a16: () => he, __wbg_url_3325e0ef088003ca: () => G, __wbg_versions_c1cb42213cedf0f5: () => Ft, __wbg_view_231340b0dd8a2484: () => fe, __wbg_window_c409e731db53a0e2: () => Nt, __wbg_writable_4c3594ca4b0a2fa6: () => wt, __wbindgen_bigint_from_u64: () => bt, __wbindgen_cb_drop: () => ne, __wbindgen_closure_wrapper950: () => Ae, __wbindgen_debug_string: () => te, __wbindgen_in: () => jt, __wbindgen_is_function: () => Wt, __wbindgen_is_null: () => Et, __wbindgen_is_object: () => St, __wbindgen_is_string: () => Rt, __wbindgen_is_undefined: () => Ht, __wbindgen_memory: () => Jt, __wbindgen_number_new: () => Tt, __wbindgen_object_clone_ref: () => dt, __wbindgen_object_drop_ref: () => et, __wbindgen_string_get: () => kt, __wbindgen_string_new: () => st, __wbindgen_throw: () => ee, fetch: () => R, getMemory: () => z });
var N = new WebAssembly.Instance(D, { "./index_bg.js": p });
var o = N.exports;
function z() {
  return o.memory;
}
var l = new Array(128).fill(void 0);
l.push(void 0, null, true, false);
function r(e) {
  return l[e];
}
var j = l.length;
function I(e) {
  e < 132 || (l[e] = j, j = e);
}
function g(e) {
  let t = r(e);
  return I(e), t;
}
var H = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
var $ = new H("utf-8", { ignoreBOM: true, fatal: true });
$.decode();
var k = null;
function T() {
  return (k === null || k.byteLength === 0) && (k = new Uint8Array(o.memory.buffer)), k;
}
function w(e, t) {
  return e = e >>> 0, $.decode(T().subarray(e, e + t));
}
function _(e) {
  j === l.length && l.push(l.length + 1);
  let t = j;
  return j = l[t], l[t] = e, t;
}
var h = 0;
var U = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
var A = new U("utf-8");
var V = typeof A.encodeInto == "function" ? function(e, t) {
  return A.encodeInto(e, t);
} : function(e, t) {
  let n = A.encode(e);
  return t.set(n), { read: e.length, written: n.length };
};
function E(e, t, n) {
  if (n === void 0) {
    let f = A.encode(e), m = t(f.length) >>> 0;
    return T().subarray(m, m + f.length).set(f), h = f.length, m;
  }
  let c = e.length, s = t(c) >>> 0, u = T(), i = 0;
  for (; i < c; i++) {
    let f = e.charCodeAt(i);
    if (f > 127)
      break;
    u[s + i] = f;
  }
  if (i !== c) {
    i !== 0 && (e = e.slice(i)), s = n(s, c, c = i + e.length * 3) >>> 0;
    let f = T().subarray(s + i, s + c), m = V(e, f);
    i += m.written;
  }
  return h = i, s;
}
function d(e) {
  return e == null;
}
var O = null;
function a() {
  return (O === null || O.byteLength === 0) && (O = new Int32Array(o.memory.buffer)), O;
}
function M(e) {
  let t = typeof e;
  if (t == "number" || t == "boolean" || e == null)
    return `${e}`;
  if (t == "string")
    return `"${e}"`;
  if (t == "symbol") {
    let s = e.description;
    return s == null ? "Symbol" : `Symbol(${s})`;
  }
  if (t == "function") {
    let s = e.name;
    return typeof s == "string" && s.length > 0 ? `Function(${s})` : "Function";
  }
  if (Array.isArray(e)) {
    let s = e.length, u = "[";
    s > 0 && (u += M(e[0]));
    for (let i = 1; i < s; i++)
      u += ", " + M(e[i]);
    return u += "]", u;
  }
  let n = /\[object ([^\]]+)\]/.exec(toString.call(e)), c;
  if (n.length > 1)
    c = n[1];
  else
    return toString.call(e);
  if (c == "Object")
    try {
      return "Object(" + JSON.stringify(e) + ")";
    } catch {
      return "Object";
    }
  return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : c;
}
function P(e, t, n, c) {
  let s = { a: e, b: t, cnt: 1, dtor: n }, u = (...i) => {
    s.cnt++;
    let f = s.a;
    s.a = 0;
    try {
      return c(f, s.b, ...i);
    } finally {
      --s.cnt === 0 ? o.__wbindgen_export_2.get(s.dtor)(f, s.b) : s.a = f;
    }
  };
  return u.original = s, u;
}
function J(e, t, n) {
  o.__wbindgen_export_3(e, t, _(n));
}
function R(e, t, n) {
  let c = o.fetch(_(e), _(t), _(n));
  return g(c);
}
function b(e, t) {
  try {
    return e.apply(this, t);
  } catch (n) {
    o.__wbindgen_export_4(_(n));
  }
}
function K(e, t, n, c) {
  o.__wbindgen_export_5(e, t, _(n), _(c));
}
var X = Object.freeze({ Off: 0, 0: "Off", Lossy: 1, 1: "Lossy", Lossless: 2, 2: "Lossless" });
var Y = Object.freeze({ Error: 0, 0: "Error", Follow: 1, 1: "Follow", Manual: 2, 2: "Manual" });
var q = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_intounderlyingbytesource_free(t);
  }
  get type() {
    let t, n;
    try {
      let u = o.__wbindgen_add_to_stack_pointer(-16);
      o.intounderlyingbytesource_type(u, this.__wbg_ptr);
      var c = a()[u / 4 + 0], s = a()[u / 4 + 1];
      return t = c, n = s, w(c, s);
    } finally {
      o.__wbindgen_add_to_stack_pointer(16), o.__wbindgen_export_6(t, n);
    }
  }
  get autoAllocateChunkSize() {
    return o.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr) >>> 0;
  }
  start(t) {
    o.intounderlyingbytesource_start(this.__wbg_ptr, _(t));
  }
  pull(t) {
    let n = o.intounderlyingbytesource_pull(this.__wbg_ptr, _(t));
    return g(n);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    o.intounderlyingbytesource_cancel(t);
  }
};
var L = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_intounderlyingsink_free(t);
  }
  write(t) {
    let n = o.intounderlyingsink_write(this.__wbg_ptr, _(t));
    return g(n);
  }
  close() {
    let t = this.__destroy_into_raw(), n = o.intounderlyingsink_close(t);
    return g(n);
  }
  abort(t) {
    let n = this.__destroy_into_raw(), c = o.intounderlyingsink_abort(n, _(t));
    return g(c);
  }
};
var x = class {
  static __wrap(t) {
    t = t >>> 0;
    let n = Object.create(x.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_intounderlyingsource_free(t);
  }
  pull(t) {
    let n = o.intounderlyingsource_pull(this.__wbg_ptr, _(t));
    return g(n);
  }
  cancel() {
    let t = this.__destroy_into_raw();
    o.intounderlyingsource_cancel(t);
  }
};
var S = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_minifyconfig_free(t);
  }
  get js() {
    return o.__wbg_get_minifyconfig_js(this.__wbg_ptr) !== 0;
  }
  set js(t) {
    o.__wbg_set_minifyconfig_js(this.__wbg_ptr, t);
  }
  get html() {
    return o.__wbg_get_minifyconfig_html(this.__wbg_ptr) !== 0;
  }
  set html(t) {
    o.__wbg_set_minifyconfig_html(this.__wbg_ptr, t);
  }
  get css() {
    return o.__wbg_get_minifyconfig_css(this.__wbg_ptr) !== 0;
  }
  set css(t) {
    o.__wbg_set_minifyconfig_css(this.__wbg_ptr, t);
  }
};
var C = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_pipeoptions_free(t);
  }
  get preventClose() {
    return o.pipeoptions_preventClose(this.__wbg_ptr) !== 0;
  }
  get preventCancel() {
    return o.pipeoptions_preventCancel(this.__wbg_ptr) !== 0;
  }
  get preventAbort() {
    return o.pipeoptions_preventAbort(this.__wbg_ptr) !== 0;
  }
  get signal() {
    let t = o.pipeoptions_signal(this.__wbg_ptr);
    return g(t);
  }
};
var y = class {
  static __wrap(t) {
    t = t >>> 0;
    let n = Object.create(y.prototype);
    return n.__wbg_ptr = t, n;
  }
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_queuingstrategy_free(t);
  }
  get highWaterMark() {
    return o.queuingstrategy_highWaterMark(this.__wbg_ptr);
  }
};
var F = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_r2range_free(t);
  }
  get offset() {
    try {
      let c = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wbg_get_r2range_offset(c, this.__wbg_ptr);
      var t = a()[c / 4 + 0], n = a()[c / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set offset(t) {
    o.__wbg_set_r2range_offset(this.__wbg_ptr, !d(t), d(t) ? 0 : t);
  }
  get length() {
    try {
      let c = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wbg_get_r2range_length(c, this.__wbg_ptr);
      var t = a()[c / 4 + 0], n = a()[c / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set length(t) {
    o.__wbg_set_r2range_length(this.__wbg_ptr, !d(t), d(t) ? 0 : t);
  }
  get suffix() {
    try {
      let c = o.__wbindgen_add_to_stack_pointer(-16);
      o.__wbg_get_r2range_suffix(c, this.__wbg_ptr);
      var t = a()[c / 4 + 0], n = a()[c / 4 + 1];
      return t === 0 ? void 0 : n >>> 0;
    } finally {
      o.__wbindgen_add_to_stack_pointer(16);
    }
  }
  set suffix(t) {
    o.__wbg_set_r2range_suffix(this.__wbg_ptr, !d(t), d(t) ? 0 : t);
  }
};
var v = class {
  __destroy_into_raw() {
    let t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, t;
  }
  free() {
    let t = this.__destroy_into_raw();
    o.__wbg_readablestreamgetreaderoptions_free(t);
  }
  get mode() {
    let t = o.readablestreamgetreaderoptions_mode(this.__wbg_ptr);
    return g(t);
  }
};
function Z(e, t) {
  let n = r(t).method, c = E(n, o.__wbindgen_export_0, o.__wbindgen_export_1), s = h;
  a()[e / 4 + 1] = s, a()[e / 4 + 0] = c;
}
function G(e, t) {
  let n = r(t).url, c = E(n, o.__wbindgen_export_0, o.__wbindgen_export_1), s = h;
  a()[e / 4 + 1] = s, a()[e / 4 + 0] = c;
}
function Q(e) {
  let t = r(e).headers;
  return _(t);
}
function tt(e) {
  let t = r(e).cf;
  return d(t) ? 0 : _(t);
}
function et(e) {
  g(e);
}
function nt() {
  return b(function(e, t, n) {
    let c = new Response(e === 0 ? void 0 : w(e, t), r(n));
    return _(c);
  }, arguments);
}
function rt(e) {
  let t = new Uint8Array(e >>> 0);
  return _(t);
}
function _t() {
  return b(function(e, t) {
    let n = new Response(r(e), r(t));
    return _(n);
  }, arguments);
}
function ot() {
  return b(function(e, t) {
    let n = new Response(r(e), r(t));
    return _(n);
  }, arguments);
}
function ct() {
  return b(function(e, t, n) {
    let c = r(e).call(r(t), r(n));
    return _(c);
  }, arguments);
}
function st(e, t) {
  let n = w(e, t);
  return _(n);
}
function it() {
  return b(function(e) {
    let t = r(e).arrayBuffer();
    return _(t);
  }, arguments);
}
function ut(e) {
  let t = new Uint8Array(r(e));
  return _(t);
}
function ft(e) {
  return r(e).length;
}
function bt(e) {
  let t = BigInt.asUintN(64, e);
  return _(t);
}
function at(e) {
  let t = new FixedLengthStream(g(e));
  return _(t);
}
function gt(e) {
  let t = new FixedLengthStream(e >>> 0);
  return _(t);
}
function pt(e, t) {
  let n = new ReadableStream(x.__wrap(e), y.__wrap(t));
  return _(n);
}
function dt(e) {
  let t = r(e);
  return _(t);
}
function wt(e) {
  let t = r(e).writable;
  return _(t);
}
function lt(e, t) {
  let n = r(e).pipeTo(r(t));
  return _(n);
}
function ht(e) {
  let t = r(e).readable;
  return _(t);
}
function xt() {
  let e = new Object();
  return _(e);
}
function yt(e) {
  let t = r(e).buffer;
  return _(t);
}
function mt(e, t, n, c, s) {
  let u, i;
  try {
    u = t, i = n;
    let f = r(e).put(w(t, n), g(c), g(s));
    return _(f);
  } finally {
    o.__wbindgen_export_6(u, i);
  }
}
function jt(e, t) {
  return r(e) in r(t);
}
function kt(e, t) {
  let n = r(t), c = typeof n == "string" ? n : void 0;
  var s = d(c) ? 0 : E(c, o.__wbindgen_export_0, o.__wbindgen_export_1), u = h;
  a()[e / 4 + 1] = u, a()[e / 4 + 0] = s;
}
function Ot(e) {
  console.log(r(e));
}
function Tt(e) {
  return _(e);
}
function At(e, t, n, c) {
  let s, u;
  try {
    s = t, u = n;
    let i = r(e).get(w(t, n), g(c));
    return _(i);
  } finally {
    o.__wbindgen_export_6(s, u);
  }
}
function Et(e) {
  return r(e) === null;
}
function Mt(e) {
  let t = r(e).arrayBuffer();
  return _(t);
}
function qt(e, t) {
  try {
    var n = { a: e, b: t }, c = (u, i) => {
      let f = n.a;
      n.a = 0;
      try {
        return K(f, n.b, u, i);
      } finally {
        n.a = f;
      }
    };
    let s = new Promise(c);
    return _(s);
  } finally {
    n.a = n.b = 0;
  }
}
function Lt(e) {
  let t = r(e).crypto;
  return _(t);
}
function St(e) {
  let t = r(e);
  return typeof t == "object" && t !== null;
}
function Ct(e) {
  let t = r(e).process;
  return _(t);
}
function Ft(e) {
  let t = r(e).versions;
  return _(t);
}
function vt(e) {
  let t = r(e).node;
  return _(t);
}
function Rt(e) {
  return typeof r(e) == "string";
}
function $t() {
  return b(function() {
    let e = module.require;
    return _(e);
  }, arguments);
}
function Wt(e) {
  return typeof r(e) == "function";
}
function Bt(e) {
  let t = r(e).msCrypto;
  return _(t);
}
function Dt() {
  return b(function() {
    let e = self.self;
    return _(e);
  }, arguments);
}
function Nt() {
  return b(function() {
    let e = window.window;
    return _(e);
  }, arguments);
}
function zt() {
  return b(function() {
    let e = globalThis.globalThis;
    return _(e);
  }, arguments);
}
function It() {
  return b(function() {
    let e = global.global;
    return _(e);
  }, arguments);
}
function Ht(e) {
  return r(e) === void 0;
}
function Ut(e, t) {
  let n = new Function(w(e, t));
  return _(n);
}
function Vt() {
  return b(function(e, t) {
    let n = r(e).call(r(t));
    return _(n);
  }, arguments);
}
function Pt() {
  return b(function(e, t, n) {
    return Reflect.set(r(e), r(t), r(n));
  }, arguments);
}
function Jt() {
  let e = o.memory;
  return _(e);
}
function Kt(e) {
  let t = r(e).buffer;
  return _(t);
}
function Xt(e, t, n) {
  r(e).set(r(t), n >>> 0);
}
function Yt(e, t, n) {
  let c = new Uint8Array(r(e), t >>> 0, n >>> 0);
  return _(c);
}
function Zt() {
  return b(function(e, t) {
    r(e).randomFillSync(g(t));
  }, arguments);
}
function Gt(e, t, n) {
  let c = r(e).subarray(t >>> 0, n >>> 0);
  return _(c);
}
function Qt() {
  return b(function(e, t) {
    r(e).getRandomValues(r(t));
  }, arguments);
}
function te(e, t) {
  let n = M(r(t)), c = E(n, o.__wbindgen_export_0, o.__wbindgen_export_1), s = h;
  a()[e / 4 + 1] = s, a()[e / 4 + 0] = c;
}
function ee(e, t) {
  throw new Error(w(e, t));
}
function ne(e) {
  let t = g(e).original;
  return t.cnt-- == 1 ? (t.a = 0, true) : false;
}
function re(e, t) {
  let n = r(e).then(r(t));
  return _(n);
}
function _e(e, t, n) {
  let c = r(e).then(r(t), r(n));
  return _(c);
}
function oe(e) {
  let t = Promise.resolve(r(e));
  return _(t);
}
function ce(e, t) {
  r(e).respond(t >>> 0);
}
function se(e) {
  r(e).close();
}
function ie(e, t) {
  r(e).enqueue(r(t));
}
function ue(e) {
  let t = r(e).byobRequest;
  return d(t) ? 0 : _(t);
}
function fe(e) {
  let t = r(e).view;
  return d(t) ? 0 : _(t);
}
function be(e) {
  return r(e).byteLength;
}
function ae(e) {
  r(e).close();
}
function ge(e, t) {
  let n = new Error(w(e, t));
  return _(n);
}
function pe(e) {
  let t = r(e).buffer;
  return _(t);
}
function de(e) {
  return r(e).byteOffset;
}
function we(e) {
  console.error(r(e));
}
function le(e) {
  let t;
  try {
    t = r(e) instanceof Error;
  } catch {
    t = false;
  }
  return t;
}
function he(e) {
  let t = r(e).toString();
  return _(t);
}
function xe(e) {
  let t = r(e).cause;
  return _(t);
}
function ye() {
  return b(function(e, t, n, c, s) {
    r(e).set(w(t, n), w(c, s));
  }, arguments);
}
function me() {
  return b(function(e, t) {
    let n = Reflect.get(r(e), r(t));
    return _(n);
  }, arguments);
}
function je(e) {
  let t = r(e).constructor;
  return _(t);
}
function ke(e) {
  let t = r(e).name;
  return _(t);
}
function Oe() {
  return b(function() {
    let e = new Headers();
    return _(e);
  }, arguments);
}
function Te() {
  return b(function(e) {
    let t = new Headers(r(e));
    return _(t);
  }, arguments);
}
function Ae(e, t, n) {
  let c = P(e, t, 49, J);
  return _(c);
}
var Fe = { fetch: R, scheduled: void 0, queue: void 0 };
export {
  q as IntoUnderlyingByteSource,
  L as IntoUnderlyingSink,
  x as IntoUnderlyingSource,
  S as MinifyConfig,
  C as PipeOptions,
  X as PolishConfig,
  y as QueuingStrategy,
  F as R2Range,
  v as ReadableStreamGetReaderOptions,
  Y as RequestRedirect,
  Mt as __wbg_arrayBuffer_a5b60c78aa3a64ee,
  it as __wbg_arrayBuffer_ad321bb07b24265d,
  yt as __wbg_buffer_2b87f8d382772412,
  pe as __wbg_buffer_4e79326814bdd393,
  Kt as __wbg_buffer_55ba7a6b1b92e2ac,
  ue as __wbg_byobRequest_08c18cee35def1f4,
  be as __wbg_byteLength_5299848ed3264181,
  de as __wbg_byteOffset_b69b0a07afccce19,
  Vt as __wbg_call_557a2f2deacc4912,
  ct as __wbg_call_587b30eea3e09332,
  xe as __wbg_cause_52959bcad93f9e0f,
  tt as __wbg_cf_703652f0d2c5b8d1,
  ae as __wbg_close_da7e6fb9d9851e5a,
  se as __wbg_close_e9110ca16e2567db,
  je as __wbg_constructor_f2623999a1f453eb,
  Lt as __wbg_crypto_d05b68a3572bb8ca,
  ie as __wbg_enqueue_d71a1a518e21f5c3,
  we as __wbg_error_a7e23606158b68b9,
  Qt as __wbg_getRandomValues_7e42b4fb8779dc6d,
  At as __wbg_get_da8ec06c7e500e0c,
  me as __wbg_get_f53c921291c381bd,
  zt as __wbg_globalThis_b70c095388441f2d,
  It as __wbg_global_1c72617491ed7194,
  Q as __wbg_headers_1eff4f53324496e6,
  le as __wbg_instanceof_Error_fac23a8832b241da,
  ft as __wbg_length_0aab7ffd65ad19ed,
  Ot as __wbg_log_dc06ec929fc95a20,
  Z as __wbg_method_e15eb9cf1c32cdbb,
  Bt as __wbg_msCrypto_10fc94afee92bd76,
  ke as __wbg_name_2a8bae31363c6a51,
  ut as __wbg_new_09938a7d020f049b,
  Oe as __wbg_new_143b41b4342650bb,
  qt as __wbg_new_2b55e405e4af4986,
  xt as __wbg_new_2b6fea4ea03b1b95,
  gt as __wbg_new_46ad1d5f9580ad0f,
  ge as __wbg_new_87297f22973157c8,
  at as __wbg_newbigint_c3a6a615aa10ce63,
  Ut as __wbg_newnoargs_c9e6043b8ad84109,
  Yt as __wbg_newwithbyteoffsetandlength_88d1d8be5df94b9b,
  Te as __wbg_newwithheaders_5ba3c8c978d07800,
  rt as __wbg_newwithlength_89eeca401d8918c2,
  _t as __wbg_newwithoptbuffersourceandinit_6c49960a834dd7cf,
  ot as __wbg_newwithoptreadablestreamandinit_d238e5b972c7b57f,
  nt as __wbg_newwithoptstrandinit_ff70839f3334d3aa,
  pt as __wbg_newwithsource_620c192b0682807b,
  vt as __wbg_node_43b1089f407e4ec2,
  lt as __wbg_pipeTo_15298d2870ad44dc,
  Ct as __wbg_process_b02b3570280d0366,
  mt as __wbg_put_b5bda0626d16ab51,
  Zt as __wbg_randomFillSync_b70ccbdf4926a99d,
  ht as __wbg_readable_f4de67129615af84,
  $t as __wbg_require_9a7e0f667ead4995,
  oe as __wbg_resolve_ae38ad63c43ff98b,
  ce as __wbg_respond_8fadc5f5c9d95422,
  Dt as __wbg_self_742dd6eab3e9211e,
  Pt as __wbg_set_07da13cc24b69217,
  Xt as __wbg_set_3698e3ca519b3c3c,
  ye as __wbg_set_76353df4722f4954,
  Gt as __wbg_subarray_d82be056deb4ad27,
  _e as __wbg_then_835b073a479138e5,
  re as __wbg_then_8df675b8bb5d5e3c,
  he as __wbg_toString_506566b763774a16,
  G as __wbg_url_3325e0ef088003ca,
  Ft as __wbg_versions_c1cb42213cedf0f5,
  fe as __wbg_view_231340b0dd8a2484,
  Nt as __wbg_window_c409e731db53a0e2,
  wt as __wbg_writable_4c3594ca4b0a2fa6,
  bt as __wbindgen_bigint_from_u64,
  ne as __wbindgen_cb_drop,
  Ae as __wbindgen_closure_wrapper950,
  te as __wbindgen_debug_string,
  jt as __wbindgen_in,
  Wt as __wbindgen_is_function,
  Et as __wbindgen_is_null,
  St as __wbindgen_is_object,
  Rt as __wbindgen_is_string,
  Ht as __wbindgen_is_undefined,
  Jt as __wbindgen_memory,
  Tt as __wbindgen_number_new,
  dt as __wbindgen_object_clone_ref,
  et as __wbindgen_object_drop_ref,
  kt as __wbindgen_string_get,
  st as __wbindgen_string_new,
  ee as __wbindgen_throw,
  Fe as default,
  R as fetch,
  z as getMemory,
  Ce as wasmModule
};
//# sourceMappingURL=shim.js.map
