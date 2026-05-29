// SPDX-License-Identifier: MIT

var sleepSync = require('./test-helpers.js').sleepSync;

var assertTime = require('./index.js');

var tests = [
	/* 1. Does not throw if it is quick enough, blocking */
	function () {
		var name = '1. Does not throw if it is quick enough, blocking';
		var wait = 100, timeout = 200;
		try {
			var duration = assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout
			);

			console.log(
				'✅',
				name,
				'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
			);
		} catch (error) {
			console.log(
				'❌',
				name,
				'[' + error.message + ']'
			);
			process.exit(1);
		}
	},

	/* 2. Does throw if it takes too long, blocking */
	function () {
		var name = '2. Does throw if it takes too long, blocking';
		var wait = 200, timeout = 100;
		try {
			var duration = assertTime(
				function fut() {
					sleepSync(wait);
				},
				timeout
			);

			console.log(
				'❌',
				name,
				'[Timeout of ' + timeout + 'ms met (took ' + timeout + 'ms)]'
			);
			process.exit(1);
		} catch (error) {
			console.log(
				'✅',
				name,
				'[' + error.message + ']'
			);
		}
	},

	/* 3. Calls onTime if it is quick enough, blocking */
	function () {
		var name = '3. Calls onTime if it is quick enough, blocking';
		var wait = 100, timeout = 200;
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'❌',
					name,
					'[Timeout of ' + timeout + 'ms exceeded (took ' + duration + 'ms)]'
				);
				process.exit(1);
			},
			function onTime(duration) {
				console.log(
					'✅',
					name,
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
			}
		);
	},

	/* 4. Calls onSlow if it takes too long, blocking */
	function () {
		var name = '4. Calls onSlow if it takes too long, blocking';
		var wait = 200, timeout = 100;
		assertTime(
			function fut() {
				sleepSync(wait);
			},
			timeout,
			function onSlow(duration) {
				console.log(
					'✅',
					name,
					'[Timeout of ' + timeout + 'ms exceeded (took ' + duration + 'ms)]'
				);
			},
			function onTime(duration) {
				console.log(
					'❌',
					name,
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
				process.exit(1);
			}
		);
	}
];

for (var i = 0; i < tests.length; i++) {
	tests[i]();
}
