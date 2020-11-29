const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const timeClock = nodecg.Replicant('timeClock');

timeClock.value = {
    state: 0,  // 0 = stopped, 1 = running, 2 = paused
    startTime: new Date(0),
    stopTime: new Date(0)
}