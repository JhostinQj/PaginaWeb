// ----------------------------
// Sistema de Redirección
// ----------------------------
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("inscripcionForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const objetivo = document.getElementById("objetivo").value;
            const routes = {
                "perder_peso": "PerderPeso.html",
                "mantenerme": "Mantenerme.html",
                "ganar_musculo": "GanarMusculo.html"
            };
            
            if (routes[objetivo]) {
                window.location.href = routes[objetivo];
            } else {
                alert("Por favor, selecciona un objetivo válido.");
            }
        });
    }

    // ----------------------------
    // Sistema de Temporizador de Ejercicios
    // ----------------------------
    const exercises = [
        { 
            name: "Saltar la cuerda", 
            description: "Ejercicio cardiovascular para quemar calorías", 
            image: "saltos.png", 
            reps: "30 saltos" 
        },
        { 
            name: "Burpees", 
            description: "Ejercicio completo que acelera el metabolismo", 
            image: "burpees.jpg", 
            reps: "15 repeticiones" 
        },
        { 
            name: "Sentadillas", 
            description: "Fortalece piernas y glúteos", 
            image: "sentadillas.jpg", 
            reps: "20 repeticiones" 
        },
        { 
            name: "Plancha", 
            description: "Fortalece el core y mejora la postura", 
            image: "plancha.jpg", 
            reps: "30 segundos" 
        }
    ];

    // Variables de estado
    let currentExerciseIndex = 0;
    let timerInterval = null;
    let seconds = 0;
    let isExerciseActive = false;

    // Elementos del DOM con verificaciones
    const getElement = (id) => document.getElementById(id) || console.error(`Elemento ${id} no encontrado`);
    
    const elements = {
        startButton: getElement('start-button'),
        completeButton: getElement('complete-button'),
        nextButton: getElement('next-button'),
        exerciseImg: getElement('exercise-img'),
        exerciseName: getElement('exercise-name'),
        exerciseDesc: getElement('exercise-description'),
        repsCounter: getElement('reps-counter'),
        exerciseTimer: getElement('exercise-timer'),
        greeting: getElement('daily-greeting')
    };

    // Función para actualizar el display del temporizador
    function updateTimerDisplay() {
        if (!elements.exerciseTimer) return;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        elements.exerciseTimer.textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Función para iniciar/detener el temporizador
    function manageTimer(action) {
        if (action === 'start') {
            if (timerInterval) clearInterval(timerInterval);
            seconds = 0;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                seconds++;
                updateTimerDisplay();
            }, 1000);
        } else if (action === 'stop') {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }
    }

    // Función para mostrar el ejercicio actual
    function showCurrentExercise() {
        const exercise = exercises[currentExerciseIndex];
        if (!exercise) return;

        if (elements.exerciseImg) {
            elements.exerciseImg.src = exercise.image;
            elements.exerciseImg.style.display = 'block';
        }
        if (elements.exerciseName) elements.exerciseName.textContent = exercise.name;
        if (elements.exerciseDesc) elements.exerciseDesc.textContent = exercise.description;
        if (elements.repsCounter) elements.repsCounter.textContent = exercise.reps;
        if (elements.exerciseTimer) elements.exerciseTimer.textContent = "00:00";
    }

    // Función para manejar la visibilidad de botones
    function toggleButtons(state) {
        if (!elements.startButton || !elements.completeButton || !elements.nextButton) return;
        
        switch(state) {
            case 'start':
                elements.startButton.style.display = 'none';
                elements.completeButton.style.display = 'inline-block';
                elements.nextButton.style.display = 'none';
                break;
            case 'complete':
                elements.completeButton.style.display = 'none';
                elements.nextButton.style.display = 'inline-block';
                break;
            case 'next':
                elements.nextButton.style.display = 'none';
                elements.startButton.style.display = 'inline-block';
                elements.startButton.textContent = currentExerciseIndex < exercises.length - 1 ? 
                    'Siguiente ejercicio' : 'Comenzar de nuevo';
                break;
            case 'reset':
                elements.nextButton.style.display = 'none';
                elements.completeButton.style.display = 'none';
                elements.startButton.style.display = 'inline-block';
                elements.startButton.textContent = 'Comenzar de nuevo';
                break;
        }
    }

    // Función para iniciar un ejercicio
    function startExercise() {
        if (isExerciseActive) return;
        isExerciseActive = true;
        showCurrentExercise();
        manageTimer('start');
        toggleButtons('start');
    }

    // Función para completar el ejercicio actual
    function completeExercise() {
        if (!isExerciseActive) return;
        isExerciseActive = false;
        manageTimer('stop');
        toggleButtons('complete');
    }

    // Función para pasar al siguiente ejercicio
    function nextExercise() {
        currentExerciseIndex++;
        
        if (currentExerciseIndex >= exercises.length) {
            // Fin de la rutina
            currentExerciseIndex = 0;
            if (elements.exerciseImg) elements.exerciseImg.style.display = 'none';
            if (elements.exerciseName) elements.exerciseName.textContent = "¡Rutina completada!";
            if (elements.exerciseDesc) elements.exerciseDesc.textContent = "Has terminado todos los ejercicios";
            if (elements.repsCounter) elements.repsCounter.textContent = "";
            if (elements.exerciseTimer) elements.exerciseTimer.textContent = "00:00";
            
            toggleButtons('reset');
        } else {
            // Mostrar siguiente ejercicio
            showCurrentExercise();
            toggleButtons('next');
        }
    }

    // Configurar event listeners con verificaciones
    if (elements.startButton) {
        elements.startButton.addEventListener('click', startExercise);
    }
    if (elements.completeButton) {
        elements.completeButton.addEventListener('click', completeExercise);
    }
    if (elements.nextButton) {
        elements.nextButton.addEventListener('click', nextExercise);
    }

    // Inicialización
    showCurrentExercise();
    toggleButtons('next');
});