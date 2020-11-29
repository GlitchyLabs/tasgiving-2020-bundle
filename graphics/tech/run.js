const timeClock = nodecg.Replicant('timeClock');

Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

const clockStates = [
    'stopped',
    'running',
    'paused'
];
let clockInterval = undefined;
let clockState = undefined;
let timedateElement = undefined;
let startButton = undefined;
let pauseButton = undefined;
let resetButton = undefined;

function setup() {
    timedateElement = document.getElementById('timedate');
    startButton = document.getElementById('startButton');
    pauseButton = document.getElementById('pauseButton');
    resetButton = document.getElementById('resetButton');

    timeClock.on('change', (value, oldValue = {}) => {
        clockState = value.state;
        disableBtn(startButton);
        disableBtn(pauseButton);
        disableBtn(resetButton);
        timedateElement.classList.remove('running');
        timedateElement.classList.remove('stopped');
        timedateElement.classList.remove('paused');
        timedateElement.classList.add(clockStates[clockState]);

        switch(value.state) {
            case 0: // reset
                enableBtn(startButton);
                break;
            case 1: // running
                enableBtn(pauseButton);
                enableBtn(resetButton);
                break;
            case 2: // pause
                enableBtn(startButton);
                enableBtn(resetButton);
                break;
        }

        if (value.state !== oldValue.state) {
            switch(value.state) {
                case 0: // reset
                    if (clockInterval) {
                        clearInterval(clockInterval);
                        clockInterval = undefined;
                    }
                    updateClock(new Date(value.stopTime), new Date(value.startTime));
                    break;
                case 1: // running
                    clockInterval = window.setInterval(function() {
                        var now = new Date();
                        updateClock(now, new Date(value.startTime));
                    }, 1);
                    break;
                case 2: // pause
                    if (clockInterval) {
                        clearInterval(clockInterval);
                        clockInterval = undefined;
                    }
                    setTimeout(() => {
                        updateClock(new Date(value.stopTime), new Date(value.startTime));
                    });
                    break;
            }
        }
    })
}

function startClock() {
    var data = {
        state: 1
    }
    if (clockState == 0) {
        var now = new Date();
        data.startTime = now;
    }

    if (clockState !== 1) {
        updateBackend(data);
    }
}

function pauseClock() {
    var now = new Date();
    if (clockState !== 2) {
        updateBackend({
            state: 2,
            stopTime: now
        });
    }
}

function resetClock() {
    if (clockState !== 0) {
        updateBackend({
            state: 0,
            startTime: new Date(0),
            stopTime: new Date(0)
        });
    }
}

function updateClock(now, start) {
    var msec = now - start;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    var tags = ["h", "m", "s", "mi"],
        corr = [hh.pad(2), mm.pad(2), ss.pad(2), msec.pad(3)];
    for (var i = 0; i < tags.length; i++)
        document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function disableBtn(element) {
    element.disabled = true;
}

function enableBtn(element) {
    element.disabled = false;
}

function updateBackend(changes) {
    timeClock.value = Object.assign({},timeClock.value, changes);
}