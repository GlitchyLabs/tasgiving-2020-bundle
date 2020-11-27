const total = nodecg.Replicant('total');

function setup() {
    total.on('change', totalValue => {
        console.log(totalValue);
        if (!totalValue) {
            return;
        }
		const totalElement = document.getElementById('total');
		totalElement.innerText = totalValue.formatted;
	});
}