// SPDX-License-Identifier: MIT

var hasPromise = require('./test-helpers.js').hasPromise;
var sleepAsync = require('./test-helpers.js').sleepAsync;
var sleepSync = require('./test-helpers.js').sleepSync;

var assertTime = require('./index.js');

var iterations = process.env.CI ? 50 : 1;

var tests = [
	/* 1. Does not throw if it is quick enough, blocking */
	function () {
		var name = '01. Does not throw if it is quick enough, blocking';
		var wait = 5, timeout = 10;

		var duration;
		for (var i = 0; i < iterations; i++) {
			try {
				duration = assertTime(
					function fut() {
						sleepSync(wait);
					},
					timeout
				);
			} catch (error) {
				console.log(
					'❌',
					name,
					'[' + error.message + ']'
				);
				process.exit(1);
			}
		}

		console.log(
			'✅',
			name,
			'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
		);
	},

	/* 2. Does throw if it takes too long, blocking */
	function () {
		var name = '02. Does throw if it takes too long, blocking';
		var wait = 10, timeout = 5;

		var error;
		for (var i = 0; i < iterations; i++) {
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
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
				process.exit(1);
			} catch (err) {
				error = err;
			}
		}

		console.log(
			'✅',
			name,
			'[' + error.message + ']'
		);
	},

	/* 3. Does throw if duration==timeout, blocking */
	function () {
		var name = '03. Does throw if duration==timeout, blocking';
		var wait = 5, timeout = wait;

		var error;
		for (var i = 0; i < iterations; i++) {
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
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
				process.exit(1);
			} catch (err) {
				error = err;
			}
		}

		console.log(
			'✅',
			name,
			'[' + error.message + ']'
		);
	},

	/* 4. Calls onTime if it is quick enough, blocking */
	function () {
		var name = '04. Calls onTime if it is quick enough, blocking';
		var wait = 5, timeout = 10;

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

	/* 5. Calls onSlow if it takes too long, blocking */
	function () {
		var name = '05. Calls onSlow if it takes too long, blocking';
		var wait = 10, timeout = 5;

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
	},

	/* 6. Calls onSlow if duration==timeout, blocking */
	function () {
		var name = '06. Calls onSlow if duration==timeout, blocking';
		var wait = 5, timeout = wait;

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
	},

	/* 7. Does not reject if it is quick enough, async */
	function () {
		var name = '07. Does not reject if it is quick enough, async';
		var wait = 5, timeout = 10;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		function fut() {
			return sleepAsync(wait);
		}

		assertTime(fut, timeout)
			.then(function onTime(duration) {
				console.log(
					'✅',
					name,
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
			})
			.catch(function onSlow(error) {
				console.log(
					'❌',
					name,
					'[' + error.message + ']'
				);
				process.exit(1);
			});
	},

	/* 8. Does reject if it takes too long, async */
	function () {
		var name = '08. Does reject if it takes too long, async';
		var wait = 10, timeout = 5;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		function fut() {
			return sleepAsync(wait);
		}

		assertTime(fut, timeout)
			.then(function onTime(duration) {
				console.log(
					'❌',
					name,
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
				process.exit(1);
			})
			.catch(function onSlow(error) {
				console.log(
					'✅',
					name,
					'[' + error.message + ']'
				);
			});
	},

	/* 9. Does reject if duration==timeout, async */
	function () {
		var name = '09. Does reject if duration==timeout, async';
		var wait = 5, timeout = wait;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		function fut() {
			return sleepAsync(wait);
		}

		assertTime(fut, timeout)
			.then(function onTime(duration) {
				console.log(
					'❌',
					name,
					'[Timeout of ' + timeout + 'ms met (took ' + duration + 'ms)]'
				);
				process.exit(1);
			})
			.catch(function onSlow(error) {
				console.log(
					'✅',
					name,
					'[' + error.message + ']'
				);
			});
	},

	/* 10. Calls onTime if it is quick enough, async */
	function () {
		var name = '10. Calls onTime if it is quick enough, async';
		var wait = 5, timeout = 10;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		assertTime(
			function fut() {
				return sleepAsync(wait);
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

	/* 11. Calls onSlow if it takes too long, async */
	function () {
		var name = '11. Calls onSlow if it takes too long, async';
		var wait = 10, timeout = 5;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		assertTime(
			function fut() {
				return sleepAsync(wait);
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
	},

	/* 12. Calls onSlow if duration==timeout, async */
	function () {
		var name = '12. Calls onSlow if duration==timeout, async';
		var wait = 5, timeout = wait;

		if (!hasPromise()) {
			console.log(
				'🟡',
				name,
				'[skipped, no Promise]'
			);
			return;
		}

		assertTime(
			function fut() {
				return sleepAsync(wait);
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
