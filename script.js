document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inscripcionForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            // Obtener los datos del formulario
            const userData = {
                nombre: document.getElementById("nombre").value,
                edad: document.getElementById("edad").value,
                peso: parseFloat(document.getElementById("peso").value),
                altura: parseFloat(document.getElementById("altura").value),
                correo: document.getElementById("correo").value,
                objetivo: document.getElementById("objetivo").value
            };
            
            // Calcular IMC
            userData.imc = (userData.peso / (userData.altura * userData.altura)).toFixed(2);
            
            // Guardar datos en localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Redirigir siempre a PerderPeso.html
            window.location.href = "PerderPeso.html";
        });
    }
    
    // Mostrar datos del usuario si estamos en la página de ejercicios
    if (document.getElementById('imc-display')) {
        mostrarDatosUsuario();
    }

    // Ejercicios de la rutina
    const exercises = [
        { name: "Saltar la cuerda", desc: "Ejercicio cardiovascular", img: "imagenes/saltos.png", reps: "30 saltos" },
        { name: "Burpees", desc: "Acelera el metabolismo", img: "imagenes/burpees.jpg", reps: "15 repeticiones" },
        { name: "Sentadillas", desc: "Fortalece piernas", img: "imagenes/sentadillas.jpg", reps: "20 repeticiones" },
        { name: "Plancha", desc: "Mejora la postura", img: "imagenes/plancha.jpg", reps: "30 segundos" }
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
        const display = { start: "none", complete: "none", next: "none" };
        display[state] = "inline-block";
        elements["start-button"].style.display = display.start;
        elements["complete-button"].style.display = display.complete;
        elements["next-button"].style.display = display.next;
        
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
    
    const resetRoutine = () => {
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

// Función para mostrar datos del usuario e IMC
function mostrarDatosUsuario() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        const imcDisplay = document.getElementById('imc-display');
        if (imcDisplay) {
            // Interpretar el IMC
            let estado = "";
            const imcValue = parseFloat(userData.imc);
            
            if (imcValue < 18.5) estado = "Bajo peso";
            else if (imcValue < 25) estado = "Peso normal";
            else if (imcValue < 30) estado = "Sobrepeso";
            else estado = "Obesidad";
            
            imcDisplay.innerHTML = ` 
                <h3>Hola ${userData.nombre}</h3>
                <p><strong>Tu IMC:</strong> ${userData.imc} (${estado})</p>
                <p><strong>Peso:</strong> ${userData.peso} kg | <strong>Altura:</strong> ${userData.altura} m</p>
                <p><strong>Objetivo:</strong> ${userData.objetivo === 'perder_peso' ? 'Perder peso' : 
                userData.objetivo === 'mantenerme' ? 'Mantenerme' : 'Ganar músculo'}</p>
            `;
        }
    }
}
