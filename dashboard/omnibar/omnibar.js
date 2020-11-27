const total = nodecg.Replicant('total');

function setup() {
	total.on('change', total => {
		console.log(total);
	});
}
