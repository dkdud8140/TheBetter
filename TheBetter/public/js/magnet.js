!(function o(a, l, u) {
	function s(e, t) {
	  if (!l[e]) {
		if (!a[e]) {
		  var r = "function" == typeof require && require;
		  if (!t && r) return r(e, !0);
		  if (c) return c(e, !0);
		  var n = new Error("Cannot find module '" + e + "'");
		  throw ((n.code = "MODULE_NOT_FOUND"), n);
		}
		var i = (l[e] = { exports: {} });
		a[e][0].call(
		  i.exports,
		  function (t) {
			return s(a[e][1][t] || t);
		  },
		  i,
		  i.exports,
		  o,
		  a,
		  l,
		  u
		);
	  }
	  return l[e].exports;
	}
	for (
	  var c = "function" == typeof require && require, t = 0;
	  t < u.length;
	  t++
	)
	  s(u[t]);
	return s;
  })(
	{
	  1: [
		function (t, e, r) {
		  "use strict";
		  var n,
			i = t("./libs/magnet"),
			o = (n = i) && n.__esModule ? n : { default: n };
		  (e.exports = o.default),
			self &&
			  self instanceof Object &&
			  self === self.self &&
			  (self.Magnet = o.default);
		},
		{ "./libs/magnet": 4 },
	  ],
	  2: [
		function (t, e, r) {
		  "use strict";
		  Object.defineProperty(r, "__esModule", { value: !0 });
		  var n = t("./stdlib"),
			i = {
			  tt: "topToTop",
			  rr: "rightToRight",
			  bb: "bottomToBottom",
			  ll: "leftToLeft",
			  tb: "topToBottom",
			  bt: "bottomToTop",
			  rl: "rightToLeft",
			  lr: "leftToRight",
			  xx: "xCenter",
			  yy: "yCenter",
			};
		  r.default = Object.create(
			null,
			(0, n.objMap)(i, function (t, e) {
			  return {
				get: function () {
				  return i[e];
				},
				set: function (t) {
				  if ((0, n.objValues)(i).includes(t))
					throw new Error("Already assign property name: " + t);
				  i[e] = t;
				},
				enumerable: !0,
			  };
			})
		  );
		},
		{ "./stdlib": 6 },
	  ],
	  3: [
		function (t, e, r) {
		  "use strict";
		  Object.defineProperty(r, "__esModule", { value: !0 });
		  function n(t) {
			if ((0, p.isstr)(t)) t = t.split(" ");
			else if (!(0, p.isarray)(t))
			  throw new Error("Invalid names: " + (0, p.tostr)(t));
			return t.map(function (t) {
			  return (function (t) {
				if (!(0, p.isstr)(t))
				  throw new Error("Invalid name: " + (0, p.tostr)(t));
				var e = t.split("."),
				  r = g(e, 2),
				  n = r[0],
				  i = r[1];
				if (!(0, p.isset)(n))
				  throw new Error("Illegal name: " + (0, p.tostr)(t));
				return [n, i];
			  })(t);
			});
		  }
		  var g = function (t, e) {
			  if (Array.isArray(t)) return t;
			  if (Symbol.iterator in Object(t))
				return (function (t, e) {
				  var r = [],
					n = !0,
					i = !1,
					o = void 0;
				  try {
					for (
					  var a, l = t[Symbol.iterator]();
					  !(n = (a = l.next()).done) &&
					  (r.push(a.value), !e || r.length !== e);
					  n = !0
					);
				  } catch (t) {
					(i = !0), (o = t);
				  } finally {
					try {
					  !n && l.return && l.return();
					} finally {
					  if (i) throw o;
					}
				  }
				  return r;
				})(t, e);
			  throw new TypeError(
				"Invalid attempt to destructure non-iterable instance"
			  );
			},
			p = t("./stdlib");
		  function a(t) {
			if (!this instanceof a)
			  return new (Function.prototype.bind.apply(
				a,
				[null].concat(Array.prototype.slice.call(arguments))
			  ))();
			Object.defineProperties(this, {
			  ref: { value: t },
			  dom: {
				value: (0, p.iselem)(t) ? t : document.createElement("eh"),
			  },
			  events: { value: {} },
			});
		  }
		  ["on", "off", "trigger"].forEach(function (o) {
			a[o] = function (t) {
			  for (
				var e,
				  r = arguments.length,
				  n = Array(1 < r ? r - 1 : 0),
				  i = 1;
				i < r;
				i++
			  )
				n[i - 1] = arguments[i];
			  if (t instanceof a) t[o].apply(t, n);
			  else if (!(0, p.iselem)(t))
				throw new Error("Invalid element: " + (0, p.tostr)(t));
			  return (
				(t._eventHandler = (e = t._eventHandler || new a(t))[
				  o
				].apply(e, n)),
				a
			  );
			};
		  }),
			(a.prototype.on = function (t, i) {
			  var o = this;
			  return (
				(i = (function (t) {
				  if ((0, p.isfunc)(t)) return [t];
				  if (!(0, p.isarray)(t))
					throw new Error("Invalid funcs: " + (0, p.tostr)(t));
				  return t.map(function (t) {
					if (!(0, p.isfunc)(t))
					  throw new Error("Invaqlid func: " + (0, p.tostr)(t));
					return t;
				  });
				})(i)),
				(0, p.isset)(this.ref) &&
				  (i = i.map(function (t) {
					return t.bind(o.ref);
				  })),
				n(t).forEach(function (t) {
				  var e = g(t, 2),
					r = e[0],
					n = e[1];
				  i.forEach(function (t) {
					return o.dom.addEventListener(r, t);
				  }),
					(o.events[r] = (o.events[r] || []).concat(
					  i.map(function (t) {
						return { minor: n, func: t };
					  })
					));
				}),
				this
			  );
			}),
			(a.prototype.off = function (t) {
			  var u = this;
			  return (
				n(t).forEach(function (t) {
				  var e = g(t, 2),
					r = e[0],
					n = e[1],
					i = u.events[r] || [],
					o = [];
				  if ((0, p.isset)(n))
					for (var a = i.length - 1; 0 <= a; a--) {
					  var l = i[a];
					  n === l.minor && (o.push(l), i.splice(a, 1));
					}
				  else
					i.splice(0, i.length).forEach(function (t) {
					  o.push(t);
					});
				  o.forEach(function (t) {
					var e = t.func;
					u.dom.removeEventListener(r, e);
				  }),
					0 === i.length && delete u.events[r];
				}),
				this
			  );
			}),
			(a.prototype.trigger = function (t, f, d) {
			  var h = this;
			  if ((0, p.isset)(d) && !(0, p.isfunc)(d))
				throw new Error(
				  "Invalid onPrevent function: " + (0, p.tostr)(d)
				);
			  return (
				n(t).forEach(function (t) {
				  var e = g(t, 2),
					r = e[0],
					n = e[1],
					i = !1;
				  if ((0, p.isset)(n))
					for (
					  var o = !1,
						a = function () {
						  return (i = !0);
						},
						l = function () {
						  return (o = !0);
						},
						u = (h.events[r] || []).filter(function (t) {
						  return t.minor === n;
						}),
						s = 0;
					  !o && s < u.length;
					  s++
					)
					  !1 ===
						u[s].func({
						  detail: f,
						  preventDefault: a,
						  stopImmediatePropagation: l,
						}) && (i = !0);
				  else {
					var c = document.createEvent("CustomEvent");
					c.initCustomEvent(r, !0, !0, f),
					  !1 === h.dom.dispatchEvent(c) && (i = !0);
				  }
				  i && d && d(r);
				}),
				this
			  );
			}),
			(r.default = a);
		},
		{ "./stdlib": 6 },
	  ],
	  4: [
		function (t, e, r) {
		  "use strict";
		  Object.defineProperty(r, "__esModule", { value: !0 }),
			(r.MAGNET_DEFAULTS = void 0);
		  var X =
			  Object.assign ||
			  function (t) {
				for (var e = 1; e < arguments.length; e++) {
				  var r = arguments[e];
				  for (var n in r)
					Object.prototype.hasOwnProperty.call(r, n) &&
					  (t[n] = r[n]);
				}
				return t;
			  },
			s = function (t, e) {
			  if (Array.isArray(t)) return t;
			  if (Symbol.iterator in Object(t))
				return (function (t, e) {
				  var r = [],
					n = !0,
					i = !1,
					o = void 0;
				  try {
					for (
					  var a, l = t[Symbol.iterator]();
					  !(n = (a = l.next()).done) &&
					  (r.push(a.value), !e || r.length !== e);
					  n = !0
					);
				  } catch (t) {
					(i = !0), (o = t);
				  } finally {
					try {
					  !n && l.return && l.return();
					} finally {
					  if (i) throw o;
					}
				  }
				  return r;
				})(t, e);
			  throw new TypeError(
				"Invalid attempt to destructure non-iterable instance"
			  );
			},
			Y = t("./stdlib"),
			B = n(t("./event-handler")),
			V = t("./rect"),
			z = n(t("./alignment-props"));
		  function n(t) {
			return t && t.__esModule ? t : { default: t };
		  }
		  function o(t, e, r) {
			return (
			  e in t
				? Object.defineProperty(t, e, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0,
				  })
				: (t[e] = r),
			  t
			);
		  }
		  function a(t) {
			if (Array.isArray(t)) {
			  for (var e = 0, r = Array(t.length); e < t.length; e++)
				r[e] = t[e];
			  return r;
			}
			return Array.from(t);
		  }
		  function f(t) {
			return t + "px";
		  }
		  function d(t) {
			return 100 * t + "%";
		  }
		  function v(t) {
			var e = t.clientX,
			  r = t.clientY,
			  n = t.touches,
			  i = s((n = void 0 === n ? [] : n), 1)[0],
			  o = (i = void 0 === i ? {} : i).clientX,
			  a = void 0 === o ? e : o,
			  l = i.clientY;
			return { x: a, y: void 0 === l ? r : l };
		  }
		  function l(r) {
			for (
			  var t = arguments.length, e = Array(1 < t ? t - 1 : 0), n = 1;
			  n < t;
			  n++
			)
			  e[n - 1] = arguments[n];
			var i = r[ot.id];
			return e.reduce(function (t, e) {
			  return (0, Y.isarray)(e)
				? t.concat(l.apply(void 0, [r].concat(a(e))))
				: t.concat(
					e.split(" ").map(function (t) {
					  return t + "." + i;
					})
				  );
			}, []);
		  }
		  function h(t) {
			for (var e = t.parentElement; e; e = e.parentElement)
			  if ("static" !== (0, Y.getStyle)(e).position) return e;
			return document;
		  }
		  var u = [z.default.tb, z.default.rl, z.default.bt, z.default.lr],
			G = [z.default.tt, z.default.rr, z.default.bb, z.default.ll],
			J = [z.default.xx, z.default.yy],
			Q = "attract",
			Z = "unattract",
			$ = "attracted",
			tt = "unattracted",
			b = "attractstart",
			et = "attractmove",
			m = "attractend",
			rt = ["magnetenter", "magnetstart", "enter", "start"],
			nt = ["magnetchange", "change"],
			it = ["magnetend", "magnetleave", "end", "leave"],
			c = ["mousedown", "touchstart"],
			w = ["mousemove", "touchmove"],
			R = ["mouseup", "touchend"],
			E = "keydown",
			A = "keyup",
			ot = {
			  id: "_id",
			  temp: "_temp",
			  targets: "_targets",
			  eventHandler: "_eventHandler",
			  manualHandler: "_manualHandler",
			  distance: "_distance",
			  attractable: "_attractable",
			  allowCtrlKey: "_allowCtrlKey",
			  allowDrag: "_allowDrag",
			  useRelativeUnit: "_useRelativeUnit",
			  stayInParent: "_stayInParent",
			  alignOuter: "_alignOuter",
			  alignInner: "_alignInner",
			  alignCenter: "_alignCenter",
			  alignParentCenter: "_alignParentCenter",
			},
			g = (r.MAGNET_DEFAULTS = {
			  distance: 0,
			  attractable: !0,
			  allowCtrlKey: !0,
			  allowDrag: !0,
			  useRelativeUnit: !1,
			  stayInParent: !1,
			  alignOuter: !0,
			  alignInner: !0,
			  alignCenter: !0,
			  alignParentCenter: !1,
			});
		  function p() {
			for (
			  var t, r = this, e = arguments.length, n = Array(e), i = 0;
			  i < e;
			  i++
			)
			  n[i] = arguments[i];
			if (!this instanceof p)
			  return new (Function.prototype.bind.apply(
				p,
				[null].concat(Array.prototype.slice.call(arguments))
			  ))();
			Object.defineProperties(
			  this,
			  (o((t = {}), ot.id, { value: "magnet_" + Date.now() }),
			  o(t, ot.temp, { value: [], writable: !0 }),
			  o(t, ot.targets, { value: [], writable: !0 }),
			  o(t, ot.eventHandler, { value: new B.default(this) }),
			  o(t, ot.manualHandler, { value: {}, writable: !0 }),
			  o(t, ot.distance, { value: g.distance, writable: !0 }),
			  o(t, ot.attractable, { value: g.attractable, writable: !0 }),
			  o(t, ot.allowCtrlKey, {
				value: g.allowCtrlKey,
				writable: !0,
			  }),
			  o(t, ot.allowDrag, { value: g.allowDrag, writable: !0 }),
			  o(t, ot.useRelativeUnit, {
				value: g.useRelativeUnit,
				writable: !0,
			  }),
			  o(t, ot.stayInParent, {
				value: g.stayInParent,
				writable: !0,
			  }),
			  o(t, ot.alignOuter, { value: g.alignOuter, writable: !0 }),
			  o(t, ot.alignInner, { value: g.alignInner, writable: !0 }),
			  o(t, ot.alignCenter, { value: g.alignCenter, writable: !0 }),
			  o(t, ot.alignParentCenter, {
				value: g.alignParentCenter,
				writable: !0,
			  }),
			  t)
			),
			  (0, Y.objForEach)(g, function (t, e) {
				return (0, Y.isset)(r[e]) && r[e](t);
			  }),
			  n.length && this.add(n);
		  }
		  (p.prototype.getDistance = function () {
			return this[ot.distance];
		  }),
			(p.prototype.setDistance = function (t) {
			  if (isNaN(t))
				throw new Error("Invalid distance: " + (0, Y.tostr)(t));
			  if (t < 0) throw new Error("Illegal distance: " + t);
			  return (this[ot.distance] = (0, Y.tonum)(t)), this;
			}),
			(p.prototype.distance = function (t) {
			  return (0, Y.isset)(t)
				? this.setDistance(t)
				: this.getDistance();
			}),
			(p.prototype.getAttractable = function () {
			  return this[ot.attractable];
			}),
			(p.prototype.setAttractable = function (t) {
			  return (this[ot.attractable] = (0, Y.tobool)(t)), this;
			}),
			(p.prototype.attractable = function (t) {
			  return (0, Y.isset)(t)
				? this.setAttractable(t)
				: this.getAttractable();
			}),
			(p.prototype.getAllowCtrlKey = function () {
			  return this[ot.allowCtrlKey];
			}),
			(p.prototype.setAllowCtrlKey = function (t) {
			  return (this[ot.allowCtrlKey] = (0, Y.tobool)(t)), this;
			}),
			(p.prototype.allowCtrlKey = function (t) {
			  return (0, Y.isset)(t)
				? this.setAllowCtrlKey(t)
				: this.getAllowCtrlKey();
			}),
			(p.prototype.getAllowDrag = function () {
			  return this[ot.allowDrag];
			}),
			(p.prototype.setAllowDrag = function (t) {
			  return (this[ot.allowDrag] = (0, Y.tobool)(t)), this;
			}),
			(p.prototype.allowDrag = function (t) {
			  return (0, Y.isset)(t)
				? this.setAllowDrag(t)
				: this.getAllowDrag();
			}),
			(p.prototype.getUseRelativeUnit = function () {
			  return this[ot.useRelativeUnit];
			}),
			(p.prototype.setUseRelativeUnit = function (t) {
			  var e = this;
			  return (
				(t = (0, Y.tobool)(t)),
				this[ot.useRelativeUnit] !== t &&
				  ((0, Y.stdDoms)(this[ot.targets]).forEach(function (t) {
					return e.setMemberRectangle(t);
				  }),
				  (this[ot.useRelativeUnit] = t)),
				this
			  );
			}),
			(p.prototype.useRelativeUnit = function (t) {
			  return (0, Y.isset)(t)
				? this.setUseRelativeUnit(t)
				: this.getUseRelativeUnit();
			}),
			(p.prototype.getStayInParent = function () {
			  return this[ot.stayInParent];
			}),
			(p.prototype.setStayInParent = function (t) {
			  return (this[ot.stayInParent] = (0, Y.tobool)(t)), this;
			}),
			(p.prototype.stayInParent =
			  p.prototype.stayInParentEdge =
			  p.prototype.stayInParentElem =
				function (t) {
				  return (0, Y.isset)(t)
					? this.setStayInParent(t)
					: this.getStayInParent();
				}),
			["Outer", "Inner", "Center", "ParentCenter"].forEach(function (
			  t
			) {
			  var e = "align" + t,
				r = "Align" + t;
			  (p.prototype["get" + r] = function () {
				return this[ot[e]];
			  }),
				(p.prototype["set" + r] = function (t) {
				  return (this[ot[e]] = (0, Y.tobool)(t)), this;
				}),
				(p.prototype[e] = p.prototype["enabled" + r] =
				  function (t) {
					return (0, Y.isset)(t)
					  ? this["set" + r](t)
					  : this["get" + r]();
				  });
			}),
			["on", "off"].forEach(function (e) {
			  p.prototype[e] = function () {
				var t;
				return (
				  (t = this[ot.eventHandler])[e].apply(t, arguments), this
				);
			  };
			}),
			(p.prototype.check = function (e) {
			  var r =
				  1 < arguments.length && void 0 !== arguments[1]
					? arguments[1]
					: (0, V.stdRect)(e),
				n =
				  2 < arguments.length && void 0 !== arguments[2]
					? arguments[2]
					: [].concat(
						this.getAlignOuter() ? u : [],
						this.getAlignInner() ? G : [],
						this.getAlignCenter() ? J : []
					  );
			  if (!(0, Y.iselem)(e))
				throw new Error("Invalid DOM: " + (0, Y.tostr)(e));
			  (0, Y.isarray)(r) && ((n = r), (r = (0, V.stdRect)(e)));
			  var t = h(e),
				i = (0, V.stdRect)(t),
				o = this[ot.targets]
				  .filter(function (t) {
					return t !== e;
				  })
				  .map(function (t) {
					return (0, V.diffRect)(r, t, { alignments: n });
				  }),
				a = o.reduce(function (r, n) {
				  return (
					(0, Y.objForEach)(n.results, function (t, e) {
					  (r[e] = r[e] || []), r[e].push(n);
					}),
					r
				  );
				}, {}),
				l = (0, Y.objMap)(a, function (t, r) {
				  return t.concat().sort(function (t, e) {
					return t.results[r] - e.results[r];
				  });
				});
			  return {
				source: { rect: r, element: e },
				parent: { rect: i, element: t },
				targets: o,
				results: a,
				rankings: l,
				mins: (0, Y.objMap)(l, function (t) {
				  return t[0];
				}),
				maxs: (0, Y.objMap)(l, function (t) {
				  return t[t.length - 1];
				}),
			  };
			});
		  function at(t, e) {
			return !t.includes(e) && t.push(e);
		  }
		  function lt(t) {
			if (t) {
			  var u = t.prop,
				e = t.target,
				r = e.rect,
				n = e.element,
				i = (function (t, e) {
				  var r = t.top,
					n = t.right,
					i = t.bottom,
					o = t.left,
					a = e.top,
					l = e.left;
				  switch (u) {
					case z.default.tt:
					case z.default.bt:
					  return [r, a];
					case z.default.bb:
					case z.default.tb:
					  return [i, a];
					case z.default.rr:
					case z.default.lr:
					  return [n, l];
					case z.default.ll:
					case z.default.rl:
					  return [o, l];
					case z.default.xx:
					  return [(n + o) / 2, l];
					case z.default.yy:
					  return [(r + i) / 2, a];
				  }
				})(r, (0, V.stdRect)(h(n))),
				o = s(i, 2),
				a = o[0],
				l = o[1];
			  return {
				type: u,
				rect: r,
				element: n,
				position: a,
				offset: a - l,
			  };
			}
			return null;
		  }
		  function ut(t, e) {
			return (
			  !!t != !!e ||
			  (t ? t.target.element : null) !==
				(e ? e.target.element : null)
			);
		  }
		  (p.prototype.handle = function (e) {
			var t =
				1 < arguments.length && void 0 !== arguments[1]
				  ? arguments[1]
				  : (0, V.stdRect)(e),
			  r =
				2 < arguments.length && void 0 !== arguments[2]
				  ? arguments[2]
				  : this.getAttractable();
			if (!(0, Y.iselem)(e))
			  throw new Error("Invalid DOM: " + (0, Y.tostr)(e));
			var n = st(this, e);
			if (-1 === n)
			  throw new Error("Invalid member: " + (0, Y.tostr)(e));
			(0, Y.isbool)(t) && ((r = t), (t = e)), (t = (0, V.stdRect)(t));
			var i = this[ot.temp][n],
			  o = i._lastAttractedX,
			  a = i._lastAttractedY,
			  l = t,
			  u = l.top,
			  s = l.left,
			  c = l.width,
			  f = l.height,
			  d = r ? this.getDistance() : 0,
			  h = this.check(e, t, r ? void 0 : []),
			  g = h.parent,
			  p = h.targets,
			  y = g.rect,
			  v = g.element,
			  b = { x: s, y: u },
			  m = p
				.concat(
				  this.getStayInParent()
					? (0, V.diffRect)(t, v, {
						alignments: G,
						absDistance: !1,
					  })
					: [],
				  this.getAlignParentCenter()
					? (0, V.diffRect)(t, v, { alignments: J })
					: []
				)
				.reduce(
				  function (t, e) {
					var r = t.x,
					  n = t.y,
					  o = e.target,
					  a = e.results;
					return e.ranking.reduce(
					  function (t, e) {
						var r = t.x,
						  n = t.y,
						  i = a[e];
						if (i <= d)
						  switch (e) {
							case z.default.rr:
							case z.default.ll:
							case z.default.rl:
							case z.default.lr:
							case z.default.xx:
							  (!r || i < r.value) &&
								(r = { prop: e, value: i, target: o });
							  break;
							case z.default.tt:
							case z.default.bb:
							case z.default.tb:
							case z.default.bt:
							case z.default.yy:
							  (!n || i < n.value) &&
								(n = { prop: e, value: i, target: o });
						  }
						return { x: r, y: n };
					  },
					  { x: r, y: n }
					);
				  },
				  { x: null, y: null }
				),
			  w = m.x,
			  R = m.y,
			  E = [],
			  A = [];
			if (w) {
			  var x = w.prop,
				I = w.target.rect;
			  switch (x) {
				case z.default.rr:
				  b.x = I.right - c;
				  break;
				case z.default.ll:
				  b.x = I.left;
				  break;
				case z.default.rl:
				  b.x = I.left - c;
				  break;
				case z.default.lr:
				  b.x = I.right;
				  break;
				case z.default.xx:
				  b.x = (I.left + I.right - c) / 2;
			  }
			}
			if (R) {
			  var _ = R.prop,
				O = R.target.rect;
			  switch (_) {
				case z.default.tt:
				  b.y = O.top;
				  break;
				case z.default.bb:
				  b.y = O.bottom - f;
				  break;
				case z.default.tb:
				  b.y = O.bottom;
				  break;
				case z.default.bt:
				  b.y = O.top - f;
				  break;
				case z.default.yy:
				  b.y = (O.top + O.bottom - f) / 2;
			  }
			}
			var j = ut(o, w),
			  P = ut(a, R);
			j &&
			  (w && at(E, w.target.element), o && at(A, o.target.element)),
			  P &&
				(R && at(E, R.target.element),
				a && at(A, a.target.element)),
			  E.forEach(function (t) {
				return B.default.trigger(t, $, e);
			  }),
			  A.forEach(function (t) {
				return B.default.trigger(t, tt, e);
			  });
			var D = !(!w && !R),
			  C = !(!o && !a),
			  M = this[ot.eventHandler],
			  U = { x: lt(w), y: lt(R) },
			  S = { x: lt(o), y: lt(a) };
			if (D) {
			  var T = j || P;
			  C
				? T ||
				  (!j && w && o && w.prop !== o.prop) ||
				  (!P && R && a && R.prop !== a.prop)
				  ? (M.trigger(nt, X({ source: e }, U)),
					B.default.trigger(e, Q, U))
				  : T && M.trigger(nt, X({ source: e }, U))
				: (M.trigger(nt, X({ source: e }, U)),
				  M.trigger(rt, X({ source: e }, U)),
				  B.default.trigger(e, Q, U)),
				T && B.default.trigger(e, Z, S);
			} else
			  C &&
				(M.trigger(nt, { source: e, x: null, y: null }),
				M.trigger(it, X({ source: e }, S)),
				B.default.trigger(e, Z, S));
			var k,
			  K,
			  F = this[ot.manualHandler],
			  H = F.beforeAttract,
			  N = F.afterAttract,
			  L = F.doAttract,
			  W =
				((k = b.x - y.left),
				(K = b.y - y.top),
				(0, V.stdRect)({
				  top: K,
				  right: k + c,
				  bottom: K + f,
				  left: k,
				  width: c,
				  height: f,
				}));
			if ((0, Y.isfunc)(H)) {
			  var q = H.bind(this)(
				e,
				{ origin: (0, V.stdRect)(t), target: (0, V.stdRect)(W) },
				{ current: U, last: S }
			  );
			  if ((0, V.isRect)(q)) W = q;
			  else if ((0, Y.isbool)(q) && !1 === q) W = t;
			  else if ((0, Y.isset)(q))
				throw new Error("Invalid return value: " + (0, Y.tostr)(q));
			}
			return (
			  B.default.trigger(
				e,
				et,
				{
				  rects: {
					origin: (0, V.stdRect)(t),
					target: (0, V.stdRect)(W),
				  },
				  attracts: { current: U, last: S },
				},
				function () {
				  W = t;
				}
			  ),
			  (0, Y.isfunc)(L)
				? L.bind(this)(
					e,
					{
					  origin: (0, V.stdRect)(t),
					  target: (0, V.stdRect)(W),
					},
					{ current: U, last: S }
				  )
				: this.setMemberRectangle(e, W),
			  (0, Y.isfunc)(N) &&
				N.bind(this)(
				  e,
				  { origin: (0, V.stdRect)(t), target: (0, V.stdRect)(W) },
				  { current: U, last: S }
				),
			  (this[ot.temp][n] = {
				_lastAttractedX: w,
				_lastAttractedY: R,
			  }),
			  this
			);
		  }),
			(p.prototype.setMemberRectangle = function (t) {
			  var e =
				  1 < arguments.length && void 0 !== arguments[1]
					? arguments[1]
					: (0, V.stdRect)(t),
				r =
				  2 < arguments.length && void 0 !== arguments[2]
					? arguments[2]
					: this.getUseRelativeUnit();
			  if (!(0, Y.iselem)(t))
				throw new Error("Invalid DOM: " + (0, Y.tostr)(t));
			  if (!this.hasMember(t))
				throw new Error("Invalid member: " + (0, Y.tostr)(t));
			  (0, Y.isbool)(e) && ((r = e), (e = (0, V.stdRect)(t)));
			  var n = (e = (0, V.stdRect)({
				  right: e.right,
				  bottom: e.bottom,
				  width: e.width,
				  height: e.height,
				})),
				i = n.top,
				o = n.left,
				a = n.width,
				l = n.height;
			  if (r) {
				var u = (0, V.stdRect)(h(t)),
				  s = u.width,
				  c = u.height;
				(t.style.top = d(i / c)),
				  (t.style.left = d(o / s)),
				  (t.style.width = d(a / s)),
				  (t.style.height = d(l / c));
			  } else
				(t.style.top = f(i)),
				  (t.style.left = f(o)),
				  (t.style.width = f(a)),
				  (t.style.height = f(l));
			  return (
				(t.style.position = "absolute"),
				(t.style.right = "auto"),
				(t.style.bottom = "auto"),
				this
			  );
			}),
			["before", "after", "do"].forEach(function (t) {
			  var e = t + "Attract";
			  Object.defineProperty(p.prototype, e, {
				get: function () {
				  return this[ot.manualHandler][e];
				},
				set: function (t) {
				  this[ot.manualHandler][e] = t;
				},
			  });
			}),
			(p.prototype.add = function () {
			  for (
				var y = this, t = arguments.length, e = Array(t), r = 0;
				r < t;
				r++
			  )
				e[r] = arguments[r];
			  return (
				(e = Y.stdDoms.apply(void 0, a(e))),
				// [window, document, document.body].forEach(function (t) {
				//   if (e.includes(t))
				// 	throw new Error(
				// 	  "Illegal element: " + (0, Y.tostr)(src)
				// 	);
				// }),
				e.forEach(function (p) {
				  y[ot.targets].includes(p) ||
					(B.default.on(p, l(y, c), function (t) {
					  if (y.getAllowDrag()) {
						t.preventDefault();
						var u = !t.ctrlKey,
						  r = t,
						  e = (0, V.stdRect)(p),
						  s = e.left,
						  c = e.top,
						  f = e.width,
						  d = e.height,
						  n = v(t),
						  h = n.x,
						  g = n.y,
						  i = function (t) {
							var e =
								!!y.getAttractable() &&
								(!y.getAllowCtrlKey() || u),
							  r = v(t),
							  n = r.x,
							  i = r.y,
							  o = s + (n - h),
							  a = c + (i - g),
							  l = (0, V.stdRect)({
								top: a,
								right: o + f,
								bottom: a + d,
								left: o,
							  });
							y.handle(p, l, e);
						  };
						B.default.trigger(p, b, (0, V.stdRect)(p)),
						  B.default.off(document.body, l(y, w, R, E, A)),
						  B.default.on(
							document.body,
							l(y, E, A),
							function (t) {
							  var e = !t.ctrlKey;
							  e !== u && ((u = e), i(r));
							}
						  ),
						  B.default.on(document.body, l(y, R), function () {
							var t = [],
							  e = st(y, p),
							  r = y[ot.temp][e],
							  n = r._lastAttractedX,
							  i = r._lastAttractedY;
							if (
							  (B.default.off(
								document.body,
								l(y, w, R, E, A)
							  ),
							  n && at(t, n.target.element),
							  i && at(t, i.target.element),
							  t.forEach(function (t) {
								return B.default.trigger(t, tt, p);
							  }),
							  B.default.trigger(p, m, (0, V.stdRect)(p)),
							  n || i)
							) {
							  var o = y[ot.eventHandler];
							  B.default.trigger(p, Z),
								o.trigger(nt, {
								  source: p,
								  x: null,
								  y: null,
								}),
								o.trigger(it, { source: p });
							}
							y[ot.temp][e] = {};
						  }),
						  B.default.on(
							document.body,
							l(y, w),
							function (t) {
							  i(t), (r = t);
							}
						  );
					  }
					}),
					y[ot.targets].push(p),
					y[ot.temp].push({}),
					y.setMemberRectangle(p));
				}),
				this
			  );
			});
		  var st = function (t, e) {
			return t[ot.targets].indexOf(e);
		  };
		  p.prototype.hasMember = function (t) {
			return -1 !== st(this, t);
		  };
		  function i(o) {
			for (
			  var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1;
			  r < t;
			  r++
			)
			  e[r - 1] = arguments[r];
			return Y.stdDoms.apply(void 0, e).reduce(function (t, e) {
			  var r = o[ot.targets],
				n = o[ot.temp],
				i = r.indexOf(e);
			  return (
				-1 !== i &&
				  (r.splice(i, 1),
				  n.splice(i, 1),
				  B.default.off(e, l(o, c)),
				  t.push(e)),
				t
			  );
			}, []);
		  }
		  (p.prototype.remove = function () {
			for (var t = arguments.length, e = Array(t), r = 0; r < t; r++)
			  e[r] = arguments[r];
			return i.apply(void 0, [this].concat(e)), this;
		  }),
			(p.prototype.removeFull = function () {
			  for (
				var t = arguments.length, e = Array(t), r = 0;
				r < t;
				r++
			  )
				e[r] = arguments[r];
			  return (
				i.apply(void 0, [this].concat(e)).forEach(function (t) {
				  (t.style.position = ""),
					(t.style.top = ""),
					(t.style.right = ""),
					(t.style.bottom = ""),
					(t.style.left = ""),
					(t.style.width = ""),
					(t.style.height = ""),
					(t.style.zIndex = "");
				}),
				this
			  );
			});
		  function y(e) {
			var t = e[ot.targets];
			return (
			  (e[ot.temp] = []),
			  t.splice(0, t.length).map(function (t) {
				return B.default.off(t, l(e, c)), t;
			  })
			);
		  }
		  (p.prototype.clear = function () {
			return y(this), this;
		  }),
			(p.prototype.clearFull = function () {
			  return (
				y(this).forEach(function (t) {
				  (t.style.position = ""),
					(t.style.top = ""),
					(t.style.right = ""),
					(t.style.bottom = ""),
					(t.style.left = ""),
					(t.style.width = ""),
					(t.style.height = ""),
					(t.style.zIndex = "");
				}),
				this
			  );
			}),
			(p.isRect = function (t) {
			  return (0, V.isRect)(t);
			}),
			(p.stdRect = function (t) {
			  return (0, V.stdRect)(t);
			}),
			(p.measure = p.diffRect =
			  function (t, e) {
				for (
				  var r = arguments.length,
					n = Array(2 < r ? r - 2 : 0),
					i = 2;
				  i < r;
				  i++
				)
				  n[i - 2] = arguments[i];
				return V.diffRect.apply(void 0, [t, e].concat(n));
			  }),
			(r.default = p);
		},
		{
		  "./alignment-props": 2,
		  "./event-handler": 3,
		  "./rect": 5,
		  "./stdlib": 6,
		},
	  ],
	  5: [
		function (t, e, r) {
		  "use strict";
		  Object.defineProperty(r, "__esModule", { value: !0 }),
			(r.diffRect = r.stdRect = r.isRect = void 0);
		  var n,
			p =
			  Object.assign ||
			  function (t) {
				for (var e = 1; e < arguments.length; e++) {
				  var r = arguments[e];
				  for (var n in r)
					Object.prototype.hasOwnProperty.call(r, n) &&
					  (t[n] = r[n]);
				}
				return t;
			  },
			m = t("./stdlib"),
			i = t("./alignment-props"),
			y = (n = i) && n.__esModule ? n : { default: n };
		  var w = (r.isRect = function (t, e) {
			  var r = 1 < arguments.length && void 0 !== e ? e : 1e-10;
			  if (!(0, m.isset)(t)) return !1;
			  function n(t) {
				return !((0, m.isset)(t) && !(0, m.isnum)(t));
			  }
			  var i = t.x,
				o = t.y,
				a = t.top,
				l = void 0 === a ? o : a,
				u = t.right,
				s = t.bottom,
				c = t.left,
				f = void 0 === c ? i : c,
				d = t.width,
				h = t.height;
			  if (
				!(
				  n(l) &&
				  n(u) &&
				  n(s) &&
				  n(f) &&
				  n(d) &&
				  n(h) &&
				  n(i) &&
				  n(o)
				)
			  )
				return !1;
			  if ((0, m.isset)(d)) {
				if (d < 0) return !1;
				if ((0, m.isset)(f)) {
				  if ((0, m.isset)(u) && r < Math.abs(d - (u - f)))
					return !1;
				} else if (!(0, m.isset)(u)) return !1;
			  } else if (!(0, m.isset)(f) || !(0, m.isset)(u) || u < f)
				return !1;
			  if ((0, m.isset)(h)) {
				if (h < 0) return !1;
				if ((0, m.isset)(l)) {
				  if ((0, m.isset)(s) && r < Math.abs(h - (s - l)))
					return !1;
				} else if (!(0, m.isset)(s)) return !1;
			  } else if (!(0, m.isset)(l) || !(0, m.isset)(s) || s < l)
				return !1;
			  return !0;
			}),
			v = (r.stdRect = function (t) {
			  if (w(t)) {
				var e = t.x,
				  r = t.y,
				  n = t.right,
				  i = t.bottom,
				  o = t.width,
				  a = t.height,
				  l = t.top,
				  u = void 0 === l ? ((0, m.isset)(r) ? r : i - a) : l,
				  s = t.left,
				  c = void 0 === s ? ((0, m.isset)(e) ? e : n - o) : s;
				return {
				  top: u,
				  left: c,
				  x: (0, m.isset)(e) ? e : c,
				  y: (0, m.isset)(r) ? r : u,
				  right: (0, m.isset)(n) ? n : c + o,
				  bottom: (0, m.isset)(i) ? i : u + a,
				  width: (0, m.isset)(o) ? o : n - c,
				  height: (0, m.isset)(a) ? a : i - u,
				};
			  }
			  if ((0, m.iselem)(t)) {
				var f =
					t instanceof Element
					  ? {
						  rect: t.getBoundingClientRect(),
						  border:
							((b = (0, m.getStyle)(t)),
							{
							  t: b.borderTopWidth,
							  r: b.borderRightWidth,
							  b: b.borderBottomWidth,
							  l: b.borderLeftWidth,
							}),
						}
					  : {
						  rect: {
							top: 0,
							right: window.innerWidth,
							bottom: window.innerHeight,
							left: 0,
						  },
						  border: { t: 0, r: 0, b: 0, l: 0 },
						},
				  d = f.rect,
				  h = f.border,
				  g = d.top + parseFloat(h.t),
				  p = d.right - parseFloat(h.r),
				  y = d.bottom - parseFloat(h.b),
				  v = d.left + parseFloat(h.l);
				return {
				  top: g,
				  right: p,
				  bottom: y,
				  left: v,
				  width: p - v,
				  height: y - g,
				  x: v,
				  y: g,
				};
			  }
			  throw new Error(
				"Invalid element to rectangle: " + (0, m.tostr)(t)
			  );
			  var b;
			}),
			o = (r.diffRect = function (t, e, r) {
			  var n = 2 < arguments.length && void 0 !== r ? r : {},
				i = n.alignments,
				o = void 0 === i ? (0, m.objValues)(y.default) : i,
				a = n.absDistance,
				l = void 0 === a || a,
				u = v(t),
				s = v(e),
				c = { rect: u },
				f = { rect: s },
				d = l
				  ? Math.abs
				  : function (t) {
					  return t;
					},
				h = (0, m.objMap)(
				  (0, m.objReduce)(
					y.default,
					function (t, e) {
					  return o.includes(e)
						? p(
							{},
							t,
							(function (t, e, r) {
							  return (
								e in t
								  ? Object.defineProperty(t, e, {
									  value: r,
									  enumerable: !0,
									  configurable: !0,
									  writable: !0,
									})
								  : (t[e] = r),
								t
							  );
							})({}, e, NaN)
						  )
						: t;
					},
					{}
				  ),
				  function (t, e) {
					switch (e) {
					  case y.default.tt:
						return d(u.top - s.top);
					  case y.default.bb:
						return d(s.bottom - u.bottom);
					  case y.default.rr:
						return d(s.right - u.right);
					  case y.default.ll:
						return d(u.left - s.left);
					  case y.default.tb:
						return d(u.top - s.bottom);
					  case y.default.bt:
						return d(s.top - u.bottom);
					  case y.default.rl:
						return d(s.left - u.right);
					  case y.default.lr:
						return d(u.left - s.right);
					  case y.default.xx:
						return d(
						  (u.right - s.right + (u.left - s.left)) / 2
						);
					  case y.default.yy:
						return d(
						  (u.top - s.top + (u.bottom - s.bottom)) / 2
						);
					}
				  }
				),
				g = (0, m.objKeys)(h).sort(function (t, e) {
				  return h[t] - h[e];
				});
			  return (
				(0, m.iselem)(t) && (c.element = t),
				(0, m.iselem)(e) && (f.element = e),
				{
				  source: c,
				  target: f,
				  results: h,
				  ranking: g,
				  min: g[0],
				  max: g[h.length - 1],
				}
			  );
			});
		},
		{ "./alignment-props": 2, "./stdlib": 6 },
	  ],
	  6: [
		function (t, e, r) {
		  "use strict";
		  Object.defineProperty(r, "__esModule", { value: !0 });
		  var a =
			Object.assign ||
			function (t) {
			  for (var e = 1; e < arguments.length; e++) {
				var r = arguments[e];
				for (var n in r)
				  Object.prototype.hasOwnProperty.call(r, n) &&
					(t[n] = r[n]);
			  }
			  return t;
			};
		  var n = (r.isset = function (t) {
			  return void 0 !== t;
			}),
			i =
			  ((r.useor = function (t, e, r) {
				return (2 < arguments.length && void 0 !== r ? r : n)(t)
				  ? t
				  : e;
			  }),
			  (r.isbool = function (t) {
				return "boolean" == typeof t;
			  }),
			  (r.tobool = function (t) {
				return !!t;
			  }),
			  (r.isnum = function (t) {
				return !isNaN(t);
			  })),
			o =
			  ((r.tonum = function (t) {
				return parseFloat(t);
			  }),
			  (r.isint = function (t) {
				return i(t) && t === (0 | t);
			  })),
			l =
			  ((r.isstr = function (t) {
				return (
				  "string" == typeof t || (n(t) && t instanceof String)
				);
			  }),
			  (r.tostr = function (t) {
				return null ;
				// return n(t) ? t.toString() : "";
			  })),
			u =
			  ((r.isfunc = function (t) {
				return "function" == typeof t;
			  }),
			  (r.isarray = function (t) {
				return n(t) && Array.isArray(t);
			  })),
			s = (r.arrayable = function (t) {
			  return t && o(t.length) && 0 <= t.length;
			}),
			c = (r.toarray = function (t) {
			  return Array.prototype.slice.call(t);
			}),
			f = (r.objKeys = function (t) {
			  return Object.keys(t);
			}),
			d =
			  ((r.objForEach = function (e, t, r) {
				var n =
					1 < arguments.length && void 0 !== t
					  ? t
					  : function () {},
				  i = 2 < arguments.length && void 0 !== r ? r : void 0;
				return f(e).forEach(function (t) {
				  return n.call(i, e[t], t, e);
				});
			  }),
			  (r.objReduce = function (r, t, e) {
				var n =
					1 < arguments.length && void 0 !== t
					  ? t
					  : function () {},
				  i = e;
				return f(r).reduce(function (t, e) {
				  return n(t, r[e], e, r);
				}, i);
			  })),
			h =
			  ((r.objMap = function (n, t, e) {
				var i =
					1 < arguments.length && void 0 !== t
					  ? t
					  : function () {},
				  o = 2 < arguments.length && void 0 !== e ? e : void 0;
				return d(
				  n,
				  function (t, e, r) {
					return a(
					  {},
					  t,
					  (function (t, e, r) {
						return (
						  e in t
							? Object.defineProperty(t, e, {
								value: r,
								enumerable: !0,
								configurable: !0,
								writable: !0,
							  })
							: (t[e] = r),
						  t
						);
					  })({}, r, i.call(o, e, r, n))
					);
				  },
				  {}
				);
			  }),
			  (r.objValues = function (t) {
				return d(
				  t,
				  function (t, e) {
					return t.concat([e]);
				  },
				  []
				);
			  }),
			  (r.iselem = function (t) {
				return (
				  n(t) &&
				  (t instanceof Element ||
					t instanceof Window ||
					t instanceof Document)
				);
			  }));
		  (r.getStyle = function (t) {
			return t.currentStyle || window.getComputedStyle(t);
		  }),
			(r.stdDoms = function r() {
			  for (
				var t = arguments.length, e = Array(t), n = 0;
				n < t;
				n++
			  )
				e[n] = arguments[n];
			  return e.reduce(function (t, e) {
				if (h(e)) return t.includes(e) ? t : t.concat(e);
				if (u(e))
				  return e.reduce(function (t, e) {
					return t.concat(r(e));
				  }, t);
				if (s(e)) return t.concat(r(c(e)));
				//throw new Error("Invalid element: " + l(e));
			  }, []);
			});
		},
		{},
	  ],
	},
	{},
	[1]
  );