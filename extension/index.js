'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const cheerio = require("cheerio");
const RequestPromise = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const request = RequestPromise.defaults({ jar: true }); // <= Automatically saves and re-uses cookies.
let isFirstLogin = true;

module.exports = (nodecg) => {
    // Store a reference to this nodecg API context in a place where other libs can easily access it.
    // This must be done before any other files are `require`d.
    nodecgApiContext.set(nodecg);
    init().then(() => {
        nodecg.log.info('Initialization successful.');
    }).catch(error => {
        nodecg.log.error('Failed to initialize:', error);
    });
};

async function init() {
    const nodecg = nodecgApiContext.get();
    const TRACKER_CREDENTIALS_CONFIGURED = nodecg.bundleConfig.tracker.username &&
        nodecg.bundleConfig.tracker.password &&
        !nodecg.bundleConfig.useMockData;
    if (nodecg.bundleConfig.useMockData) {
        nodecg.log.warn('WARNING! useMockData is true, you will not receive real data from the tracker!');
    }
    
    if (TRACKER_CREDENTIALS_CONFIGURED) {
        await loginToTracker();
        // Tracker logins expire every 2 hours. Re-login every 90 minutes.
        setInterval(loginToTracker, 90 * 60 * 1000);
    }
    else {
        nodecg.log.warn('Tracker credentials not defined in cfg/agdq19-layouts.json; will be unable to access privileged data.');
    }
    const schedule = require('./schedule');
    if (TRACKER_CREDENTIALS_CONFIGURED) {
        schedule.on('permissionDenied', () => {
            loginToTracker().then(schedule.update);
        });
    }
    require('./total');
}

// Fetch the login page, and run the response body through cheerio
// so we can extract the CSRF token from the hidden input field.
// Then, POST with our username, password, and the csrfmiddlewaretoken.
async function loginToTracker() {
    const { trackerURLS } = require('./urls');
    const nodecg = nodecgApiContext.get();
    const loginLog = new nodecg.Logger(`${nodecg.bundleName}:tracker`);
    if (isFirstLogin) {
        loginLog.info('Logging in as %s...', nodecg.bundleConfig.tracker.username);
    }
    else {
        loginLog.info('Refreshing tracker login session as %s...', nodecg.bundleConfig.tracker.username);
    }
    return request({
        uri: trackerURLS.login,
        transform(body) {
            return cheerio.load(body);
        }
    }).then($ => request({
        method: 'POST',
        uri: trackerURLS.login,
        form: {
            username: nodecg.bundleConfig.tracker.username,
            password: nodecg.bundleConfig.tracker.password,
            csrfmiddlewaretoken: $('#login-form > input[name="csrfmiddlewaretoken"]').val()
        },
        headers: {
            Referer: trackerURLS.login
        },
        resolveWithFullResponse: true,
        simple: false
    })).then(() => {
        if (isFirstLogin) {
            isFirstLogin = false;
            loginLog.info('Logged in as %s.', nodecg.bundleConfig.tracker.username);
        }
        else {
            loginLog.info('Refreshed session as %s.', nodecg.bundleConfig.tracker.username);
        }
    }).catch(err => {
        loginLog.error('Error authenticating!\n', err);
    });
}
