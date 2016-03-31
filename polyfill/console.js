'use strict';

(function () {

var global = (function () { return this; }).call(null);

var console = global.console = new ConsoleBase();

var TAB_CHARACTER = '  ';
var DEPTH_LIMIT = 5;
var FN_SIGNATURE_REGEX = /function .*\(.*\)/;
var FUNC_NAME_REGEX = /function (.{1,})\(/;
var OBJ_NAME_REGEX = /object (.*)\]/;

var toString = Object.prototype.toString;

function makeTabs(depth) {
  var indentation = '';
  for (var i = 0; i < depth; i++) {
    indentation += TAB_CHARACTER;
  }
  return indentation;
}

function getFunctionSignature(fn) {
  return FN_SIGNATURE_REGEX.exec(fn.toString());
}

function getObjectSignature(obj) {
  var result;
  if (obj.constructor && obj.constructor.toString) {
    result = FUNC_NAME_REGEX.exec(obj.constructor.toString());
  } else {
    result = OBJ_NAME_REGEX.exec(toString.call(obj));
  }
  result = (result && result.length > 1 && result[1] !== 'Object')
    ? result[1]
    : '{}';
  if (isJavaObject(obj)) {
    result += ' <' + obj + '>';
  }
  return result;
}

function isArray(object) {
  return toString.call(object) === '[object Array]';
}

function isJavaObject(object) {
  return toString.call(object).substring(0, 10) == 'com.bitwig';
}

function reprObject(item, depth, indentation, isDirect) {
  var result = getObjectSignature(item);
  var keys = [];
  for (var i in item) {
    if (!isDirect && !Object.prototype.hasOwnProperty.call(item, i)) {
      continue;
    }
    keys.push(i);
  }
  if (keys.length === 0) {
    return result;
  }
  if (depth > 0 && !isDirect && result === 'String') {
    return result;
  }
  result += ' ->';
  if (depth > DEPTH_LIMIT) {
    return result + ' ...';
  }
  keys.forEach(function (i) {
    result += '\n' + makeTabs(indentation + 1);
    try {
      result += i + ': ' + represent(item[i], depth + 1, indentation + 1, isDirect);
    } catch (err) {
      result += i + ': <?>';
    }
  });
  return result;
}

function reprFunction(item, depth, indentation, isDirect) {
  var result = getFunctionSignature(item);
  var keys = [];
  if (!isDirect && depth > 0) {
    return result;
  }
  for (var i in item) {
    if (!isDirect && !Object.prototype.hasOwnProperty.call(item, i)) {
      continue;
    }
    if (!isDirect && i === 'prototype') {
      continue;
    }
    if (item !== Function && Function.prototype[i]) {
      continue;
    }
    keys.push(i);
  }
  if (keys.length === 0) {
    return result;
  }
  result += ' {} ->';
  if (depth > DEPTH_LIMIT) {
    return result + ' ...';
  }
  keys.forEach(function (i) {
    result += '\n' + makeTabs(indentation + 1);
    result += i + ': ' + represent(item[i], depth + 1, indentation + 1, isDirect);
  });
  return result;
}

function reprArray(item, depth, indentation, isDirect) {
  if (item.length === 0) {
    return '[]';
  }
  if (depth > DEPTH_LIMIT) {
    return '[...]';
  }
  var result = '[] ->';
  item.forEach(function (value) {
    result += '\n' + makeTabs(indentation + 1);
    result += '- ' + represent(value, depth + 1, indentation + 1, isDirect);
  });
  return result;
}

function represent(item, depth, indentation, isDirect) {
  depth = depth || 0;
  indentation = indentation || 0;
  if (item === global && depth !== 0) {
    return 'Global';
  }
  if (isArray(item)) {
    return reprArray(item, depth, indentation, isDirect);
  }
  if (typeof item === 'object') {
    return reprObject(item, depth, indentation, isDirect);
  }
  if (typeof item === 'function') {
    return reprFunction(item, depth, indentation, isDirect);
  }
  return '' + item;
}

function representMany(items) {
  var hasNewLine = true;
  return items
    .map(function (item, i) {
      var string = represent(item);
      if (/\n/.exec(string)) {
        if (hasNewLine) {
          string += '\n';
        } else {
          string = '\n' + string + '\n';
          hasNewLine = true;
        }
      } else {
        hasNewLine = false;
        string += ' ';
      }
      return string;
    })
    .join('');
}

function ConsoleBase() {

}

ConsoleBase.prototype.log = function () {
  var args = [].slice.call(arguments);
  host.println(representMany(args));
};

ConsoleBase.prototype.error = function () {
  var args = [].slice.call(arguments);
  host.errorln(representMany(args));
};

ConsoleBase.prototype.dir = function (object) {
  host.println(represent(object, 0, 0, true));
};

ConsoleBase.prototype.trace =
ConsoleBase.prototype.warn = function () {
  ConsoleBase.prototype.log.apply(this, arguments);
};

ConsoleBase.prototype.group =
ConsoleBase.prototype.groupCollapsed =
ConsoleBase.prototype.groupEnd = function () {};

})();
