const currentRun = nodecg.Replicant('currentRun');
const timeClock = nodecg.Replicant('timeClock');

Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

function setup() {
    const runsElement = document.getElementById('currentRun');
    const timerElement = document.getElementById('timer');

    let clockInterval = undefined;
    let clockState = undefined;

    currentRun.on('change', run => {
        if (!run || runsElement.id !== 'currentRun') {
            return;
        }
        runsElement.innerHTML = '';

        runTitle = document.createElement('div');
        runTitle.id = `run-${run.id}-title`;
        runTitle.classList.add('run-title');
        runTitle.innerHTML = `<div>${run.name}</div>`;

        runConsole = document.createElement('div');
        runConsole.id = `run-${run.id}-console`;
        runConsole.classList.add('run-console');
        runConsole.innerHTML = `<div>${run.console}</div>`;

        runCategory = document.createElement('div');
        runCategory.id = `run-${run.id}-category`;
        runCategory.classList.add('run-category');
        runCategory.innerHTML = `<div>${run.category}</div>`;

        runReleaseYear = document.createElement('div');
        runReleaseYear.id = `run-${run.id}-release-year`;
        runReleaseYear.classList.add('run-release-year');
        runReleaseYear.innerHTML = `<div>${run.releaseYear}</div>`;

        runEstimate = document.createElement('div');
        runEstimate.id = `run-${run.id}-estimate`;
        runEstimate.classList.add('run-estimate');
        runEstimate.innerHTML = `<div>EST: ${run.estimate}</div>`;

        runRunners = document.createElement('div');
        runRunners.id = `run-${run.id}-runners`;
        runRunners.classList.add('run-runners');
        runnerElement = document.createElement('div');
        runnerElement.innerText = run.runners[0].name;
        runRunners.appendChild(runnerElement);
        if (run.runners[1]) {
            runnerElement = document.createElement('div');
            runnerElement.innerText = run.runners[1].name;
            runRunners.appendChild(runnerElement);
        }

        runElement = document.createElement('div');
        runElement.id = `run-${run.id}`;
        runElement.classList.add('run');
        runElement.appendChild(runTitle);
        runElement.appendChild(runConsole);
        runElement.appendChild(runCategory);
        runElement.appendChild(runReleaseYear);
        runElement.appendChild(runEstimate);
        runElement.appendChild(runRunners);
        
        runsElement.appendChild(runElement);
    });

    timeClock.on('change', (value, oldValue = {}) => {
        clockState = value.state;

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
                    clockInterval = setInterval(function() {
                        var now = new Date();
                        updateClock(now, new Date(value.startTime));
                    }, 1);
                    break;
                case 2: // pause
                    if (clockInterval) {
                        clearInterval(clockInterval);
                        clockInterval = undefined;
                    }
                    updateClock(new Date(value.stopTime), new Date(value.startTime));
                    break;
            }
        }
    });

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
        for (var i = 0; i < tags.length; i++) {
            document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
        }
    }
}