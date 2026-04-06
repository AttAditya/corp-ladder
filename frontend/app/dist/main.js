var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var t;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p;
var v;
var y;
var d = {};
var w = [];
var _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var g = Array.isArray;
function m(n2, l3) {
  for (var u4 in l3) n2[u4] = l3[u4];
  return n2;
}
function b(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function k(l3, u4, t3) {
  var i3, r3, o3, e3 = {};
  for (o3 in u4) "key" == o3 ? i3 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
  if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
  return x(l3, e3, i3, r3, null);
}
function x(n2, t3, i3, r3, o3) {
  var e3 = { type: n2, props: t3, key: i3, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
  return null == o3 && null != l.vnode && l.vnode(e3), e3;
}
function S(n2) {
  return n2.children;
}
function C(n2, l3) {
  this.props = n2, this.context = l3;
}
function $(n2, l3) {
  if (null == l3) return n2.__ ? $(n2.__, n2.__i + 1) : null;
  for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
  return "function" == typeof n2.type ? $(n2) : null;
}
function I(n2) {
  if (n2.__P && n2.__d) {
    var u4 = n2.__v, t3 = u4.__e, i3 = [], r3 = [], o3 = m({}, u4);
    o3.__v = u4.__v + 1, l.vnode && l.vnode(o3), q(n2.__P, o3, u4, n2.__n, n2.__P.namespaceURI, 32 & u4.__u ? [t3] : null, i3, null == t3 ? $(u4) : t3, !!(32 & u4.__u), r3), o3.__v = u4.__v, o3.__.__k[o3.__i] = o3, D(i3, o3, r3), u4.__e = u4.__ = null, o3.__e != t3 && P(o3);
  }
}
function P(n2) {
  if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l3) {
    if (null != l3 && null != l3.__e) return n2.__e = n2.__c.base = l3.__e;
  }), P(n2);
}
function A(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !H.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(H);
}
function H() {
  try {
    for (var n2, l3 = 1; i.length; ) i.length > l3 && i.sort(e), n2 = i.shift(), l3 = i.length, I(n2);
  } finally {
    i.length = H.__r = 0;
  }
}
function L(n2, l3, u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, _2, g2, m3 = t3 && t3.__k || w, b2 = l3.length;
  for (f4 = T(u4, l3, m3, f4, b2), a3 = 0; a3 < b2; a3++) null != (p3 = u4.__k[a3]) && (h3 = -1 != p3.__i && m3[p3.__i] || d, p3.__i = a3, _2 = q(n2, p3, h3, i3, r3, o3, e3, f4, c3, s3), v3 = p3.__e, p3.ref && h3.ref != p3.ref && (h3.ref && J(h3.ref, null, p3), s3.push(p3.ref, p3.__c || v3, p3)), null == y3 && null != v3 && (y3 = v3), (g2 = !!(4 & p3.__u)) || h3.__k === p3.__k ? (f4 = j(p3, f4, n2, g2), g2 && h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _2 ? f4 = _2 : v3 && (f4 = v3.nextSibling), p3.__u &= -7);
  return u4.__e = y3, f4;
}
function T(n2, l3, u4, t3, i3) {
  var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
  for (n2.__k = new Array(i3), r3 = 0; r3 < i3; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? ("string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? o3 = n2.__k[r3] = x(null, o3, null, null, null) : g(o3) ? o3 = n2.__k[r3] = x(S, { children: o3 }, null, null, null) : void 0 === o3.constructor && o3.__b > 0 ? o3 = n2.__k[r3] = x(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : n2.__k[r3] = o3, f4 = r3 + h3, o3.__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = O(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i3 > s3 ? h3-- : i3 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
  if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = $(e3)), K(e3, e3));
  return t3;
}
function j(n2, l3, u4, t3) {
  var i3, r3;
  if ("function" == typeof n2.type) {
    for (i3 = n2.__k, r3 = 0; i3 && r3 < i3.length; r3++) i3[r3] && (i3[r3].__ = n2, l3 = j(i3[r3], l3, u4, t3));
    return l3;
  }
  n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = $(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 == l3.nodeType);
  return l3;
}
function O(n2, l3, u4, t3) {
  var i3, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
  if (null === c3 && null == e3 || s3 && e3 == c3.key && f4 == c3.type) return u4;
  if (t3 > (s3 ? 1 : 0)) {
    for (i3 = u4 - 1, r3 = u4 + 1; i3 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i3 >= 0 ? i3-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
  }
  return -1;
}
function z(n2, l3, u4) {
  "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || _.test(l3) ? u4 : u4 + "px";
}
function N(n2, l3, u4, t3, i3) {
  var r3, o3;
  n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
  else {
    if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || z(n2.style, l3, "");
    if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || z(n2.style, l3, u4[l3]);
  }
  else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(a, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4[s] = t3[s] : (u4[s] = h, n2.addEventListener(l3, r3 ? v : p, r3)) : n2.removeEventListener(l3, r3 ? v : p, r3);
  else {
    if ("http://www.w3.org/2000/svg" == i3) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
      n2[l3] = null == u4 ? "" : u4;
      break n;
    } catch (n3) {
    }
    "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
  }
}
function V(n2) {
  return function(u4) {
    if (this.l) {
      var t3 = this.l[u4.type + n2];
      if (null == u4[c]) u4[c] = h++;
      else if (u4[c] < t3[s]) return;
      return t3(l.event ? l.event(u4) : u4);
    }
  };
}
function q(n2, u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, d3, _2, k3, x3, M, $2, I2, P2, A2, H2, T2 = u4.type;
  if (void 0 !== u4.constructor) return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
  n: if ("function" == typeof T2) try {
    if (k3 = u4.props, x3 = T2.prototype && T2.prototype.render, M = (a3 = T2.contextType) && i3[a3.__c], $2 = a3 ? M ? M.props.value : a3.__ : i3, t3.__c ? _2 = (h3 = u4.__c = t3.__c).__ = h3.__E : (x3 ? u4.__c = h3 = new T2(k3, $2) : (u4.__c = h3 = new C(k3, $2), h3.constructor = T2, h3.render = Q), M && M.sub(h3), h3.state || (h3.state = {}), h3.__n = i3, p3 = h3.__d = true, h3.__h = [], h3._sb = []), x3 && null == h3.__s && (h3.__s = h3.state), x3 && null != T2.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = m({}, h3.__s)), m(h3.__s, T2.getDerivedStateFromProps(k3, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) x3 && null == T2.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), x3 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
    else {
      if (x3 && null == T2.getDerivedStateFromProps && k3 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(k3, $2), u4.__v == t3.__v || !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(k3, h3.__s, $2)) {
        u4.__v != t3.__v && (h3.props = k3, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
          n3 && (n3.__ = u4);
        }), w.push.apply(h3.__h, h3._sb), h3._sb = [], h3.__h.length && e3.push(h3);
        break n;
      }
      null != h3.componentWillUpdate && h3.componentWillUpdate(k3, h3.__s, $2), x3 && null != h3.componentDidUpdate && h3.__h.push(function() {
        h3.componentDidUpdate(v3, y3, d3);
      });
    }
    if (h3.context = $2, h3.props = k3, h3.__P = n2, h3.__e = false, I2 = l.__r, P2 = 0, x3) h3.state = h3.__s, h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), w.push.apply(h3.__h, h3._sb), h3._sb = [];
    else do {
      h3.__d = false, I2 && I2(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
    } while (h3.__d && ++P2 < 25);
    h3.state = h3.__s, null != h3.getChildContext && (i3 = m(m({}, i3), h3.getChildContext())), x3 && !p3 && null != h3.getSnapshotBeforeUpdate && (d3 = h3.getSnapshotBeforeUpdate(v3, y3)), A2 = null != a3 && a3.type === S && null == a3.key ? E(a3.props.children) : a3, f4 = L(n2, g(A2) ? A2 : [A2], u4, t3, i3, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), _2 && (h3.__E = h3.__ = null);
  } catch (n3) {
    if (u4.__v = null, c3 || null != o3) if (n3.then) {
      for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
      o3[o3.indexOf(f4)] = null, u4.__e = f4;
    } else {
      for (H2 = o3.length; H2--; ) b(o3[H2]);
      B(u4);
    }
    else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || B(u4);
    l.__e(n3, u4, t3);
  }
  else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = G(t3.__e, u4, t3, i3, r3, o3, e3, c3, s3);
  return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
}
function B(n2) {
  n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(B));
}
function D(n2, u4, t3) {
  for (var i3 = 0; i3 < t3.length; i3++) J(t3[i3], t3[++i3], t3[++i3]);
  l.__c && l.__c(u4, n2), n2.some(function(u5) {
    try {
      n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
        n3.call(u5);
      });
    } catch (n3) {
      l.__e(n3, u5.__v);
    }
  });
}
function E(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : g(n2) ? n2.map(E) : m({}, n2);
}
function G(u4, t3, i3, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, w3, _2, m3 = i3.props || d, k3 = t3.props, x3 = t3.type;
  if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
    for (a3 = 0; a3 < e3.length; a3++) if ((y3 = e3[a3]) && "setAttribute" in y3 == !!x3 && (x3 ? y3.localName == x3 : 3 == y3.nodeType)) {
      u4 = y3, e3[a3] = null;
      break;
    }
  }
  if (null == u4) {
    if (null == x3) return document.createTextNode(k3);
    u4 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
  }
  if (null == x3) m3 === k3 || c3 && u4.data == k3 || (u4.data = k3);
  else {
    if (e3 = e3 && n.call(u4.childNodes), !c3 && null != e3) for (m3 = {}, a3 = 0; a3 < u4.attributes.length; a3++) m3[(y3 = u4.attributes[a3]).name] = y3.value;
    for (a3 in m3) y3 = m3[a3], "dangerouslySetInnerHTML" == a3 ? p3 = y3 : "children" == a3 || a3 in k3 || "value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3 || N(u4, a3, null, y3, o3);
    for (a3 in k3) y3 = k3[a3], "children" == a3 ? v3 = y3 : "dangerouslySetInnerHTML" == a3 ? h3 = y3 : "value" == a3 ? w3 = y3 : "checked" == a3 ? _2 = y3 : c3 && "function" != typeof y3 || m3[a3] === y3 || N(u4, a3, y3, m3[a3], o3);
    if (h3) c3 || p3 && (h3.__html == p3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
    else if (p3 && (u4.innerHTML = ""), L("template" == t3.type ? u4.content : u4, g(v3) ? v3 : [v3], t3, i3, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i3.__k && $(i3, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) b(e3[a3]);
    c3 || (a3 = "value", "progress" == x3 && null == w3 ? u4.removeAttribute("value") : null != w3 && (w3 !== u4[a3] || "progress" == x3 && !w3 || "option" == x3 && w3 != m3[a3]) && N(u4, a3, w3, m3[a3], o3), a3 = "checked", null != _2 && _2 != u4[a3] && N(u4, a3, _2, m3[a3], o3));
  }
  return u4;
}
function J(n2, u4, t3) {
  try {
    if ("function" == typeof n2) {
      var i3 = "function" == typeof n2.__u;
      i3 && n2.__u(), i3 && null == u4 || (n2.__u = n2(u4));
    } else n2.current = u4;
  } catch (n3) {
    l.__e(n3, t3);
  }
}
function K(n2, u4, t3) {
  var i3, r3;
  if (l.unmount && l.unmount(n2), (i3 = n2.ref) && (i3.current && i3.current != n2.__e || J(i3, null, u4)), null != (i3 = n2.__c)) {
    if (i3.componentWillUnmount) try {
      i3.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u4);
    }
    i3.base = i3.__P = null;
  }
  if (i3 = n2.__k) for (r3 = 0; r3 < i3.length; r3++) i3[r3] && K(i3[r3], u4, t3 || "function" != typeof n2.type);
  t3 || b(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function Q(n2, l3, u4) {
  return this.constructor(n2, u4);
}
function R(u4, t3, i3) {
  var r3, o3, e3, f4;
  t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i3) ? null : i3 && i3.__k || t3.__k, e3 = [], f4 = [], q(t3, u4 = (!r3 && i3 || t3).__k = k(S, null, [u4]), o3 || d, d, t3.namespaceURI, !r3 && i3 ? [i3] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i3 ? i3 : o3 ? o3.__e : t3.firstChild, r3, f4), D(e3, u4, f4);
}
function X(n2) {
  function l3(n3) {
    var u4, t3;
    return this.getChildContext || (u4 = /* @__PURE__ */ new Set(), (t3 = {})[l3.__c] = this, this.getChildContext = function() {
      return t3;
    }, this.componentWillUnmount = function() {
      u4 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u4.forEach(function(n5) {
        n5.__e = true, A(n5);
      });
    }, this.sub = function(n4) {
      u4.add(n4);
      var l4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u4 && u4.delete(n4), l4 && l4.call(n4);
      };
    }), n3.children;
  }
  return l3.__c = "__cC" + y++, l3.__ = n2, l3.Provider = l3.__l = (l3.Consumer = function(n3, l4) {
    return n3.children(l4);
  }).contextType = l3, l3;
}
n = w.slice, l = { __e: function(n2, l3, u4, t3) {
  for (var i3, r3, o3; l3 = l3.__; ) if ((i3 = l3.__c) && !i3.__) try {
    if ((r3 = i3.constructor) && null != r3.getDerivedStateFromError && (i3.setState(r3.getDerivedStateFromError(n2)), o3 = i3.__d), null != i3.componentDidCatch && (i3.componentDidCatch(n2, t3 || {}), o3 = i3.__d), o3) return i3.__E = i3;
  } catch (l4) {
    n2 = l4;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, C.prototype.setState = function(n2, l3) {
  var u4;
  u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = m({}, this.state), "function" == typeof n2 && (n2 = n2(m({}, u4), this.props)), n2 && m(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), A(this));
}, C.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), A(this));
}, C.prototype.render = S, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
  return n2.__v.__b - l3.__v.__b;
}, H.__r = 0, f = Math.random().toString(8), c = "__d" + f, s = "__a" + f, a = /(PointerCapture)$|Capture$/i, h = 0, p = V(false), v = V(true), y = 0;

