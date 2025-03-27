document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("inscripcionForm");
    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            const datosUsuario = {
                nombre: document.getElementById("nombre").value,
                edad: document.getElementById("edad").value,
                peso: parseFloat(document.getElementById("peso").value),
                altura: parseFloat(document.getElementById("altura").value),
                correo: document.getElementById("correo").value,
                objetivo: document.getElementById("objetivo").value
            };
            datosUsuario.imc = (datosUsuario.peso / (datosUsuario.altura * datosUsuario.altura)).toFixed(2);
            localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
            window.location.href = "PerderPeso.html";
        });
    }
    if (document.getElementById('imc-display')) {
        mostrarDatosUsuario();
    }
    const ejercicios = [
        { nombre: "Saltar la cuerda", descripcion: "Ejercicio cardiovascular", imagen: "imagenes/saltos.png", repeticiones: "30 saltos" },
        { nombre: "Burpees", descripcion: "Acelera el metabolismo", imagen: "imagenes/burpees.jpg", repeticiones: "15 repeticiones" },
        { nombre: "Sentadillas", descripcion: "Fortalece piernas", imagen: "imagenes/sentadillas.jpg", repeticiones: "20 repeticiones" },
        { nombre: "Plancha", descripcion: "Mejora la postura", imagen: "imagenes/plancha.jpg", repeticiones: "30 segundos" }
    ];
    
    let indice = 0, temporizador;
    const elementos = ["start-button", "complete-button", "next-button", "exercise-img", "exercise-name", "exercise-description", "reps-counter", "exercise-timer"].reduce((acumulador, id) => {
        acumulador[id] = document.getElementById(id);
        return acumulador;
    }, {});
    
    const actualizarEjercicio = () => {
        if (indice >= ejercicios.length) return reiniciarRutina();
        const { nombre, descripcion, imagen, repeticiones } = ejercicios[indice];
        Object.assign(elementos["exercise-img"], { src: imagen, style: "display:block;" });
        elementos["exercise-name"].textContent = nombre;
        elementos["exercise-description"].textContent = descripcion;
        elementos["reps-counter"].textContent = repeticiones;
        elementos["exercise-timer"].textContent = "00:00";
    };
    
    const iniciarTemporizador = () => {
        clearInterval(temporizador);
        let segundos = 0;
        temporizador = setInterval(() => {
            segundos++;
            elementos["exercise-timer"].textContent = `${String(Math.floor(segundos / 60)).padStart(2, '0')}:${String(segundos % 60).padStart(2, '0')}`;
        }, 1000);
    };
    
    const alternarBotones = (estado) => {
        const mostrar = { start: "none", complete: "none", next: "none" };
        mostrar[estado] = "inline-block";
        elementos["start-button"].style.display = mostrar.start;
        elementos["complete-button"].style.display = mostrar.complete;
        elementos["next-button"].style.display = mostrar.next;
        
        if (estado === "next" && indice === ejercicios.length - 1) {
            elementos["next-button"].textContent = "Volver a Empezar";
        }
    };
    
    const empezarEjercicio = () => { iniciarTemporizador(); alternarBotones("complete"); };
    const completarEjercicio = () => { clearInterval(temporizador); alternarBotones("next"); };
    const siguienteEjercicio = () => { 
        indice++; 
        if (indice >= ejercicios.length) indice = 0;
        actualizarEjercicio(); 
        alternarBotones("start"); 
    };
    
    const reiniciarRutina = () => {
        elementos["exercise-img"].style.display = "none";
        elementos["exercise-name"].textContent = "¡Rutina completada!";
        elementos["exercise-description"].textContent = "Has terminado todos los ejercicios";
        elementos["reps-counter"].textContent = "";
        elementos["exercise-timer"].textContent = "00:00";
        alternarBotones("next");
    };
    
    if (elementos["start-button"]) elementos["start-button"].addEventListener("click", empezarEjercicio);
    if (elementos["complete-button"]) elementos["complete-button"].addEventListener("click", completarEjercicio);
    if (elementos["next-button"]) elementos["next-button"].addEventListener("click", siguienteEjercicio);
    
    if (elementos["exercise-name"]) {
        actualizarEjercicio();
        alternarBotones("start");
    }
});
function mostrarDatosUsuario() {
    const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'));
    if (datosUsuario) {
        const imcDisplay = document.getElementById('imc-display');
        if (imcDisplay) {
            let estado = "";
            const valorImc = parseFloat(datosUsuario.imc);
            
            if (valorImc < 18.5) estado = "Bajo peso";
            else if (valorImc < 25) estado = "Peso normal";
            else if (valorImc < 30) estado = "Sobrepeso";
            else estado = "Obesidad";
            
            imcDisplay.innerHTML = ` 
                <h3>Hola ${datosUsuario.nombre}</h3>
                <p><strong>Tu IMC:</strong> ${datosUsuario.imc} (${estado})</p>
                <p><strong>Peso:</strong> ${datosUsuario.peso} kg | <strong>Altura:</strong> ${datosUsuario.altura} m</p>
                <p><strong>Objetivo:</strong> ${datosUsuario.objetivo === 'perder_peso' ? 'Perder peso' : 
                datosUsuario.objetivo === 'mantenerme' ? 'Mantenerme' : 'Ganar músculo'}</p>
            `;
        }
    }
}
