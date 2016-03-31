'use strict';

(function () {

var global = (function () { return this; }).call(null);

Math.trunc = function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

})();
