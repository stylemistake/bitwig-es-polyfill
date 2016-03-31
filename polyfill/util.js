'use strict';

(function () {

var global = (function () { return this; }).call(null);

var toString = Object.prototype.toString;

var util = global.util = {
  isUndefined: isUndefined,
  isDefined: isDefined,
  isObject: isObject,
  isString: isString,
  isNumber: isNumber,
  isArray: isArray,
  isFunction: isFunction,
  isRegExp: isRegExp,
  isBoolean: isBoolean,
  isDate: isDate,
  noop: noop,
  identity: identity,
  forEach: forEach,
};

// Type checking functions
function isUndefined(value) {
  return typeof value === 'undefined';
}

function isDefined(value) {
  return typeof value !== 'undefined';
}

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isArray(value) {
  return toString.call(value) === '[object Array]'
    || toString.call(value) === '[object JavaArray]';
}

function isFunction(value) {
  return typeof value === 'function';
}

function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isDate(value) {
  return toString.call(value) === '[object Date]';
}

// A function that performs nothing.
function noop() {}

// A function that returns its first argument.
function identity(arg) {
  return arg;
}

function forEach(collection, fn) {
  // Normal array
  if (isFunction(collection) && isArray(collection)) {
    collection.forEach(fn);
    return;
  }
  var i, length = collection.length;
  // Object
  for (i in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, i)) {
      fn.call(null, collection[i], i, collection);
    }
  }
}

})();
