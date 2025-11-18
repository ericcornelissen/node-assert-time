// SPDX-License-Identifier: MIT

var test = require('tape');
var assertTime = require('./index.js');
var sleepSync = require('./test-helpers.js').sleepSync;

test('too slow', function (t) {
	var wait = 200, timeout = 100;
	assertTime(
		function () {
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

test('fast enough', function (t) {
	var wait = 100, timeout = 200;
	assertTime(
		function () {
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
