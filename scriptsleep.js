function calcularCiclos() {
    const despertar = document.getElementById("horaDespertar").value;
    const resultado = document.getElementById("resultadoSueño");

    if (!despertar) {
        resultado.textContent = "Por favor, ingresa la hora a la que deseas despertar.";
        return;
    }

    const [h2, m2] = despertar.split(":").map(Number); // Hora y minutos de despertar

    // Convertimos la hora de despertar a minutos
    let minutosDespertar = h2 * 60 + m2;
    
    let opciones = "";
    let horasIdeales = [];

    // Generamos opciones para ciclos de 5 a 6 ciclos
    for (let ciclos = 5; ciclos <= 6; ciclos++) {
        const minutosCiclo = ciclos * 90;  // 90 minutos por ciclo

        // A los 15 minutos para quedarse dormido
        let minutosAcostarse = minutosDespertar - minutosCiclo - 15;  // Restamos 15 minutos para el tiempo de quedarse dormido

        // Si los minutos son negativos, significa que el tiempo de acostarse es en el día anterior
        if (minutosAcostarse < 0) {
            minutosAcostarse += 1440;  // 1440 minutos = 24 horas
        }

        // Convertimos los minutos de la hora de acostarse
        const hora = Math.floor(minutosAcostarse / 60);
        const minutos = minutosAcostarse % 60;

        // Formateamos la hora de acostarse
        const tiempoDormir = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}`;

        // Añadimos las horas recomendadas al listado de opciones
        horasIdeales.push(tiempoDormir);
    }

    // Generamos algunas opciones de 7-8 ciclos de sueño (esto sería más tarde)
    let opcionesTardias = "";

    for (let ciclos = 7; ciclos <= 8; ciclos++) {
        const minutosCiclo = ciclos * 90;  // 90 minutos por ciclo

        let minutosAcostarse = minutosDespertar - minutosCiclo - 15;

        if (minutosAcostarse < 0) {
            minutosAcostarse += 1440;  // Si es negativo, es del día anterior
        }

        const hora = Math.floor(minutosAcostarse / 60);
        const minutos = minutosAcostarse % 60;

        const tiempoDormir = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}`;

        // Añadimos una opción más tarde
        opcionesTardias += `${tiempoDormir} `;
    }

    // Generamos el resultado final
    resultado.innerHTML = `
        <h3>Calculadora de Sueño</h3>
        <p>Una persona normal se queda dormida después de 15 minutos en la cama.</p>
        <br>
        <p>Si quieres despertarte a las <strong>${despertar}</strong>, deberías acostarte a una de estas horas:</p>
        <p><strong>${horasIdeales.join(' ')}</strong></p>
        <br>
        <p><em>Si te acuestas a una de estas horas, te despertarás en ciclos de sueño de 90 minutos. Un buen descanso requiere 5-6 ciclos completos de sueño.</em></p>
        <p><strong>Opciones más tardías:</strong> ${opcionesTardias}</p>
        <p><strong>Consejo:</strong> Dormir en la oscuridad y despertarse con la luz del sol ayuda a despertarse con más energía.</p>
        <br>
        <button id="reiniciar" onclick="reiniciar()">Recalcular</button>
    `;
}

function reiniciar() {
    document.getElementById("horaDespertar").value = "";
    document.getElementById("resultadoSueño").innerHTML = "";
}
