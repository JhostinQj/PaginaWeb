document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inscripcionForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const routes = {
                "perder_peso": "PerderPeso.html",
                "mantenerme": "Mantenerme.html",
                "ganar_musculo": "GanarMusculo.html"
            };
            window.location.href = routes[document.getElementById("objetivo").value] || alert("Selecciona un objetivo válido.");
        });
    }

    const exercises = [
        { name: "Saltar la cuerda", desc: "Ejercicio cardiovascular", img: "saltos.png", reps: "30 saltos" },
        { name: "Burpees", desc: "Acelera el metabolismo", img: "burpees.jpg", reps: "15 repeticiones" },
        { name: "Sentadillas", desc: "Fortalece piernas", img: "sentadillas.jpg", reps: "20 repeticiones" },
        { name: "Plancha", desc: "Mejora la postura", img: "plancha.jpg", reps: "30 segundos" }
    ];
    
    let index = 0, timer;
    const elements = ["start-button", "complete-button", "next-button", "exercise-img", "exercise-name", "exercise-description", "reps-counter", "exercise-timer"].reduce((acc, id) => {
        acc[id] = document.getElementById(id);
        return acc;
    }, {});
    
    const updateExercise = () => {
        if (index >= exercises.length) return resetRoutine();
        const { name, desc, img, reps } = exercises[index];
        Object.assign(elements["exercise-img"], { src: img, style: "display:block;" });
        elements["exercise-name"].textContent = name;
        elements["exercise-description"].textContent = desc;
        elements["reps-counter"].textContent = reps;
        elements["exercise-timer"].textContent = "00:00";
    };
    
    const startTimer = () => {
        clearInterval(timer);
        let seconds = 0;
        timer = setInterval(() => {
            seconds++;
            elements["exercise-timer"].textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
        }, 1000);
    };
    
    const toggleButtons = (state) => {
        const display = { start: "none", complete: "none", next: "none", restart: "none" };
        display[state] = "inline-block";
        elements["start-button"].style.display = display.start;
        elements["complete-button"].style.display = display.complete;
        elements["next-button"].style.display = display.next;
        
        // Cambiar el texto del botón "next-button" cuando es el último ejercicio
        if (state === "next" && index === exercises.length - 1) {
            elements["next-button"].textContent = "Volver a Empezar";
        } else if (state === "next") {
            elements["next-button"].textContent = "Siguiente";
        }
    };
    
    const startExercise = () => { startTimer(); toggleButtons("complete"); };
    const completeExercise = () => { clearInterval(timer); toggleButtons("next"); };
    const nextExercise = () => { 
        index++; 
        if (index >= exercises.length) {
            index = 0; // Reiniciar el índice
        }
        updateExercise(); 
        toggleButtons("start"); 
    };
    
    const resetRoutine = () => {
        elements["exercise-img"].style.display = "none";
        elements["exercise-name"].textContent = "¡Rutina completada!";
        elements["exercise-description"].textContent = "Has terminado todos los ejercicios";
        elements["reps-counter"].textContent = "";
        elements["exercise-timer"].textContent = "00:00";
        toggleButtons("next"); // Mostrar solo el botón "Volver a Empezar"
    };
    
    elements["start-button"].addEventListener("click", startExercise);
    elements["complete-button"].addEventListener("click", completeExercise);
    elements["next-button"].addEventListener("click", nextExercise);
    updateExercise();
    toggleButtons("start");
});