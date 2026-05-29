// SPDX-License-Identifier: MIT

var assert = require('node:assert');
var assertTime = require('./index.js');
var sleepSync = require('./test-helpers.js').sleepSync;

describe('pure mocha', function () {
	it('too slow, fails', function () {
		var wait = 200, timeout = 100;

		function fut() {
			sleepSync(wait);
		}

		this.timeout(timeout);
		fut();
	});

	it('fast enough, succeeds', function () {
		var wait = 100, timeout = 200;

		function fut() {
			sleepSync(wait);
		}

		this.timeout(timeout);
		fut();
	});
});

describe('using assert-time', function () {
	describe('throwing API', function () {
		it('too slow, fails', function () {
			var wait = 200, timeout = 100;
			assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout
			);
		});

		it('fast enough, succeeds', function () {
			var wait = 100, timeout = 200;
			assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout
			);
		});
	});

	describe('manuel API', function () {
		it('too slow, fails', function (done) {
			var wait = 200, timeout = 100;
			assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout,
				function onSlow(duration) {
					assert.fail('Test timed out after ' + duration + 'ms');
				},
				function onTime() {
					done();
				}
			);
		});

		it('fast enough, succeeds', function (done) {
			var wait = 100, timeout = 200;
			assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout,
				function onSlow(duration) {
					assert.fail('Test timed out after ' + duration + 'ms');
				},
				function onTime() {
					done();
				}
			);
		});
	});
});
