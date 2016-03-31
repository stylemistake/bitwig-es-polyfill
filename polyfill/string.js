'use strict';

(function () {

var global = (function () { return this; }).call(null);

var WHITESPACE = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000'
  + '\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A'
  + '\u202F\u205F\u3000\u2028\u2029\uFEFF';

var WHITESPACE_BEGIN_REGEX = new RegExp('^[' + WHITESPACE + '][' + WHITESPACE + ']*');
var WHITESPACE_END_REGEX = new RegExp('[' + WHITESPACE + '][' + WHITESPACE + ']*$');

var strSplit = String.prototype.split;
var strSlice = String.prototype.slice;
var strIndexOf = String.prototype.indexOf;
var arrayPush = Array.prototype.push;
var arraySlice = Array.prototype.slice;

function isRegex(object) {
  return Object.prototype.toString.call(object) === '[object RegExp]';
}

String.prototype.split = function (separator, limit) {
  var string = String(this);
  if (typeof separator === 'undefined' && limit === 0) {
    return [];
  }
  // If `separator` is not a regex, use native split
  if (!isRegex(separator)) {
    return strSplit.call(this, separator, limit);
  }
  var output = [];
  var flags = (separator.ignoreCase ? 'i' : '')
    + (separator.multiline ? 'm' : '')
    + (separator.unicode ? 'u' : '') // in ES6
    + (separator.sticky ? 'y' : ''); // Firefox 3+ and ES6
  var lastLastIndex = 0;
  var separator2, match, lastIndex, lastLength;
  var separatorCopy = new RegExp(separator.source, flags + 'g');
  /* Values for `limit`, per the spec:
   * If undefined: 4294967295 // maxSafe32BitInt
   * If 0, Infinity, or NaN: 0
   * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
   * If negative number: 4294967296 - Math.floor(Math.abs(limit))
   * If other: Type-convert, then use the above rules
   */
  var splitLimit = typeof limit === 'undefined' ? 4294967295 : limit;
  match = separatorCopy.exec(string);
  while (match) {
    // `separatorCopy.lastIndex` is not reliable cross-browser
    lastIndex = match.index + match[0].length;
    if (lastIndex > lastLastIndex) {
      arrayPush.call(output, strSlice.call(string, lastLastIndex, match.index));
      if (match.length > 1 && match.index < string.length) {
        arrayPush.apply(output, arraySlice.call(match, 1));
      }
      lastLength = match[0].length;
      lastLastIndex = lastIndex;
      if (output.length >= splitLimit) {
        break;
      }
    }
    if (separatorCopy.lastIndex === match.index) {
      separatorCopy.lastIndex++; // Avoid an infinite loop
    }
    match = separatorCopy.exec(string);
  }
  if (lastLastIndex === string.length) {
    if (lastLength || !separatorCopy.test('')) {
      arrayPush.call(output, '');
    }
  } else {
    arrayPush.call(output, strSlice.call(string, lastLastIndex));
  }
  return output.length > splitLimit ? arraySlice.call(output, 0, splitLimit) : output;
};

String.prototype.trim = function trim() {
  if (typeof this === 'undefined' || this === null) {
    throw new TypeError('Can not convert ' + this + ' to object');
  }
  return String(this)
    .replace(WHITESPACE_BEGIN_REGEX, '')
    .replace(WHITESPACE_END_REGEX, '');
};

// ES7 features

String.prototype.trimLeft = function trimLeft() {
  if (typeof this === 'undefined' || this === null) {
    throw new TypeError('Can not convert ' + this + ' to object');
  }
  return String(this).replace(WHITESPACE_BEGIN_REGEX, '');
};

String.prototype.trimRight = function trimRight() {
  if (typeof this === 'undefined' || this === null) {
    throw new TypeError('Can not convert ' + this + ' to object');
  }
  return String(this).replace(WHITESPACE_END_REGEX, '');
};

String.prototype.padLeft = function padLeft(length, filler) {
  var padding = Array(length - this.length + 1).join(filler || ' ');
  return padding + this;
};

String.prototype.padRight = function padRight(length, filler) {
  var padding = Array(length - this.length + 1).join(filler || ' ');
  return this + padding;
};

String.prototype.padStart = function padLeft(length, filler) {
  var padding = Array(length - this.length + 1).join(filler || ' ');
  return padding + this;
};

String.prototype.padEnd = function padRight(length, filler) {
  var padding = Array(length - this.length + 1).join(filler || ' ');
  return this + padding;
};

})();
