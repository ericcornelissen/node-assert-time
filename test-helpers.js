// SPDX-License-Identifier: MIT

function sleepSync(ms) {
	var start = Date.now();
	while (Date.now() < start + ms) {
		// Busy-wait to block the event loop
	}
}

function sleepAsync(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

function hasPromise() {
	try {
		new Promise(function () { });
		return true;
	} catch (_) {
		return false;
	}
}

module.exports = {
	hasPromise: hasPromise,
	sleepAsync: sleepAsync,
	sleepSync: sleepSync,
};
