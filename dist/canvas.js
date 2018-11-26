(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = createCommonjsModule(function (module) {
	module.exports = { "default": assign, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$1);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty, __esModule: true };
	});

	unwrapExports(defineProperty$1);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _redefine = _hide;

	var _iterators = {};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$3 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$3
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = _core.Promise;

	var promise$1 = createCommonjsModule(function (module) {
	module.exports = { "default": promise, __esModule: true };
	});

	var _Promise = unwrapExports(promise$1);

	var ImageManage = function () {
	    function ImageManage() {
	        _classCallCheck(this, ImageManage);

	        this.imageList = [];
	        this.num = 0;
	    }

	    _createClass(ImageManage, [{
	        key: "addImage",
	        value: function addImage(images) {
	            var _this = this;

	            images = Array.isArray(images) ? images : [images];
	            images.forEach(function (item) {
	                var image = new Image();
	                image.onload = function () {
	                    _this.num += 1;
	                };
	                image.onerror = function () {
	                    _this.num += 1;
	                };
	                image.src = item.src;
	                item.image = image;
	                _this.imageList.push(item);
	            });
	        }
	    }, {
	        key: "getImage",
	        value: function getImage(name) {
	            return this.imageList.find(function (item) {
	                return item.name === name;
	            });
	        }
	    }, {
	        key: "ready",
	        value: function ready() {
	            var _this2 = this;

	            return new _Promise(function (resolve) {
	                var timer = setInterval(function () {
	                    if (_this2.num === _this2.imageList.length) {
	                        clearInterval(timer);
	                        resolve();
	                    }
	                }, 50);
	            });
	        }
	    }]);

	    return ImageManage;
	}();

	var addListener = function addListener(element, event, handler) {
	    element.addEventListener(event, handler, false);
	};

	var removeListener = function removeListener(element, event, handler) {
	    element.removeEventListener(event, handler, false);
	};

	var getScrollLeftTop = function getScrollLeftTop(element) {
	    var left = 0;
	    var top = 0;
	    while (element && element.parentNode) {
	        element = element.parentNode;

	        if (element === document.body) {
	            left = document.body.scrollLeft;
	            top = document.body.scrollTop;
	        } else {
	            left += element.scrollLeft || 0;
	            top += element.scrollTop || 0;
	        }
	        if (element.nodeType === 1 && element.style.position === 'fixed') {
	            break;
	        }
	    }
	    return {
	        left: left,
	        top: top
	    };
	};

	var getElementOffset = function getElementOffset(element) {
	    var top = 0;
	    var left = 0;

	    do {
	        top += element.offsetTop || 0;
	        left += element.offsetLeft || 0;
	        element = element.offsetParent;
	    } while (element);

	    return {
	        top: top,
	        left: left
	    };
	};

	var getPointer = function getPointer(event) {
	    var inner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	    var element = event.target;
	    var scroll = getScrollLeftTop(element);
	    var offset = getElementOffset(element);
	    return {
	        x: inner ? event.clientX + scroll.left - offset.left : event.clientX + scroll.left,
	        y: inner ? event.clientY + scroll.top - offset.top : event.clientY + scroll.top
	    };
	};

	var CanvasManage = function () {
	    function CanvasManage(sc) {
	        var _this = this;

	        _classCallCheck(this, CanvasManage);

	        this.point = {
	            x: 0,
	            y: 0
	        };

	        this.mouseDown = function (e) {
	            var _sc = _this.sc,
	                _objects = _sc._objects,
	                enableGlobalTranslate = _sc.enableGlobalTranslate;

	            var _getPointer = getPointer(e),
	                x = _getPointer.x,
	                y = _getPointer.y;

	            _this.cacheX = x;
	            _this.cacheY = y;

	            // 已选中
	            var downItems = _objects.filter(function (item) {
	                return item.isPointInner(x, y);
	            });
	            var downItem = downItems[0];
	            // 触发事件
	            if (downItem) {
	                if (downItem.enableChangeIndex) {
	                    _this.sc.changeOrder(downItem);
	                }
	                downItem.emit('mousedown');
	            }

	            // 可移动、已选中
	            var enableDragItems = _objects.filter(function (item) {
	                return item.isPointInner(x, y) && item.enableDrag;
	            });
	            var target = enableDragItems[0];

	            var mouseMove = function mouseMove(e) {
	                var _getPointer2 = getPointer(e),
	                    x = _getPointer2.x,
	                    y = _getPointer2.y;

	                target.moveX = target.moveX + x - _this.cacheX;
	                target.moveY = target.moveY + y - _this.cacheY;
	                target.isDragging = true;
	                _this.sc.redraw();
	                _this.cacheX = x;
	                _this.cacheY = y;
	            };

	            var mouseUp = function mouseUp(e) {
	                var _getPointer3 = getPointer(e),
	                    x = _getPointer3.x,
	                    y = _getPointer3.y;

	                var destinationItems = _objects.filter(function (item) {
	                    return item.isPointInner(x, y);
	                });
	                var destination = destinationItems[1];
	                target.isDragging = false;
	                removeListener(document, 'mousemove', mouseMove);
	                removeListener(document, 'mouseup', mouseUp);
	            };

	            if (target && target.enableDrag) {
	                addListener(document, 'mousemove', mouseMove);
	                addListener(document, 'mouseup', mouseUp);
	            }

	            if (enableGlobalTranslate && !downItems.length) {
	                var globalMove = function globalMove(e) {
	                    var _getPointer4 = getPointer(e),
	                        x = _getPointer4.x,
	                        y = _getPointer4.y;

	                    _this.sc.transX = _this.sc.transX + x - _this.cacheX;
	                    _this.sc.transY = _this.sc.transY + y - _this.cacheY;
	                    _this.cacheX = x;
	                    _this.cacheY = y;
	                };

	                var globalUp = function globalUp() {
	                    removeListener(document, 'mousemove', globalMove);
	                    removeListener(document, 'mouseup', globalUp);
	                };
	                addListener(document, 'mousemove', globalMove);
	                addListener(document, 'mouseup', globalUp);
	            }
	        };

	        this.mouseMove = function (e) {
	            _Object$assign(_this.point, getPointer(e, false));

	            var _objects = _this.sc._objects;

	            var _getPointer5 = getPointer(e),
	                x = _getPointer5.x,
	                y = _getPointer5.y;

	            var draggingItem = _objects.filter(function (item) {
	                return item.isDragging;
	            });
	            var targetItems = _objects.filter(function (item) {
	                return item.isPointInner(x, y);
	            });
	            if (draggingItem.length) {
	                var target = targetItems[1];
	                if (target) {
	                    if (!target.hasDragIn) {
	                        target.emit('dragin');
	                        target.hasDragIn = true;
	                    }
	                    _objects.filter(function (item) {
	                        return item.hasDragIn && !item.isPointInner(x, y);
	                    }).forEach(function (item) {
	                        item.emit('dragout');
	                        item.hasDragIn = false;
	                    });
	                }
	            } else {
	                var _target = targetItems[0];
	                if (_target) {
	                    if (!_target.hasEnter) {
	                        _target.emit('mouseenter');
	                        _target.hasEnter = true;
	                    } else {
	                        _target.emit('mousemove');
	                    }
	                }

	                _objects.filter(function (item) {
	                    return item.hasEnter && !item.isPointInner(x, y);
	                }).forEach(function (item) {
	                    item.emit('mouseleave');
	                    item.hasEnter = false;
	                });
	            }
	        };

	        this.mouseScale = function (e) {
	            if (_this.sc.enableScale) {
	                var deltaY = e.deltaY;
	                if (deltaY > 0) {
	                    if (_this.sc.scale > 0.5) {
	                        _this.sc.scale -= 0.2;
	                        _this.sc.redraw();
	                    }
	                } else {
	                    if (_this.sc.scale < 2) {
	                        _this.sc.scale += 0.2;
	                        _this.sc.redraw();
	                    }
	                }
	            }
	        };

	        this.sc = sc;
	        this.bindEvents();
	    }

	    _createClass(CanvasManage, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var element = this.sc.element;

	            addListener(element, 'mousedown', this.mouseDown);
	            addListener(element, 'mousemove', this.mouseMove);
	            addListener(element, 'wheel', this.mouseScale);
	        }
	    }, {
	        key: 'getPoint',
	        value: function getPoint() {
	            return this.point;
	        }
	    }]);

	    return CanvasManage;
	}();

	var noop = function noop() {};

	var reverse = function reverse(array) {
	    var result = [];
	    for (var i = 0; i < array.length; i++) {
	        result[i] = array[array.length - i - 1];
	    }
	    return result;
	};

	// register shape component
	var register = function register(SC, name, Component) {
	    SC.prototype[name] = function (setting) {
	        return new Component(this, setting);
	    };
	};

	var textEllipsis = function textEllipsis(canvas, text, maxWidth) {
	    var textWidth = canvas.measureText(text).width;
	    var ellipsis = '...';
	    var ellipsisWidth = canvas.measureText(ellipsis).width;
	    if (textWidth <= maxWidth || textWidth <= ellipsisWidth) {
	        return text;
	    }
	    var length = text.length;
	    while (textWidth >= maxWidth - ellipsisWidth && length-- > 0) {
	        text = text.substring(0, length);
	        textWidth = canvas.measureText(text).width;
	    }
	    return text + ellipsis;
	};

	// bezier
	var getCtrlPoint = function getCtrlPoint(ps, i, a, b) {
	    var pAx = void 0,
	        pAy = void 0,
	        pBx = void 0,
	        pBy = void 0;
	    if (!a || !b) {
	        a = 0.25;
	        b = 0.25;
	    }
	    if (i < 1) {
	        pAx = ps[0][0] + (ps[1][0] - ps[0][0]) * a;
	        pAy = ps[0][1] + (ps[1][1] - ps[0][1]) * a;
	    } else {
	        pAx = ps[i][0] + (ps[i + 1][0] - ps[i - 1][0]) * a;
	        pAy = ps[i][1] + (ps[i + 1][1] - ps[i - 1][1]) * a;
	    }
	    if (i > ps.length - 3) {
	        var last = ps.length - 1;
	        pBx = ps[last][0] - (ps[last][0] - ps[last - 1][0]) * b;
	        pBy = ps[last][1] - (ps[last][1] - ps[last - 1][1]) * b;
	    } else {
	        pBx = ps[i + 1][0] - (ps[i + 2][0] - ps[i][0]) * b;
	        pBy = ps[i + 1][1] - (ps[i + 2][1] - ps[i][1]) * b;
	    }
	    return {
	        pA: { x: pAx, y: pAy },
	        pB: { x: pBx, y: pBy }
	    };
	};

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getPrototypeOf, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

	var f$4 = _wks;

	var _wksExt = {
		f: f$4
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty$3 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = createCommonjsModule(function (module) {
	module.exports = { "default": symbol, __esModule: true };
	});

	unwrapExports(symbol$1);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol$1);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	unwrapExports(_typeof_1);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = createCommonjsModule(function (module) {
	module.exports = { "default": setPrototypeOf, __esModule: true };
	});

	unwrapExports(setPrototypeOf$1);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object$1 = _core.Object;
	var create = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$1 = createCommonjsModule(function (module) {
	module.exports = { "default": create, __esModule: true };
	});

	unwrapExports(create$1);

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(setPrototypeOf$1);



	var _create2 = _interopRequireDefault(create$1);



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};
	});

	var _inherits = unwrapExports(inherits);

	// sub pub
	var EventBus = function () {
	    function EventBus() {
	        _classCallCheck(this, EventBus);

	        this.events = [];
	    }

	    _createClass(EventBus, [{
	        key: 'on',
	        value: function on(event) {
	            var _this = this;

	            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

	            var es = event.split(' ');
	            es.forEach(function (e) {
	                _this.events.push({
	                    eventType: e,
	                    callback: callback
	                });
	            });
	            return this;
	        }
	    }, {
	        key: 'emit',
	        value: function emit(event) {
	            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                params[_key - 1] = arguments[_key];
	            }

	            this.events.filter(function (e) {
	                return e.eventType === event;
	            }).forEach(function (e) {
	                return e.callback.apply(e, params);
	            });
	        }
	    }]);

	    return EventBus;
	}();

	// keyboard press
	var KeyPress = function (_EventBus) {
	    _inherits(KeyPress, _EventBus);

	    function KeyPress() {
	        _classCallCheck(this, KeyPress);

	        var _this2 = _possibleConstructorReturn(this, (KeyPress.__proto__ || _Object$getPrototypeOf(KeyPress)).call(this));

	        _this2.events = [];
	        return _this2;
	    }

	    _createClass(KeyPress, [{
	        key: 'keyPressed',
	        value: function keyPressed(e) {
	            var key = '';
	            switch (e.keyCode) {
	                case 32:
	                    key = 'space';
	                    break;
	                case 37:
	                    key = 'left';
	                    break;
	                case 39:
	                    key = 'right';
	                    break;
	                case 38:
	                    key = 'up';
	                    break;
	                case 40:
	                    key = 'down';
	                    break;
	            }
	            this.emit(key);
	        }
	    }]);

	    return KeyPress;
	}(EventBus);

	/**!
	 * code from https://github.com/LiikeJS/Liike/blob/master/src/ease.js
	 */
	var easeInBy = function easeInBy(power) {
	    return function (t) {
	        return Math.pow(t, power);
	    };
	};
	var easeOutBy = function easeOutBy(power) {
	    return function (t) {
	        return 1 - Math.abs(Math.pow(t - 1, power));
	    };
	};
	var easeInOutBy = function easeInOutBy(power) {
	    return function (t) {
	        return t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5;
	    };
	};

	var linear = function linear(t) {
	    return t;
	};
	var quadIn = easeInBy(2);
	var quadOut = easeOutBy(2);
	var quadInOut = easeInOutBy(2);
	var cubicIn = easeInBy(3);
	var cubicOut = easeOutBy(3);
	var cubicInOut = easeInOutBy(3);
	var quartIn = easeInBy(4);
	var quartOut = easeOutBy(4);
	var quartInOut = easeInOutBy(4);
	var quintIn = easeInBy(5);
	var quintOut = easeOutBy(5);
	var quintInOut = easeInOutBy(5);
	var sineIn = function sineIn(t) {
	    return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);
	};
	var sineOut = function sineOut(t) {
	    return Math.sin(Math.PI / 2 * t);
	};
	var sineInOut = function sineInOut(t) {
	    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;
	};
	var bounceOut = function bounceOut(t) {
	    var s = 7.5625;
	    var p = 2.75;

	    if (t < 1 / p) {
	        return s * t * t;
	    }
	    if (t < 2 / p) {
	        t -= 1.5 / p;
	        return s * t * t + 0.75;
	    }
	    if (t < 2.5 / p) {
	        t -= 2.25 / p;
	        return s * t * t + 0.9375;
	    }
	    t -= 2.625 / p;
	    return s * t * t + 0.984375;
	};
	var bounceIn = function bounceIn(t) {
	    return 1 - bounceOut(1 - t);
	};
	var bounceInOut = function bounceInOut(t) {
	    return t < 0.5 ? bounceIn(t * 2) * 0.5 : bounceOut(t * 2 - 1) * 0.5 + 0.5;
	};

	var easing = /*#__PURE__*/Object.freeze({
		linear: linear,
		quadIn: quadIn,
		quadOut: quadOut,
		quadInOut: quadInOut,
		cubicIn: cubicIn,
		cubicOut: cubicOut,
		cubicInOut: cubicInOut,
		quartIn: quartIn,
		quartOut: quartOut,
		quartInOut: quartInOut,
		quintIn: quintIn,
		quintOut: quintOut,
		quintInOut: quintInOut,
		sineIn: sineIn,
		sineOut: sineOut,
		sineInOut: sineInOut,
		bounceOut: bounceOut,
		bounceIn: bounceIn,
		bounceInOut: bounceInOut
	});

	var Tween = function () {
	    function Tween(props) {
	        _classCallCheck(this, Tween);

	        var from = props.from,
	            to = props.to,
	            _props$duration = props.duration,
	            duration = _props$duration === undefined ? 500 : _props$duration,
	            _props$delay = props.delay,
	            delay = _props$delay === undefined ? 0 : _props$delay,
	            _props$easing = props.easing,
	            easing = _props$easing === undefined ? 'linear' : _props$easing,
	            _props$onStart = props.onStart,
	            onStart = _props$onStart === undefined ? noop : _props$onStart,
	            _props$onUpdate = props.onUpdate,
	            onUpdate = _props$onUpdate === undefined ? noop : _props$onUpdate,
	            _props$onFinish = props.onFinish,
	            onFinish = _props$onFinish === undefined ? noop : _props$onFinish;


	        for (var key in from) {
	            if (to[key] === undefined) {
	                to[key] = from[key];
	            }
	        }
	        for (var _key in to) {
	            if (from[_key] === undefined) {
	                from[_key] = to[_key];
	            }
	        }

	        _Object$assign(this, {
	            from: from,
	            to: to,
	            duration: duration,
	            delay: delay,
	            easing: easing,
	            onStart: onStart,
	            onUpdate: onUpdate,
	            onFinish: onFinish,
	            startTime: Date.now() + delay,
	            elapsed: 0,
	            started: false,
	            finished: false
	        });
	    }

	    _createClass(Tween, [{
	        key: 'update',
	        value: function update() {
	            var keys = {};
	            var now = Date.now();
	            if (now < this.startTime) {
	                return;
	            }

	            if (this.elapsed >= this.duration) {
	                if (!this.finished) {
	                    this.finished = true;
	                    this.onFinish(keys);
	                }
	                return;
	            }

	            this.elapsed = now - this.startTime;
	            if (this.elapsed > this.duration) {
	                this.elapsed = this.duration;
	            }

	            for (var key in this.to) {
	                keys[key] = this.from[key] + (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
	            }

	            if (!this.started) {
	                this.started = true;
	                this.onStart(keys);
	            }

	            this.onUpdate(keys);
	        }
	    }]);

	    return Tween;
	}();

	var Base = function (_EventBus) {
	    _inherits(Base, _EventBus);

	    function Base(settings) {
	        _classCallCheck(this, Base);

	        var _this = _possibleConstructorReturn(this, (Base.__proto__ || _Object$getPrototypeOf(Base)).call(this));

	        _Object$assign(_this, {
	            zIndex: 0,
	            moveX: 0,
	            moveY: 0,
	            rotate: 0,
	            fixed: false,
	            isDragging: false,
	            isAnimating: false,
	            enableDrag: false,
	            hasEnter: false,
	            hasDragIn: false,
	            enableChangeIndex: false
	        }, settings);
	        return _this;
	    }

	    _createClass(Base, [{
	        key: "config",
	        value: function config(setting) {
	            _Object$assign(this, setting);
	            return this;
	        }
	    }, {
	        key: "animateTo",
	        value: function animateTo(keys) {
	            var _this2 = this;

	            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            _Object$assign(config, {
	                from: {},
	                to: keys
	            });

	            for (var key in keys) {
	                config.from[key] = this[key];
	            }
	            var onStart = config.onStart || noop;
	            config.onStart = function () {
	                _this2.isAnimating = true;
	                onStart();
	            };
	            var onUpdate = config.onUpdate || noop;
	            config.onUpdate = function (props) {
	                _Object$assign(_this2, props);
	                onUpdate(props);
	            };
	            var onFinish = config.onFinish || noop;
	            config.onFinish = function () {
	                _this2.isAnimating = false;
	                onFinish();
	            };

	            var tween = new Tween(config);
	            this.sc.animate(tween);
	        }
	    }]);

	    return Base;
	}(EventBus);

	var Rectangular = function (_Base) {
	    _inherits(Rectangular, _Base);

	    function Rectangular(sc, setting) {
	        _classCallCheck(this, Rectangular);

	        var _this = _possibleConstructorReturn(this, (Rectangular.__proto__ || _Object$getPrototypeOf(Rectangular)).call(this, setting));

	        _this.sc = sc;
	        return _this;
	    }

	    _createClass(Rectangular, [{
	        key: "draw",
	        value: function draw() {
	            var _sc = this.sc,
	                canvas = _sc.canvas,
	                transX = _sc.transX,
	                transY = _sc.transY;
	            var fixed = this.fixed,
	                startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                fillStyle = this.fillStyle,
	                moveX = this.moveX,
	                moveY = this.moveY;


	            canvas.save();

	            // 逻辑问题
	            canvas.translate(startX + width / 2 + moveX, startY + height / 2 + moveY);
	            canvas.rotate(Math.PI / 180 * this.rotate);
	            canvas.translate(-(startX + width / 2 + moveX), -(startY + height / 2 + moveY));

	            canvas.translate(moveX, moveY);
	            if (fixed) {
	                canvas.translate(-transX, -transY);
	            }
	            canvas.fillStyle = fillStyle;
	            canvas.fillRect(startX, startY, width, height);
	            canvas.restore();
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            var startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                moveX = this.moveX,
	                moveY = this.moveY;

	            return {
	                startX: startX + moveX,
	                startY: startY + moveY,
	                width: width,
	                height: height
	            };
	        }
	    }, {
	        key: "isPointInner",
	        value: function isPointInner(x, y) {
	            var _getBounds = this.getBounds(),
	                startX = _getBounds.startX,
	                startY = _getBounds.startY,
	                width = _getBounds.width,
	                height = _getBounds.height;

	            return x > startX && x < startX + width && y > startY && y < startY + height;
	        }
	    }]);

	    return Rectangular;
	}(Base);

	Rectangular.type = 'rectangular';

	var Image$1 = function (_Base) {
	    _inherits(Image, _Base);

	    function Image(sc, setting) {
	        _classCallCheck(this, Image);

	        var _this = _possibleConstructorReturn(this, (Image.__proto__ || _Object$getPrototypeOf(Image)).call(this, setting));

	        _this.sc = sc;
	        return _this;
	    }

	    _createClass(Image, [{
	        key: "draw",
	        value: function draw() {
	            var _sc = this.sc,
	                canvas = _sc.canvas,
	                transX = _sc.transX,
	                transY = _sc.transY;
	            var fixed = this.fixed,
	                startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                moveX = this.moveX,
	                moveY = this.moveY,
	                image = this.image,
	                sliceX = this.sliceX,
	                sliceY = this.sliceY,
	                sliceWidth = this.sliceWidth,
	                sliceHeight = this.sliceHeight;

	            var src = this.sc.getImage(image);

	            canvas.save();
	            canvas.translate(moveX, moveY);
	            if (fixed) {
	                canvas.translate(-transX, -transY);
	            }
	            if (sliceWidth && sliceHeight) {
	                canvas.drawImage(src, sliceX, sliceY, sliceWidth, sliceHeight, startX, startY, width, height);
	            } else {
	                canvas.drawImage(src, startX, startY, width, height);
	            }
	            canvas.restore();
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            var startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                moveX = this.moveX,
	                moveY = this.moveY;

	            return {
	                startX: startX + moveX,
	                startY: startY + moveY,
	                width: width,
	                height: height
	            };
	        }
	    }, {
	        key: "isPointInner",
	        value: function isPointInner(x, y) {
	            var _getBounds = this.getBounds(),
	                startX = _getBounds.startX,
	                startY = _getBounds.startY,
	                width = _getBounds.width,
	                height = _getBounds.height;

	            return x > startX && x < startX + width && y > startY && y < startY + height;
	        }
	    }]);

	    return Image;
	}(Base);

	Image$1.type = 'image';

	var Line = function (_Base) {
	    _inherits(Line, _Base);

	    function Line(sc, setting) {
	        _classCallCheck(this, Line);

	        var _this = _possibleConstructorReturn(this, (Line.__proto__ || _Object$getPrototypeOf(Line)).call(this, setting));

	        _this.sc = sc;
	        return _this;
	    }

	    _createClass(Line, [{
	        key: "draw",
	        value: function draw() {
	            var _sc = this.sc,
	                canvas = _sc.canvas,
	                transX = _sc.transX,
	                transY = _sc.transY;
	            var fixed = this.fixed,
	                moveX = this.moveX,
	                moveY = this.moveY,
	                matrix = this.matrix,
	                lineWidth = this.lineWidth,
	                lineDash = this.lineDash,
	                strokeStyle = this.strokeStyle,
	                lineCap = this.lineCap,
	                lineJoin = this.lineJoin,
	                smooth = this.smooth;


	            canvas.save();
	            canvas.translate(moveX, moveY);
	            if (fixed) {
	                canvas.translate(-transX, -transY);
	            }
	            canvas.lineWidth = lineWidth;
	            canvas.strokeStyle = strokeStyle;
	            canvas.beginPath();
	            if (lineDash && Array.isArray(lineDash)) {
	                canvas.setLineDash(lineDash);
	            }
	            if (lineCap) {
	                canvas.lineCap = lineCap;
	            }
	            if (lineJoin) {
	                canvas.lineJoin = lineJoin;
	            }
	            if (smooth) {
	                matrix.forEach(function (point, i) {
	                    if (i === 0) {
	                        canvas.moveTo(point[0], point[1]);
	                    } else {
	                        var cMatrix = getCtrlPoint(matrix, i - 1);
	                        canvas.bezierCurveTo(cMatrix.pA.x, cMatrix.pA.y, cMatrix.pB.x, cMatrix.pB.y, point[0], point[1]);
	                    }
	                });
	            } else {
	                matrix.forEach(function (point, i) {
	                    if (i === 0) {
	                        canvas.moveTo(point[0], point[1]);
	                    } else {
	                        canvas.lineTo(point[0], point[1]);
	                    }
	                });
	            }
	            canvas.stroke();
	            canvas.closePath();
	            canvas.restore();
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            return {};
	        }
	    }, {
	        key: "isPointInner",
	        value: function isPointInner() {
	            return false;
	        }
	    }]);

	    return Line;
	}(Base);

	Line.type = 'line';

	var Text = function (_Base) {
	    _inherits(Text, _Base);

	    function Text(sc, setting) {
	        _classCallCheck(this, Text);

	        var _this = _possibleConstructorReturn(this, (Text.__proto__ || _Object$getPrototypeOf(Text)).call(this, setting));

	        _this.sc = sc;
	        return _this;
	    }

	    _createClass(Text, [{
	        key: "draw",
	        value: function draw() {
	            var _sc = this.sc,
	                canvas = _sc.canvas,
	                transX = _sc.transX,
	                transY = _sc.transY;
	            var fixed = this.fixed,
	                startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                moveX = this.moveX,
	                moveY = this.moveY,
	                text = this.text,
	                backgroundColor = this.backgroundColor,
	                font = this.font,
	                strokeStyle = this.strokeStyle,
	                fillStyle = this.fillStyle,
	                _paddingLeft = this.paddingLeft,
	                paddingLeft = _paddingLeft === undefined ? 0 : _paddingLeft,
	                _paddingTop = this.paddingTop,
	                paddingTop = _paddingTop === undefined ? 0 : _paddingTop,
	                center = this.center;


	            canvas.save();
	            canvas.translate(moveX, moveY);
	            if (fixed) {
	                canvas.translate(-transX, -transY);
	            }
	            if (backgroundColor) {
	                canvas.save();
	                canvas.fillStyle = backgroundColor;
	                canvas.fillRect(startX, startY, width, height);
	                canvas.restore();
	            }
	            canvas.font = font;
	            canvas.textBaseline = 'top';
	            var textWidth = canvas.measureText(text).width;
	            var ellipsisText = textEllipsis(canvas, text, width - paddingLeft * 2);
	            if (strokeStyle) {
	                canvas.strokeStyle = strokeStyle;
	                if (center) {
	                    canvas.strokeText(ellipsisText, startX + (width - textWidth - paddingLeft * 2) / 2, startY + paddingTop);
	                } else {
	                    canvas.strokeText(ellipsisText, startX + paddingLeft, startY + paddingTop);
	                }
	            } else {
	                canvas.fillStyle = fillStyle;
	                if (center) {
	                    canvas.fillText(ellipsisText, startX + (width - textWidth - paddingLeft * 2) / 2, startY + paddingTop);
	                } else {
	                    canvas.fillText(ellipsisText, startX + paddingLeft, startY + paddingTop);
	                }
	            }

	            canvas.restore();
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            var startX = this.startX,
	                startY = this.startY,
	                width = this.width,
	                height = this.height,
	                moveX = this.moveX,
	                moveY = this.moveY;

	            return {
	                startX: startX + moveX,
	                startY: startY + moveY,
	                width: width,
	                height: height
	            };
	        }
	    }, {
	        key: "isPointInner",
	        value: function isPointInner(x, y) {
	            var _getBounds = this.getBounds(),
	                startX = _getBounds.startX,
	                startY = _getBounds.startY,
	                width = _getBounds.width,
	                height = _getBounds.height;

	            return x > startX && x < startX + width && y > startY && y < startY + height;
	        }
	    }]);

	    return Text;
	}(Base);

	Text.type = 'text';

	// todo 全局触发事件

	var SC = function () {
	    function SC(id, setting) {
	        _classCallCheck(this, SC);

	        this.version = '1.0.0';
	        this.objects = [];
	        this.images = [];
	        this.tweens = [];
	        this.element = null;
	        this.canvas = null;
	        this.width = 0;
	        this.height = 0;
	        this.transX = 0;
	        this.transY = 0;
	        this.scale = 1;
	        this.requestId = null;
	        this.isDragging = false;
	        this.isAnimating = false;
	        this.enableScale = false;
	        this.enableGlobalTranslate = false;

	        this.config(setting);

	        this.element = document.getElementById(id);
	        this.canvas = this.element.getContext('2d');
	        this.element.width = this.width;
	        this.element.height = this.height;
	    }

	    _createClass(SC, [{
	        key: "config",
	        value: function config(setting) {
	            _Object$assign(this, setting);
	        }
	    }, {
	        key: "addChild",
	        value: function addChild(object) {
	            object = Array.isArray(object) ? object : [object];
	            this.objects = this.objects.concat(object);
	            this.objects.sort(function (a, b) {
	                return a.zIndex - b.zIndex;
	            });

	            this._objects = reverse(this.objects);
	        }
	    }, {
	        key: "draw",
	        value: function draw() {
	            var _this = this;

	            var imageManage = new ImageManage();
	            imageManage.addImage(this.images);
	            imageManage.ready().then(function () {
	                _this._draw();
	                _this._attachCanvasEvents();
	            });
	            this.imageManage = imageManage;
	        }
	    }, {
	        key: "_draw",
	        value: function _draw() {
	            this.objects.forEach(function (item) {
	                return item.draw();
	            });
	        }
	    }, {
	        key: "redraw",
	        value: function redraw() {
	            this.clear();
	            this.canvas.save();
	            this.canvas.translate(this.transX, this.transY);
	            this._draw();
	            this.canvas.restore();
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.canvas.clearRect(0, 0, this.width, this.height);
	        }
	    }, {
	        key: "getImage",
	        value: function getImage(name) {
	            return this.imageManage.getImage(name).image;
	        }
	    }, {
	        key: "_attachCanvasEvents",
	        value: function _attachCanvasEvents() {
	            var canvasManage = new CanvasManage(this);
	            this.canvasManage = canvasManage;
	        }
	    }, {
	        key: "getPoint",
	        value: function getPoint() {
	            return this.canvasManage.getPoint();
	        }

	        // object being dragged

	    }, {
	        key: "changeOrder",
	        value: function changeOrder(item) {
	            var index = this.objects.indexOf(item);
	            var target = this.objects[index];
	            this.objects.splice(index, 1);
	            this.objects.push(target);
	            this._objects = reverse(this.objects);
	            this.redraw();
	        }
	    }, {
	        key: "animate",
	        value: function animate(tween) {
	            this.tweens.push(tween);
	            this.tick();
	        }
	    }, {
	        key: "clearAnimate",
	        value: function clearAnimate() {
	            this.tweens.length = 0;
	        }
	    }, {
	        key: "stop",
	        value: function stop() {
	            if (this.requestId) {
	                this.isAnimating = false;
	                cancelAnimationFrame(this.requestId);
	            }
	        }
	    }, {
	        key: "tick",
	        value: function tick() {
	            var _this2 = this;

	            var requestFunc = function requestFunc() {
	                if (!_this2.tweens.length) {
	                    _this2.isAnimating = false;
	                    return;
	                }
	                _this2.tweens.forEach(function (tween, i) {
	                    if (tween.finished) {
	                        _this2.tweens.splice(i--, 1);
	                    } else if (tween.update) {
	                        tween.update();
	                    } else if (typeof tween === 'function') {
	                        tween();
	                    }
	                });
	                _this2.redraw();
	                _this2.requestId = requestAnimationFrame(requestFunc);
	            };
	            if (this.tweens.length) {
	                if (!this.isAnimating) {
	                    this.isAnimating = true;
	                    requestFunc();
	                }
	            }
	        }
	    }]);

	    return SC;
	}();

	register(SC, Rectangular.type, Rectangular);
	register(SC, Image$1.type, Image$1);
	register(SC, Line.type, Line);
	register(SC, Text.type, Text);

	window.SC = SC;

}());
