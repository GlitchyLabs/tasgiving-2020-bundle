'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const request = require("request-promise-native");
// Ours
const { formatDollars } = require("./util/format-dollars");
const nodecgApiContext = require("./util/nodecg-api-context");
const { trackerURLS } = require("./urls");
const nodecg = nodecgApiContext.get();
const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
const bitsTotal = nodecg.Replicant('bits_total');
const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
const total = nodecg.Replicant('total');
let disconnectWarningTimeout;
updateTotal();
setInterval(updateTotal, 500);
total.value = {};
autoUpdateTotal.value = true;
autoUpdateTotal.on('change', (newVal) => {
    if (newVal) {
        nodecg.log.info('Automatic updating of donation total enabled');
        manuallyUpdateTotal(true);
    }
    else {
        nodecg.log.warn('Automatic updating of donation total DISABLED');
    }
});
recordTrackerEnabled.on('change', (newVal) => {
    if (newVal) {
        nodecg.log.info('Milestone tracker enabled');
    }
    else {
        nodecg.log.warn('Milestone tracker DISABLED');
    }
});
if (nodecg.bundleConfig && nodecg.bundleConfig.donationSocketUrl) {
    // tslint:disable-next-line:no-var-requires
    const socket = require('socket.io-client')(nodecg.bundleConfig.donationSocketUrl);
    let loggedXhrPollError = false;
    socket.on('connect', () => {
        nodecg.log.info('Connected to donation socket', nodecg.bundleConfig.donationSocketUrl);
        if (disconnectWarningTimeout) {
            clearTimeout(disconnectWarningTimeout);
            disconnectWarningTimeout = null;
        }
        loggedXhrPollError = false;
    });
    socket.on('connect_error', (err) => {
        if (err.message === 'xhr poll error') {
            if (loggedXhrPollError) {
                return;
            }
            loggedXhrPollError = true;
        }
        nodecg.log.error('Donation socket connect_error:', err);
    });
    // Get initial data, then listen for donations.
    updateTotal().then(() => {
        socket.on('donation', (data) => {
            if (!data || !data.rawAmount) {
                return;
            }
            const donation = formatDonation(data);
            nodecg.sendMessage('donation', donation);
            if (autoUpdateTotal.value) {
                total.value = {
                    raw: donation.rawNewTotal,
                    formatted: donation.newTotal
                };
                console.log(total.value);
            }
        });
    });
    socket.on('disconnect', () => {
        if (!disconnectWarningTimeout) {
            disconnectWarningTimeout = setTimeout(() => {
                nodecg.log.error('Disconnected from donation socket, can not receive donations!');
            }, 30000);
        }
    });
    socket.on('error', (err) => {
        nodecg.log.error('Donation socket error:', err);
    });
}
else {
    // tslint:disable-next-line:prefer-template
    nodecg.log.warn(`cfg/${nodecg.bundleName}.json is missing the "donationSocketUrl" property.` +
        '\n\tThis means that we cannot receive new incoming PayPal donations from the tracker,' +
        '\n\tand that donation notifications will not be displayed as a result. The total also will not update.');
}
nodecg.listenFor('setTotal', ({ type, newValue }) => {
    if (type === 'cash') {
        total.value = {
            raw: parseFloat(newValue),
            formatted: formatDollars(newValue, { cents: false })
        };

        console.log(total.value);
    }
    else if (type === 'bits') {
        bitsTotal.value = parseInt(newValue, 10);
    }
    else {
        nodecg.log.error('Unexpected "type" sent to setTotal: "%s"', type);
    }
});
// Dashboard can invoke manual updates
nodecg.listenFor('updateTotal', manuallyUpdateTotal);
/**
 * Handles manual "updateTotal" requests.
 * @param [silent = false] - Whether to print info to logs or not.
 * @param [cb] - The callback to invoke after the total has been updated.
 */
function manuallyUpdateTotal(silent, cb) {
    if (!silent) {
        nodecg.log.info('Manual donation total update button pressed, invoking update...');
    }
    updateTotal().then(updated => {
        if (updated) {
            nodecg.sendMessage('total:manuallyUpdated', total.value);
            nodecg.log.info('Donation total successfully updated');
        }
        else {
            nodecg.log.info('Donation total unchanged, not updated');
        }
        if (cb && !cb.handled) {
            cb(null, updated);
        }
    }).catch(error => {
        if (cb && !cb.handled) {
            cb(error);
        }
    });
}
/**
 * Updates the "total" replicant with the latest value from the GDQ Tracker API.
 */
async function updateTotal() {
    try {
        const stats = await request({
            uri: trackerURLS.total,
            json: true
        });
        const freshTotal = parseFloat(stats.agg.amount || 0);
        if (freshTotal === total.value.raw) {
            return false;
        }
        total.value = {
            raw: freshTotal,
            formatted: formatDollars(freshTotal, { cents: false })
        };
        console.log(total.value);
        return true;
    }
    catch (error) {
        let msg = 'Could not get donation total, unknown error';
        if (error) {
            msg = `Could not get donation total:\n${error.message}`;
        }
        nodecg.log.error(msg);
    }
    return false;
}
/**
 * Formats each donation coming in from the socket repeater, which in turn is receiving them
 * from a Postback URL on the tracker.
 * @returns A formatted donation.
 */
function formatDonation({ rawAmount, newTotal }) {
    const parsedRawAmount = typeof rawAmount === 'string' ? parseFloat(rawAmount) : rawAmount;
    const parsedRawNewTotal = typeof newTotal === 'string' ? parseFloat(newTotal) : newTotal;
    // Format amount
    let amount = formatDollars(parsedRawAmount);
    // If a whole dollar, get rid of cents
    if (amount.endsWith('.00')) {
        amount = amount.substr(0, amount.length - 3);
    }
    return {
        amount,
        rawAmount: parsedRawAmount,
        newTotal: formatDollars(parsedRawNewTotal, { cents: false }),
        rawNewTotal: parsedRawNewTotal
    };
}
