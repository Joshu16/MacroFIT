document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript cargado correctamente");

    const addExerciseButton = document.getElementById('add-exercise');
    const saveWorkoutButton = document.getElementById('save-workout');
    const exercisesList = document.getElementById('exercises-list');
    const previousWorkouts = document.getElementById('previous-workouts');
    const workoutTitleInput = document.getElementById('workout-title');
    const clearAllButton = document.getElementById('clear-all');

    function createExerciseEntry() {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-entry';

        const exerciseSelect = document.createElement('select');
        exerciseSelect.innerHTML = `
            <option value="">Selecciona un ejercicio</option>
            <option value="Flexiones">Flexiones</option>
            <option value="Press de Banca">Press de Banca plano</option>
            <option value="Press inclinado">Press de banca inclinado</option>
            <option value="Pec Deck">Pec Deck</option>
            <option value="Dominadas">Dominadas</option>
            <option value="Remo con barra">Remo con barra</option>
            <option value="Jalon al pecho">Jalón al pecho</option>
            <option value="Remo en maquina">Remo en maquina</option>
            <option value="Curl">Curl de bíceps</option>
            <option value="Predicador">Curl predicador</option>
            <option value="ExtensionTriceps">Extensión de tríceps</option>
            <option value="Peso Muerto">Peso Muerto</option>
            <option value="Sentadillas">Sentadillas</option>
            <option value="Extension">Extension de pierna</option>
            <option value="Flexion">Flexión de pierna</option>


        `;

        const seriesContainer = document.createElement('div');
        seriesContainer.className = 'series-container';

        const addSeriesButton = document.createElement('button');
        addSeriesButton.innerText = 'Agregar Serie';
        addSeriesButton.addEventListener('click', (e) => {
            e.preventDefault();
            addSeriesEntry(seriesContainer);
        });

        const deleteExerciseButton = document.createElement('button');
        deleteExerciseButton.innerText = 'Eliminar Ejercicio';
        deleteExerciseButton.addEventListener('click', (e) => {
            e.preventDefault();
            exercisesList.removeChild(exerciseDiv);
        });

        exerciseDiv.appendChild(exerciseSelect);
        exerciseDiv.appendChild(seriesContainer);
        exerciseDiv.appendChild(addSeriesButton);
        exerciseDiv.appendChild(deleteExerciseButton);
        exercisesList.appendChild(exerciseDiv);
    }

    function addSeriesEntry(container) {
        const seriesDiv = document.createElement('div');

        const repsInput = document.createElement('input');
        repsInput.type = 'number';
        repsInput.placeholder = 'Repeticiones';
        repsInput.min = 1;

        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.placeholder = 'Peso (kg)';
        weightInput.min = 0;

        seriesDiv.appendChild(repsInput);
        seriesDiv.appendChild(weightInput);
        container.appendChild(seriesDiv);
    }

    function saveWorkout() {
        const workoutData = [];
        const exerciseEntries = document.querySelectorAll('.exercise-entry');
        const workoutTitle = workoutTitleInput.value.trim() || `Entrenamiento ${new Date().toLocaleDateString()}`;
        const today = new Date().toLocaleDateString();
    
        // Validar que al menos un ejercicio tenga series completadas
        let hasValidExercises = false;
    
        exerciseEntries.forEach(entry => {
            const exercise = entry.querySelector('select').value;
            const seriesEntries = entry.querySelectorAll('.series-container div');
        
            const seriesData = [];
            seriesEntries.forEach(series => {
                const reps = series.querySelector('input[type="number"]').value;
                const weight = series.querySelector('input[type="number"]:nth-of-type(2)').value;
                if (reps || weight) {
                    seriesData.push({
                        reps: reps ? parseInt(reps) : 0,
                        weight: weight ? parseFloat(weight) : 0
                    });
                }
            });
        
            if (exercise && seriesData.length > 0) {
                hasValidExercises = true;
                workoutData.push({
                    exercise,
                    series: seriesData,
                    date: today,
                    title: workoutTitle
                });
            }
        });
    
        if (hasValidExercises) {
            const previousWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];
            previousWorkouts.push(...workoutData);
            localStorage.setItem('workouts', JSON.stringify(previousWorkouts));
            
            // Verificar si la función de racha está disponible
            if (typeof updateTrainingStreak === 'function') {
                updateTrainingStreak(true);
            } else {
                console.warn("La función updateTrainingStreak no está disponible");
                // Guardar la fecha del último entrenamiento como fallback
                localStorage.setItem("lastTrainedDate", today);
            }
            
            displayPreviousWorkouts(previousWorkouts);
            alert('Entrenamiento guardado exitosamente.');
            workoutTitleInput.value = '';
            exercisesList.innerHTML = '';
        } else {
            alert('Por favor, completa al menos un ejercicio con series válidas.');
        }
    }
    
    function getTrainingStreak() {
        let streak = parseInt(localStorage.getItem("trainingStreak")) || 0;
        return streak;
    }
    
    

    function displayPreviousWorkouts(workouts) {
        previousWorkouts.innerHTML = '';

        workouts.forEach((workout, index) => {
            const workoutDiv = document.createElement('div');
            workoutDiv.className = 'workout-item';

            const workoutTitle = document.createElement('h3');
            workoutTitle.innerText = `${workout.title} - ${workout.date}`;
            workoutDiv.appendChild(workoutTitle);

            let totalWeight = 0; // Inicializa la suma total del peso

            workout.series.forEach(series => {
                const entryDiv = document.createElement('div');
                entryDiv.innerText = `${workout.exercise}: ${series.reps} repeticiones, Peso: ${series.weight} kg`;
                workoutDiv.appendChild(entryDiv);
                
                // Calcula el peso total movido para esta serie
                totalWeight += series.reps * series.weight;
            });

            // Muestra la suma total de peso movido
            const totalWeightDiv = document.createElement('div');
            totalWeightDiv.innerText = `Total Peso Movido: ${totalWeight} kg`;
            workoutDiv.appendChild(totalWeightDiv);

            // Botón para borrar el entrenamiento
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Eliminar Entrenamiento';
            //Darle id
            deleteButton.id = 'delete-button';
            deleteButton.addEventListener('click', () => {
                deleteWorkout(index);
            });
            workoutDiv.appendChild(deleteButton);

            previousWorkouts.appendChild(workoutDiv);
        });
    }

    function deleteWorkout(index) {
        let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
        workouts.splice(index, 1);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        displayPreviousWorkouts(workouts);
        alert('Entrenamiento eliminado.');
    }

    function clearAllWorkouts() {
        localStorage.removeItem('workouts');
        previousWorkouts.innerHTML = '';
        alert('Todos los entrenamientos han sido eliminados.');
    }

    addExerciseButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Ejercicio agregado");
        createExerciseEntry();
    });

    saveWorkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Guardar botón clicado");
        saveWorkout();
    });

    clearAllButton.addEventListener('click', (e) => {
        e.preventDefault();
        clearAllWorkouts();
    });

    displayPreviousWorkouts(JSON.parse(localStorage.getItem('workouts')) || []);
});