// node_modules/preact/hooks/dist/hooks.module.js
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = l;
var e2 = c2.__b;
var a2 = c2.__r;
var v2 = c2.diffed;
var l2 = c2.__c;
var m2 = c2.unmount;
var s2 = c2.__;
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u4, i3) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i3 ? i3(u4) : D2(void 0, u4), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f4 = function(n3, t3, r3) {
      if (!o3.__c.__H) return true;
      var u5 = o3.__c.__H.__.filter(function(n4) {
        return n4.__c;
      });
      if (u5.every(function(n4) {
        return !n4.__N;
      })) return !c3 || c3.call(this, n3, t3, r3);
      var i4 = o3.__c.props !== n3;
      return u5.some(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i4 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i4;
    };
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u5 = c3;
        c3 = void 0, f4(n3, t3, r3), c3 = u5;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f4;
  }
  return o3.__N || o3.__;
}
function y2(n2, u4) {
  var i3 = p2(t2++, 3);
  !c2.__s && C2(i3.__H, u4) && (i3.__ = n2, i3.u = u4, r2.__H.__h.push(i3));
}
function x2(n2) {
  var u4 = r2.context[n2.__c], i3 = p2(t2++, 9);
  return i3.c = n2, u4 ? (null == i3.__ && (i3.__ = true, u4.sub(r2)), u4.props.value) : n2.__;
}
function j2() {
  for (var n2; n2 = f2.shift(); ) {
    var t3 = n2.__H;
    if (n2.__P && t3) try {
      t3.__h.some(z2), t3.__h.some(B2), t3.__h = [];
    } catch (r3) {
      t3.__h = [], c2.__e(r3, n2.__v);
    }
  }
}
c2.__b = function(n2) {
  r2 = null, e2 && e2(n2);
}, c2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
}, c2.__r = function(n2) {
  a2 && a2(n2), t2 = 0;
  var i3 = (r2 = n2.__c).__H;
  i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.some(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i3.__h.some(z2), i3.__h.some(B2), i3.__h = [], t2 = 0)), u2 = r2;
}, c2.diffed = function(n2) {
  v2 && v2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.some(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u2 = r2 = null;
}, c2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.some(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], c2.__e(r3, n3.__v);
    }
  }), l2 && l2(n2, t3);
}, c2.unmount = function(n2) {
  m2 && m2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.some(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f3 = 0;
function u3(e3, t3, n2, o3, i3, u4) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
}

// src/components/ui/Surface.tsx
function Surface({ children, className = "" }) {
  return /* @__PURE__ */ u3("div", { className: ["surface", className].filter(Boolean).join(" "), children });
}

// src/registry/site.ts
var siteConfig = {
  apiBasePath: "/api",
  name: "Corp Ladder",
  sessionStorageKey: "corp-ladder.session-token",
  summary: "Frontend control plane for company auth, hierarchy management, and role-based org administration."
};

// src/api/http.ts
var ApiError = class extends Error {
  constructor(message, status, data) {
    super(message);
    __publicField(this, "data");
    __publicField(this, "status");
    this.name = "ApiError";
    this.data = data;
    this.status = status;
  }
};
function getErrorMessage(status, data) {
  if (typeof data === "object" && data !== null) {
    const detail = "detail" in data ? data.detail : void 0;
    const message = "message" in data ? data.message : void 0;
    if (typeof detail === "string") {
      return detail;
    }
    if (typeof message === "string") {
      return message;
    }
  }
  return `Request failed with status ${status}.`;
}
async function requestJson(resourcePath, init) {
  const normalizedPath = resourcePath.startsWith("/") ? resourcePath : `/${resourcePath}`;
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.json !== void 0) {
    headers.set("Content-Type", "application/json");
  }
  if (init?.token) {
    headers.set("Authorization", `Bearer ${init.token}`);
  }
  const url = `${siteConfig.apiBasePath}${normalizedPath}`;
  const requestBody = init?.json === void 0 ? init?.body : JSON.stringify(init.json);
  console.debug(`[API] ${init?.method || "GET"} ${url}`, {
    hasBody: !!requestBody,
    headers: Object.fromEntries(headers.entries())
  });
  const response = await fetch(url, {
    ...init,
    body: requestBody,
    headers: {
      ...Object.fromEntries(headers.entries())
    }
  });
  const contentType = response.headers.get("content-type") ?? "";
  const responseData = contentType.includes("application/json") ? await response.json() : await response.text();
  console.debug(`[API] Response ${response.status}:`, {
    ok: response.ok,
    contentType,
    dataType: typeof responseData
  });
  if (!response.ok) {
    console.error(`[API] Request failed:`, responseData);
    throw new ApiError(getErrorMessage(response.status, responseData), response.status, responseData);
  }
  return responseData;
}

// src/api/company.ts
function companyPath(companyId) {
  return `/v1/company/${encodeURIComponent(companyId)}`;
}
function listCompanies() {
  return requestJson("/v1/company");
}
function readCompany(companyId) {
  return requestJson(companyPath(companyId));
}
function createCompany(payload) {
  return requestJson("/v1/company", {
    json: payload,
    method: "POST"
  });
}
function updateCompany(companyId, payload, token) {
  return requestJson(companyPath(companyId), {
    json: payload,
    method: "PATCH",
    token
  });
}
function upsertCompanyRole(companyId, payload, token) {
  return requestJson(`${companyPath(companyId)}/roles`, {
    json: payload,
    method: "POST",
    token
  });
}

// src/api/employee.ts
function employeePath(employeeId) {
  return `/v1/employee/${encodeURIComponent(employeeId)}`;
}
function createEmployee(payload, token) {
  return requestJson("/v1/employee", {
    json: payload,
    method: "POST",
    token
  });
}
function updateEmployee(employeeId, payload, token) {
  return requestJson(employeePath(employeeId), {
    json: payload,
    method: "PATCH",
    token
  });
}
function changeEmployeeManager(employeeId, payload, token) {
  return requestJson(`${employeePath(employeeId)}/manager`, {
    json: payload,
    method: "PATCH",
    token
  });
}
function assignEmployeeRole(employeeId, payload, token) {
  return requestJson(`${employeePath(employeeId)}/roles`, {
    json: payload,
    method: "POST",
    token
  });
}
function revokeEmployeeRole(employeeId, roleId, token) {
  return requestJson(`${employeePath(employeeId)}/roles/${encodeURIComponent(roleId)}`, {
    method: "DELETE",
    token
  });
}
function removeEmployee(employeeId, token) {
  return requestJson(employeePath(employeeId), {
    method: "DELETE",
    token
  });
}

