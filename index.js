'use strict';

// Get the real global object
var global = (function () { return this; }).call(null);

// Run only if we are in Bitwig environment
if (typeof loadAPI === 'function') {
  // Load Bitwig API
  loadAPI(1);

  // Set common global refs
  global.global = self;
  global.window = self;

  // Require all polyfills
  require('./polyfill/array.js');
  require('./polyfill/console.js');
  require('./polyfill/date.js');
  require('./polyfill/function.js');
  require('./polyfill/number.js');
  require('./polyfill/object.js');
  require('./polyfill/string.js');
  require('./polyfill/timer.js');

  // External polyfills
  global.Promise = require('bluebird');
  global.JSON = require('json3');

  // Schedule promises using native scheduler
  Promise.setScheduler(function (fn) {
    host.scheduleTask(fn, [], 0);
  });

  // Print long stack traces in promises
  Promise.config({
    // Enable long stack traces
    longStackTraces: true,
  });
}
