// SPDX-License-Identifier: MIT

function assertTime(fn, timeout, onDelayed, onTime) {
	var t1, t2, duration;
	var timedOut = false;

	t1 = setTimeout(function () {
		timedOut = true;

		clearTimeout(t2);
		onDelayed(duration || timeout);
	}, timeout);

	var start = Date.now();
	var result = fn();
	if (isPromise(result)) {
		result.then(function () {
			duration = Date.now() - start;
			if (!timedOut) {
				clearTimeout(t1);
				onTime(duration);
			}
		});
	} else {
		duration = Date.now() - start;
		t2 = setTimeout(function () {
			clearTimeout(t1);
			onTime(duration);
		}, 0);
	}
}

function isPromise(v) {
	try {
		return v instanceof Promise;
	} catch (_) {
		// If `Promise` is not defined, then `v` cannot be a Promise
		return false;
	}
}

module.exports = assertTime;
