'use strict';

(function () {

var global = (function () { return this; }).call(null);

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

var toString = Object.prototype.toString;
var slice = Array.prototype.slice;

function isCallable(fn) {
  return typeof fn === 'function'
    || toString.call(fn) === '[object Function]';
};

function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), MAX_SAFE_INTEGER);
};

function toInteger(value) {
  var number = Number(value);
  if (isNaN(number)) {
    return 0;
  }
  if (number === 0 || !isFinite(number)) {
    return number;
  }
  return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
Array.from = function from(arrayLike/*, mapFn, thisArg*/) {
  var C = this;
  var items = Object(arrayLike);
  if (arrayLike == null) {
    throw new TypeError('Array.from requires an array-like object, got ' + arrayLike);
  }
  var mapFn = arguments.length > 1 ? arguments[1] : void 0;
  var T;
  if (typeof mapFn !== 'undefined') {
    if (!isCallable(mapFn)) {
      throw new TypeError('Array.from: second argument must be a function, got ' + mapFn);
    }
    if (arguments.length > 2) {
      T = arguments[2];
    }
  }
  var len = toLength(items.length);
  var A = isCallable(C) ? Object(new C(len)) : new Array(len);
  var k = 0;
  var kValue;
  while (k < len) {
    kValue = items[k];
    if (mapFn) {
      A[k] = typeof T === 'undefined'
        ? mapFn(kValue, k)
        : mapFn.call(T, kValue, k);
    } else {
      A[k] = kValue;
    }
    k += 1;
  }
  A.length = len;
  return A;
};

Array.isArray = function isArray(object) {
  return toString.call(object) === '[object Array]';
};

Array.of = function of() {
  return slice.call(arguments);
};

Array.prototype.fill = function fill(value) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  var object = Object(this);
  var len = object.length >>> 0;
  var start = arguments[1];
  var relativeStart = start >> 0;
  var k = relativeStart < 0
    ? Math.max(len + relativeStart, 0)
    : Math.min(relativeStart, len);
  var end = arguments[2];
  var relativeEnd = end === undefined
    ? len
    : end >> 0;
  var _final = relativeEnd < 0
    ? Math.max(len + relativeEnd, 0)
    : Math.min(relativeEnd, len);
  while (k < _final) {
    object[k] = value;
    k++;
  }
  return object;
};

Array.prototype.reduce = function reduce(callback) {
  if (this == null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  var t = Object(this), len = t.length >>> 0, k = 0, value;
  if (arguments.length == 2) {
    value = arguments[1];
  } else {
    while (k < len && !(k in t)) {
      k++;
    }
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    value = t[k++];
  }
  for (; k < len; k++) {
    if (k in t) {
      value = callback(value, t[k], k, t);
    }
  }
  return value;
};

Array.prototype.reduceRight = function reduceRight(callback) {
  if (null === this || 'undefined' === typeof this) {
    throw new TypeError('Array.prototype.reduce called on null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  var t = Object(this), len = t.length >>> 0, k = len - 1, value;
  if (arguments.length >= 2) {
    value = arguments[1];
  } else {
    while (k >= 0 && !(k in t)) {
      k--;
    }
    if (k < 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    value = t[k--];
  }
  for (; k >= 0; k--) {
    if (k in t) {
      value = callback(value, t[k], k, t);
    }
  }
  return value;
};

})();
