'use strict';

(function () {

var global = (function () { return this; }).call(null);

var toString = Object.prototype.toString;

Array.isArray = function isArray(object) {
  return toString.call(object) === '[object Array]';
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
