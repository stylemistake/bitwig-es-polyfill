# Bitwig ES shim

This module provides standard ES library that was missing from Bitwig Studio
scripting API.

It is still far from being complete, so not everything might work as expected,
but in general it works OK.

This library will provide a good enough environment for JavaScript transpilers
to work correctly, such as [Babel].

Following objects are provided:

* `Array`
* `Date`
* `Function`
* `Number`
* `Object`
* `String`
* `setTimeout` and `setInterval`
* `console`
* `global` and `window` objects

Don't forget, that Bitwig Studio uses Rhino runtime, which is ES3 at most,
so many of the provided functions are just dummy functions. These functions
emulate the target environment as closely as possible, but fail silently if
you use an unsupported feature.


## Usage

Install from `npm`:

```
npm install --save-dev bitwig-es-shim
```

Shim should be included at the beginning of your script.

If you're using vanilla scripting API, load the shim using the script loader:

```js
load('node_modules/bitwig-es-shim/loader.js');
```

If you're using a build system with CommonJS module support, load it using
`require`:

```js
require('bitwig-es-shim');
```

If you've gone ES all the way, you can import it using ES modules:

```js
import 'bitwig-es-shim';
```


## Contacts

Style Mistake <[stylemistake@gmail.com]>

[babel]: http://babeljs.io/
[stylemistake.com]: http://stylemistake.com/
[stylemistake@gmail.com]: mailto:stylemistake@gmail.com
