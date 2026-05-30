// SPDX-License-Identifier: MIT

var test = require('tape');
var assertTime = require('./index.js');
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

test('pure tape', function (t) {
	t.test('blocking', function (t) {
		t.test('too slow, yet succeeds', function (t) {
			var wait = 200, timeout = 100;

			function fut() {
				sleepSync(wait);
			}

			t.timeoutAfter(timeout);
			fut();
			t.end();
		});

		t.test('fast enough, succeeds', function (t) {
			var wait = 100, timeout = 200;

			function fut() {
				sleepSync(wait);
			}

			t.timeoutAfter(timeout);
			fut();
			t.end();
		});
	});

	t.test('async', function (t) {
		t.test('too slow, fails', function (t) {
			var wait = 200, timeout = 100;

			function fut() {
				return sleepAsync(wait);
			}

			t.timeoutAfter(timeout);
			return fut();
		});

		t.test('fast enough, succeeds', function (t) {
			var wait = 100, timeout = 200;

			function fut() {
				return sleepAsync(wait);
			}

			t.timeoutAfter(timeout);
			return fut();
		});
	});
});

test('using assert-time', function (t) {
	t.test('throwing API', function (t) {
		t.test('blocking', function (t) {
			t.test('too slow, fails', function (t) {
				var wait = 200, timeout = 100;

				function fut() {
					sleepSync(wait);
				}

				t.doesNotThrow(function () {
					assertTime(fut, timeout);
				});
				t.end();
			});

			t.test('fast enough, succeeds', function (t) {
				var wait = 100, timeout = 200;

				function fut() {
					sleepSync(wait);
				}

				t.doesNotThrow(function () {
					assertTime(fut, timeout);
				});
				t.end();
			});
		});

		t.test('async', function (t) {
			t.test('too slow, fails', function () {
				var wait = 200, timeout = 100;

				function fut() {
					return sleepAsync(wait);
				}

				return assertTime(fut, timeout);
			});

			t.test('fast enough, succeeds', function () {
				var wait = 100, timeout = 200;

				function fut() {
					return sleepAsync(wait);
				}

				return assertTime(fut, timeout);
			});
		});
	});

	t.test('manual API', function (t) {
		t.test('blocking', function (t) {
			t.test('too slow, fails', function (t) {
				var wait = 200, timeout = 100;
				assertTime(
					function fut() {
						sleepSync(wait);
					},
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

			t.test('fast enough, succeeds', function (t) {
				var wait = 100, timeout = 200;
				assertTime(
					function fut() {
						sleepSync(wait);
					},
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
		});

		t.test('async', function (t) {
			t.test('too slow, fails', function (t) {
				var wait = 200, timeout = 100;
				assertTime(
					function fut() {
						return sleepAsync(wait);
					},
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

			t.test('fast enough, succeeds', function (t) {
				var wait = 100, timeout = 200;
				assertTime(
					function fut() {
						return sleepAsync(wait);
					},
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
		});
	});
});
