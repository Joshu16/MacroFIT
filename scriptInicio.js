// Cargar los datos del usuario desde localStorage
document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    if (userData) {
        // Mostrar los datos del usuario en la interfaz
        document.getElementById("nombre-usuario").textContent = userData.usuario;
        document.getElementById("email-usuario").textContent = `Email: ${userData.email}`;
        document.getElementById("peso-usuario").textContent = `Peso: ${userData.peso} kg`;
        document.getElementById("altura-usuario").textContent = `Altura: ${userData.altura} m`;
        document.getElementById("frecuencia-usuario").textContent = `Frecuencia de Entrenamiento: ${userData.frecuencia} días por semana`;
    } else {
        alert("No se encontraron datos del usuario.");
        // Redirigir al usuario a la página de inicio de sesión si no hay datos
        window.location.href = "/index.html"; // Cambia esto a la URL de tu página de inicio de sesión
    }
  });

document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.nombre) {
        document.getElementById("nombre-usuario").textContent = userData.nombre;
    } else {
        document.getElementById("nombre-usuario").textContent = "Usuario";
    }
});

// Datos de gimnasios con URLs de imágenes verificadas
const gimnasios = [
    {
        nombre: 'SmartFIT',
        url: 'https://www.smartfit.cr',
        imagen: 'https://assets.smartfit.com.br/images/new_home_cr/xp_1.webp',
        localidad: 'San Pedro, Curridabat, Escazú, Heredia, Alajuela, Sabana.'
    },
    {
        nombre: 'Golds Gym',
        url: 'https://www.goldsgymcr.com',
        imagen: 'https://static.wixstatic.com/media/bba649_7f4dec8e9edf4dbda871544c2f38d1a9~mv2.png/v1/fill/w_1000,h_567,al_c,q_90,usm_0.66_1.00_0.01/bba649_7f4dec8e9edf4dbda871544c2f38d1a9~mv2.png',
        localidad: 'San José'
    },
    {
        nombre: 'World Gym',
        url: 'https://www.worldgymcr.com',
        imagen: 'https://mercadofitness.com/wp-content/uploads/2023/05/httpswww.worldgymcr.com_.jpg',
        localidad: 'San José'
    }
];

const carousel = document.querySelector('.carousel');
let currentIndex = 0;

// Función para renderizar los gimnasios en el carrusel
function renderGimnasios() {
    carousel.innerHTML = '';
    const gimnasio = gimnasios[currentIndex];

    // Crear un contenedor de imagen
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('carousel-item');

    // Crear la imagen del gimnasio
    const img = document.createElement('img');
    img.src = gimnasio.imagen;
    img.alt = gimnasio.nombre;
    img.onclick = () => window.location.href = gimnasio.url;
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    };

    // Crear elementos de texto
    const nombre = document.createElement('h3');
    nombre.textContent = gimnasio.nombre;

    const localidad = document.createElement('p');
    localidad.classList.add('locality');
    localidad.textContent = gimnasio.localidad;

    // Añadir elementos al contenedor
    imgContainer.appendChild(img);
    imgContainer.appendChild(nombre);
    imgContainer.appendChild(localidad);

    // Añadir al carrusel
    carousel.appendChild(imgContainer);

    // Activar la opacidad después de un pequeño retraso
    setTimeout(() => {
        imgContainer.classList.add('active');
    }, 10);
}

// Funciones de navegación
function prevGimnasio() {
    currentIndex = (currentIndex - 1 + gimnasios.length) % gimnasios.length;
    renderGimnasios();
}

function nextGimnasio() {
    currentIndex = (currentIndex + 1) % gimnasios.length;
    renderGimnasios();
}

// Event listeners
document.getElementById('left-arrow').addEventListener('click', prevGimnasio);
document.getElementById('right-arrow').addEventListener('click', nextGimnasio);

// Inicializar
renderGimnasios();

document.addEventListener("DOMContentLoaded", () => {
    const rutina = JSON.parse(localStorage.getItem("weeklyRoutine"));

    if (rutina) {
        const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const today = new Date().getDay(); // 0 = Domingo
        const todayName = dayNames[today];
        const muscleGroup = rutina[todayName] || "Descanso";

        const rutinaDiaElem = document.getElementById("rutina-dia");
        if (rutinaDiaElem) {
            rutinaDiaElem.textContent = muscleGroup;
        }
    } else {
        // Si no hay rutina guardada, puedes redirigir o pedir que la configure
        alert("Primero debes configurar tu rutina semanal.");
        window.location.href = "inicio.html"; // O donde configures la rutina
    }
});

