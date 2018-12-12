(function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

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

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

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

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

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

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
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

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$1) _has(O, key) && result.push(key);
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



	var IE_PROTO$2 = _sharedKey('IE_PROTO');
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
	    result[IE_PROTO$2] = O;
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

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
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
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$3($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
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

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
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

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
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
	var USE_NATIVE = typeof $Symbol == 'function';
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

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
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
	if (!USE_NATIVE) {
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

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
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

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
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
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
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

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

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

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
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

	_export(_export.S + _export.F * !_iterDetect(function (iter) { }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = createCommonjsModule(function (module) {
	module.exports = { "default": from_1, __esModule: true };
	});

	var _Array$from = unwrapExports(from_1$1);

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	var $Object$2 = _core.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$2.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
	});

	unwrapExports(getOwnPropertyDescriptor$1);

	var get = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _getPrototypeOf2 = _interopRequireDefault(getPrototypeOf$1);



	var _getOwnPropertyDescriptor2 = _interopRequireDefault(getOwnPropertyDescriptor$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};
	});

	var _get = unwrapExports(get);

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _from2 = _interopRequireDefault(from_1$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	/**
	 * user bubble, not support capture
	 */
	var EventDispatcher = function () {
	    function EventDispatcher() {
	        _classCallCheck(this, EventDispatcher);

	        this._listeners = null;
	    }

	    _createClass(EventDispatcher, [{
	        key: "on",
	        value: function on(type, listener) {
	            return this.addEventListener(type, listener, false);
	        }
	    }, {
	        key: "once",
	        value: function once(type, listener) {
	            this.addEventListener(type, listener, true);
	        }
	    }, {
	        key: "off",
	        value: function off(type, listener) {
	            this.removeEventListener(type, listener);
	        }
	    }, {
	        key: "addEventListener",
	        value: function addEventListener(type, listener, once) {
	            var _this = this;

	            this._listeners = this._listeners || {};
	            if (!this._listeners[type]) {
	                this._listeners[type] = [];
	            }
	            var _listeners = this._listeners[type];
	            var listenerObj = _listeners.find(function (listenerObj) {
	                return listenerObj.listener === listener;
	            });
	            if (!listenerObj) {
	                listenerObj = {
	                    listener: listener,
	                    once: once,
	                    type: type
	                };
	                _listeners.push(this._bindListener(listenerObj));
	            }
	            return function () {
	                _this._removeEventListenerByKey(listenerObj);
	            };
	        }
	    }, {
	        key: "_bindListener",
	        value: function _bindListener(listenerObj) {
	            var _this2 = this;

	            listenerObj.boundListener = function (event) {
	                for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                    params[_key - 1] = arguments[_key];
	                }

	                if (listenerObj.once) {
	                    _this2._removeEventListenerByKey(listenerObj);
	                }
	                return listenerObj.listener.apply(listenerObj, [event].concat(params));
	            };
	            return listenerObj;
	        }
	    }, {
	        key: "_removeEventListenerByKey",
	        value: function _removeEventListenerByKey(listenerObj) {
	            this.removeEventListener(listenerObj.type, listenerObj.listener);
	        }
	    }, {
	        key: "removeEventListener",
	        value: function removeEventListener(type, listener) {
	            if (!this._listeners) {
	                return;
	            }
	            if (!this._listeners[type]) {
	                return;
	            }
	            var _listeners = this._listeners[type];
	            var index = _listeners.findIndex(function (listenerObj) {
	                return listenerObj.listener === listener;
	            });
	            if (index !== -1) {
	                _listeners.splice(index, 1);
	            }
	        }
	    }, {
	        key: "dispatchEvent",
	        value: function dispatchEvent(event) {
	            var list = [this];
	            var instance = this;
	            while (instance.parent) {
	                list.push(instance.parent);
	                instance = instance.parent;
	            }
	            for (var i = 0; i < list.length && !event.propagationStopped; i++) {
	                list[i]._dispatchEvent(event);
	            }
	        }
	    }, {
	        key: "_dispatchEvent",
	        value: function _dispatchEvent(event) {
	            for (var _len2 = arguments.length, params = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                params[_key2 - 1] = arguments[_key2];
	            }

	            if (this._listeners) {
	                var _listeners = this._listeners[event.type];
	                if (_listeners) {
	                    _listeners.forEach(function (listenerObj) {
	                        return listenerObj.boundListener.apply(listenerObj, [event].concat(params));
	                    });
	                }
	            }
	        }
	    }]);

	    return EventDispatcher;
	}();

	/**
	 * uuid
	 */
	var UID = {
	    get: function get() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0;
	            var v = c === 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    }
	};

	var DEG_TO_RAD = Math.PI / 180;
	/**
	 * [ a c e ]
	 * [ b d f ]
	 * [ 0 0 1 ]
	 */
	var Matrix2D = {
	    initialize: function initialize(a, b, c, d, e, f) {
	        return [a, b, c, d, e, f];
	    },
	    new: function _new() {
	        return [1, 0, 0, 1, 0, 0];
	    },
	    set: function set(transform, a, b, c, d, e, f) {
	        transform[0] = a;
	        transform[1] = b;
	        transform[2] = c;
	        transform[3] = d;
	        transform[4] = e;
	        transform[5] = f;
	        return transform;
	    },
	    reset: function reset(transform) {
	        return Matrix2D.set(transform, 1, 0, 0, 1, 0, 0);
	    },
	    copy: function copy(transform) {
	        return [].concat(_toConsumableArray(transform));
	    },
	    setFromTransform: function setFromTransform(transform1, transform2) {
	        transform1[0] = transform2[0];
	        transform1[1] = transform2[1];
	        transform1[2] = transform2[2];
	        transform1[3] = transform2[3];
	        transform1[4] = transform2[4];
	        transform1[5] = transform2[5];
	        return transform1;
	    },


	    /**
	     * 获取坐标
	     * @param transform
	     * @param coordinate
	     * @returns {*[]}
	     */
	    transform2Point: function transform2Point(transform, coordinate) {
	        var x = transform[0] * coordinate[0] + transform[2] * coordinate[1] + transform[4];
	        var y = transform[1] * coordinate[0] + transform[3] * coordinate[1] + transform[5];
	        return [x, y];
	    },


	    /**
	     * 矩阵变换
	     * @param transform1
	     * @param transform2
	     * @returns {*}
	     */
	    multiply: function multiply(transform1, transform2) {
	        var a1 = transform1[0];
	        var b1 = transform1[1];
	        var c1 = transform1[2];
	        var d1 = transform1[3];
	        var e1 = transform1[4];
	        var f1 = transform1[5];
	        var a2 = transform2[0];
	        var b2 = transform2[1];
	        var c2 = transform2[2];
	        var d2 = transform2[3];
	        var e2 = transform2[4];
	        var f2 = transform2[5];

	        transform1[0] = a1 * a2 + c1 * b2;
	        transform1[1] = b1 * a2 + d1 * b2;
	        transform1[2] = a1 * c2 + c1 * d2;
	        transform1[3] = b1 * c2 + d1 * d2;
	        transform1[4] = a1 * e2 + c1 * f2 + e1;
	        transform1[5] = b1 * e2 + d1 * f2 + f1;

	        return transform1;
	    },
	    rotate: function rotate(transform, angle) {
	        var cos = Math.cos(angle * DEG_TO_RAD);
	        var sin = Math.sin(angle * DEG_TO_RAD);

	        return Matrix2D.multiply(transform, Matrix2D.initialize(cos, sin, -sin, cos, 0, 0));
	    },
	    scale: function scale(transform, x, y) {
	        return Matrix2D.multiply(transform, Matrix2D.initialize(x, 0, 0, y, 0, 0));
	    },


	    translate: function translate(transform, dx, dy) {
	        return Matrix2D.multiply(transform, Matrix2D.initialize(1, 0, 0, 1, dx, dy));
	    },

	    /**
	     * steps follow:
	     * 1. translate(x, y)
	     * 2. rotate() and scale()
	     * 3. translate(-originX, -originY)
	     * 4. render()
	     */
	    appendTransform: function appendTransform(transform, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
	        var cos = 1;
	        var sin = 0;
	        if (rotation % 360) {
	            cos = Math.cos(rotation * DEG_TO_RAD);
	            sin = Math.sin(rotation * DEG_TO_RAD);
	        }
	        if (skewX || skewY) {
	            skewX *= DEG_TO_RAD;
	            skewY *= DEG_TO_RAD;
	            Matrix2D.multiply(transform, Matrix2D.initialize(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y));
	            Matrix2D.multiply(transform, Matrix2D.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0));
	        } else {
	            Matrix2D.multiply(transform, Matrix2D.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y));
	        }
	        if (originX || originY) {
	            transform[4] -= originX * transform[0] + originY * transform[2];
	            transform[5] -= originX * transform[1] + originY * transform[3];
	        }
	        return transform;
	    },


	    invert: function invert(transform) {
	        var det = Matrix2D.determinant(transform);

	        var a = transform[0];
	        var b = transform[1];
	        var c = transform[2];
	        var d = transform[3];
	        var e = transform[4];
	        var f = transform[5];

	        transform[0] = d / det;
	        transform[1] = -b / det;
	        transform[2] = -c / det;
	        transform[3] = a / det;
	        transform[4] = (c * f - d * e) / det;
	        transform[5] = -(a * f - b * e) / det;

	        return transform;
	    },

	    /**
	     * 行列式
	     * @param mat
	     * @returns {number}
	     */
	    determinant: function determinant(mat) {
	        return mat[0] * mat[3] - mat[1] * mat[2];
	    }
	};

	/**
	 * 外围边框
	 */
	var Bound = function () {
	    function Bound() {
	        _classCallCheck(this, Bound);

	        this.x1 = undefined;
	        this.y1 = undefined;
	        this.x2 = undefined;
	        this.y2 = undefined;
	    }

	    _createClass(Bound, [{
	        key: "extend",
	        value: function extend(x1, y1) {
	            if (this.x1 === undefined) {
	                this.x1 = x1;
	                this.y1 = y1;
	                this.x2 = x1;
	                this.y2 = y1;
	                return;
	            }
	            if (this.x1 > x1) {
	                this.x1 = x1;
	            }
	            if (this.y1 > y1) {
	                this.y1 = y1;
	            }
	            if (this.x2 < x1) {
	                this.x2 = x1;
	            }
	            if (this.y2 < y1) {
	                this.y2 = y1;
	            }
	        }
	    }, {
	        key: "reset",
	        value: function reset() {
	            this.x1 = undefined;
	            this.y1 = undefined;
	            this.x2 = undefined;
	            this.y2 = undefined;
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            return {
	                x: this.x1,
	                y: this.y1,
	                width: this.x2 - this.x1,
	                height: this.y2 - this.y1
	            };
	        }
	    }, {
	        key: "setBounds",
	        value: function setBounds(x, y, width, height) {
	            var _getPoints = this.getPoints(x, y, width, height),
	                lt = _getPoints.lt,
	                rt = _getPoints.rt,
	                lb = _getPoints.lb,
	                rb = _getPoints.rb;

	            this.reset();
	            this.extend.apply(this, _toConsumableArray(lt));
	            this.extend.apply(this, _toConsumableArray(rt));
	            this.extend.apply(this, _toConsumableArray(lb));
	            this.extend.apply(this, _toConsumableArray(rb));
	        }
	    }, {
	        key: "getPoints",
	        value: function getPoints(x, y, width, height) {
	            if (arguments.length) {
	                var lt = [x, y];
	                var rt = [x + width, y];
	                var lb = [x, y + height];
	                var rb = [x + width, y + height];
	                return {
	                    lt: lt,
	                    rt: rt,
	                    lb: lb,
	                    rb: rb
	                };
	            }
	            return {
	                lt: [this.x1, this.y1],
	                rt: [this.x2, this.y1],
	                lb: [this.x1, this.y2],
	                rb: [this.x2, this.y2]
	            };
	        }
	    }, {
	        key: "centerX",
	        get: function get() {
	            return (this.x1 + this.x2) / 2;
	        }
	    }, {
	        key: "centerY",
	        get: function get() {
	            return (this.y1 + this.y2) / 2;
	        }
	    }, {
	        key: "width",
	        get: function get() {
	            return this.x2 - this.x1;
	        }
	    }, {
	        key: "height",
	        get: function get() {
	            return this.y2 - this.y1;
	        }
	    }]);

	    return Bound;
	}();

	/**
	 * todo: 缓存 bound，matrix 等，只在属性变化时更新
	 * DisplayObject is a abstract class.
	 * It defines the core properties and methods that are shared between all display objects.
	 */

	var DisplayObject = function (_EventDispatcher) {
	    _inherits(DisplayObject, _EventDispatcher);

	    function DisplayObject() {
	        _classCallCheck(this, DisplayObject);

	        var _this = _possibleConstructorReturn(this, (DisplayObject.__proto__ || _Object$getPrototypeOf(DisplayObject)).call(this));

	        _this.id = UID.get();

	        _this.x = 0;
	        _this.y = 0;
	        _this.rotation = 0;
	        _this.originX = 0;
	        _this.originY = 0;
	        _this.scaleX = 1;
	        _this.scaleY = 1;
	        _this.skewX = 0;
	        _this.skewY = 0;

	        _this.alpha = 1;
	        _this.visible = true;

	        _this.fixed = false;

	        _this.bound = null;

	        _this.clipGraphic = null;

	        _this.compositeOperation = null;
	        _this.shadow = null;

	        _this.matrix = Matrix2D.new();
	        return _this;
	    }

	    _createClass(DisplayObject, [{
	        key: "getAlpha",
	        value: function getAlpha() {
	            var current = this;
	            var alpha = this.alpha;
	            while (current.parent) {
	                alpha *= current.parent.alpha;
	                current = current.parent;
	            }
	            return alpha;
	        }
	    }, {
	        key: "getCompositeOperation",
	        value: function getCompositeOperation() {
	            var current = this;
	            while (current) {
	                if (current.compositeOperation) {
	                    return current.compositeOperation;
	                } else {
	                    current = current.parent;
	                }
	            }
	        }
	    }, {
	        key: "getShadow",
	        value: function getShadow() {
	            var current = this;
	            while (current) {
	                if (current.shadow) {
	                    return current.shadow;
	                } else {
	                    current = current.parent;
	                }
	            }
	        }
	    }, {
	        key: "clip",
	        value: function clip(graphic) {
	            this.clipGraphic = graphic;
	        }
	    }, {
	        key: "setTransform",
	        value: function setTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
	            this.x = x || 0;
	            this.y = y || 0;
	            this.scaleX = scaleX || 1;
	            this.scaleY = scaleY || 1;
	            this.rotation = rotation || 0;
	            this.skewX = skewX || 0;
	            this.skewY = skewY || 0;
	            this.originX = originX || 0;
	            this.originY = originY || 0;
	        }
	    }, {
	        key: "getMatrix",
	        value: function getMatrix() {
	            var x = this.x,
	                y = this.y,
	                scaleX = this.scaleX,
	                scaleY = this.scaleY,
	                rotation = this.rotation,
	                skewX = this.skewX,
	                skewY = this.skewY,
	                originX = this.originX,
	                originY = this.originY;

	            return Matrix2D.reset(this.matrix) && Matrix2D.appendTransform(this.matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY);
	        }

	        /**
	         * the combined transform all of its parent.
	         */

	    }, {
	        key: "getConcatenatedMatrix",
	        value: function getConcatenatedMatrix() {
	            var matrixList = [];
	            var current = this;
	            while (current) {
	                if (current.fixed) {
	                    matrixList.unshift(Matrix2D.new());
	                } else {
	                    matrixList.unshift(Matrix2D.copy(current.getMatrix()));
	                }
	                current = current.parent;
	            }
	            return matrixList.reduce(function (matrix, next) {
	                return Matrix2D.multiply(matrix, next);
	            }, Matrix2D.new());
	        }

	        /**
	         * calculate transformedBounds
	         */

	    }, {
	        key: "setBounds",
	        value: function setBounds(x, y, width, height) {
	            if (!this.bound) {
	                this.bound = new Bound();
	            }
	            this.bound.setBounds(x, y, width, height);
	        }
	    }, {
	        key: "getBounds",
	        value: function getBounds() {
	            return this.bound && this.bound.getBounds();
	        }

	        /**
	         * bounds applying transform.
	         */

	    }, {
	        key: "getTransformedBounds",
	        value: function getTransformedBounds() {
	            return this._transformBounds(this.bound);
	        }
	    }, {
	        key: "_transformBounds",
	        value: function _transformBounds(bound, matrix) {
	            var transformMatrix = Matrix2D.new();
	            matrix = matrix || this.getConcatenatedMatrix();

	            var _bound$getBounds = bound.getBounds(),
	                x = _bound$getBounds.x,
	                y = _bound$getBounds.y;

	            if (x || y) {
	                Matrix2D.translate(transformMatrix, -x, -y);
	            }
	            Matrix2D.multiply(transformMatrix, matrix);

	            var _bound$getPoints = bound.getPoints(),
	                lt = _bound$getPoints.lt,
	                rt = _bound$getPoints.rt,
	                lb = _bound$getPoints.lb,
	                rb = _bound$getPoints.rb;

	            lt = Matrix2D.transform2Point(transformMatrix, lt);
	            rt = Matrix2D.transform2Point(transformMatrix, rt);
	            lb = Matrix2D.transform2Point(transformMatrix, lb);
	            rb = Matrix2D.transform2Point(transformMatrix, rb);
	            var b = new Bound();
	            b.extend.apply(b, _toConsumableArray(lt));
	            b.extend.apply(b, _toConsumableArray(rt));
	            b.extend.apply(b, _toConsumableArray(lb));
	            b.extend.apply(b, _toConsumableArray(rb));
	            return b.getBounds();
	        }
	    }, {
	        key: "render",
	        value: function render(ctx, event) {
	            if (!this.isVisible) {
	                return;
	            }
	            ctx.save();
	            this.updateContext(ctx, event);
	            this.updateComplexProps(ctx);
	            this._render(ctx, event);
	            ctx.restore();
	        }
	    }, {
	        key: "_render",
	        value: function _render(ctx, event) {
	            var transformMatrix = Matrix2D.new();
	            if (event) {
	                Matrix2D.translate(transformMatrix, -event.stageX, -event.stageY);
	            }
	            var matrix = Matrix2D.multiply(transformMatrix, this.getConcatenatedMatrix());
	            ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]);
	            this.draw(ctx);
	        }
	    }, {
	        key: "draw",
	        value: function draw(ctx) {}

	        /**
	         * apply own transformation, alpha, clipping path, etc
	         */

	    }, {
	        key: "updateContext",
	        value: function updateContext(ctx, event) {
	            var transformMatrix = Matrix2D.new();
	            if (event) {
	                Matrix2D.translate(transformMatrix, -event.stageX, -event.stageY);
	            }
	            var clipGraphic = this.clipGraphic;
	            if (clipGraphic) {
	                var matrix = Matrix2D.multiply(transformMatrix, this.getConcatenatedMatrix());
	                var x = clipGraphic.x,
	                    y = clipGraphic.y,
	                    scaleX = clipGraphic.scaleX,
	                    scaleY = clipGraphic.scaleY,
	                    rotation = clipGraphic.rotation,
	                    skewX = clipGraphic.skewX,
	                    skewY = clipGraphic.skewY,
	                    originX = clipGraphic.originX,
	                    originY = clipGraphic.originY;

	                Matrix2D.appendTransform(matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY);

	                ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]);
	                ctx.beginPath();
	                clipGraphic.render();
	                ctx.clip();
	            }
	        }
	    }, {
	        key: "updateComplexProps",
	        value: function updateComplexProps(ctx) {
	            var alpha = this.getAlpha();
	            var shadow = this.getShadow();
	            var compositeOperation = this.getCompositeOperation();
	            if (compositeOperation) {
	                ctx.globalCompositeOperation = compositeOperation;
	            }
	            ctx.complexAlpha = alpha;
	            if (shadow) {
	                ctx.shadowColor = shadow.color;
	                ctx.shadowOffsetX = shadow.offsetX;
	                ctx.shadowOffsetY = shadow.offsetY;
	                ctx.shadowBlur = shadow.blur;
	            }
	        }
	    }, {
	        key: "clone",
	        value: function clone() {}
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.parent.remove(this);
	        }
	    }, {
	        key: "isVisible",
	        get: function get() {
	            if (!this.visible) {
	                return false;
	            }
	            if (this.alpha === 0) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: "scale",
	        get: function get() {
	            return this.scaleX;
	        },
	        set: function set(val) {
	            this.scaleX = this.scaleY = val;
	        }
	    }, {
	        key: "stage",
	        get: function get() {
	            var target = this;
	            while (target.parent) {
	                target = target.parent;
	            }
	            if (target.name === 'Stage') {
	                return target;
	            }
	        }
	    }]);

	    return DisplayObject;
	}(EventDispatcher);

	/**
	 * Group is a class that manages a nestable display list.
	 */

	var Group = function (_DisplayObject) {
	    _inherits(Group, _DisplayObject);

	    function Group() {
	        _classCallCheck(this, Group);

	        var _this = _possibleConstructorReturn(this, (Group.__proto__ || _Object$getPrototypeOf(Group)).call(this));

	        _this.children = [];
	        return _this;
	    }

	    _createClass(Group, [{
	        key: "addChild",
	        value: function addChild(child) {
	            var _this2 = this;

	            if (arguments.length > 1) {
	                _Array$from(arguments).forEach(function (child) {
	                    _this2.addChild(child);
	                });
	            }
	            var parent = child.parent;
	            if (parent) {
	                parent.removeChildAt(parent.children.indexOf(child));
	            }
	            this.children.push(child);
	            child.parent = this;
	        }
	    }, {
	        key: "addChildAt",
	        value: function addChildAt(child, index) {
	            var parent = child.parent;
	            if (parent) {
	                parent.removeChildAt(parent.children.indexOf(child));
	            }
	            this.children.splice(index, 0, child);
	        }
	    }, {
	        key: "removeChild",
	        value: function removeChild(child) {
	            var _this3 = this;

	            this.children.forEach(function (item, i) {
	                if (item.id === child.id) {
	                    _this3.children.splice(i--, 1);
	                }
	            });
	        }
	    }, {
	        key: "removeChildAt",
	        value: function removeChildAt(index) {
	            var child = this.children[index];
	            if (child) {
	                child.parent = null;
	                this.children.splice(index, 1);
	            }
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.children.forEach(function (child) {
	                child.parent = null;
	            });
	            this.children.length = 0;
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            this.clear();
	            _get(Group.prototype.__proto__ || _Object$getPrototypeOf(Group.prototype), "destroy", this).call(this);
	        }
	    }, {
	        key: "render",
	        value: function render(ctx) {
	            this.children.forEach(function (child) {
	                child.render(ctx);
	            });
	        }
	    }, {
	        key: "clone",
	        value: function clone() {}
	    }]);

	    return Group;
	}(DisplayObject);

	var addListener = function addListener(element, event, handler) {
	    element.addEventListener(event, handler, false);
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

	/**
	 * browser event
	 */

	var CLICK = 'click';

	var MOUSE_DOWN = 'mousedown';

	var MOUSE_MOVE = 'mousemove';

	var MOUSE_UP = 'mouseup';

	var MOUSE_OVER = 'mouseover';

	var DRAG = 'drag';

	var MOUSE_OUT = 'mouseout';

	/**
	 * QuadTree - 四叉树 - 优化碰撞检测
	 * The quadrant indexes are numbered as below:
	 *     |
	 *  1  |  0
	 * ----+----
	 *  2  |  3
	 *     |
	 */
	var QuadTree = function () {
	    function QuadTree(bounds, level, maxObj, maxLevel) {
	        _classCallCheck(this, QuadTree);

	        this.bounds = bounds;
	        this.level = level || 0;
	        this.maxObj = maxObj || 10;
	        this.maxLevel = maxLevel || 5;
	        this.objects = [];
	        this.nodes = [];
	    }

	    _createClass(QuadTree, [{
	        key: "clear",
	        value: function clear() {
	            this.nodes.forEach(function (node) {
	                return node.clear();
	            });
	            this.objects = [];
	            this.nodes = [];
	        }
	    }, {
	        key: "split",
	        value: function split() {
	            var level = this.level;
	            var subWidth = this.bounds.width / 2 | 0;
	            var subHeight = this.bounds.height / 2 | 0;

	            this.nodes[0] = new QuadTree({
	                x: this.bounds.x + subWidth,
	                y: this.bounds.y,
	                width: subWidth,
	                height: subHeight
	            }, level + 1);

	            this.nodes[1] = new QuadTree({
	                x: this.bounds.x,
	                y: this.bounds.y,
	                width: subWidth,
	                height: subHeight
	            }, level + 1);

	            this.nodes[2] = new QuadTree({
	                x: this.bounds.x,
	                y: this.bounds.y + subHeight,
	                width: subWidth,
	                height: subHeight
	            }, level + 1);

	            this.nodes[3] = new QuadTree({
	                x: this.bounds.x + subWidth,
	                y: this.bounds.y + subHeight,
	                width: subWidth,
	                height: subHeight
	            }, level + 1);
	        }
	    }, {
	        key: "getIndex",
	        value: function getIndex(obj) {
	            var index = -1;
	            var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
	            var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

	            var topQuadrant = obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint;
	            var bottomQuadrant = obj.y > horizontalMidpoint;

	            if (obj.x < verticalMidpoint && obj.x + obj.width < verticalMidpoint) {
	                if (topQuadrant) {
	                    index = 1;
	                } else if (bottomQuadrant) {
	                    index = 2;
	                }
	            } else if (obj.x > verticalMidpoint) {
	                if (topQuadrant) {
	                    index = 0;
	                } else if (bottomQuadrant) {
	                    index = 3;
	                }
	            }

	            return index;
	        }
	    }, {
	        key: "insert",
	        value: function insert(obj) {
	            var _this = this;

	            if (Array.isArray(obj)) {
	                obj.forEach(function (o) {
	                    return _this.insert(o);
	                });
	                return;
	            }

	            if (this.nodes.length) {
	                var index = this.getIndex(obj);
	                if (index !== -1) {
	                    this.nodes[index].insert(obj);
	                    return;
	                }
	            }

	            this.objects.push(obj);
	            if (this.objects.length > this.maxObj && this.level < this.maxLevel) {
	                if (!this.nodes.length) {
	                    this.split();
	                }

	                var i = 0;
	                while (i < this.objects.length) {
	                    var _index = this.getIndex(this.objects[i]);
	                    if (_index !== -1) {
	                        this.nodes[_index].insert(this.objects.splice(i, 1)[0]);
	                    } else {
	                        i++;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "findObjects",
	        value: function findObjects(result, obj) {
	            var index = this.getIndex(obj);
	            if (index !== -1 && this.nodes.length) {
	                this.nodes[index].findObjects(result, obj);
	            }
	            this.objects.forEach(function (object) {
	                return result.push(object);
	            });
	            return result;
	        }
	    }, {
	        key: "getAllObjects",
	        value: function getAllObjects(result) {
	            this.nodes.forEach(function (node) {
	                return node.getAllObjects(result);
	            });
	            this.objects.forEach(function (object) {
	                return result.push(object);
	            });
	            return result;
	        }
	    }]);

	    return QuadTree;
	}();

	var DEFAULT_SIZE = 2;

	var Hit = function () {
	    function Hit(stage) {
	        _classCallCheck(this, Hit);

	        var canvas = document.createElement('CANVAS');
	        canvas.width = DEFAULT_SIZE;
	        canvas.height = DEFAULT_SIZE;
	        canvas.style.display = 'none';
	        document.body.appendChild(canvas);
	        this.ctx = canvas.getContext('2d');
	        this.stage = stage;
	        this.quadTree = new QuadTree({
	            x: 0,
	            y: 0,
	            width: stage.width,
	            height: stage.height
	        });
	    }

	    _createClass(Hit, [{
	        key: "_hitPix",
	        value: function _hitPix(event) {
	            var quadTree = this.quadTree,
	                stage = this.stage,
	                ctx = this.ctx;

	            var target = {
	                x: event.stageX,
	                y: event.stageY,
	                width: DEFAULT_SIZE,
	                height: DEFAULT_SIZE
	            };

	            ctx.clearRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
	            quadTree.clear();
	            this._insertObjects(quadTree, stage.children);
	            var children = this._getObjectsInQuad(quadTree, target);
	            for (var i = children.length - 1; i >= 0; i--) {
	                var child = children[i];
	                child.render(ctx, event);
	                var alpha = ctx.getImageData(0, 0, 1, 1).data[3];
	                if (alpha > 0) {
	                    return child;
	                }
	            }
	        }
	    }, {
	        key: "_insertObjects",
	        value: function _insertObjects(quadTree, children) {
	            var _this = this;

	            children.forEach(function (child) {
	                if (child instanceof Group) {
	                    _this._insertObjects(child.children, quadTree);
	                } else {
	                    if (child.isVisible) {
	                        var bound = child.getTransformedBounds();
	                        bound.source = child;
	                        quadTree.insert(bound);
	                    }
	                }
	            });
	        }

	        /**
	         * 获取 event 所属 quad
	         */

	    }, {
	        key: "_getObjectsInQuad",
	        value: function _getObjectsInQuad(quadTree, target) {
	            var result = [];
	            quadTree.findObjects(result, target);
	            return result.map(function (item) {
	                return item.source;
	            });
	        }
	    }]);

	    return Hit;
	}();

	/**
	 * wrapper event
	 */
	var BrowserEvent = function () {
	    function BrowserEvent() {
	        _classCallCheck(this, BrowserEvent);

	        this.propagationStopped = false;
	        this.stageX = null;
	        this.stageY = null;
	        this.pureEvent = null;
	    }

	    _createClass(BrowserEvent, [{
	        key: "preventDefault",
	        value: function preventDefault() {
	            this.pureEvent.preventDefault();
	        }
	    }, {
	        key: "stopPropagation",
	        value: function stopPropagation() {
	            this.propagationStopped = true;
	        }
	    }]);

	    return BrowserEvent;
	}();

	/**
	 * todo 事件触发 - 事件监听
	 * Stage is a class
	 */

	var Stage = function (_Group) {
	    _inherits(Stage, _Group);

	    function Stage(canvas, width, height) {
	        _classCallCheck(this, Stage);

	        var _this = _possibleConstructorReturn(this, (Stage.__proto__ || _Object$getPrototypeOf(Stage)).call(this));

	        _this.name = 'Stage';
	        _this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
	        _this.ctx = _this.canvas.getContext('2d');
	        _this.canvas.width = width;
	        _this.canvas.height = height;
	        _this.width = width;
	        _this.height = height;
	        _this.hit = new Hit(_this);

	        _this._mouseDownX = null;
	        _this._mouseDownY = null;
	        _this._mouseUpX = null;
	        _this._mouseUpY = null;
	        _this._prevStageX = null;
	        _this._prevStageY = null;
	        _this._dragObject = null;
	        _this._overObject = null;

	        _this.createEventHandler();
	        return _this;
	    }

	    _createClass(Stage, [{
	        key: "createEventHandler",
	        value: function createEventHandler() {
	            var _this2 = this;

	            addListener(this.canvas, MOUSE_DOWN, function (event) {
	                return _this2._handleMouseDown(event);
	            });
	            addListener(this.canvas, MOUSE_MOVE, function (event) {
	                return _this2._handleMouseMove(event);
	            });
	            addListener(this.canvas, MOUSE_UP, function (event) {
	                return _this2._handleMouseUp(event);
	            });
	            addListener(this.canvas, MOUSE_OUT, function (event) {
	                return _this2._handleMouseUp(event);
	            });
	        }
	    }, {
	        key: "_handleMouseDown",
	        value: function _handleMouseDown(event) {
	            this._computeStageXY(event);
	            var target = this._getObjectUnderPoint(event);
	            if (target) {
	                this._dragObject = target;
	            }
	            this._mouseDownX = event.stageX;
	            this._mouseDownY = event.stageY;
	            this._prevStageX = event.stageX;
	            this._prevStageY = event.stageY;
	        }
	    }, {
	        key: "_handleMouseMove",
	        value: function _handleMouseMove(event) {
	            this._computeStageXY(event);
	            var target = this._getObjectUnderPoint(event);
	            var browserEvent = new BrowserEvent();
	            browserEvent.stageX = event.stageX;
	            browserEvent.stageY = event.stageY;
	            browserEvent.pureEvent = event;

	            // 拖拽
	            if (this._dragObject) {
	                browserEvent.type = DRAG;
	                browserEvent.dx = event.stageX - this._prevStageX;
	                browserEvent.dy = event.stageY - this._prevStageY;
	                this._prevStageX = event.stageX;
	                this._prevStageY = event.stageY;
	                this._dragObject.dispatchEvent(browserEvent);
	            }
	            // cursor 由外部指定
	            if (target) {
	                if (this._overObject === null) {
	                    // 移入新的 _overObject
	                    browserEvent.type = MOUSE_OVER;
	                    this._overObject = target;
	                    this._overObject.dispatchEvent(browserEvent);
	                    this._setCursor(this._overObject);
	                } else {
	                    if (target.id !== this._overObject.id) {
	                        // 移出旧的 _overObject
	                        browserEvent.type = MOUSE_OUT;
	                        this._overObject.dispatchEvent(browserEvent);
	                        // 移入新的 _overObject
	                        browserEvent.type = MOUSE_OVER;
	                        this._overObject = target;
	                        this._overObject.dispatchEvent(browserEvent);
	                        this._setCursor(this._overObject);
	                    } else {
	                        // 经过原先的 _overObject
	                        browserEvent.type = MOUSE_MOVE;
	                        this._overObject.dispatchEvent(browserEvent);
	                    }
	                }
	            } else if (this._overObject) {
	                // 移出原先的 _overObject
	                browserEvent.type = MOUSE_OUT;
	                this._overObject.dispatchEvent(browserEvent);
	                this._overObject = null;
	                this._setCursor({ cursor: 'default' });
	            }
	        }
	    }, {
	        key: "_handleMouseUp",
	        value: function _handleMouseUp(event) {
	            this._computeStageXY(event);
	            var target = this._getObjectUnderPoint(event);
	            this._mouseUpX = event.stageX;
	            this._mouseUpY = event.stageY;

	            var browserEvent = new BrowserEvent();
	            browserEvent.stageX = event.stageX;
	            browserEvent.stageY = event.stageY;
	            browserEvent.pureEvent = event;

	            if (target && Math.abs(this._mouseDownX - this._mouseUpX) < 30 && Math.abs(this._mouseDownY - this._mouseUpY) < 30) {
	                // 触发点击
	                browserEvent.type = CLICK;
	                target.dispatchEvent(browserEvent);
	            }

	            this._dragObject = null;
	            this._prevStageX = null;
	            this._prevStageY = null;
	        }
	    }, {
	        key: "_getObjectUnderPoint",
	        value: function _getObjectUnderPoint(event) {
	            return this.hit._hitPix(event);
	        }
	    }, {
	        key: "_computeStageXY",
	        value: function _computeStageXY(event) {
	            var point = getPointer(event);
	            event.stageX = point.x;
	            event.stageY = point.y;
	        }
	    }, {
	        key: "_setCursor",
	        value: function _setCursor(target) {
	            if (target.cursor) {
	                this.canvas.style.cursor = target.cursor;
	            } else if (target.parent) {
	                this._setCursor(target.parent);
	            }
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            this.ctx.clearRect(0, 0, this.width, this.height);
	            this.render(this.ctx);
	        }
	    }, {
	        key: "toDataURL",
	        value: function toDataURL(mimeType) {
	            return this.canvas.toDataURL(mimeType || 'image/png');
	        }
	    }]);

	    return Stage;
	}(Group);

	var ITERATOR$4 = _wks('iterator');

	var core_isIterable = _core.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$4] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || _iterators.hasOwnProperty(_classof(O));
	};

	var isIterable = core_isIterable;

	var isIterable$1 = createCommonjsModule(function (module) {
	module.exports = { "default": isIterable, __esModule: true };
	});

	unwrapExports(isIterable$1);

	var core_getIterator = _core.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return _anObject(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getIterator, __esModule: true };
	});

	unwrapExports(getIterator$1);

	var slicedToArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _isIterable3 = _interopRequireDefault(isIterable$1);



	var _getIterator3 = _interopRequireDefault(getIterator$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	/**
	 * canvas original methods
	 */
	var originalMethods = ['fillStyle', 'strokeStyle', 'lineWidth', 'lineCap', 'lineDashOffset', 'lineJoin', 'miterLimit', 'font', 'textAlign', 'textBaseline', 'fillText', 'clearRect', 'rect', 'setLineDash', 'strokeRect', 'fillRect', 'beginPath', 'arc', 'closePath', 'fill', 'stroke', 'moveTo', 'lineTo', 'bezierCurveTo', 'quadraticCurveTo', 'createRadialGradient', 'createLinearGradient', 'addColorStop', 'fillGradient', 'arcTo'];

	/**
	 * Graphic is a class that exposes an easy way to use canvas api.
	 */

	var Graphic = function (_DisplayObject) {
	    _inherits(Graphic, _DisplayObject);

	    function Graphic() {
	        _classCallCheck(this, Graphic);

	        var _this = _possibleConstructorReturn(this, (Graphic.__proto__ || _Object$getPrototypeOf(Graphic)).call(this));

	        _this.cmds = [];
	        _this.currentGradient = null;

	        originalMethods.forEach(function (method) {
	            _this[method] = function () {
	                for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
	                    params[_key] = arguments[_key];
	                }

	                _this.cmds.push([method, params]);
	            };
	        });
	        return _this;
	    }

	    _createClass(Graphic, [{
	        key: 'clear',
	        value: function clear() {
	            this.cmds.length = 0;
	            this.currentGradient = undefined;
	            return this;
	        }

	        /**
	         * draw path base on curvature
	         */

	    }, {
	        key: 'drawCurvePath',
	        value: function drawCurvePath(x, y, x1, y1, curvature) {
	            var px = (x + x1) / 2 - (y - y1) * curvature;
	            var py = (y + y1) / 2 - (x1 - x) * curvature;
	            this.cmds.push(['quadraticCurveTo', [px, py, x1, y1]]);
	            return this;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(ctx) {
	            var _this2 = this;

	            ctx.beginPath();
	            this.cmds.forEach(function (cmd) {
	                var _cmd = _slicedToArray(cmd, 2),
	                    methodName = _cmd[0],
	                    params = _cmd[1];

	                if (methodName === 'addColorStop') {
	                    if (_this2.currentGradient) {
	                        _this2.currentGradient.addColorStop(params[0], params[1]);
	                    }
	                } else if (methodName === 'fillGradient') {
	                    ctx.fillStyle = _this2.currentGradient;
	                } else if (typeof ctx[methodName] !== 'function') {
	                    ctx[methodName] = params[0];
	                } else {
	                    var result = ctx[methodName].apply(ctx, params);
	                    if (methodName === 'createRadialGradient') {
	                        _this2.currentGradient = result;
	                    }
	                }
	            });
	            ctx.closePath();
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {}
	    }]);

	    return Graphic;
	}(DisplayObject);

	var Rect = function (_Graphic) {
	    _inherits(Rect, _Graphic);

	    function Rect(width, height, option) {
	        _classCallCheck(this, Rect);

	        var _this = _possibleConstructorReturn(this, (Rect.__proto__ || _Object$getPrototypeOf(Rect)).call(this));

	        _this.width = width;
	        _this.height = height;
	        _this.option = option || {};

	        _this._buildCmd();
	        _this.setBounds(0, 0, width, height);
	        return _this;
	    }

	    _createClass(Rect, [{
	        key: "_buildCmd",
	        value: function _buildCmd() {
	            var _option = this.option,
	                fillStyle = _option.fillStyle,
	                strokeStyle = _option.strokeStyle,
	                lineWidth = _option.lineWidth;

	            if (fillStyle) {
	                this.fillStyle(fillStyle);
	                this.fillRect(0, 0, this.width, this.height);
	            }

	            if (strokeStyle) {
	                this.strokeStyle(strokeStyle);
	                if (lineWidth) {
	                    this.lineWidth(lineWidth);
	                }
	                this.strokeRect(0, 0, this.width, this.height);
	            }
	        }
	    }]);

	    return Rect;
	}(Graphic);

	var Circle = function (_Graphic) {
	    _inherits(Circle, _Graphic);

	    function Circle(radius, options) {
	        _classCallCheck(this, Circle);

	        var _this = _possibleConstructorReturn(this, (Circle.__proto__ || _Object$getPrototypeOf(Circle)).call(this));

	        _this.radius = radius;
	        _this.options = options || {};

	        _this._buildCmd();
	        _this.setBounds(-_this.radius, -_this.radius, _this.radius * 2, _this.radius * 2);
	        return _this;
	    }

	    _createClass(Circle, [{
	        key: "_buildCmd",
	        value: function _buildCmd() {
	            var _options = this.options,
	                fillStyle = _options.fillStyle,
	                strokeStyle = _options.strokeStyle,
	                lineWidth = _options.lineWidth;

	            this.arc(0, 0, this.radius, 0, Math.PI * 2, false);
	            if (fillStyle) {
	                this.fillStyle(fillStyle);
	                this.fill();
	            }
	            if (strokeStyle) {
	                if (lineWidth) {
	                    this.lineWidth(lineWidth);
	                }
	                this.strokeStyle(strokeStyle);
	                this.stroke();
	            }
	        }
	    }]);

	    return Circle;
	}(Graphic);

	var Bitmap = function (_DisplayObject) {
	    _inherits(Bitmap, _DisplayObject);

	    function Bitmap(src, done) {
	        _classCallCheck(this, Bitmap);

	        var _this = _possibleConstructorReturn(this, (Bitmap.__proto__ || _Object$getPrototypeOf(Bitmap)).call(this));

	        if (typeof src === 'string') {
	            if (Bitmap.cache[src]) {
	                _this.image = Bitmap.cache[src];
	                _this.setBounds(0, 0, _this.image.width, _this.image.height);
	                done && done(_this);
	            } else {
	                var image = new Image();
	                image.onload = function () {
	                    _this.image = image;
	                    if (!_this.getBounds()) {
	                        _this.setBounds(0, 0, _this.image.width, _this.image.height);
	                    }
	                    Bitmap.cache[src] = _this.image;
	                    done && done(_this);
	                };
	                image.src = src;
	            }
	        } else {
	            _this.image = src;
	            _this.setBounds(0, 0, _this.image.width, _this.image.height);
	            Bitmap.cache[_this.image.src] = _this.image;
	            done && done(_this);
	        }
	        return _this;
	    }

	    _createClass(Bitmap, [{
	        key: "draw",
	        value: function draw(ctx) {
	            if (this.image) {
	                var _getBounds = this.getBounds(),
	                    x = _getBounds.x,
	                    y = _getBounds.y,
	                    width = _getBounds.width,
	                    height = _getBounds.height;

	                ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
	            }
	        }
	    }]);

	    return Bitmap;
	}(DisplayObject);

	Bitmap.cache = {};

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

	var _extends = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _assign2 = _interopRequireDefault(assign$1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};
	});

	var _extends$1 = unwrapExports(_extends);

	var Text = function (_Graphic) {
	    _inherits(Text, _Graphic);

	    function Text(text, options) {
	        _classCallCheck(this, Text);

	        var _this = _possibleConstructorReturn(this, (Text.__proto__ || _Object$getPrototypeOf(Text)).call(this));

	        _this.text = text;
	        _this.options = options || {};
	        _this.options = _extends$1({
	            font: '12px sans-serif',
	            color: 'black',
	            textAlign: 'left',
	            textBaseline: 'top',
	            maxWidth: Number.MAX_VALUE
	        }, _this.options);
	        _this._ctx = document.createElement('CANVAS').getContext('2d');

	        _this._buildCmd();
	        return _this;
	    }

	    _createClass(Text, [{
	        key: '_buildCmd',
	        value: function _buildCmd() {
	            var _options = this.options,
	                font = _options.font,
	                color = _options.color,
	                textAlign = _options.textAlign,
	                textBaseline = _options.textBaseline,
	                maxWidth = _options.maxWidth;

	            var _getEllipsisTextInfo2 = this._getEllipsisTextInfo(this.text, maxWidth),
	                text = _getEllipsisTextInfo2.text,
	                textWidth = _getEllipsisTextInfo2.textWidth;

	            this.font(font);
	            this.textAlign(textAlign);
	            this.textBaseline(textBaseline);
	            this.fillStyle(color);
	            this.fillText(text, 0, 0);

	            this.setBounds.apply(this, _toConsumableArray(this._getBounds(text, textWidth)));
	        }
	    }, {
	        key: '_getBounds',
	        value: function _getBounds(text, textWidth) {
	            var _options2 = this.options,
	                textAlign = _options2.textAlign,
	                textBaseline = _options2.textBaseline;

	            var offsetX = { start: 0, left: 0, center: -0.5, end: -1, right: -1 };
	            var offsetY = { top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1 };
	            var width = textWidth;
	            var height = this._getLineHeight();
	            var x = offsetX[textAlign] * width;
	            var y = offsetY[textBaseline] * height;
	            return [x, y, width, height];
	        }
	    }, {
	        key: '_prepContext',
	        value: function _prepContext(ctx) {
	            var _options3 = this.options,
	                font = _options3.font,
	                textAlign = _options3.textAlign,
	                textBaseline = _options3.textBaseline;

	            ctx.font = font;
	            ctx.textAlign = textAlign;
	            ctx.textBaseline = textBaseline;
	        }
	    }, {
	        key: '_measureTextWidth',
	        value: function _measureTextWidth(text) {
	            var ctx = this.stage && this.stage.ctx || this._ctx;
	            ctx.save();
	            this._prepContext(ctx);
	            var width = ctx.measureText(text).width;
	            ctx.restore();
	            return width;
	        }
	    }, {
	        key: '_getLineHeight',
	        value: function _getLineHeight() {
	            return this._measureTextWidth('M') * 1.2;
	        }
	    }, {
	        key: '_getEllipsisTextInfo',
	        value: function _getEllipsisTextInfo(text, maxWidth) {
	            var textWidth = this._measureTextWidth(text);
	            var ellipsis = '...';
	            var ellipsisWidth = this._measureTextWidth(ellipsis);
	            if (textWidth <= maxWidth || textWidth <= ellipsisWidth) {
	                return { text: text, textWidth: textWidth };
	            }
	            var length = text.length;
	            while (textWidth >= maxWidth - ellipsisWidth && length-- > 0) {
	                text = text.substring(0, length);
	                textWidth = this._measureTextWidth(text);
	            }
	            return { text: text + ellipsis, textWidth: textWidth + ellipsisWidth };
	        }
	    }]);

	    return Text;
	}(Graphic);

	/**
	 * Ticker for animation.
	 */

	var prefixes = 'webkit moz ms o'.split(' ');
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;

	prefixes.some(function (prefix) {
	    if (requestAnimationFrame && cancelAnimationFrame) {
	        return true;
	    }
	    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
	    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
	});

	window.requestAnimationFrame = requestAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;

	var ticking = false;
	var queue = [];

	var untick = function untick(uid) {
	    var index = queue.findIndex(function (item) {
	        return item.uid === uid;
	    });
	    queue.splice(index, 1);
	    if (!queue.length) {
	        ticking = false;
	    }
	};

	var tick = function tick(callback, interval) {
	    var uid = UID.get();
	    queue.push({
	        uid: uid,
	        callback: callback,
	        interval: interval,
	        lastTime: new Date().getTime()
	    });

	    if (!ticking) {
	        var requestFunc = function requestFunc() {
	            queue.forEach(function (item) {
	                if (!item.interval) {
	                    item.callback();
	                } else if (new Date().getTime() - item.lastTime >= item.interval) {
	                    item.callback();
	                    item.lastTime = new Date().getTime();
	                }
	            });
	            if (ticking) {
	                requestAnimationFrame(requestFunc);
	            }
	        };
	        ticking = true;
	        requestFunc();
	    }
	    return function () {
	        untick(uid);
	    };
	};

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

	var noop = function noop() {};

	var Tween = function () {
	    function Tween(cmdConfigurations) {
	        _classCallCheck(this, Tween);

	        this.current = 0;
	        this.cmdConfigurations = cmdConfigurations;
	        this.cmdConfiguration = this.getCmdConfiguration();
	    }

	    _createClass(Tween, [{
	        key: 'getCmdConfiguration',
	        value: function getCmdConfiguration() {
	            var cmdConfigurations = this.cmdConfigurations;
	            var cmdConfiguration = cmdConfigurations[this.current];
	            var from = cmdConfiguration.from,
	                to = cmdConfiguration.to,
	                _cmdConfiguration$dur = cmdConfiguration.duration,
	                duration = _cmdConfiguration$dur === undefined ? 500 : _cmdConfiguration$dur,
	                _cmdConfiguration$del = cmdConfiguration.delay,
	                delay = _cmdConfiguration$del === undefined ? 0 : _cmdConfiguration$del,
	                _cmdConfiguration$eas = cmdConfiguration.easing,
	                easing = _cmdConfiguration$eas === undefined ? 'linear' : _cmdConfiguration$eas,
	                _cmdConfiguration$sta = cmdConfiguration.start,
	                start = _cmdConfiguration$sta === undefined ? noop : _cmdConfiguration$sta,
	                _cmdConfiguration$upd = cmdConfiguration.update,
	                update = _cmdConfiguration$upd === undefined ? noop : _cmdConfiguration$upd,
	                _cmdConfiguration$fin = cmdConfiguration.finish,
	                finish = _cmdConfiguration$fin === undefined ? noop : _cmdConfiguration$fin;


	            if (this.current) {
	                var prevCmdConfiguration = cmdConfigurations[this.current - 1];
	                // 使用上一段属性
	                for (var key in from) {
	                    from[key] = prevCmdConfiguration.properties[key] || from[key];
	                }
	            }

	            for (var _key in from) {
	                if (to[_key] === undefined) {
	                    to[_key] = from[_key];
	                }
	            }
	            for (var _key2 in to) {
	                if (from[_key2] === undefined) {
	                    from[_key2] = to[_key2];
	                }
	            }

	            _Object$assign(cmdConfiguration, {
	                from: from,
	                to: to,
	                duration: duration,
	                delay: delay,
	                easing: easing,
	                start: start,
	                update: update,
	                finish: finish,
	                startTime: new Date().getTime() + delay,
	                elapsed: 0,
	                started: false,
	                finished: false,
	                properties: {}
	            });
	            return cmdConfiguration;
	        }
	    }, {
	        key: 'compute',
	        value: function compute() {
	            if (this.hasFinished) {
	                return;
	            }
	            if (!this.cmdConfiguration) {
	                this.cmdConfiguration = this.getCmdConfiguration();
	            }
	            var cmdConfiguration = this.cmdConfiguration;

	            var timeStamp = new Date().getTime();
	            if (timeStamp < cmdConfiguration.startTime) {
	                return;
	            }
	            if (cmdConfiguration.elapsed >= cmdConfiguration.duration) {
	                if (!cmdConfiguration.finished) {
	                    cmdConfiguration.finished = true;
	                    cmdConfiguration.finish(cmdConfiguration.properties);
	                    // 执行下一段
	                    this.current += 1;
	                    this.cmdConfiguration = undefined;
	                }
	                return;
	            }

	            cmdConfiguration.elapsed = timeStamp - cmdConfiguration.startTime;
	            if (cmdConfiguration.elapsed > cmdConfiguration.duration) {
	                cmdConfiguration.elapsed = cmdConfiguration.duration;
	            }

	            for (var key in cmdConfiguration.to) {
	                var easingFunc = easing[cmdConfiguration.easing];
	                var ratio = cmdConfiguration.elapsed / cmdConfiguration.duration;
	                var diff = cmdConfiguration.to[key] - cmdConfiguration.from[key];
	                cmdConfiguration.properties[key] = cmdConfiguration.from[key] + diff * easingFunc(ratio);
	            }

	            if (!cmdConfiguration.started) {
	                cmdConfiguration.started = true;
	                cmdConfiguration.start(cmdConfiguration.properties);
	            }

	            cmdConfiguration.update(cmdConfiguration.properties);
	        }
	    }, {
	        key: 'hasFinished',
	        get: function get() {
	            return this.current > this.cmdConfigurations.length - 1;
	        }
	    }]);

	    return Tween;
	}();

	var queue$1 = [];

	var add = function add(target) {
	    return new To(target);
	};

	var removeFinished = function removeFinished() {
	    queue$1.forEach(function (tween, i) {
	        if (tween.hasFinished) {
	            queue$1.splice(i--, 1);
	        }
	    });
	};

	var update = function update() {
	    if (queue$1.length) {
	        removeFinished();
	        queue$1.forEach(function (tween) {
	            tween.compute();
	        });
	    }
	};

	var animatingProperties = ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotation', 'skewX', 'skewY', 'originX', 'originY', 'alpha'];

	var optionProperties = ['easing', 'duration', 'delay', 'start'];

	var To = function () {
	    function To(target) {
	        var _this = this;

	        _classCallCheck(this, To);

	        this.target = target;
	        this.current = 0;
	        this.cmdConfigurations = [{ from: {}, to: {}, options: {} }];

	        animatingProperties.forEach(function (animatingProperty) {
	            _this[animatingProperty] = function (value) {
	                _this.from[animatingProperty] = _this.target[animatingProperty];
	                _this.to[animatingProperty] = value;
	                return _this;
	            };
	        });
	        optionProperties.forEach(function (optionProperty) {
	            _this[optionProperty] = function (value) {
	                _this.options[optionProperty] = value;
	                return _this;
	            };
	        });
	    }

	    _createClass(To, [{
	        key: 'update',
	        value: function update(callback) {
	            var _this2 = this;

	            this.options.update = function (properties) {
	                for (var key in properties) {
	                    _this2.target[key] = properties[key];
	                }
	                callback(properties);
	            };
	            return this;
	        }
	    }, {
	        key: 'finish',
	        value: function finish(callback) {
	            this.options.finish = function (properties) {
	                callback(properties);
	            };
	            this.current += 1;
	            this.cmdConfigurations.push({ from: {}, to: {}, options: {} });
	            return this;
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            var _this3 = this;

	            queue$1.push(new Tween(this.cmdConfigurations.map(function (cmdConfiguration) {
	                return _extends$1({
	                    update: function update(properties) {
	                        for (var key in properties) {
	                            _this3.target[key] = properties[key];
	                        }
	                    }
	                }, cmdConfiguration.options, {
	                    from: cmdConfiguration.from,
	                    to: cmdConfiguration.to
	                });
	            })));
	        }
	    }, {
	        key: 'from',
	        get: function get() {
	            return this.cmdConfigurations[this.current].from;
	        }
	    }, {
	        key: 'to',
	        get: function get() {
	            return this.cmdConfigurations[this.current].to;
	        }
	    }, {
	        key: 'options',
	        get: function get() {
	            return this.cmdConfigurations[this.current].options;
	        }
	    }]);

	    return To;
	}();

	var anim = /*#__PURE__*/Object.freeze({
		add: add,
		removeFinished: removeFinished,
		update: update
	});

	window.sc = {};
	sc.Stage = Stage;
	sc.Group = Group;
	sc.Graphic = Graphic;
	sc.Rect = Rect;
	sc.Circle = Circle;
	sc.Bitmap = Bitmap;
	sc.Text = Text;
	sc.tick = tick;
	sc.anim = anim;

}());
