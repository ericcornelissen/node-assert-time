// SPDX-License-Identifier: MIT

/**
 * @param {Function} fut The function under test
 * @param {number} timeout The maximum runtime of `fn` in milliseconds.
 * @param {function(number): void} onSlow The function called if `fn`'s runtime exceeds `timeout`, receives the runtime in milliseconds.
 * @param {function(number): void} onTime The function called if `fn`'s runtime is within `timeout`, receives the runtime in milliseconds.
 * @throws {number | undefined} If `onSlow` is not provied `fn`'s duration, otherwise `undefined`
 * @throws {Error} If `onSlow` is not provied `fn`'s duration exceeds `timeout`
 */
function assertTime(fut, timeout, onSlow, onTime) {
	var t1, t2, duration;
	var timedOut = false;

	if (typeof onSlow === 'function') {
		t1 = setTimeout(function () {
			timedOut = true;

			clearTimeout(t2);
			onSlow(duration);
		}, timeout);
	}

	var start = Date.now();
	fut();
	if (typeof onSlow === 'function') {
		duration = Date.now() - start;
    t2 = setTimeout(function () {
      if (duration < timeout) {
  			clearTimeout(t1);
  			onTime(duration);
      }
		}, 0);
	} else {
		duration = Date.now() - start;
		if (duration > timeout) {
			throw new Error('Timeout of ' + timeout + 'ms exceeded (took ' + duration + 'ms)');
		} else {
			return duration;
		}
	}
}

module.exports = assertTime;