function loadFromLocalStorage() {
    totalCalories = parseFloat(localStorage.getItem('totalCalories')) || 0;
    totalProtein = parseFloat(localStorage.getItem('totalProtein')) || 0;
    selectedFoods = JSON.parse(localStorage.getItem('selectedFoods')) || [];

    updateTotals();
    const selectedFoodsDiv = document.getElementById('selectedFoods');
    updateSelectedFoodsDisplay(selectedFoodsDiv);
}
document.addEventListener("DOMContentLoaded", () => {
    const caloriasElemento = document.getElementById("calorias-diarias");
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    const savedDate = localStorage.getItem("caloriasFecha");
    if (savedDate !== today) {
        // Nuevo día: reinicia calorías
        localStorage.setItem("totalCalories", "0");
        localStorage.setItem("caloriasFecha", today);
    }

    const totalCalories = parseFloat(localStorage.getItem("totalCalories")) || 0;
    caloriasElemento.textContent = `${totalCalories} kcal`;
});

// Función para verificar y reiniciar el conteo de agua diario
function verificarResetDiarioAgua() {
    const fechaGuardada = localStorage.getItem("fechaAgua");
    const hoy = new Date().toISOString().split("T")[0];

    if (fechaGuardada !== hoy) {
        localStorage.setItem("mililitrosTotales", "0");
        localStorage.setItem("fechaAgua", hoy);
    }
}

// Función para verificar y reiniciar el registro de sueño diario
function verificarResetDiarioSueno() {
    const fechaGuardada = localStorage.getItem("fechaSueno");
    const hoy = new Date().toISOString().split("T")[0];

    if (fechaGuardada !== hoy) {
        localStorage.setItem("horasSueno", "0");
        localStorage.setItem("fechaSueno", hoy);
    }
}

// Llamamos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    verificarResetDiarioAgua();
    verificarResetDiarioSueno();
    actualizarMililitrosAgua();
    actualizarHorasSueno();
});

function cambiarMlBotella() {
    const entrada = prompt("Nuevo tamaño de la botella en mililitros:");
    const nuevoMl = parseInt(entrada);
    if (isNaN(nuevoMl) || nuevoMl <= 0) {
        alert("Cantidad inválida.");
        return;
    }
    localStorage.setItem("mlPorBotella", nuevoMl.toString());
    alert(`Tamaño de botella actualizado a ${nuevoMl} ml.`);
}


function registrarBotellaAgua() {
    verificarResetDiarioAgua();

    let mlPorBotella = parseInt(localStorage.getItem("mlPorBotella"));
    if (!mlPorBotella || isNaN(mlPorBotella)) {
        const entrada = prompt("¿Cuántos mililitros tiene tu botella? (Ej: 500)");
        mlPorBotella = parseInt(entrada);
        if (isNaN(mlPorBotella) || mlPorBotella <= 0) {
            alert("Cantidad inválida.");
            return;
        }
        localStorage.setItem("mlPorBotella", mlPorBotella.toString());
    }

    const confirmacion = confirm(`¿Tomaste una botella de ${mlPorBotella} ml?`);
    if (confirmacion) {
        let mlTotales = parseInt(localStorage.getItem("mililitrosTotales")) || 0;
        mlTotales += mlPorBotella;
        localStorage.setItem("mililitrosTotales", mlTotales.toString());
        actualizarMililitrosAgua();
    }
}

function actualizarMililitrosAgua() {
    const ml = parseInt(localStorage.getItem("mililitrosTotales")) || 0;
    const litros = (ml / 1000).toFixed(2);
    document.getElementById("litros-agua").textContent = `${litros} L`;
}

// Función para registrar horas de sueño

function registrarHorasSueno() {
    verificarResetDiarioSueno(); // Verificamos si es un nuevo día
    
    const horaDormir = prompt("¿A qué hora te dormiste? (formato 24h, Ej: 23:30)");
    const horaDespertar = prompt("¿A qué hora te levantaste? (formato 24h, Ej: 07:00)");

    if (!horaDormir || !horaDespertar) {
        alert("Debes ingresar ambas horas.");
        return;
    }

    const [hDormir, mDormir] = horaDormir.split(":").map(Number);
    const [hDespertar, mDespertar] = horaDespertar.split(":").map(Number);

    if (
        isNaN(hDormir) || isNaN(mDormir) || hDormir > 23 || mDormir > 59 ||
        isNaN(hDespertar) || isNaN(mDespertar) || hDespertar > 23 || mDespertar > 59
    ) {
        alert("Formato de hora incorrecto.");
        return;
    }

    const fechaHoy = new Date();
    const dormir = new Date(fechaHoy);
    dormir.setHours(hDormir, mDormir, 0);

    const despertar = new Date(fechaHoy);
    despertar.setHours(hDespertar, mDespertar, 0);

    // Si se durmió y despertó el día siguiente
    if (despertar <= dormir) {
        despertar.setDate(dormir.getDate() + 1);
    }

    const msDormidos = despertar - dormir;
    const horasDormidas = (msDormidos / (1000 * 60 * 60)).toFixed(2);

    localStorage.setItem("horasSueno", horasDormidas);
    localStorage.setItem("fechaSueno", new Date().toISOString().split("T")[0]); // Actualizamos la fecha
    actualizarHorasSueno();
}

