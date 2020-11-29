const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const schedule = nodecg.Replicant('schedule');
const timeClock = nodecg.Replicant('timeClock');
const total = nodecg.Replicant('total');

Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

const clockStates = [
    'stopped',
    'running',
    'paused'
];
let currentRunId = 0;
let clockInterval = undefined;
let clockState = undefined;

function setup() {

    schedule.on('change', runs => {
        if (!runs) {
            return;
        }

        const runsElement = document.getElementById('schedule');
        runsElement.innerHTML = '';
        runsElement.innerHTML = "<h1>Schedule: Next 5</h1>";

        const start = runs.findIndex(run => run.id == currentRunId);
        const end = start + 5;

        runs.slice(start + 2, end + 2).forEach((run) => {
            runTitleLabel = document.createElement('label');
            runTitleLabel.htmlFor = `run-${run.id}-title`;
            runTitleLabel.innerText = 'Title:';
            runTitle = document.createElement('div');
            runTitle.id = `run-${run.id}-title`;
            runTitle.classList.add('run-title');
            runTitle.innerText = run.name;

            runConsoleLabel = document.createElement('label');
            runConsoleLabel.htmlFor = `run-${run.id}-console`;
            runConsoleLabel.innerText = 'Console:';
            runConsole = document.createElement('div');
            runConsole.id = `run-${run.id}-console`;
            runConsole.classList.add('run-console');
            runConsole.innerText = run.console;

            runCategoryLabel = document.createElement('label');
            runCategoryLabel.htmlFor = `run-${run.id}-category`;
            runCategoryLabel.innerText = 'Category:';
            runCategory = document.createElement('div');
            runCategory.id = `run-${run.id}-category`;
            runCategory.classList.add('run-category');
            runCategory.innerText = run.category;

            runSetupLabel = document.createElement('label');
            runSetupLabel.htmlFor = `run-${run.id}-setup`;
            runSetupLabel.innerText = 'Setup:';
            runSetup = document.createElement('div');
            runSetup.id = `run-${run.id}-setup`;
            runSetup.classList.add('run-setup');
            runSetup.innerText = run.setupTime;

            runEstimateLabel = document.createElement('label');
            runEstimateLabel.htmlFor = `run-${run.id}-estimate`;
            runEstimateLabel.innerText = 'Estimate:';
            runEstimate = document.createElement('div');
            runEstimate.id = `run-${run.id}-estimate`;
            runEstimate.classList.add('run-estimate');
            runEstimate.innerText = run.estimate;

            runRunnersLabel = document.createElement('label');
            runRunnersLabel.htmlFor = `run-${run.id}-runners`;
            runRunnersLabel.innerText = 'Runners:';
            runRunners = document.createElement('div');
            runRunners.id = `run-${run.id}-runners`;
            runRunners.classList.add('run-runners');
            run.runners.forEach((runner) => {
                runnerElement = document.createElement('span');
                runnerElement.innerText = runner.name + '\n';
                runRunners.appendChild(runnerElement);
            });

            runElement = document.createElement('div');
            runElement.id = `run-${run.id}`;
            runElement.classList.add('run');
            runElement.appendChild(runTitleLabel);
            runElement.appendChild(runTitle);
            runElement.appendChild(runConsoleLabel);
            runElement.appendChild(runConsole);
            runElement.appendChild(runCategoryLabel);
            runElement.appendChild(runCategory);
            runElement.appendChild(runSetupLabel);
            runElement.appendChild(runSetup);
            runElement.appendChild(runEstimateLabel);
            runElement.appendChild(runEstimate);
            runElement.appendChild(runRunnersLabel);
            runElement.appendChild(runRunners);
            runsElement.appendChild(runElement);
        });
    });
    currentRun.on('change', run => {
        if (!run) {
            return;
        }
        currentRunId = run.id;

        const runsElement = document.getElementById('currentRun');
        runsElement.innerHTML = '';

        runTitleLabel = document.createElement('label');
        runTitleLabel.htmlFor = `run-${run.id}-title`;
        runTitleLabel.innerText = 'Title:';
        runTitle = document.createElement('div');
        runTitle.id = `run-${run.id}-title`;
        runTitle.classList.add('run-title');
        runTitle.innerText = run.name;

        runConsoleLabel = document.createElement('label');
        runConsoleLabel.htmlFor = `run-${run.id}-console`;
        runConsoleLabel.innerText = 'Console:';
        runConsole = document.createElement('div');
        runConsole.id = `run-${run.id}-console`;
        runConsole.classList.add('run-console');
        runConsole.innerText = run.console;

        runCategoryLabel = document.createElement('label');
        runCategoryLabel.htmlFor = `run-${run.id}-category`;
        runCategoryLabel.innerText = 'Category:';
        runCategory = document.createElement('div');
        runCategory.id = `run-${run.id}-category`;
        runCategory.classList.add('run-category');
        runCategory.innerText = run.category;

        runSetupLabel = document.createElement('label');
        runSetupLabel.htmlFor = `run-${run.id}-setup`;
        runSetupLabel.innerText = 'Setup:';
        runSetup = document.createElement('div');
        runSetup.id = `run-${run.id}-setup`;
        runSetup.classList.add('run-setup');
        runSetup.innerText = run.setupTime;

        runEstimateLabel = document.createElement('label');
        runEstimateLabel.htmlFor = `run-${run.id}-estimate`;
        runEstimateLabel.innerText = 'Estimate:';
        runEstimate = document.createElement('div');
        runEstimate.id = `run-${run.id}-estimate`;
        runEstimate.classList.add('run-estimate');
        runEstimate.innerText = run.estimate;

        runRunnersLabel = document.createElement('label');
        runRunnersLabel.htmlFor = `run-${run.id}-runners`;
        runRunnersLabel.innerText = 'Runners:';
        runRunners = document.createElement('div');
        runRunners.id = `run-${run.id}-runners`;
        runRunners.classList.add('run-runners');
        run.runners.forEach((runner) => {
            runnerElement = document.createElement('span');
            runnerElement.innerText = runner.name + '\n';
            runRunners.appendChild(runnerElement);
        });

        runElement = document.createElement('div');
        runElement.id = `run-${run.id}`;
        runElement.classList.add('run');
        runElement.appendChild(runTitleLabel);
        runElement.appendChild(runTitle);
        runElement.appendChild(runConsoleLabel);
        runElement.appendChild(runConsole);
        runElement.appendChild(runCategoryLabel);
        runElement.appendChild(runCategory);
        runElement.appendChild(runSetupLabel);
        runElement.appendChild(runSetup);
        runElement.appendChild(runEstimateLabel);
        runElement.appendChild(runEstimate);
        runElement.appendChild(runRunnersLabel);
        runElement.appendChild(runRunners);
        runsElement.innerHTML = "<h1>Current</h1>";
        runsElement.appendChild(runElement);
    });
    nextRun.on('change', run => {
        if (!run) {
            return;
        }

        const runsElement = document.getElementById('nextRun');
        runsElement.innerHTML = '';

        runTitleLabel = document.createElement('label');
        runTitleLabel.htmlFor = `run-${run.id}-title`;
        runTitleLabel.innerText = 'Title:';
        runTitle = document.createElement('div');
        runTitle.id = `run-${run.id}-title`;
        runTitle.classList.add('run-title');
        runTitle.innerText = run.name;

        runConsoleLabel = document.createElement('label');
        runConsoleLabel.htmlFor = `run-${run.id}-console`;
        runConsoleLabel.innerText = 'Console:';
        runConsole = document.createElement('div');
        runConsole.id = `run-${run.id}-console`;
        runConsole.classList.add('run-console');
        runConsole.innerText = run.console;

        runCategoryLabel = document.createElement('label');
        runCategoryLabel.htmlFor = `run-${run.id}-category`;
        runCategoryLabel.innerText = 'Category:';
        runCategory = document.createElement('div');
        runCategory.id = `run-${run.id}-category`;
        runCategory.classList.add('run-category');
        runCategory.innerText = run.category;

        runSetupLabel = document.createElement('label');
        runSetupLabel.htmlFor = `run-${run.id}-setup`;
        runSetupLabel.innerText = 'Setup:';
        runSetup = document.createElement('div');
        runSetup.id = `run-${run.id}-setup`;
        runSetup.classList.add('run-setup');
        runSetup.innerText = run.setupTime;

        runEstimateLabel = document.createElement('label');
        runEstimateLabel.htmlFor = `run-${run.id}-estimate`;
        runEstimateLabel.innerText = 'Estimate:';
        runEstimate = document.createElement('div');
        runEstimate.id = `run-${run.id}-estimate`;
        runEstimate.classList.add('run-estimate');
        runEstimate.innerText = run.estimate;

        runRunnersLabel = document.createElement('label');
        runRunnersLabel.htmlFor = `run-${run.id}-runners`;
        runRunnersLabel.innerText = 'Runners:';
        runRunners = document.createElement('div');
        runRunners.id = `run-${run.id}-runners`;
        runRunners.classList.add('run-runners');
        run.runners.forEach((runner) => {
            runnerElement = document.createElement('span');
            runnerElement.innerText = runner.name + '\n';
            runRunners.appendChild(runnerElement);
        });

        runElement = document.createElement('div');
        runElement.id = `run-${run.id}`;
        runElement.classList.add('run');
        runElement.appendChild(runTitleLabel);
        runElement.appendChild(runTitle);
        runElement.appendChild(runConsoleLabel);
        runElement.appendChild(runConsole);
        runElement.appendChild(runCategoryLabel);
        runElement.appendChild(runCategory);
        runElement.appendChild(runSetupLabel);
        runElement.appendChild(runSetup);
        runElement.appendChild(runEstimateLabel);
        runElement.appendChild(runEstimate);
        runElement.appendChild(runRunnersLabel);
        runElement.appendChild(runRunners);
        runsElement.innerHTML = "<h1>Next</h1>";
        runsElement.appendChild(runElement);
    });
    timeClock.on('change', (value, oldValue = {}) => {
        clockState = value.state;
        const timedateElement = document.getElementById('timedate');
        timedateElement.classList.remove('running');
        timedateElement.classList.remove('stopped');
        timedateElement.classList.remove('paused');
        timedateElement.classList.add(clockStates[clockState]);

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
    total.on('change', totalValue => {
        if (!totalValue) {
            return;
        }
        const totalElement = document.getElementById('total');
        totalElement.innerText = totalValue.formatted;
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
