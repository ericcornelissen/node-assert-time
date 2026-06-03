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
    function $sleep() {
      if (Date.now() < start + ms) {
        setTimeout($sleep, ms, 0);
      } else {
        resolve();
      }
    }

    $sleep(ms);
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
