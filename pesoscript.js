function convertWeight() {
    const weightInput = document.getElementById('weight').value;
    const unit = document.getElementById('unit').value;
    let resultText = '';

    if (weightInput === '' || isNaN(weightInput)) {
        resultText = 'Por favor, ingresa un peso válido.';
    } else {
        const weight = parseFloat(weightInput);
        if (unit === 'kg') {
            const lbs = weight * 2.20462;
            resultText = `${weight} kilogramos son aproximadamente ${lbs.toFixed(2)} libras.`;
        } else if (unit === 'lb') {
            const kgs = weight / 2.20462;
            resultText = `${weight} libras son aproximadamente ${kgs.toFixed(2)} kilogramos.`;
        }
    }

    document.getElementById('resultText').innerText = resultText;
}
