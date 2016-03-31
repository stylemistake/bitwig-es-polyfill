'use strict';

(function () {

var global = (function () { return this; }).call(null);

var HEX_REGEX = /^[\-+]?0[xX]/;

Number.EPSILON = 2.220446049250313e-16;
Number.MAX_SAFE_INTEGER = 9007199254740991;
Number.MIN_SAFE_INTEGER = -9007199254740991;

var originalParseInt = global.parseInt;
var originalParseFloat = global.parseFloat;

Number.isNaN = function isNaN(value) {
  return value !== value;
};

Number.isFinite = function isFinite(value) {
  return typeof value === 'number' && isFinite(value);
};

Number.isInteger = function isInteger(value) {
  return typeof value === 'number' && isFinite(value)
    && Math.floor(value) === value;
};

Number.isSafeInteger = function isSafeInteger(value) {
  return Number.isInteger(value)
    && value >= Number.MIN_SAFE_INTEGER
    && value <= Number.MAX_SAFE_INTEGER;
};

Number.parseInt = global.parseInt = function parseInt(string, radix) {
  string = String.prototype.trim.call(string);
  radix = radix || (HEX_REGEX.test(string) ? 16 : 10);
  return originalParseInt(string, radix);
};

Number.parseFloat = function parseFloat(string) {
  return originalParseFloat(string);
};

})();