document.addEventListener("DOMContentLoaded", () => {
    function askWeeklyRoutine() {
        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const routine = {};

        for (let day of days) {
            let muscleGroup = prompt(`¿Qué grupo muscular entrenas el ${day}?`);
            routine[day] = muscleGroup?.trim() || "Descanso";
        }

        localStorage.setItem("weeklyRoutine", JSON.stringify(routine));
    }

    function getTodayRoutine() {
        const routine = JSON.parse(localStorage.getItem("weeklyRoutine"));
        if (!routine) return;

        const todayIndex = new Date().getDay(); // 0 = Domingo, 1 = Lunes...
        const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const todayName = dayNames[todayIndex];
        const muscle = routine[todayName] || "Descanso";

        const todayRoutineDiv = document.createElement("div");
        todayRoutineDiv.className = "today-routine";
        todayRoutineDiv.innerText = `Hoy es ${todayName}. Te toca: ${muscle}`;

        // Insertar al inicio del body (o puedes cambiarlo por otro contenedor)
        document.body.insertBefore(todayRoutineDiv, document.body.firstChild);
    }

    // Verificar si es la primera vez
    if (!localStorage.getItem("weeklyRoutine")) {
        askWeeklyRoutine();
    }

    // Mostrar la rutina del día
    getTodayRoutine();

    // Manejar el botón de edición
    const editBtn = document.getElementById("edit-routine");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            askWeeklyRoutine();
            location.reload();
        });
    }
});
