'use strict';

(function () {

var global = (function () { return this; }).call(null);

var hasOwnProperty = Object.prototype.hasOwnProperty;
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
var lookupGetter = Object.prototype.__lookupGetter__;
var lookupSetter = Object.prototype.__lookupSetter__;
var toString = Object.prototype.toString;

Object.getPrototypeOf = function getPrototypeOf(object) {
  var proto = object.__proto__;
  if (proto || proto === null) {
    return proto;
  } else if (toString.call(object.constructor) === '[object Function]') {
    return object.constructor.prototype;
  } else if (object instanceof Object) {
    return Object.prototype;
  } else {
    return null;
  }
};

Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
  if ((typeof object !== 'object' && typeof object !== 'function') || object === null) {
    throw new TypeError('Object.getOwnPropertyDescriptor called on a non-object: ' + object);
  }
  var descriptor;
  // If object does not owns property return undefined immediately.
  if (!hasOwnProperty.call(object, property)) {
    return descriptor;
  }
  // If object has a property then it's for sure `configurable`, and
  // probably `enumerable`. Detect enumerability though.
  descriptor = {
    enumerable: propertyIsEnumerable.call(object, property),
    configurable: true,
  };
  var getter = lookupGetter.call(object, property);
  var setter = lookupSetter.call(object, property);
  if (getter || setter) {
    if (getter) {
      descriptor.get = getter;
    }
    if (setter) {
      descriptor.set = setter;
    }
    // Return here to avoid adding `value` to the descriptor.
    return descriptor;
  }

  // If we got this far we know that object has an own property.
  descriptor.value = object[property];
  descriptor.writable = true;
  return descriptor;
};

Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
  return Object.keys(object);
};

Object.keys = function keys(object) {
  if (typeof object !== 'object' && (typeof object !== 'function' || object === null)) {
    throw new TypeError('Object.keys called on non object');
  }
  var result = [], prop, i;
  for (prop in object) {
    if (hasOwnProperty.call(object, prop)) {
      result.push(prop);
    }
  }
  return result;
};

Object.defineProperties = function defineProperties(object, properties) {
  if (object !== Object(object)) {
    throw TypeError('Object.defineProperties called on non-object');
  }
  for (var prop in properties) {
    if (prop === '__proto__') {
      continue;
    }
    if (hasOwnProperty.call(properties, prop)) {
      Object.defineProperty(object, prop, properties[prop]);
    }
  }
  return object;
};

Object.defineProperty = function defineProperty(object, prop, data) {
  if (object !== Object(object)) {
    throw TypeError('Object.defineProperty called on non-object');
  }
  if ('get' in data) {
    Object.prototype.__defineGetter__.call(object, prop, data.get);
  }
  if ('set' in data) {
    Object.prototype.__defineSetter__.call(object, prop, data.set);
  }
  if ('value' in data) {
    object[prop] = data.value;
  }
  return object;
};

Object.create = function create(prototype, properties) {
  var object;
  var Type = function Type() {}; // An empty constructor.
  if (prototype === null) {
    object = { __proto__: null };
  } else {
    if (typeof prototype !== 'object' && typeof prototype !== 'function') {
      throw new TypeError('Object prototype may only be an Object or null'); // same msg as Chrome
    }
    Type.prototype = prototype;
    object = new Type();
  }
  if (properties !== void 0) {
    Object.defineProperties(object, properties);
  }
  return object;
};

Object.seal = function seal(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.seal can only be called on Objects.');
  }
  return object;
};

Object.freeze = function freeze(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.freeze can only be called on Objects.');
  }
  return object;
};

Object.preventExtensions = function preventExtensions(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.preventExtensions can only be called on Objects.');
  }
  return object;
};

Object.isSealed = function isSealed(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.isSealed can only be called on Objects.');
  }
  return false;
};

Object.isFrozen = function isFrozen(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.isFrozen can only be called on Objects.');
  }
  return false;
};

Object.isExtensible = function isExtensible(object) {
  if (Object(object) !== object) {
    throw new TypeError('Object.isExtensible can only be called on Objects.');
  }
  var name = '';
  while (hasOwnProperty.call(object, name)) {
    name += '?';
  }
  object[name] = true;
  var result = hasOwnProperty.call(object, name);
  delete object[name];
  return result;
};

})();
