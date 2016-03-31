'use strict';

(function () {

var global = (function () { return this; }).call(null);

var timers = [];
var noop = function () {};

function Timer(interval, callback) {
  this.id = timers.push(this) - 1;
  this.running = true;
  this.interval = interval || 0;
  this.callback = typeof callback !== 'function' ? noop : callback;
};

Timer.prototype.run = function () {
  var self = this;
  try {
    host.scheduleTask(function () {
      if (self.running) {
        self.callback();
        self.run();
      } else {
        delete timers[self.id];
      }
    }, [], self.interval);
  } catch (err) {}
  return this;
};

Timer.prototype.runOnce = function () {
  var self = this;
  try {
    host.scheduleTask(function () {
      if (self.running) {
        self.callback();
        self.running = false;
      }
      delete timers[self.id];
    }, [], self.interval);
  } catch (err) {}
  return this;
};

Timer.prototype.cancel = function () {
  this.running = false;
  return this;
};

global.setTimeout = function setTimeout(callback, interval) {
  if (typeof callback === 'undefined') {
    throw new TypeError('setTimeout requires at least 1 parameter!');
  }
  var timer = new Timer(interval, callback).runOnce();
  return timer.id;
};

global.setInterval = function setInterval(callback, interval) {
  if (typeof callback === 'undefined') {
    throw new TypeError('setInterval requires at least 1 parameter!');
  }
  var timer = new Timer(interval, callback).run();
  return timer.id;
};

global.clearTimeout = function clearTimeout(id) {
  var timer = timers[id];
  if (timer instanceof Timer) {
    timer.cancel();
  }
};

global.clearInterval = function clearInterval(id) {
  var timer = timers[id];
  if (timer instanceof Timer) {
    timer.cancel();
  }
};

})();
