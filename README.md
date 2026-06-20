# `assert-time`

Assert the duration of a (blocking or async) function under test.

Note that blocking tests still block the event loop, it is just asserted that
it did not take longer than expected.

## Usage

### Generic Example

```javascript
var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');
var timeout = 100;

// will throw/reject if slow
assertTime(fut, timeout);

// will call `onSlow` if slow, `onTime` otherwise
assertTime(
  fut,
  timeout,
  function onSlow(duration) {
    // ...
  },
  function onTime(duration) {
    // ...
  }
);
```

### [AVA]

With [AVA], blocking tests don't cause tests to fail due to a timeout. Async
tests do.

```javascript
var test = require('ava').default; // ^8
var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');
var timeout = 100;

test('timing test, variant #1', function (t) {
  // Causes a test error
  assertTime(fut, timeout);
  t.pass();
});

test('timing test, variant #2', function (t) {
  // Causes an assertion error
  t.doesNotThrow(function () {
    assertTime(fut, timeout);
  });
});
```

[ava]: https://www.npmjs.com/package/ava

### [node:test]

With [node:test], blocking tests don't cause tests to fail due to a timeout.
Async tests do.

```javascript
var assert = require('node:assert');
var test = require('node:test');

var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');
var timeout = 100;

test('timing test, variant #1', function () {
  // Causes a test error
  assertTime(fut, timeout);
});

test('timing test, variant #2', function () {
  // Causes an assertion error
  assert.doesNotThrow(function () {
    assertTime(fut, timeout);
  });
});
```

[node:test]: https://nodejs.org/api/test.html

### [tape]

With [tape], blocking tests don't cause tests to fail due to a timeout. Async
tests do.

```javascript
var test = require('tape'); // ^5
var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');
var timeout = 100;

test('timing test, variant #1', function (t) {
  // Causes a test error
  t.doesNotThrow(function () {
    assertTime(fut, timeout);
  });
  t.end();
});

test('timing test, variant #2', function (t) {
  // Causes a test error
  assertTime(
    fut,
    timeout,
    function onSlow(duration) {
      t.fail('Test timed out after ' + duration + 'ms');
      t.end();
    },
    function onTime() {
      t.end();
    }
  );
});

test('timing test, variant #3', function (t) {
  // Causes the test to error and the test suite to STOP
  assertTime(fut, timeout);
  t.end();
});
```

[tape]: https://www.npmjs.com/package/tape
