// SPDX-License-Identifier: MIT

function sleepSync(ms) {
	var start = Date.now();
	while (Date.now() < start + ms) {
		// Busy-wait to block the event loop
	}
}

module.exports = {
	sleepSync: sleepSync,
};
