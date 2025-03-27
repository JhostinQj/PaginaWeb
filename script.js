document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inscripcionForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById("nombre").value,
                age: document.getElementById("edad").value,
                weight: parseFloat(document.getElementById("peso").value),
                height: parseFloat(document.getElementById("altura").value),
                email: document.getElementById("correo").value,
                goal: document.getElementById("objetivo").value
            };
            userData.imc = (userData.weight / (userData.height * userData.height)).toFixed(2);
            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = "PerderPeso.html";
        });
    }
    if (document.getElementById('imc-display')) {
        showUserData();
    }
    const exercises = [
        { name: "Saltar la cuerda", description: "Ejercicio cardiovascular", image: "imagenes/saltos.png", reps: "30 saltos" },
        { name: "Burpees", description: "Acelera el metabolismo", image: "imagenes/burpees.jpg", reps: "15 repeticiones" },
        { name: "Sentadillas", description: "Fortalece piernas", image: "imagenes/sentadillas.jpg", reps: "20 repeticiones" },
        { name: "Plancha", description: "Mejora la postura", image: "imagenes/plancha.jpg", reps: "30 segundos" }
    ];
    
    let index = 0, timer;
    const elements = ["start-button", "complete-button", "next-button", "exercise-img", "exercise-name", "exercise-description", "reps-counter", "exercise-timer"].reduce((acc, id) => {
        acc[id] = document.getElementById(id);
        return acc;
    }, {});
    
    const updateExercise = () => {
        if (index >= exercises.length) return restartRoutine();
        const { name, description, image, reps } = exercises[index];
        Object.assign(elements["exercise-img"], { src: image, style: "display:block;" });
        elements["exercise-name"].textContent = name;
        elements["exercise-description"].textContent = description;
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
        const show = { start: "none", complete: "none", next: "none" };
        show[state] = "inline-block";
        elements["start-button"].style.display = show.start;
        elements["complete-button"].style.display = show.complete;
        elements["next-button"].style.display = show.next;
        
        if (state === "next" && index === exercises.length - 1) {
            elements["next-button"].textContent = "Volver a Empezar";
        }
    };
    
    const startExercise = () => { startTimer(); toggleButtons("complete"); };
    const completeExercise = () => { clearInterval(timer); toggleButtons("next"); };
    const nextExercise = () => { 
        index++; 
        if (index >= exercises.length) index = 0;
        updateExercise(); 
        toggleButtons("start"); 
    };
    
    const restartRoutine = () => {
        elements["exercise-img"].style.display = "none";
        elements["exercise-name"].textContent = "¡Rutina completada!";
        elements["exercise-description"].textContent = "Has terminado todos los ejercicios";
        elements["reps-counter"].textContent = "";
        elements["exercise-timer"].textContent = "00:00";
        toggleButtons("next");
    };
    
    if (elements["start-button"]) elements["start-button"].addEventListener("click", startExercise);
    if (elements["complete-button"]) elements["complete-button"].addEventListener("click", completeExercise);
    if (elements["next-button"]) elements["next-button"].addEventListener("click", nextExercise);
    
    if (elements["exercise-name"]) {
        updateExercise();
        toggleButtons("start");
    }
});

function showUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const imcDisplay = document.getElementById('imc-display');
        if (imcDisplay) {
            let status = "";
            const imcValue = parseFloat(userData.imc);
            
            if (imcValue < 18.5) status = "Bajo peso";
            else if (imcValue < 25) status = "Peso normal";
            else if (imcValue < 30) status = "Sobrepeso";
            else status = "Obesidad";
            
            imcDisplay.innerHTML = ` 
                <h3>Hola ${userData.name}</h3>
                <p><strong>Tu IMC:</strong> ${userData.imc} (${status})</p>
                <p><strong>Peso:</strong> ${userData.weight} kg | <strong>Altura:</strong> ${userData.height} m</p>
                <p><strong>Objetivo:</strong> ${userData.goal === 'perder_peso' ? 'Perder peso' : 
                userData.goal === 'mantenerme' ? 'Mantenerme' : 'Ganar músculo'}</p>
            `;
        }
    }
}
