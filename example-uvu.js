// SPDX-License-Identifier: MIT

var test = require('uvu').test;
var assertTime = require('./index.js');
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

test('pure uvu, blocking, slow, succeeds', function () {
	var wait = 200;

	function fut() {
		sleepSync(wait);
	}

	fut();
});

test('pure uvu, blocking, fast, succeeds', function () {
	var wait = 100;

	function fut() {
		sleepSync(wait);
	}

	fut();
});

test('pure uvu, async, slow, succeeds', function () {
	var wait = 200;

	function fut() {
		return sleepAsync(wait);
	}

	return fut();
});

test('pure uvu, async, fast, succeeds', function () {
	var wait = 100;

	function fut() {
		return sleepAsync(wait);
	}

	return fut();
});

test('using assert-time, blocking, too slow, fails', function () {
	var wait = 200, timeout = 100;
	assertTime(
		function fut() {
			sleepSync(wait);
		},
		timeout
	);
});

test('using assert-time, blocking, fast enough, succeeds', function () {
	var wait = 100, timeout = 200;
	assertTime(
		function fut() {
			sleepSync(wait);
		},
		timeout
	);
});

test('using assert-time, async, too slow, fails', function () {
	var wait = 200, timeout = 100;
	return assertTime(
		function fut() {
			return sleepAsync(wait);
		},
		timeout
	);
});

test('using assert-time, async, fast enough, succeeds', function () {
	var wait = 100, timeout = 200;
	return assertTime(
		function fut() {
			return sleepAsync(wait);
		},
		timeout
	);
});

test.run();
