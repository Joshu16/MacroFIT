document.addEventListener('DOMContentLoaded', function() {
    const muscleButton = document.getElementById('muscle-button');
    const weightButton = document.getElementById('weight-button');
    const healthButton = document.getElementById('health-button');
    const homeButton = document.getElementById('home-button');

    const muscleRoutine = document.getElementById('muscle-routine');
    const weightRoutine = document.getElementById('weight-routine');
    const healthRoutine = document.getElementById('health-routine');
    const homeRoutine = document.getElementById('home-routine');

    function showRoutine(routine) {
        muscleRoutine.classList.remove('show');
        weightRoutine.classList.remove('show');
        healthRoutine.classList.remove('show');
        homeRoutine.classList.remove('show');
        
        routine.classList.add('show');
    }

    muscleButton.addEventListener('click', function() {
        showRoutine(muscleRoutine);
    });

    weightButton.addEventListener('click', function() {
        showRoutine(weightRoutine);
    });

    healthButton.addEventListener('click', function() {
        showRoutine(healthRoutine);
    });

    homeButton.addEventListener('click', function() {
        showRoutine(homeRoutine);
    });
});
