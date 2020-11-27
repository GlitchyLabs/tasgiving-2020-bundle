// const canSeekSchedule = nodecg.Replicant('canSeekSchedule');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const schedule = nodecg.Replicant('schedule');

function setup() {
    const runsElement = document.body
    // canSeekSchedule.on('change', () => {
    //     this._checkButtons();
    // });
    schedule.on('change', runs => {
        if (!runs || runsElement.id !== 'schedule') {
            return;
        }
        runsElement.innerHTML = '';
        runs.forEach((run) => {
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
            runSetup.innerText = run.Setup;

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
    nextRun.on('change', run => {
        if (!run || runsElement.id !== 'nextRun') {
            return;
        }
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
        runSetup.innerText = run.Setup;

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
    currentRun.on('change', run => {
        if (!run || runsElement.id !== 'currentRun') {
            return;
        }
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
        runSetup.innerText = run.Setup;

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

        runNextButton = document.createElement('input');
        runNextButton.type = "button";
        runNextButton.value = "Previous Run";
        runNextButton.onclick = previous;
        runsElement.appendChild(runNextButton);
        runBackButton = document.createElement('input');
        runBackButton.type = "button";
        runBackButton.value = "Next Run";
        runBackButton.onclick = next;
        runsElement.appendChild(runBackButton);
    });
    function next() {
        nodecg.sendMessage('nextRun', () => {});
    }
    function previous() {
        nodecg.sendMessage('previousRun', () => {});
    }
}