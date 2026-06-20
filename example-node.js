// SPDX-License-Identifier: MIT

var assert = require('node:assert');
var test = require('node:test');
var assertTime = require('./index.js');
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

test('pure node:test', async function (t) {
	await t.test('blocking', async function (t) {
		await t.test('too slow, yet succeeds', { timeout: 100 }, function () {
			var wait = 200;

			function fut() {
				sleepSync(wait);
			}

			fut();
		});

		await t.test('fast enough, succeeds', { timeout: 200 }, function () {
			var wait = 100;

			function fut() {
				sleepSync(wait);
			}

			fut();
		});
	});

	await t.test('async', async function (t) {
		await t.test('too slow, fails', { timeout: 100 }, function () {
			var wait = 200;

			function fut() {
				return sleepAsync(wait);
			}

			return fut();
		});

		await t.test('fast enough, succeeds', { timeout: 200 }, function () {
			var wait = 100;

			function fut() {
				return sleepAsync(wait);
			}

			return fut();
		});
	});
});

test('using assert-time', async function (t) {
	await t.test('throwing API', async function (t) {
		await t.test('blocking', async function (t) {
			await t.test('too slow, fails', function () {
				var wait = 200, timeout = 100;

				function fut() {
					sleepSync(wait);
				}

				assertTime(fut, timeout);
			});

			await t.test('fast enough, succeeds', function () {
				var wait = 100, timeout = 200;

				function fut() {
					sleepSync(wait);
				}

				assertTime(fut, timeout);
			});
		});

		await t.test('async', async function (t) {
			await t.test('too slow, fails', function () {
				var wait = 200, timeout = 100;

				function fut() {
					return sleepAsync(wait);
				}

				return assertTime(fut, timeout);
			});

			await t.test('fast enough, succeeds', function () {
				var wait = 100, timeout = 200;

				function fut() {
					return sleepAsync(wait);
				}

				return assertTime(fut, timeout);
			});
		});
	});

	await t.test('manual API', async function (t) {
		await t.test('blocking', async function (t) {
			await t.test('too slow, fails', function (_, done) {
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

			await t.test('fast enough, succeeds', function (_, done) {
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

		await t.test('async', async function (t) {
			await t.test('too slow, fails', function (_, done) {
				var wait = 200, timeout = 100;
				assertTime(
					function fut() {
						return sleepAsync(wait);
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

			await t.test('fast enough, succeeds', function (t) {
				var wait = 100, timeout = 200;
				assertTime(
					function fut() {
						return sleepAsync(wait);
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
});
