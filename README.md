# `assert-time`

Assert the duration of a (blocking or async) function under test.

Note that blocking tests still block the event loop, it is just asserted that
it did not take longer than expected.

## Usage

### Generic Example

```javascript
var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');

assertTime(
  fut,
  100,
  function onSlow(duration) {
    // ...
  },
  function onTime(duration) {
    // ...
  }
);
```

### [Tape]

```javascript
var test = require('tape');
var assertTime = require('@ericcornelissen/assert-time');

var fut = require('./index.js');

test('timing test', function (t) {
  assertTime(
    fut,
    100,
    function onSlow(duration) {
      t.fail('Test timed out after ' + duration + 'ms');
      t.end();
    },
    function onTime() {
      t.end();
    }
  );
});
```

[tape]: https://www.npmjs.com/package/tape
