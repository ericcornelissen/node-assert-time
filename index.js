// SPDX-License-Identifier: MIT

/**
 * @param {Function} fut The function under test.
 * @param {number} deadline The maximum runtime of `fn` in milliseconds.
 * @param {function(number): void} [onSlow] The function called if `fn`'s runtime exceeds `timeout`, receives the runtime in milliseconds.
 * @param {function(number): void} [onTime] The function called if `fn`'s runtime is within `timeout`, receives the runtime in milliseconds.
 * @throws {number | undefined | Promise<number> | Promise<undefined>} If `onSlow` is not provied `fn`'s duration, otherwise `undefined`.
 * @throws {Error} If `onSlow` is not provied `fn`'s duration exceeds `timeout`.
 * @throws {Error} If `onSlow` is not provided and `fn`'s duration exceeds `timeout`.
 */
function assertTime(fut, deadline, onSlow, onTime) {
	if (onSlow === undefined) {
		return assertTimeThrowing(fut, deadline);
	} else {
		return assertTimeCallback(fut, deadline, onSlow, onTime);
	}
}

function assertTimeCallback(fut, deadline, onSlow, onTime) {
	var timeout, duration;
	var timedOut = false;

	function check() {
		duration = timer.end(start);
		if (duration < deadline && !timedOut) {
			clearTimeout(timeout);
			onTime(duration);
		}
	}

	timeout = setTimeout(function () {
		timedOut = true;
		onSlow(duration || deadline);
	}, deadline);

	var start = timer.start();
	var result = fut();
	if (isPromise(result)) {
		result.then(check);
	} else {
		check();
	}
}

function assertTimeThrowing(fut, deadline) {
	function check() {
		var duration = timer.end(start);
		if (duration >= deadline) {
			throw new Error('Timeout of ' + deadline + 'ms exceeded (took ' + duration + 'ms)');
		} else {
			return duration;
		}
	}

	var start = timer.start();
	var result = fut();
	if (isPromise(result)) {
		return result.then(check);
	} else {
		return check();
	}
}

function isPromise(v) {
	try {
		return v instanceof Promise;
	} catch (_) {
		return false;
	}
}

const timer = {
	start: function () {
		return { __timestamp: Date.now() };
	},
	end: function (start) {
		return Date.now() - start.__timestamp;
	}
};

module.exports = assertTime;
