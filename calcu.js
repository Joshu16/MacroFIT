document.getElementById('caloriesForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const objetivo = document.getElementById('objetivo').value;

    // Obtener y parsear el usuario desde localStorage
    const usuarioData = JSON.parse(localStorage.getItem('userData'));

    if (!usuarioData || !usuarioData.peso || !usuarioData.altura || !usuarioData.genero) {
        alert("Faltan datos en tu cuenta. Ve a la sección de Cuenta y completa tu perfil.");
        return;
    }

    const peso = parseFloat(usuarioData.peso);
    const altura = parseFloat(usuarioData.altura);
    const sexo = usuarioData.genero.toLowerCase(); // masculino o femenino

    // Usamos una edad fija por ahora (puedes guardarla también si lo deseas)
    const edad = 16;

    // Fórmula de Mifflin-St Jeor
    let tmb;
    if (sexo === "masculino") {
        tmb = 10 * peso + 6.25 * altura - 5 * edad + 5;
    } else {
        tmb = 10 * peso + 6.25 * altura - 5 * edad - 161;
    }

    // Factor de actividad según frecuencia (opcionalmente puedes usar este dato también)
    const mantenimiento = {
        "mantener": tmb * 1.55,
        "perder": tmb * 1.55 - 400,
        "ganar": tmb * 1.55 + 400
    }[objetivo];

    const proteinas = peso * 2;
    const grasas = peso * 1;
    const grasasKcal = grasas * 9;
    const proteinasKcal = proteinas * 4;
    const carbohidratosKcal = mantenimiento - proteinasKcal - grasasKcal;
    const carbohidratos = carbohidratosKcal / 4;

    // Mostrar resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        <h3>Calorías diarias recomendadas: ${Math.round(mantenimiento)} kcal</h3>
        <p>Para tu objetivo de <strong>${objetivo}</strong>, se recomienda el siguiente balance de macronutrientes:</p>
        <ul>
            <li>Proteínas: ${proteinas.toFixed(1)} g</li>
            <li>Carbohidratos: ${carbohidratos.toFixed(1)} g</li>
            <li>Grasas: ${grasas.toFixed(1)} g</li>
        </ul>
    `;
});
