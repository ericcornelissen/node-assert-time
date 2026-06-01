// SPDX-License-Identifier: MIT

var test = require('ava').default;
var assertTime = require('./index.js');
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

test('pure AVA, blocking, too slow, yet succeeds', function (t) {
	var wait = 200, timeout = 100;

	function fut() {
		sleepSync(wait);
	}

	t.timeout(timeout);
	fut();
	t.pass();
});

test('pure AVA, blocking, fast enough, succeeds', function (t) {
	var wait = 100, timeout = 200;

	function fut() {
		sleepSync(wait);
	}

	t.timeout(timeout);
	fut();
	t.pass();
});

test('pure AVA, async, too slow, fails', function (t) {
	var wait = 200, timeout = 100;

	function fut() {
		return sleepAsync(wait);
	}

	t.timeout(timeout);
	return fut().then(t.pass);
});

test('pure AVA, async, fast enough, succeeds', function (t) {
	var wait = 100, timeout = 200;

	function fut() {
		return sleepAsync(wait);
	}

	t.timeout(timeout);
	return fut().then(t.pass);
});

test('using assert-time, blocking, too slow, fails', function (t) {
	var wait = 200, timeout = 100;
	t.notThrows(function () {
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout
		);
	});
});

test('using assert-time, blocking, fast enough, succeeds', function (t) {
	var wait = 100, timeout = 200;
	t.notThrows(function () {
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout
		);
	});
});

test('using assert-time, async, too slow, fails', function (t) {
	var wait = 200, timeout = 100;
	return t.notThrowsAsync(function () {
		return assertTime(
			function fut() {
				return sleepAsync(wait);
			},
			timeout
		);
	});
});

test('using assert-time, async, fast enough, succeeds', function (t) {
	var wait = 100, timeout = 200;
	t.notThrows(function () {
		assertTime(
			function fut() {
				return sleepAsync(wait);
			},
			timeout
		);
	});
});
