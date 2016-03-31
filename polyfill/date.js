'use strict';

(function () {

var global = (function () { return this; }).call(null);

function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

Date.prototype.toISOString = function toISOString() {
  return this.getUTCFullYear() +
    '-' + pad(this.getUTCMonth() + 1) +
    '-' + pad(this.getUTCDate()) +
    'T' + pad(this.getUTCHours()) +
    ':' + pad(this.getUTCMinutes()) +
    ':' + pad(this.getUTCSeconds()) +
    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    'Z';
};

Date.prototype.toJSON = function toJSON() {
  return Date.prototype.toISOString.call(this);
};

})();