// src/data/organization.ts
var companyCatalogCache = null;
var companyCatalogInFlight = null;
var companyWorkspaceCache = /* @__PURE__ */ new Map();
var companyWorkspaceInFlight = /* @__PURE__ */ new Map();
function primeWorkspace(company) {
  companyWorkspaceCache.set(company.id, company);
  return company;
}
function invalidateCompany(companyId) {
  companyWorkspaceCache.delete(companyId);
  companyWorkspaceInFlight.delete(companyId);
}
function invalidateCatalog() {
  companyCatalogCache = null;
  companyCatalogInFlight = null;
}
async function getCompanyCatalog(forceRefresh = false) {
  if (!forceRefresh && companyCatalogCache) {
    return companyCatalogCache;
  }
  if (!forceRefresh && companyCatalogInFlight) {
    return companyCatalogInFlight;
  }
  companyCatalogInFlight = listCompanies().then((response) => {
    companyCatalogCache = response.companies;
    companyCatalogInFlight = null;
    return response.companies;
  }).catch((error) => {
    companyCatalogInFlight = null;
    throw error;
  });
  return companyCatalogInFlight;
}
async function getCompanyWorkspace(companyId, forceRefresh = false) {
  if (!forceRefresh && companyWorkspaceCache.has(companyId)) {
    return companyWorkspaceCache.get(companyId);
  }
  if (!forceRefresh && companyWorkspaceInFlight.has(companyId)) {
    return companyWorkspaceInFlight.get(companyId);
  }
  const request = readCompany(companyId).then((response) => {
    companyWorkspaceInFlight.delete(companyId);
    return primeWorkspace(response.company);
  }).catch((error) => {
    companyWorkspaceInFlight.delete(companyId);
    throw error;
  });
  companyWorkspaceInFlight.set(companyId, request);
  return request;
}
async function createCompanyAccount(payload) {
  const response = await createCompany(payload);
  invalidateCatalog();
  primeWorkspace(response.company);
  return response;
}
async function updateCompanyAccount(companyId, payload, token) {
  const response = await updateCompany(companyId, payload, token);
  invalidateCatalog();
  return primeWorkspace(response.company);
}
async function upsertRoleAndReload(companyId, payload, token) {
  await upsertCompanyRole(companyId, payload, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}
async function createEmployeeAndReload(payload, token) {
  await createEmployee(payload, token);
  invalidateCompany(payload.company_id);
  invalidateCatalog();
  return getCompanyWorkspace(payload.company_id, true);
}
async function updateEmployeeAndReload(employeeId, companyId, payload, token) {
  await updateEmployee(employeeId, payload, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}
async function changeManagerAndReload(employeeId, companyId, payload, token) {
  await changeEmployeeManager(employeeId, payload, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}
async function assignRoleAndReload(employeeId, companyId, payload, token) {
  await assignEmployeeRole(employeeId, payload, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}
async function revokeRoleAndReload(employeeId, companyId, roleId, token) {
  await revokeEmployeeRole(employeeId, roleId, token);
  invalidateCompany(companyId);
  return getCompanyWorkspace(companyId, true);
}
async function removeEmployeeAndReload(employeeId, companyId, token) {
  await removeEmployee(employeeId, token);
  invalidateCompany(companyId);
  invalidateCatalog();
  return getCompanyWorkspace(companyId, true);
}

// src/api/auth.ts
function loginEmployee(payload) {
  return requestJson("/v1/auth/employee/login", {
    json: payload,
    method: "POST"
  });
}
function loginCompany(payload) {
  return requestJson("/v1/auth/company/login", {
    json: payload,
    method: "POST"
  });
}
function readCurrentSession(token) {
  return requestJson("/v1/auth/me", {
    token
  });
}
function logoutSession(token) {
  return requestJson("/v1/auth/logout", {
    method: "POST",
    token
  });
}

// src/data/session.ts
function restoreSession(token) {
  return readCurrentSession(token).then((response) => response.session);
}
function createEmployeeSession(payload) {
  return loginEmployee(payload);
}
function createCompanySession(payload) {
  return loginCompany(payload);
}
function destroySession(token) {
  return logoutSession(token).then(() => void 0);
}

// src/transformers/workspace.ts
function sortByName(left, right) {
  return left.name.localeCompare(right.name) || left.id.localeCompare(right.id);
}
function getReportingLevel(employee, employeeIndex) {
  let level = 0;
  let cursor = employee;
  const seen = /* @__PURE__ */ new Set([employee.id]);
  while (cursor.reports) {
    const manager = employeeIndex[cursor.reports];
    if (!manager || seen.has(manager.id)) {
      break;
    }
    seen.add(manager.id);
    cursor = manager;
    level += 1;
  }
  return level;
}
function toRoleIndex(roles) {
  return roles.reduce((index, role) => {
    index[role.id] = role;
    return index;
  }, {});
}
function toWorkspaceViewModel(company) {
  const roleIndex = toRoleIndex(company.roles);
  const rawEmployeeIndex = company.employees.reduce((index, employee) => {
    index[employee.id] = employee;
    return index;
  }, {});
  const employees = company.employees.map((employee) => ({
    ...employee,
    directReportCount: employee.reporting.length,
    isBoardMember: company.board.includes(employee.id),
    level: getReportingLevel(employee, rawEmployeeIndex),
    managerName: employee.reports ? rawEmployeeIndex[employee.reports]?.name ?? employee.reports : null,
    roleLabels: employee.roles.map((roleId) => roleIndex[roleId]?.id ?? roleId)
  })).sort((left, right) => left.level - right.level || sortByName(left, right));
  const employeeIndex = employees.reduce((index, employee) => {
    index[employee.id] = employee;
    return index;
  }, {});
  return {
    boardMembers: company.board.map((employeeId) => employeeIndex[employeeId]).filter(Boolean),
    company,
    employeeIndex,
    employees,
    roleIndex,
    roles: company.roles
  };
}

// src/contexts/app-context.tsx
var AppContext = X(null);
function getErrorMessage2(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Unexpected request failure.";
}
function isUnauthorized(error) {
  return error instanceof ApiError && error.status === 401;
}
function AppProvider({ children }) {
  const [bootstrapStatus, setBootstrapStatus] = d2("loading");
  const [companiesStatus, setCompaniesStatus] = d2("idle");
  const [workspaceStatus, setWorkspaceStatus] = d2("idle");
  const [companies, setCompanies] = d2([]);
  const [activeCompany, setActiveCompany] = d2(null);
  const [session, setSession] = d2(null);
  const [token, setToken] = d2(null);
  const [pendingAction, setPendingAction] = d2(null);
  const [pageError, setPageError] = d2(null);
  const [actionError, setActionError] = d2(null);
  const currentEmployeeId = session?.principal_type === "employee" ? session.employee.id : null;
  const permissions = session?.principal_type === "employee" ? session.employee.permissions : [];
  const syncToken = (nextToken) => {
    setToken(nextToken);
    if (nextToken) {
      window.localStorage.setItem(siteConfig.sessionStorageKey, nextToken);
      return;
    }
    window.localStorage.removeItem(siteConfig.sessionStorageKey);
  };
  const clearSessionState = () => {
    syncToken(null);
    setSession(null);
  };
  const loadCatalog = async (forceRefresh = false) => {
    setCompaniesStatus("loading");
    try {
      const nextCompanies = await getCompanyCatalog(forceRefresh);
      setCompanies(nextCompanies);
      setCompaniesStatus("ready");
      return nextCompanies;
    } catch (error) {
      setCompaniesStatus("error");
      throw error;
    }
  };
  const loadCompany = async (companyId, forceRefresh = false) => {
    setWorkspaceStatus("loading");
    try {
      const workspace = await getCompanyWorkspace(companyId, forceRefresh);
      setActiveCompany(toWorkspaceViewModel(workspace));
      setWorkspaceStatus("ready");
    } catch (error) {
      setWorkspaceStatus("error");
      throw error;
    }
  };
  const resetPublicWorkspace = async (nextCompanies) => {
    const companyCatalog = nextCompanies ?? companies;
    if (companyCatalog.length === 0) {
      setActiveCompany(null);
      setWorkspaceStatus("idle");
      return;
    }
    await loadCompany(companyCatalog[0].id, true);
  };
  const captureActionError = async (error) => {
    if (isUnauthorized(error)) {
      clearSessionState();
      const nextCompanies = await loadCatalog(true);
      await resetPublicWorkspace(nextCompanies);
      setActionError("Your session expired. Please sign in again.");
      return;
    }
    setActionError(getErrorMessage2(error));
  };
  const runAction = async (label, action) => {
    setPendingAction(label);
    setActionError(null);
    try {
      return await action();
    } catch (error) {
      await captureActionError(error);
      throw error;
    } finally {
      setPendingAction(null);
    }
  };
  const refreshCompanies = async () => {
    await runAction("Refreshing companies", async () => {
      const nextCompanies = await loadCatalog(true);
      if (!session) {
        await resetPublicWorkspace(nextCompanies);
      }
    });
  };
  const refreshWorkspace = async () => {
    if (session) {
      await runAction("Refreshing workspace", async () => {
        await loadCatalog(true);
        await loadCompany(session.company_id, true);
      });
      return;
    }
    await refreshCompanies();
  };
  const finalizeAuthentication = async (nextToken, nextSession, preloadCompany) => {
    syncToken(nextToken);
    setSession(nextSession);
    await loadCatalog(true);
    if (preloadCompany) {
      setActiveCompany(preloadCompany);
      setWorkspaceStatus("ready");
      return;
    }
    await loadCompany(nextSession.company_id, true);
  };
  y2(() => {
    const bootstrap = async () => {
      setPageError(null);
      setBootstrapStatus("loading");
      try {
        const storedToken = window.localStorage.getItem(siteConfig.sessionStorageKey);
        const nextCompanies = await loadCatalog(false);
        if (storedToken) {
          try {
            const restored = await restoreSession(storedToken);
            syncToken(storedToken);
            setSession(restored);
            await loadCompany(restored.company_id, false);
          } catch (error) {
            clearSessionState();
            await resetPublicWorkspace(nextCompanies);
            setActionError(isUnauthorized(error) ? "Your previous session is no longer valid." : getErrorMessage2(error));
          }
        } else {
          await resetPublicWorkspace(nextCompanies);
        }
      } catch (error) {
        setPageError(getErrorMessage2(error));
      } finally {
        setBootstrapStatus("ready");
      }
    };
    void bootstrap();
  }, []);
  const requireToken = () => {
    if (!token || !session) {
      throw new Error("Authentication required.");
    }
    return token;
  };
  const createCompany2 = async (payload) => {
    await runAction("Creating company", async () => {
      const response = await createCompanyAccount(payload);
      await finalizeAuthentication(response.token, response.session, toWorkspaceViewModel(response.company));
    });
  };
  const loginEmployee2 = async (payload) => {
    await runAction("Signing in employee", async () => {
      console.debug("[LOGIN] Starting employee login with ID:", payload.employee_id);
      try {
        const response = await createEmployeeSession(payload);
        console.debug("[LOGIN] Received auth response:", {
          hasToken: !!response.token,
          hasSession: !!response.session,
          sessionType: response.session?.principal_type
        });
        await finalizeAuthentication(response.token, response.session);
        console.debug("[LOGIN] Authentication finalized successfully");
      } catch (error) {
        console.error("[LOGIN] Error during login:", error);
        throw error;
      }
    });
  };
  const loginCompany2 = async (payload) => {
    await runAction("Signing in company", async () => {
      const response = await createCompanySession(payload);
      await finalizeAuthentication(response.token, response.session);
    });
  };
  const logout = async () => {
    await runAction("Ending session", async () => {
      const currentToken = token;
      if (currentToken) {
        try {
          await destroySession(currentToken);
        } catch (error) {
          if (!isUnauthorized(error)) {
            throw error;
          }
        }
      }
      clearSessionState();
      const nextCompanies = await loadCatalog(true);
      await resetPublicWorkspace(nextCompanies);
    });
  };
  const selectPublicCompany = async (companyId) => {
    if (session) {
      return;
    }
    await runAction("Loading company", async () => {
      await loadCompany(companyId, true);
    });
  };
  const updateCompanyRecord = async (payload) => {
    await runAction("Updating company", async () => {
      const currentToken = requireToken();
      const updatedCompany = await updateCompanyAccount(session.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(updatedCompany));
      await loadCatalog(true);
    });
  };
  const createRole = async (payload) => {
    await runAction("Saving role", async () => {
      const currentToken = requireToken();
      const workspace = await upsertRoleAndReload(session.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const createEmployeeRecord = async (payload) => {
    await runAction("Adding employee", async () => {
      const currentToken = requireToken();
      const workspace = await createEmployeeAndReload(payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const updateEmployeeRecord = async (employeeId, payload) => {
    await runAction("Updating employee", async () => {
      const currentToken = requireToken();
      const workspace = await updateEmployeeAndReload(employeeId, session.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const changeManager = async (employeeId, payload) => {
    await runAction("Rewiring reporting line", async () => {
      const currentToken = requireToken();
      const workspace = await changeManagerAndReload(employeeId, session.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const assignRole = async (employeeId, payload) => {
    await runAction("Assigning role", async () => {
      const currentToken = requireToken();
      const workspace = await assignRoleAndReload(employeeId, session.company_id, payload, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const revokeRole = async (employeeId, roleId) => {
    await runAction("Revoking role", async () => {
      const currentToken = requireToken();
      const workspace = await revokeRoleAndReload(employeeId, session.company_id, roleId, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const removeEmployeeRecord = async (employeeId) => {
    await runAction("Removing employee", async () => {
      const currentToken = requireToken();
      const workspace = await removeEmployeeAndReload(employeeId, session.company_id, currentToken);
      setActiveCompany(toWorkspaceViewModel(workspace));
      await loadCatalog(true);
    });
  };
  const value = {
    actionError,
    activeCompany,
    bootstrapStatus,
    companies,
    companiesStatus,
    createCompany: createCompany2,
    createEmployee: createEmployeeRecord,
    createRole,
    currentEmployeeId,
    isAuthenticated: Boolean(session),
    isEmployeeSession: session?.principal_type === "employee",
    loginCompany: loginCompany2,
    loginEmployee: loginEmployee2,
    logout,
    pageError,
    pendingAction,
    permissions,
    refreshCompanies,
    refreshWorkspace,
    removeEmployee: removeEmployeeRecord,
    revokeRole,
    selectPublicCompany,
    session,
    token,
    updateCompany: updateCompanyRecord,
    updateEmployee: updateEmployeeRecord,
    assignRole,
    changeManager,
    workspaceStatus
  };
  return /* @__PURE__ */ u3(AppContext.Provider, { value, children });
}
function useAppModel() {
  const value = x2(AppContext);
  if (!value) {
    throw new Error("useAppModel must be used within AppProvider.");
  }
  return value;
}

// src/components/sections/PublicPortalSection.tsx
var emptyCompanyForm = {
  admin: {
    id: "",
    name: "",
    password: "",
    role: ""
  },
  id: "",
  name: "",
  password: ""
};
function PublicPortalSection() {
  const {
    actionError,
    activeCompany,
    companies,
    companiesStatus,
    createCompany: createCompany2,
    loginCompany: loginCompany2,
    loginEmployee: loginEmployee2,
    pageError,
    pendingAction,
    refreshCompanies,
    selectPublicCompany,
    workspaceStatus
  } = useAppModel();
  const [companyForm, setCompanyForm] = d2(emptyCompanyForm);
  const [employeeId, setEmployeeId] = d2("");
  const [employeePassword, setEmployeePassword] = d2("");
  const [companyId, setCompanyId] = d2("");
  const [companyPassword, setCompanyPassword] = d2("");
  const handleCompanyCreate = async () => {
    await createCompany2({
      admin: {
        ...companyForm.admin,
        id: companyForm.admin.id.trim(),
        name: companyForm.admin.name.trim(),
        password: companyForm.admin.password,
        role: companyForm.admin.role.trim()
      },
      id: companyForm.id.trim(),
      name: companyForm.name.trim(),
      password: companyForm.password
    });
    setCompanyForm(emptyCompanyForm);
  };
  return /* @__PURE__ */ u3("div", { className: "page-stack", children: [
    /* @__PURE__ */ u3("section", { className: "hero hero--ops", children: [
      /* @__PURE__ */ u3("div", { className: "hero__copy", children: [
        /* @__PURE__ */ u3("span", { className: "eyebrow", children: "v1 control surface" }),
        /* @__PURE__ */ u3("h1", { children: "Run the org chart from the frontend, against the existing API." }),
        /* @__PURE__ */ u3("p", { children: "Every current backend v1 ability is exposed here except modular feature packages: company signup, employee and company auth, roles, employee lifecycle, reporting lines, and read-only company browsing." }),
        /* @__PURE__ */ u3("div", { className: "hero__metrics", children: [
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: companies.length }),
            /* @__PURE__ */ u3("span", { children: "companies" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: activeCompany?.employees.length ?? 0 }),
            /* @__PURE__ */ u3("span", { children: "visible employees" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: activeCompany?.roles.length ?? 0 }),
            /* @__PURE__ */ u3("span", { children: "visible roles" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u3(Surface, { className: "hero-panel hero-panel--status", children: [
        /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Public mode" }),
        /* @__PURE__ */ u3("h2", { children: "Browse companies or sign in." }),
        /* @__PURE__ */ u3("p", { children: "Unauthenticated users can inspect companies. Mutations unlock after employee auth, while company auth stays read-only by backend design." }),
        /* @__PURE__ */ u3("div", { className: "status-list", children: [
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Companies" }),
            /* @__PURE__ */ u3("strong", { children: companiesStatus })
          ] }),
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Preview" }),
            /* @__PURE__ */ u3("strong", { children: workspaceStatus })
          ] }),
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Action" }),
            /* @__PURE__ */ u3("strong", { children: pendingAction ?? "idle" })
          ] })
        ] }),
        /* @__PURE__ */ u3("button", { className: "button button--secondary", onClick: () => void refreshCompanies(), type: "button", children: "Refresh catalog" })
      ] })
    ] }),
    (pageError || actionError) && /* @__PURE__ */ u3(Surface, { className: "notice-panel notice-panel--error", children: [
      /* @__PURE__ */ u3("strong", { children: "Request issue" }),
      /* @__PURE__ */ u3("p", { children: actionError ?? pageError })
    ] }),
    /* @__PURE__ */ u3("div", { className: "content-grid", children: [
      /* @__PURE__ */ u3("div", { className: "content-grid__main", children: [
        /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
          /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Directory" }),
              /* @__PURE__ */ u3("h2", { children: "Companies" })
            ] }),
            /* @__PURE__ */ u3("span", { children: companies.length === 0 ? "No companies yet" : `${companies.length} available` })
          ] }),
          /* @__PURE__ */ u3("div", { className: "company-list", children: [
            companies.map((company) => /* @__PURE__ */ u3(
              "button",
              {
                className: [
                  "company-card",
                  activeCompany?.company.id === company.id ? "company-card--active" : ""
                ].filter(Boolean).join(" "),
                onClick: () => {
                  void selectPublicCompany(company.id);
                },
                type: "button",
                children: [
                  /* @__PURE__ */ u3("strong", { children: company.name }),
                  /* @__PURE__ */ u3("span", { children: company.id }),
                  /* @__PURE__ */ u3("small", { children: [
                    company.board.length,
                    " board members"
                  ] })
                ]
              },
              company.id
            )),
            companies.length === 0 && /* @__PURE__ */ u3("p", { className: "muted-copy", children: "Create the first company to seed the directory and bootstrap the admin session." })
          ] })
        ] }),
        /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
          /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Preview" }),
              /* @__PURE__ */ u3("h2", { children: activeCompany?.company.name ?? "No company selected" })
            ] }),
            activeCompany && /* @__PURE__ */ u3("span", { children: activeCompany.company.id })
          ] }),
          activeCompany ? /* @__PURE__ */ u3(S, { children: [
            /* @__PURE__ */ u3("div", { className: "stats-grid stats-grid--dense", children: [
              /* @__PURE__ */ u3("div", { className: "stat-block", children: [
                /* @__PURE__ */ u3("strong", { children: activeCompany.boardMembers.length }),
                /* @__PURE__ */ u3("span", { children: "board members" })
              ] }),
              /* @__PURE__ */ u3("div", { className: "stat-block", children: [
                /* @__PURE__ */ u3("strong", { children: activeCompany.employees.length }),
                /* @__PURE__ */ u3("span", { children: "employees" })
              ] }),
              /* @__PURE__ */ u3("div", { className: "stat-block", children: [
                /* @__PURE__ */ u3("strong", { children: activeCompany.roles.length }),
                /* @__PURE__ */ u3("span", { children: "roles" })
              ] })
            ] }),
            /* @__PURE__ */ u3("div", { className: "preview-columns", children: [
              /* @__PURE__ */ u3("div", { className: "preview-column", children: [
                /* @__PURE__ */ u3("h3", { children: "Board" }),
                /* @__PURE__ */ u3("div", { className: "pill-list", children: activeCompany.boardMembers.map((employee) => /* @__PURE__ */ u3("span", { className: "pill", children: employee.name }, employee.id)) })
              ] }),
              /* @__PURE__ */ u3("div", { className: "preview-column", children: [
                /* @__PURE__ */ u3("h3", { children: "Roles" }),
                /* @__PURE__ */ u3("div", { className: "role-grid", children: activeCompany.roles.map((role) => /* @__PURE__ */ u3("div", { className: "role-card role-card--compact", children: [
                  /* @__PURE__ */ u3("strong", { children: role.id }),
                  /* @__PURE__ */ u3("div", { className: "pill-list", children: role.permissions.map((permission) => /* @__PURE__ */ u3("span", { className: "pill pill--accent", children: permission }, permission)) })
                ] }, role.id)) })
              ] })
            ] }),
            /* @__PURE__ */ u3("div", { className: "employee-list employee-list--preview", children: activeCompany.employees.map((employee) => /* @__PURE__ */ u3("div", { className: "employee-card employee-card--preview", children: [
              /* @__PURE__ */ u3("div", { className: "employee-card__summary", children: [
                /* @__PURE__ */ u3("div", { children: [
                  /* @__PURE__ */ u3("strong", { children: employee.name }),
                  /* @__PURE__ */ u3("span", { children: employee.id })
                ] }),
                /* @__PURE__ */ u3("span", { children: employee.role })
              ] }),
              /* @__PURE__ */ u3("p", { className: "muted-copy", children: [
                "Reports to ",
                employee.managerName ?? "board",
                " and manages ",
                employee.directReportCount,
                " people."
              ] })
            ] }, employee.id)) })
          ] }) : /* @__PURE__ */ u3("p", { className: "muted-copy", children: "Pick a company from the directory to inspect its public org data." })
        ] })
      ] }),
      /* @__PURE__ */ u3("div", { className: "content-grid__side", children: [
        /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
          /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Bootstrap" }),
              /* @__PURE__ */ u3("h2", { children: "Create company" })
            ] }),
            /* @__PURE__ */ u3("span", { children: "Returns an employee admin session" })
          ] }),
          /* @__PURE__ */ u3(
            "form",
            {
              className: "form-grid",
              onSubmit: (event) => {
                event.preventDefault();
                void handleCompanyCreate();
              },
              children: [
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Company id" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => setCompanyForm((current) => ({ ...current, id: event.currentTarget.value })),
                      placeholder: "acme",
                      required: true,
                      value: companyForm.id
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Company name" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => setCompanyForm((current) => ({ ...current, name: event.currentTarget.value })),
                      placeholder: "Acme Corp",
                      required: true,
                      value: companyForm.name
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Company password" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => setCompanyForm((current) => ({ ...current, password: event.currentTarget.value })),
                      required: true,
                      type: "password",
                      value: companyForm.password
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Admin id" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => {
                        const value = event.currentTarget.value;
                        setCompanyForm((current) => ({ ...current, admin: { ...current.admin, id: value } }));
                      },
                      placeholder: "ceo-1",
                      required: true,
                      value: companyForm.admin.id
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Admin name" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => {
                        const value = event.currentTarget.value;
                        setCompanyForm((current) => ({ ...current, admin: { ...current.admin, name: value } }));
                      },
                      placeholder: "Avery Stone",
                      required: true,
                      value: companyForm.admin.name
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Admin role title" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => {
                        const value = event.currentTarget.value;
                        setCompanyForm((current) => ({ ...current, admin: { ...current.admin, role: value } }));
                      },
                      placeholder: "Chief Executive Officer",
                      required: true,
                      value: companyForm.admin.role
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Admin password" }),
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      onInput: (event) => {
                        const value = event.currentTarget.value;
                        setCompanyForm((current) => ({ ...current, admin: { ...current.admin, password: value } }));
                      },
                      required: true,
                      type: "password",
                      value: companyForm.admin.password
                    }
                  )
                ] }),
                /* @__PURE__ */ u3("button", { className: "button", type: "submit", children: "Create company" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
          /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Auth" }),
              /* @__PURE__ */ u3("h2", { children: "Employee login" })
            ] }),
            /* @__PURE__ */ u3("span", { children: "Full mutation access depends on permissions" })
          ] }),
          /* @__PURE__ */ u3(
            "form",
            {
              className: "form-grid",
              onSubmit: (event) => {
                event.preventDefault();
                console.debug("[FORM] Employee login form submitted", { employeeId: employeeId.trim() });
                void loginEmployee2({
                  employee_id: employeeId.trim(),
                  password: employeePassword
                });
              },
              children: [
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Employee id" }),
                  /* @__PURE__ */ u3("input", { onInput: (event) => setEmployeeId(event.currentTarget.value), required: true, value: employeeId })
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Password" }),
                  /* @__PURE__ */ u3("input", { onInput: (event) => setEmployeePassword(event.currentTarget.value), required: true, type: "password", value: employeePassword })
                ] }),
                /* @__PURE__ */ u3("button", { className: "button", type: "submit", children: "Sign in as employee" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
          /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Auth" }),
              /* @__PURE__ */ u3("h2", { children: "Company login" })
            ] }),
            /* @__PURE__ */ u3("span", { children: "Useful for read-only company sessions" })
          ] }),
          /* @__PURE__ */ u3(
            "form",
            {
              className: "form-grid",
              onSubmit: (event) => {
                event.preventDefault();
                console.debug("[FORM] Company login form submitted", { companyId: companyId.trim() });
                void loginCompany2({
                  company_id: companyId.trim(),
                  password: companyPassword
                });
              },
              children: [
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Company id" }),
                  /* @__PURE__ */ u3("input", { onInput: (event) => setCompanyId(event.currentTarget.value), required: true, value: companyId })
                ] }),
                /* @__PURE__ */ u3("label", { className: "field", children: [
                  /* @__PURE__ */ u3("span", { children: "Password" }),
                  /* @__PURE__ */ u3("input", { onInput: (event) => setCompanyPassword(event.currentTarget.value), required: true, type: "password", value: companyPassword })
                ] }),
                /* @__PURE__ */ u3("button", { className: "button button--secondary", type: "submit", children: "Sign in as company" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// src/components/views/AuthView.tsx
function AuthView() {
  return /* @__PURE__ */ u3(PublicPortalSection, {});
}

// src/components/kit/FeatureCard.tsx
function FeatureCard({ feature }) {
  return /* @__PURE__ */ u3(Surface, { className: "feature-card", children: [
    /* @__PURE__ */ u3("div", { className: "feature-card__header", children: [
      /* @__PURE__ */ u3("h3", { className: "feature-card__title", children: feature.name }),
      feature.enabled && /* @__PURE__ */ u3("span", { className: "feature-card__badge", children: "Available" })
    ] }),
    /* @__PURE__ */ u3("p", { className: "feature-card__description", children: feature.description })
  ] });
}

// src/components/kit/TreeView.tsx
function TreeNode({ employee, employeeIndex, level }) {
  const directReports = employee.reporting;
  const hasChildren = directReports.length > 0;
  return /* @__PURE__ */ u3("div", { className: "tree-node", children: [
    /* @__PURE__ */ u3("div", { className: "tree-node__content", children: /* @__PURE__ */ u3("div", { className: "tree-node__item", children: [
      Array(level).fill(0).map((_2, idx) => /* @__PURE__ */ u3("span", { className: "tree-node__indent" }, idx)),
      /* @__PURE__ */ u3("span", { className: "tree-node__name", children: employee.name }),
      /* @__PURE__ */ u3("span", { className: "tree-node__role", children: employee.role })
    ] }) }),
    hasChildren && /* @__PURE__ */ u3("div", { className: "tree-node__children", children: directReports.map((reportId) => {
      const report = employeeIndex[reportId];
      if (!report) return null;
      return /* @__PURE__ */ u3(
        TreeNode,
        {
          employee: report,
          employeeIndex,
          level: level + 1
        },
        reportId
      );
    }) })
  ] });
}
function TreeView({ employees, boardMembers }) {
  const board = boardMembers ?? [];
  if (board.length === 0) {
    for (const emp of employees) {
      if (emp.reports === null) {
        board.push(emp.id);
      }
    }
  }
  const employeeIndex = {};
  employees.forEach((emp) => {
    employeeIndex[emp.id] = emp;
  });
  const rootEmployees = board.map((id) => employeeIndex[id]).filter((emp) => emp !== void 0);
  if (rootEmployees.length === 0) {
    return /* @__PURE__ */ u3("div", { className: "tree-view", children: /* @__PURE__ */ u3("p", { className: "tree-view__empty", children: "No employees in organization" }) });
  }
  return /* @__PURE__ */ u3("div", { className: "tree-view", children: rootEmployees.map((employee) => /* @__PURE__ */ u3(
    TreeNode,
    {
      employee,
      employeeIndex,
      level: 0
    },
    employee.id
  )) });
}

// src/api/features.ts
function listFeatures(token) {
  return requestJson("/v1/features", { token });
}

// src/components/sections/FeaturesSection.tsx
function FeaturesSection() {
  const { activeCompany, workspaceStatus, token } = useAppModel();
  const [features, setFeatures] = d2([]);
  const [featuresStatus, setFeaturesStatus] = d2("loading");
  const [errorMessage, setErrorMessage] = d2(null);
  y2(() => {
    const fetchFeatures = async () => {
      try {
        setFeaturesStatus("loading");
        const response = await listFeatures(token);
        setFeatures(response.features);
        setFeaturesStatus("ready");
        setErrorMessage(null);
      } catch (error) {
        setFeaturesStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Failed to load features");
      }
    };
    fetchFeatures();
  }, []);
  const handleRefresh = async () => {
    try {
      setFeaturesStatus("loading");
      const response = await listFeatures(token);
      setFeatures(response.features);
      setFeaturesStatus("ready");
      setErrorMessage(null);
    } catch (error) {
      setFeaturesStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to load features");
    }
  };
  return /* @__PURE__ */ u3("section", { className: "features-section", children: [
    /* @__PURE__ */ u3("div", { className: "section-heading", children: [
      /* @__PURE__ */ u3("div", { children: [
        /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Available capabilities" }),
        /* @__PURE__ */ u3("h2", { children: "Features" })
      ] }),
      /* @__PURE__ */ u3("button", { className: "refresh-button", onClick: handleRefresh, type: "button", children: "Refresh" })
    ] }),
    /* @__PURE__ */ u3("div", { className: "features-grid", children: [
      featuresStatus === "loading" && /* @__PURE__ */ u3("p", { className: "panel-message", children: "Loading features..." }),
      featuresStatus === "error" && /* @__PURE__ */ u3("p", { className: "panel-message panel-message--error", children: errorMessage ?? "Failed to load features" }),
      featuresStatus === "ready" && /* @__PURE__ */ u3(S, { children: features.length > 0 ? features.map((feature) => /* @__PURE__ */ u3(FeatureCard, { feature }, feature.id)) : /* @__PURE__ */ u3("p", { className: "panel-message", children: "No features available" }) })
    ] }),
    activeCompany && /* @__PURE__ */ u3(Surface, { className: "tree-panel", children: [
      /* @__PURE__ */ u3("div", { className: "tree-panel__header", children: [
        /* @__PURE__ */ u3("h3", { children: "Organization Tree" }),
        /* @__PURE__ */ u3("span", { children: [
          activeCompany.employees.length,
          " employee",
          activeCompany.employees.length !== 1 ? "s" : ""
        ] })
      ] }),
      workspaceStatus === "loading" && /* @__PURE__ */ u3("p", { className: "panel-message", children: "Loading organization data..." }),
      workspaceStatus === "error" && /* @__PURE__ */ u3("p", { className: "panel-message panel-message--error", children: "Failed to load organization" }),
      workspaceStatus === "ready" && /* @__PURE__ */ u3(TreeView, { employees: activeCompany.employees, boardMembers: activeCompany.board })
    ] })
  ] });
}

// src/components/views/FeaturesView.tsx
function FeaturesView() {
  return /* @__PURE__ */ u3(FeaturesSection, {});
}

// src/interfaces/organization.ts
var knownPermissions = ["invite", "manage", "assign", "revoke", "remove", "update"];

// src/components/sections/WorkspaceSection.tsx
function hasPermission(permissions, permission) {
  return permissions.includes(permission);
}
function toFieldValue(value) {
  return value ?? "";
}
function EmployeeCard({
  canAssign,
  canManage,
  canRemove,
  canUpdateOthers,
  currentEmployeeId,
  employee,
  employees,
  onAssignRole,
  onChangeManager,
  onRemove,
  onRevokeRole,
  onUpdate,
  roles
}) {
  const [name, setName] = d2(employee.name);
  const [roleTitle, setRoleTitle] = d2(employee.role);
  const [password, setPassword] = d2("");
  const [managerId, setManagerId] = d2(toFieldValue(employee.reports));
  const [roleId, setRoleId] = d2("");
  const [localMessage, setLocalMessage] = d2(null);
  y2(() => {
    setName(employee.name);
    setRoleTitle(employee.role);
    setPassword("");
    setManagerId(toFieldValue(employee.reports));
    setRoleId("");
    setLocalMessage(null);
  }, [employee.id, employee.name, employee.reports, employee.role, employee.roles.join(",")]);
  const canUpdateSelf = currentEmployeeId === employee.id;
  const canUpdate = canUpdateSelf || canUpdateOthers;
  const canMutateRoles = canAssign && currentEmployeeId !== employee.id;
  const canMutateAssignedRoles = canAssign && currentEmployeeId !== employee.id;
  const availableManagers = employees.filter((candidate) => candidate.id !== employee.id);
  const assignableRoles = roles.filter((candidateRole) => !employee.roles.includes(candidateRole));
  return /* @__PURE__ */ u3("div", { className: "employee-card", children: [
    /* @__PURE__ */ u3("div", { className: "employee-card__summary", children: [
      /* @__PURE__ */ u3("div", { children: [
        /* @__PURE__ */ u3("strong", { children: employee.name }),
        /* @__PURE__ */ u3("span", { children: employee.id })
      ] }),
      /* @__PURE__ */ u3("span", { children: employee.role })
    ] }),
    /* @__PURE__ */ u3("div", { className: "employee-card__meta", children: [
      /* @__PURE__ */ u3("span", { children: [
        "Reports to ",
        employee.managerName ?? "board"
      ] }),
      /* @__PURE__ */ u3("span", { children: [
        employee.directReportCount,
        " direct reports"
      ] }),
      /* @__PURE__ */ u3("span", { children: employee.isBoardMember ? "Board" : `Level ${employee.level + 1}` })
    ] }),
    /* @__PURE__ */ u3("div", { className: "pill-list", children: [
      employee.roles.length === 0 && /* @__PURE__ */ u3("span", { className: "pill", children: "no assigned roles" }),
      employee.roles.map((assignedRole) => /* @__PURE__ */ u3("span", { className: "pill", children: [
        assignedRole,
        canMutateAssignedRoles && /* @__PURE__ */ u3(
          "button",
          {
            className: "pill__action",
            onClick: () => {
              void onRevokeRole(employee.id, assignedRole);
            },
            type: "button",
            children: "remove"
          }
        )
      ] }, assignedRole))
    ] }),
    /* @__PURE__ */ u3("div", { className: "pill-list", children: [
      employee.permissions.length === 0 && /* @__PURE__ */ u3("span", { className: "pill pill--muted", children: "no effective permissions" }),
      employee.permissions.map((permission) => /* @__PURE__ */ u3("span", { className: "pill pill--accent", children: permission }, permission))
    ] }),
    localMessage && /* @__PURE__ */ u3("p", { className: "muted-copy", children: localMessage }),
    /* @__PURE__ */ u3("div", { className: "employee-card__forms", children: [
      /* @__PURE__ */ u3(
        "form",
        {
          className: "mini-form",
          onSubmit: (event) => {
            event.preventDefault();
            const payload = {};
            const trimmedName = name.trim();
            const trimmedRole = roleTitle.trim();
            if (trimmedName !== employee.name) {
              payload.name = trimmedName;
            }
            if (trimmedRole !== employee.role) {
              payload.role = trimmedRole;
            }
            if (password.trim()) {
              payload.password = password;
            }
            if (!canUpdate) {
              setLocalMessage("You cannot update this employee.");
              return;
            }
            if (Object.keys(payload).length === 0) {
              setLocalMessage("No employee changes to save.");
              return;
            }
            setLocalMessage(null);
            void onUpdate(employee.id, payload).then(() => {
              setPassword("");
              setLocalMessage("Employee updated.");
            }).catch(() => void 0);
          },
          children: [
            /* @__PURE__ */ u3("label", { className: "field", children: [
              /* @__PURE__ */ u3("span", { children: "Name" }),
              /* @__PURE__ */ u3("input", { disabled: !canUpdate, onInput: (event) => setName(event.currentTarget.value), value: name })
            ] }),
            /* @__PURE__ */ u3("label", { className: "field", children: [
              /* @__PURE__ */ u3("span", { children: "Role title" }),
              /* @__PURE__ */ u3("input", { disabled: !canUpdate, onInput: (event) => setRoleTitle(event.currentTarget.value), value: roleTitle })
            ] }),
            /* @__PURE__ */ u3("label", { className: "field", children: [
              /* @__PURE__ */ u3("span", { children: "New password" }),
              /* @__PURE__ */ u3(
                "input",
                {
                  disabled: !canUpdate,
                  onInput: (event) => setPassword(event.currentTarget.value),
                  placeholder: "Leave blank to keep current",
                  type: "password",
                  value: password
                }
              )
            ] }),
            /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canUpdate, type: "submit", children: "Save employee" })
          ]
        }
      ),
      /* @__PURE__ */ u3(
        "form",
        {
          className: "mini-form",
          onSubmit: (event) => {
            event.preventDefault();
            if (!canManage) {
              setLocalMessage("You do not have manage permission.");
              return;
            }
            if (managerId === toFieldValue(employee.reports)) {
              setLocalMessage("Manager did not change.");
              return;
            }
            setLocalMessage(null);
            void onChangeManager(employee.id, managerId || null).then(() => {
              setLocalMessage("Reporting line updated.");
            }).catch(() => void 0);
          },
          children: [
            /* @__PURE__ */ u3("label", { className: "field", children: [
              /* @__PURE__ */ u3("span", { children: "Manager" }),
              /* @__PURE__ */ u3("select", { disabled: !canManage, onInput: (event) => setManagerId(event.currentTarget.value), value: managerId, children: [
                /* @__PURE__ */ u3("option", { value: "", children: "Board / none" }),
                availableManagers.map((candidate) => /* @__PURE__ */ u3("option", { value: candidate.id, children: [
                  candidate.name,
                  " (",
                  candidate.id,
                  ")"
                ] }, candidate.id))
              ] })
            ] }),
            /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canManage, type: "submit", children: "Update manager" })
          ]
        }
      ),
      /* @__PURE__ */ u3(
        "form",
        {
          className: "mini-form",
          onSubmit: (event) => {
            event.preventDefault();
            if (!canMutateRoles) {
              setLocalMessage("You cannot assign roles to this employee.");
              return;
            }
            if (!roleId) {
              setLocalMessage("Pick a role to assign.");
              return;
            }
            setLocalMessage(null);
            void onAssignRole(employee.id, roleId).then(() => {
              setRoleId("");
              setLocalMessage("Role assigned.");
            }).catch(() => void 0);
          },
          children: [
            /* @__PURE__ */ u3("label", { className: "field", children: [
              /* @__PURE__ */ u3("span", { children: "Assign role" }),
              /* @__PURE__ */ u3("select", { disabled: !canMutateRoles, onInput: (event) => setRoleId(event.currentTarget.value), value: roleId, children: [
                /* @__PURE__ */ u3("option", { value: "", children: "Select role" }),
                assignableRoles.map((candidateRole) => /* @__PURE__ */ u3("option", { value: candidateRole, children: candidateRole }, candidateRole))
              ] })
            ] }),
            /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canMutateRoles, type: "submit", children: "Assign role" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u3(
      "button",
      {
        className: "button button--danger",
        disabled: !canRemove || currentEmployeeId === employee.id,
        onClick: () => {
          if (!canRemove || currentEmployeeId === employee.id) {
            return;
          }
          if (!window.confirm(`Remove ${employee.name} from ${employee.company_id}?`)) {
            return;
          }
          void onRemove(employee.id);
        },
        type: "button",
        children: "Remove employee"
      }
    )
  ] });
}
function WorkspaceSection() {
  const {
    actionError,
    activeCompany,
    currentEmployeeId,
    isEmployeeSession,
    logout,
    pageError,
    pendingAction,
    permissions,
    refreshWorkspace,
    removeEmployee: removeEmployee2,
    revokeRole,
    session,
    updateCompany: updateCompany2,
    updateEmployee: updateEmployee2,
    assignRole,
    changeManager,
    createEmployee: createEmployee2,
    createRole,
    workspaceStatus
  } = useAppModel();
  const [companyName, setCompanyName] = d2(activeCompany?.company.name ?? "");
  const [companyPassword, setCompanyPassword] = d2("");
  const [roleId, setRoleId] = d2("");
  const [selectedPermissions, setSelectedPermissions] = d2([]);
  const [employeeForm, setEmployeeForm] = d2({
    company_id: activeCompany?.company.id ?? "",
    id: "",
    name: "",
    password: "",
    reports: null,
    role: ""
  });
  y2(() => {
    setCompanyName(activeCompany?.company.name ?? "");
    setCompanyPassword("");
    setEmployeeForm({
      company_id: activeCompany?.company.id ?? "",
      id: "",
      name: "",
      password: "",
      reports: null,
      role: ""
    });
  }, [activeCompany?.company.id, activeCompany?.company.name]);
  if (!session || !activeCompany) {
    return /* @__PURE__ */ u3(Surface, { className: "notice-panel", children: [
      /* @__PURE__ */ u3("strong", { children: "No active session" }),
      /* @__PURE__ */ u3("p", { children: "Sign in to load the authenticated workspace." })
    ] });
  }
  const canInvite = isEmployeeSession && hasPermission(permissions, "invite");
  const canManage = isEmployeeSession && hasPermission(permissions, "manage");
  const canAssign = isEmployeeSession && hasPermission(permissions, "assign");
  const canRemove = isEmployeeSession && hasPermission(permissions, "remove");
  const canUpdateOthers = isEmployeeSession && hasPermission(permissions, "update");
  const canUpdateCompany = isEmployeeSession && hasPermission(permissions, "update");
  const roleIds = activeCompany.roles.map((role) => role.id);
  const togglePermission = (permission) => {
    setSelectedPermissions((current) => current.includes(permission) ? current.filter((entry) => entry !== permission) : [...current, permission]);
  };
  return /* @__PURE__ */ u3("div", { className: "page-stack", children: [
    /* @__PURE__ */ u3("section", { className: "hero hero--workspace", children: [
      /* @__PURE__ */ u3("div", { className: "hero__copy", children: [
        /* @__PURE__ */ u3("span", { className: "eyebrow", children: [
          session.principal_type,
          " session"
        ] }),
        /* @__PURE__ */ u3("h1", { children: activeCompany.company.name }),
        /* @__PURE__ */ u3("p", { children: "Manage employees, reporting lines, roles, and company settings from one place. The API remains unchanged; this UI now consumes the existing v1 routes directly." }),
        /* @__PURE__ */ u3("div", { className: "hero__metrics", children: [
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: activeCompany.employees.length }),
            /* @__PURE__ */ u3("span", { children: "employees" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: activeCompany.boardMembers.length }),
            /* @__PURE__ */ u3("span", { children: "board" })
          ] }),
          /* @__PURE__ */ u3("div", { className: "metric-chip", children: [
            /* @__PURE__ */ u3("strong", { children: activeCompany.roles.length }),
            /* @__PURE__ */ u3("span", { children: "roles" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u3(Surface, { className: "hero-panel hero-panel--status", children: [
        /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Session" }),
        /* @__PURE__ */ u3("h2", { children: session.company_id }),
        /* @__PURE__ */ u3("div", { className: "status-list", children: [
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Workspace" }),
            /* @__PURE__ */ u3("strong", { children: workspaceStatus })
          ] }),
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Principal" }),
            /* @__PURE__ */ u3("strong", { children: session.principal_type })
          ] }),
          /* @__PURE__ */ u3("div", { className: "status-row", children: [
            /* @__PURE__ */ u3("span", { children: "Current action" }),
            /* @__PURE__ */ u3("strong", { children: pendingAction ?? "idle" })
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { className: "hero-panel__actions", children: [
          /* @__PURE__ */ u3("button", { className: "button button--secondary", onClick: () => void refreshWorkspace(), type: "button", children: "Refresh" }),
          /* @__PURE__ */ u3("button", { className: "button", onClick: () => void logout(), type: "button", children: "Logout" })
        ] })
      ] })
    ] }),
    (pageError || actionError) && /* @__PURE__ */ u3(Surface, { className: "notice-panel notice-panel--error", children: [
      /* @__PURE__ */ u3("strong", { children: "Request issue" }),
      /* @__PURE__ */ u3("p", { children: actionError ?? pageError })
    ] }),
    /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
      /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
        /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Access" }),
          /* @__PURE__ */ u3("h2", { children: "Effective permissions" })
        ] }),
        /* @__PURE__ */ u3("span", { children: currentEmployeeId ?? session.company_id })
      ] }),
      /* @__PURE__ */ u3("div", { className: "pill-list", children: [
        permissions.length === 0 && /* @__PURE__ */ u3("span", { className: "pill pill--muted", children: "read-only session" }),
        permissions.map((permission) => /* @__PURE__ */ u3("span", { className: "pill pill--accent", children: permission }, permission))
      ] }),
      !isEmployeeSession && /* @__PURE__ */ u3("p", { className: "muted-copy", children: "Company sessions can browse the workspace and use `/auth/me` plus logout, but mutations require an employee session with the relevant permissions." })
    ] }),
    /* @__PURE__ */ u3("div", { className: "workspace-grid", children: [
      /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
        /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
          /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Company" }),
            /* @__PURE__ */ u3("h2", { children: "Settings" })
          ] }),
          /* @__PURE__ */ u3("span", { children: activeCompany.company.id })
        ] }),
        /* @__PURE__ */ u3(
          "form",
          {
            className: "form-grid",
            onSubmit: (event) => {
              event.preventDefault();
              const payload = {};
              const trimmedName = companyName.trim();
              if (trimmedName && trimmedName !== activeCompany.company.name) {
                payload.name = trimmedName;
              }
              if (companyPassword.trim()) {
                payload.password = companyPassword;
              }
              if (!canUpdateCompany) {
                return;
              }
              if (Object.keys(payload).length === 0) {
                return;
              }
              void updateCompany2(payload).then(() => {
                setCompanyPassword("");
              }).catch(() => void 0);
            },
            children: [
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Company name" }),
                /* @__PURE__ */ u3("input", { disabled: !canUpdateCompany, onInput: (event) => setCompanyName(event.currentTarget.value), value: companyName })
              ] }),
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Rotate company password" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canUpdateCompany,
                    onInput: (event) => setCompanyPassword(event.currentTarget.value),
                    placeholder: "New company password",
                    type: "password",
                    value: companyPassword
                  }
                )
              ] }),
              /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canUpdateCompany, type: "submit", children: "Save company" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
        /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
          /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Hierarchy" }),
            /* @__PURE__ */ u3("h2", { children: "Board" })
          ] }),
          /* @__PURE__ */ u3("span", { children: [
            activeCompany.boardMembers.length,
            " members"
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { className: "employee-list employee-list--preview", children: activeCompany.boardMembers.map((employee) => /* @__PURE__ */ u3("div", { className: "employee-card employee-card--preview", children: [
          /* @__PURE__ */ u3("div", { className: "employee-card__summary", children: [
            /* @__PURE__ */ u3("div", { children: [
              /* @__PURE__ */ u3("strong", { children: employee.name }),
              /* @__PURE__ */ u3("span", { children: employee.id })
            ] }),
            /* @__PURE__ */ u3("span", { children: employee.role })
          ] }),
          /* @__PURE__ */ u3("p", { className: "muted-copy", children: [
            employee.directReportCount,
            " direct reports and ",
            employee.roles.length,
            " assigned roles."
          ] })
        ] }, employee.id)) })
      ] })
    ] }),
    /* @__PURE__ */ u3("div", { className: "workspace-grid", children: [
      /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
        /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
          /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Roles" }),
            /* @__PURE__ */ u3("h2", { children: "Role registry" })
          ] }),
          /* @__PURE__ */ u3("span", { children: [
            activeCompany.roles.length,
            " roles"
          ] })
        ] }),
        /* @__PURE__ */ u3("div", { className: "role-grid", children: activeCompany.roles.map((role) => /* @__PURE__ */ u3("div", { className: "role-card", children: [
          /* @__PURE__ */ u3("strong", { children: role.id }),
          /* @__PURE__ */ u3("div", { className: "pill-list", children: role.permissions.map((permission) => /* @__PURE__ */ u3("span", { className: "pill pill--accent", children: permission }, permission)) })
        ] }, role.id)) }),
        /* @__PURE__ */ u3(
          "form",
          {
            className: "form-grid",
            onSubmit: (event) => {
              event.preventDefault();
              if (!canAssign || !roleId.trim()) {
                return;
              }
              void createRole({
                id: roleId.trim(),
                permissions: selectedPermissions
              }).then(() => {
                setRoleId("");
                setSelectedPermissions([]);
              }).catch(() => void 0);
            },
            children: [
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Role id" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canAssign,
                    onInput: (event) => setRoleId(event.currentTarget.value),
                    placeholder: "ops-manager",
                    value: roleId
                  }
                )
              ] }),
              /* @__PURE__ */ u3("div", { className: "field field--full", children: [
                /* @__PURE__ */ u3("span", { children: "Permissions" }),
                /* @__PURE__ */ u3("div", { className: "checkbox-grid", children: knownPermissions.map((permission) => /* @__PURE__ */ u3("label", { className: "checkbox", children: [
                  /* @__PURE__ */ u3(
                    "input",
                    {
                      checked: selectedPermissions.includes(permission),
                      disabled: !canAssign,
                      onInput: () => togglePermission(permission),
                      type: "checkbox"
                    }
                  ),
                  /* @__PURE__ */ u3("span", { children: permission })
                ] }, permission)) })
              ] }),
              /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canAssign, type: "submit", children: "Save role" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
        /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
          /* @__PURE__ */ u3("div", { children: [
            /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Hiring" }),
            /* @__PURE__ */ u3("h2", { children: "Add employee" })
          ] }),
          /* @__PURE__ */ u3("span", { children: "Invite permission required" })
        ] }),
        /* @__PURE__ */ u3(
          "form",
          {
            className: "form-grid",
            onSubmit: (event) => {
              event.preventDefault();
              if (!canInvite) {
                return;
              }
              void createEmployee2({
                ...employeeForm,
                company_id: activeCompany.company.id,
                id: employeeForm.id.trim(),
                name: employeeForm.name.trim(),
                reports: employeeForm.reports || null,
                role: employeeForm.role.trim()
              }).then(() => {
                setEmployeeForm({
                  company_id: activeCompany.company.id,
                  id: "",
                  name: "",
                  password: "",
                  reports: null,
                  role: ""
                });
              }).catch(() => void 0);
            },
            children: [
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Employee id" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canInvite,
                    onInput: (event) => setEmployeeForm((current) => ({ ...current, id: event.currentTarget.value })),
                    required: true,
                    value: employeeForm.id
                  }
                )
              ] }),
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Name" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canInvite,
                    onInput: (event) => setEmployeeForm((current) => ({ ...current, name: event.currentTarget.value })),
                    required: true,
                    value: employeeForm.name
                  }
                )
              ] }),
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Role title" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canInvite,
                    onInput: (event) => setEmployeeForm((current) => ({ ...current, role: event.currentTarget.value })),
                    required: true,
                    value: employeeForm.role
                  }
                )
              ] }),
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Password" }),
                /* @__PURE__ */ u3(
                  "input",
                  {
                    disabled: !canInvite,
                    onInput: (event) => setEmployeeForm((current) => ({ ...current, password: event.currentTarget.value })),
                    required: true,
                    type: "password",
                    value: employeeForm.password
                  }
                )
              ] }),
              /* @__PURE__ */ u3("label", { className: "field", children: [
                /* @__PURE__ */ u3("span", { children: "Manager" }),
                /* @__PURE__ */ u3(
                  "select",
                  {
                    disabled: !canInvite,
                    onInput: (event) => {
                      const value = event.currentTarget.value;
                      setEmployeeForm((current) => ({ ...current, reports: value || null }));
                    },
                    value: toFieldValue(employeeForm.reports),
                    children: [
                      /* @__PURE__ */ u3("option", { value: "", children: "Board / none" }),
                      activeCompany.employees.map((employee) => /* @__PURE__ */ u3("option", { value: employee.id, children: [
                        employee.name,
                        " (",
                        employee.id,
                        ")"
                      ] }, employee.id))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ u3("button", { className: "button button--secondary", disabled: !canInvite, type: "submit", children: "Add employee" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u3(Surface, { className: "stack-panel", children: [
      /* @__PURE__ */ u3("div", { className: "panel-heading", children: [
        /* @__PURE__ */ u3("div", { children: [
          /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Employees" }),
          /* @__PURE__ */ u3("h2", { children: "Org roster" })
        ] }),
        /* @__PURE__ */ u3("span", { children: [
          activeCompany.employees.length,
          " people"
        ] })
      ] }),
      /* @__PURE__ */ u3("div", { className: "employee-list", children: activeCompany.employees.map((employee) => /* @__PURE__ */ u3(
        EmployeeCard,
        {
          canAssign,
          canManage,
          canRemove,
          canUpdateOthers,
          currentEmployeeId,
          employee,
          employees: activeCompany.employees,
          onAssignRole: async (employeeId, nextRoleId) => {
            if (!roleIds.includes(nextRoleId)) {
              return;
            }
            await assignRole(employeeId, { role_id: nextRoleId });
          },
          onChangeManager: async (employeeId, managerId) => {
            await changeManager(employeeId, { reports: managerId });
          },
          onRemove: removeEmployee2,
          onRevokeRole: revokeRole,
          onUpdate: updateEmployee2,
          roles: roleIds
        },
        employee.id
      )) })
    ] })
  ] });
}

// src/components/views/HomeView.tsx
function HomeView() {
  const { bootstrapStatus } = useAppModel();
  if (bootstrapStatus === "loading") {
    return /* @__PURE__ */ u3("section", { className: "boot-panel", children: [
      /* @__PURE__ */ u3("span", { className: "eyebrow", children: "Booting" }),
      /* @__PURE__ */ u3("h1", { children: "Loading company data and restoring session." }),
      /* @__PURE__ */ u3("p", { children: "The frontend is hydrating the directory, current company preview, and any persisted auth state." })
    ] });
  }
  return /* @__PURE__ */ u3(WorkspaceSection, {});
}

// src/components/views/NotFoundView.tsx
function NotFoundView() {
  return /* @__PURE__ */ u3(Surface, { className: "notes-panel", children: [
    /* @__PURE__ */ u3("span", { className: "eyebrow", children: "404" }),
    /* @__PURE__ */ u3("h1", { children: "Page not found." }),
    /* @__PURE__ */ u3("p", { children: "The current path does not match a registered route." }),
    /* @__PURE__ */ u3("div", { className: "hero__actions", children: /* @__PURE__ */ u3(AppLink, { href: "/", variant: "solid", children: "Back home" }) })
  ] });
}

// src/routes/metadata.json
var metadata_default = [
  {
    id: "auth",
    label: "Sign In",
    path: "/auth",
    title: "Sign In | Corp Ladder",
    description: "Employee and company authentication"
  },
  {
    id: "home",
    label: "Workspace",
    path: "/",
    title: "Corp Ladder",
    description: "Company directory, auth flows, and org management UI for Corp Ladder."
  },
  {
    id: "features",
    label: "Features",
    path: "/features",
    title: "Features | Corp Ladder",
    description: "View available platform features and organization tree."
  }
];

// src/routes/index.ts
var routeViews = {
  auth: AuthView,
  features: FeaturesView,
  home: HomeView
};
var routes = metadata_default.map((route) => ({
  ...route,
  view: routeViews[route.id]
}));
var notFoundRoute = {
  description: "The requested page could not be found.",
  id: "not-found",
  label: "Not found",
  path: "/404",
  title: "Not Found | Corp Ladder",
  view: NotFoundView
};
function resolveRoute(pathname) {
  return routes.find((route) => route.path === pathname) ?? notFoundRoute;
}

// src/utils/router.ts
function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }
  const normalized = pathname.replace(/\/+$/, "");
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
function shouldHandleNavigation(event) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

// src/contexts/router-context.tsx
var RouterContext = X(null);
function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = d2(() => normalizePath(window.location.pathname));
  y2(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const navigate = (nextPath) => {
    const normalizedPath = normalizePath(nextPath);
    if (normalizedPath === currentPath) {
      return;
    }
    window.history.pushState({}, "", normalizedPath);
    setCurrentPath(normalizedPath);
  };
  const value = {
    currentPath,
    currentRoute: resolveRoute(currentPath),
    navigate,
    routes
  };
  return /* @__PURE__ */ u3(RouterContext.Provider, { value, children });
}
function useRouter() {
  const value = x2(RouterContext);
  if (!value) {
    throw new Error("useRouter must be used within RouterProvider.");
  }
  return value;
}

// src/components/ui/AppLink.tsx
function AppLink({ children, className, href, onClick, variant = "ghost", ...props }) {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === href;
  return /* @__PURE__ */ u3(
    "a",
    {
      ...props,
      "aria-current": isActive ? "page" : void 0,
      className: ["app-link", `app-link--${variant}`, isActive ? "is-active" : "", className ?? ""].filter(Boolean).join(" "),
      href,
      onClick: (event) => {
        onClick?.(event);
        if (!shouldHandleNavigation(event) || event.defaultPrevented) {
          return;
        }
        event.preventDefault();
        navigate(href);
      },
      children
    }
  );
}

// src/app.tsx
function AppFrame() {
  const { currentRoute, currentPath, navigate, routes: routes2 } = useRouter();
  const { isAuthenticated, pendingAction, session, bootstrapStatus } = useAppModel();
  const ActiveView = currentRoute.view;
  y2(() => {
    if (bootstrapStatus === "done" && !isAuthenticated && currentPath !== "/auth") {
      navigate("/auth");
    }
  }, [bootstrapStatus, isAuthenticated, currentPath, navigate]);
  const sessionLabel = session ? session.principal_type === "employee" ? `${session.employee.name} \xB7 ${session.company_id}` : `${session.company.name} \xB7 ${session.company_id}` : "public access";
  return /* @__PURE__ */ u3("div", { className: "app-shell", children: [
    /* @__PURE__ */ u3("header", { className: "topbar", children: [
      /* @__PURE__ */ u3("div", { className: "brand-block", children: [
        /* @__PURE__ */ u3("strong", { children: siteConfig.name }),
        /* @__PURE__ */ u3("span", { children: isAuthenticated ? sessionLabel : siteConfig.summary })
      ] }),
      /* @__PURE__ */ u3("div", { className: "topbar__meta", children: [
        /* @__PURE__ */ u3("span", { className: "topbar__status", children: pendingAction ?? sessionLabel }),
        /* @__PURE__ */ u3("nav", { "aria-label": "Primary", children: routes2.map((route) => /* @__PURE__ */ u3(AppLink, { href: route.path, children: route.label }, route.id)) })
      ] })
    ] }),
    /* @__PURE__ */ u3("main", { className: "app-content", children: /* @__PURE__ */ u3(ActiveView, {}) })
  ] });
}
function App() {
  return /* @__PURE__ */ u3(RouterProvider, { children: /* @__PURE__ */ u3(AppProvider, { children: /* @__PURE__ */ u3(AppFrame, {}) }) });
}

// src/stylesheets/theme.ts
function getAppStyles() {
  return `
    :root {
      --bg: #f3efe8;
      --bg-soft: rgba(255, 255, 255, 0.58);
      --panel: rgba(255, 251, 246, 0.88);
      --panel-strong: rgba(16, 23, 29, 0.92);
      --ink: #102029;
      --ink-soft: #566670;
      --ink-inverse: #f7f1e7;
      --line: rgba(16, 32, 41, 0.12);
      --line-strong: rgba(16, 32, 41, 0.22);
      --accent: #bd5b2f;
      --accent-strong: #7d3312;
      --accent-soft: rgba(189, 91, 47, 0.14);
      --danger: #a7312b;
      --shadow: 0 24px 60px rgba(35, 39, 45, 0.14);
      color: var(--ink);
      font-family: "Avenir Next", "Segoe UI", sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background:
        radial-gradient(circle at top left, rgba(189, 91, 47, 0.12), transparent 26%),
        radial-gradient(circle at right 30%, rgba(25, 49, 63, 0.1), transparent 22%),
        linear-gradient(180deg, #f8f3ec 0%, #ece3d7 100%);
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background: transparent;
    }

    body, button, input, select, textarea {
      font: inherit;
    }

    button, input, select, textarea {
      border-radius: 16px;
    }

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
    }

    #app {
      min-height: 100vh;
    }

    .app-shell {
      width: min(1220px, calc(100% - 28px));
      margin: 0 auto;
      padding: 24px 0 48px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      margin-bottom: 24px;
      padding: 18px 20px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: rgba(255, 249, 241, 0.72);
      backdrop-filter: blur(18px);
      box-shadow: 0 12px 30px rgba(80, 68, 53, 0.08);
    }

    .brand-block {
      display: grid;
      gap: 4px;
    }

    .brand-block strong {
      font-size: 1rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .brand-block span,
    .topbar__status,
    .muted-copy {
      color: var(--ink-soft);
    }

    .topbar__meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .topbar nav,
    .hero__actions,
    .hero-panel__actions,
    .pill-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    .app-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 16px;
      border: 1px solid transparent;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .app-link:hover,
    .button:hover,
    .company-card:hover {
      transform: translateY(-1px);
    }

    .app-link--ghost {
      background: rgba(255, 255, 255, 0.42);
      border-color: rgba(16, 32, 41, 0.08);
    }

    .app-link--solid,
    .button {
      background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
      border-color: rgba(125, 51, 18, 0.4);
      color: #fff4ea;
    }

    .app-link.is-active {
      background: var(--accent-soft);
      border-color: rgba(189, 91, 47, 0.28);
    }

    .app-content,
    .page-stack,
    .content-grid__main,
    .content-grid__side,
    .stack-panel,
    .form-grid,
    .field,
    .employee-list,
    .employee-card,
    .employee-card__forms,
    .mini-form,
    .preview-column,
    .role-grid {
      display: grid;
      gap: 18px;
    }

    .surface {
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 22px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .boot-panel,
    .notes-panel {
      display: grid;
      gap: 14px;
      padding: 28px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .hero {
      display: grid;
      gap: 20px;
    }

    .hero {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: stretch;
    }

    .hero__copy,
    .hero-panel {
      display: grid;
      gap: 18px;
    }

    .hero__copy h1,
    .boot-panel h1,
    .notes-panel h1 {
      margin: 0;
      font-family: "Iowan Old Style", "Palatino Linotype", serif;
      font-size: clamp(2.4rem, 5vw, 4.8rem);
      line-height: 0.95;
      font-weight: 700;
    }

    .hero-panel h2,
    .panel-heading h2,
    .notes-panel h2 {
      margin: 0;
      font-size: clamp(1.35rem, 2vw, 2rem);
      line-height: 1.04;
    }

    .hero__copy p,
    .hero-panel p,
    .notes-panel p,
    .employee-card p {
      margin: 0;
      color: var(--ink-soft);
    }

    .hero-panel {
      padding: 24px;
      border-radius: 30px;
      background:
        linear-gradient(160deg, rgba(255, 247, 236, 0.94) 0%, rgba(233, 219, 203, 0.9) 100%),
        linear-gradient(135deg, rgba(189, 91, 47, 0.12), transparent 55%);
      border: 1px solid rgba(16, 32, 41, 0.08);
      box-shadow: var(--shadow);
    }

    .hero-panel--status {
      align-content: space-between;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-strong);
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .hero__metrics,
    .stats-grid,
    .preview-columns,
    .workspace-grid,
    .content-grid,
    .status-list,
    .checkbox-grid {
      display: grid;
      gap: 14px;
    }

    .hero__metrics {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .metric-chip,
    .stat-block {
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      border: 1px solid rgba(16, 32, 41, 0.08);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.46);
    }

    .metric-chip strong,
    .stat-block strong {
      font-size: 1.45rem;
      line-height: 1;
    }

    .metric-chip span,
    .stat-block span,
    .status-row span,
    .panel-heading span,
    .employee-card__meta span,
    .employee-card__summary span,
    .company-card span,
    .company-card small {
      color: var(--ink-soft);
    }

    .status-list {
      border-top: 1px solid rgba(16, 32, 41, 0.08);
      padding-top: 12px;
    }

    .status-row,
    .panel-heading,
    .employee-card__summary,
    .employee-card__meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }

    .status-row strong {
      text-transform: capitalize;
    }

    .notice-panel {
      display: grid;
      gap: 8px;
    }

    .notice-panel--error {
      border-color: rgba(167, 49, 43, 0.24);
      background: rgba(167, 49, 43, 0.06);
    }

    .content-grid {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: start;
    }

    .workspace-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }

    .panel-heading {
      padding-bottom: 12px;
      border-bottom: 1px solid var(--line);
    }

    .company-list {
      display: grid;
      gap: 12px;
    }

    .company-card {
      width: 100%;
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      text-align: left;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.54);
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .company-card--active {
      border-color: rgba(189, 91, 47, 0.34);
      background: rgba(189, 91, 47, 0.1);
    }

    .preview-columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .preview-column h3 {
      margin: 0;
      font-size: 1rem;
    }

    .role-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .role-card {
      display: grid;
      gap: 12px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.56);
    }

    .role-card--compact {
      padding: 14px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 34px;
      padding: 0 12px;
      border: 1px solid rgba(16, 32, 41, 0.09);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }

    .pill--accent {
      background: rgba(189, 91, 47, 0.1);
      border-color: rgba(189, 91, 47, 0.18);
    }

    .pill--muted {
      background: rgba(16, 32, 41, 0.06);
    }

    .pill__action {
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--accent-strong);
      font-size: 0.82rem;
      font-weight: 700;
    }

    .field {
      gap: 8px;
    }

    .field span {
      font-size: 0.88rem;
      font-weight: 700;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      min-height: 46px;
      padding: 0 14px;
      border: 1px solid var(--line-strong);
      background: rgba(255, 255, 255, 0.78);
      color: var(--ink);
      outline: none;
    }

    .field textarea {
      min-height: 110px;
      padding: 14px;
      resize: vertical;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      border-color: rgba(189, 91, 47, 0.42);
      box-shadow: 0 0 0 4px rgba(189, 91, 47, 0.12);
    }

    .field input:disabled,
    .field select:disabled,
    .button:disabled {
      cursor: not-allowed;
      opacity: 0.62;
    }

    .field--full {
      grid-column: 1 / -1;
    }

    .form-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mini-form {
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.45);
    }

    .button {
      min-height: 46px;
      padding: 0 16px;
      border: 1px solid transparent;
      font-weight: 700;
      transition: transform 140ms ease, opacity 140ms ease;
    }

    .button--secondary {
      background: rgba(255, 255, 255, 0.72);
      border-color: rgba(16, 32, 41, 0.1);
      color: var(--ink);
    }

    .button--danger {
      background: rgba(167, 49, 43, 0.08);
      border-color: rgba(167, 49, 43, 0.18);
      color: var(--danger);
    }

    .employee-list {
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    }

    .employee-list--preview {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .employee-card {
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(246, 239, 229, 0.68) 100%);
    }

    .employee-card--preview {
      gap: 12px;
    }

    .employee-card__summary strong,
    .company-card strong,
    .role-card strong {
      font-size: 1rem;
    }

    .employee-card__forms {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      padding: 10px 12px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.52);
    }

    .checkbox input {
      width: 16px;
      height: 16px;
      margin: 0;
    }

    @media (max-width: 1080px) {
      .hero,
      .content-grid,
      .workspace-grid,
      .preview-columns {
        grid-template-columns: 1fr;
      }

      .employee-card__forms {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 820px) {
      .app-shell {
        width: min(100%, calc(100% - 20px));
        padding-top: 16px;
      }

      .topbar,
      .panel-heading,
      .employee-card__summary,
      .employee-card__meta,
      .status-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .form-grid,
      .hero__metrics,
      .checkbox-grid {
        grid-template-columns: 1fr;
      }

      .surface,
      .boot-panel,
      .notes-panel,
      .hero-panel {
        padding: 18px;
        border-radius: 24px;
      }
    }

    .tree-node {
      line-height: 1;
      font-size: 2rem;
    }

    .tree-node__item {
      display: flex;
      gap: 12px;
    }
      
    .tree-node__indent {
      width: 12px;
      height: 12px;
      border-left: 2px solid var(--line-strong);
    }
      
    .tree-node__role {
      color: var(--ink-soft);
    }

    .tree-node__count {
      font-weight: 200;
    }
  `;
}

// src/stylesheets/index.ts
var STYLE_ELEMENT_ID = "app-styles";
function installAppStyles() {
  if (document.getElementById(STYLE_ELEMENT_ID)) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ELEMENT_ID;
  styleElement.textContent = getAppStyles();
  document.head.appendChild(styleElement);
}

// src/main.tsx
var mountNode = document.getElementById("app");
if (!mountNode) {
  throw new Error("Missing #app mount node.");
}
installAppStyles();
R(/* @__PURE__ */ u3(App, {}), mountNode);
//# sourceMappingURL=main.js.map
