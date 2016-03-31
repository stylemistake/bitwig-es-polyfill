'use strict';

(function () {

var global = (function () { return this; }).call(null);

// Sets `this` variable for a function.
// Returns a bound function.
Function.prototype.bind = function bind(object) {
  if (typeof this !== 'function') {
    throw TypeError('Bind must be called on a function');
  }
  var slice = [].slice;
  var args = slice.call(arguments, 1);
  var self = this;
  var bound = function () {
    return self.apply(
      this instanceof nop ? this : (object || {}),
      args.concat(slice.call(arguments))
    );
  };

  /** @constructor */
  function nop() {}
  nop.prototype = self.prototype;
  bound.prototype = new nop();

  return bound;
};

})();
