// SPDX-License-Identifier: MIT

var hasPromise = require('./test-helpers.js').hasPromise;
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

var assertTime = require('./index.js');

var tests = [
	/* 1. Does throw if it takes too long, blocking */
	function () {
		var wait = 200, timeout = 100;
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'✅ 1. Does throw if it takes too long, blocking',
					'(took ' + duration + 'ms, want >' + timeout + 'ms)'
				);
			},
			function onTime(duration) {
				console.log(
					'❌ 1. Does throw if it takes too long, blocking',
					'(took ' + duration + 'ms, want >' + timeout + 'ms)'
				);
				process.exit(1);
			}
		);
	},

	/* 2. Does not throw if it is quick enough, blocking */
	function () {
		var wait = 100, timeout = 200;
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'❌ 2. Does not throw if it is quick enough, blocking',
					'(took ' + duration + 'ms, want <' + timeout + 'ms)'
				);
				process.exit(1);
			},
			function onTime(duration) {
				console.log(
					'✅ 2. Does not throw if it is quick enough, blocking',
					'(took ' + duration + 'ms, want <' + timeout + 'ms)'
				);
			}
		);
	},

	/* 3. Does throw if it takes too long, async */
	function () {
		if (!hasPromise()) {
			console.log(
				'🟡 3. Does throw if it takes too long, async',
				'(skipped, no Promise)'
			);
			return;
		}

		var wait = 200, timeout = 100;
		assertTime(
			function fut() {
				return sleepAsync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'✅ 3. Does throw if it takes too long, async',
					'(took ' + duration + 'ms, want >' + timeout + 'ms)'
				);
			},
			function onTime(duration) {
				console.log(
					'❌ 3. Does throw if it takes too long, async',
					'(took ' + duration + 'ms, want >' + timeout + 'ms)'
				);
				process.exit(1);
			}
		);
	},

	/* 4. Does not throw if it is quick enough, async */
	function () {
		if (!hasPromise()) {
			console.log(
				'🟡 4. Does not throw if it is quick enough, async',
				'(skipped, no Promise)'
			);
			return;
		}

		var wait = 100, timeout = 200;
		assertTime(
			function fut() {
				return sleepAsync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'❌ 4. Does not throw if it is quick enough, async',
					'(took ' + duration + 'ms, want <' + timeout + 'ms)'
				);
				process.exit(1);
			},
			function onTime(duration) {
				console.log(
					'✅ 4. Does not throw if it is quick enough, async',
					'(took ' + duration + 'ms, want <' + timeout + 'ms)'
				);
			}
		);
	},
];

for (var i = 0; i < tests.length; i++) {
	tests[i]();
}
