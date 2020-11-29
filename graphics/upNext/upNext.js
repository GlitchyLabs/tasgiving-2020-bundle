const currentRun = nodecg.Replicant('currentRun');
const schedule = nodecg.Replicant('schedule');

function setup() {
    const overlayElement = document.body
    let currentRunId = 0;
    currentRun.on('change', run => {
        currentRunId = run.id
    });
    schedule.on('change', runs => {
        const start = runs.findIndex(run => run.id == currentRunId);
        const end = start + 5;

        runs.slice(start, end).forEach((run, index) => {
            runElement = document.createElement('div');
            runElement.id = `run-${index}`;
            runElement.classList.add('run');

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

            runElement.appendChild(runTitle);
            runElement.appendChild(runConsole);
            runElement.appendChild(runCategory);
            runElement.appendChild(runReleaseYear);
            runElement.appendChild(runEstimate);
            runElement.appendChild(runRunners);
            overlayElement.appendChild(runElement);
        });
    });
}