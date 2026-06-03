// SPDX-License-Identifier: MIT

function hasPromise() {
	try {
		Promise;
		return true;
	} catch (_) {
		return false;
	}
}

function sleepAsync(ms) {
	var start = Date.now();
	return new Promise(function (resolve) {
		setTimeout(function () {
				while (Date.now() < start + ms) {
					// Busy-wait until we're sure enough time has passed
				}

			resolve();
		 }, ms)
	});
}

function sleepSync(ms) {
	var start = Date.now();
	while (Date.now() < start + ms) {
		// Busy-wait to block the event loop
	}
}

module.exports = {
	hasPromise: hasPromise,
	sleepAsync: sleepAsync,
	sleepSync: sleepSync,
};