function actualizarHorasSueno() {
    const horas = localStorage.getItem("horasSueno") || "0";
    document.getElementById("horas-sueño").textContent = `${horas} h`;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("inicio.js cargado correctamente");

    // Elementos del DOM
    const streakElement = document.getElementById('training-streak');
    const todayRoutineElement = document.getElementById('today-routine');
    const editRoutineBtn = document.getElementById('edit-routine');

    // 1. Sistema de Rutina Semanal
    function initializeWeeklyRoutine() {
        if (!localStorage.getItem("weeklyRoutine")) {
            askWeeklyRoutine();
        }
        showTodayRoutine();
    }

    function askWeeklyRoutine() {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const routine = {};

        for (let day of days) {
            let muscleGroup = prompt(`¿Qué grupo muscular entrenas el ${day}? (Deja en blanco para descanso)`);
            routine[day] = muscleGroup?.trim() || "Descanso";
        }

        localStorage.setItem("weeklyRoutine", JSON.stringify(routine));
        return routine;
    }

    function showTodayRoutine() {
        const routine = JSON.parse(localStorage.getItem("weeklyRoutine"));
        if (!routine) return;

        const todayIndex = new Date().getDay(); // 0=Domingo, 1=Lunes...
        const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const todayName = dayNames[todayIndex];
        const muscle = routine[todayName] || "Descanso";

        if (todayRoutineElement) {
            todayRoutineElement.innerHTML = `
                <h3>Rutina de Hoy</h3>
                <p><strong>${todayName}:</strong> ${muscle}</p>
                ${muscle === "Descanso" ? '' : '<p class="reminder">¡No olvides entrenar hoy!</p>'}
            `;
        }
    }

    // 2. Sistema de Racha de Entrenamiento
    function initializeTrainingStreak() {
        if (!streakElement) return;

        // Verificar racha al cargar
        updateTrainingStreak();
        displayTrainingStreak();
    }

    function getTrainingStreak() {
        return parseInt(localStorage.getItem("trainingStreak")) || 0;
    }

    function updateTrainingStreak(trainedToday = false) {
        const today = new Date().toLocaleDateString();
        const lastCheckDate = localStorage.getItem("lastStreakCheck");
        const streak = getTrainingStreak();
        const lastTrainedDate = localStorage.getItem("lastTrainedDate");

        // Evitar múltiples verificaciones en un mismo día
        if (lastCheckDate === today && !trainedToday) return;

        const routine = JSON.parse(localStorage.getItem("weeklyRoutine")) || {};
        const todayIndex = new Date().getDay();
        const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const todayName = dayNames[todayIndex];
        const todayMuscle = routine[todayName] || "Descanso";

        // Lógica principal de la racha
        if (trainedToday) {
            handleTrainingSession(today, lastTrainedDate, streak);
        } else if (todayMuscle !== "Descanso" && lastCheckDate !== today) {
            handleMissedTrainingDay();
        }

        // Actualizar últimos registros
        localStorage.setItem("lastStreakCheck", today);
        displayTrainingStreak();
    }

    function handleTrainingSession(today, lastTrainedDate, streak) {
        if (!lastTrainedDate) {
            // Primer entrenamiento registrado
            localStorage.setItem("trainingStreak", "1");
        } else {
            const lastDate = new Date(lastTrainedDate);
            const nextDay = new Date(lastDate.setDate(lastDate.getDate() + 1)).toLocaleDateString();
            
            if (nextDay === today) {
                // Día consecutivo
                localStorage.setItem("trainingStreak", streak + 1);
            } else if (lastTrainedDate !== today) {
                // No es consecutivo, reiniciar
                localStorage.setItem("trainingStreak", "1");
            }
        }
        localStorage.setItem("lastTrainedDate", today);
    }

    function handleMissedTrainingDay() {
        // Verificar si el usuario no entrenó cuando debía
        const today = new Date().toLocaleDateString();
        const lastTrainedDate = localStorage.getItem("lastTrainedDate");
        
        if (lastTrainedDate !== today) {
            localStorage.setItem("trainingStreak", "0");
        }
    }

    function displayTrainingStreak() {
        if (!streakElement) return;
        const streak = getTrainingStreak();
        streakElement.innerHTML = `
            <h3>Racha Actual</h3>
            <p class="streak-count">${streak} día${streak !== 1 ? 's' : ''}</p>
            ${streak > 2 ? '<p class="motivation">¡Sigue así!</p>' : ''}
        `;
    }

    // 3. Event Listeners
    if (editRoutineBtn) {
        editRoutineBtn.addEventListener('click', () => {
            askWeeklyRoutine();
            showTodayRoutine();
        });
    }

    // 4. Inicialización
    initializeWeeklyRoutine();
    initializeTrainingStreak();

    // Hacer funciones accesibles globalmente
    window.updateTrainingStreak = updateTrainingStreak;
    window.getTrainingStreak = getTrainingStreak;
});



