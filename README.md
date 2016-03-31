# Bitwig ES polyfill

This module provides standard ES library that was missing from Bitwig Studio
scripting API.

It is still far from being complete, so not everything might work as expected,
but in general it works OK.

This library will provide a good enough environment for JavaScript transpilers
to work correctly, such as [Babel].

Here is the list of polyfills:

* `Array.from`
* `Array.isArray`
* `Array.of`
* `Array.prototype.fill`
* `Array.prototype.reduce`
* `Array.prototype.reduceRight`
* `console.log`
* `console.error`
* `console.dir`
* `console.trace`
* `console.warn`
* `console.group` (dummy)
* `console.groupCollapsed` (dummy)
* `console.groupEnd` (dummy)
* `Date.prototype.toISOString`
* `Date.prototype.toJSON`
* `Function.prototype.bind`
* `Math.trunc`
* `Number.EPSILON`
* `Number.MAX_SAFE_INTEGER`
* `Number.MIN_SAFE_INTEGER`
* `Number.isNaN`
* `Number.isFinite`
* `Number.isInteger`
* `Number.isSafeInteger`
* `Number.parseInt`
* `Number.parseFloat`
* `Object.getPrototypeOf`
* `Object.getOwnPropertyDescriptor`
* `Object.getOwnPropertyNames`
* `Object.keys`
* `Object.defineProperties` (only `value`, `get`, `set`)
* `Object.defineProperty` (only `value`, `get`, `set`)
* `Object.create` (partially working)
* `Object.seal` (dummy)
* `Object.freeze` (dummy)
* `Object.preventExtensions`
* `Object.isSealed` (dummy)
* `Object.isFrozen` (dummy)
* `Object.isExtensible`
* `String.prototype.split` (shim)
* `String.prototype.trim`
* `String.prototype.trimLeft`
* `String.prototype.trimRight`
* `String.prototype.padLeft` (deprecated)
* `String.prototype.padRight` (deprecated)
* `String.prototype.padStart`
* `String.prototype.padEnd`
* `parseInt` (shim)
* `parseFloat`
* `setTimeout`
* `setInterval`
* `clearTimeout`
* `clearInterval`
* `global` (reference to global scope)
* `window` (reference to global scope)

If you're using a CommonJS loader, these are also provided:

* `Promise` from [Bluebird]
* `JSON` from [json3]

Don't forget, that Bitwig Studio uses Rhino runtime, which is ES3 at most,
so many of the provided functions are just dummy functions. These functions
emulate the target environment as closely as possible, but fail silently if
you use an unsupported feature.

It doesn't provide the `Symbol` object (yet). This can limit what you can do
with generators and iterables in [Babel].


## Usage

Install from `npm`:

```
npm install --save bitwig-es-polyfill
```

Shim should be included at the beginning of your script.

If you're using vanilla scripting API, load the shim using the script loader:

```js
load('node_modules/bitwig-es-polyfill/loader.js');
```

If you're using a build system with CommonJS module support, load it using
`require`:

```js
require('bitwig-es-polyfill');
```

If you've gone ES all the way, you can import it using ES modules:

```js
import 'bitwig-es-polyfill';
```


## Contacts

Style Mistake <[stylemistake@gmail.com]>

[babel]: http://babeljs.io/
[json3]: https://github.com/bestiejs/json3
[bluebird]: https://github.com/petkaantonov/bluebird
[stylemistake.com]: http://stylemistake.com/
[stylemistake@gmail.com]: mailto:stylemistake@gmail.com
