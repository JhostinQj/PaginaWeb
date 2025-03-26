document.getElementById('inscripcionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const experiencia = document.getElementById('experiencia').value;

    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.style.display = 'block';

    if (edad < 12 || edad > 100) {
        mensajeDiv.className = 'mensaje error';
        mensajeDiv.textContent = 'Error: La edad debe estar entre 12 y 100 años.';
        return;
    }

    if (!nombre || !edad || !experiencia) {
        mensajeDiv.className = 'mensaje error';
        mensajeDiv.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    let mensaje = '';

    if (edad > 18 && edad <= 35) {
        switch (experiencia) {
            case 'Principiante':
                mensaje = 'Buen Momento para empezar';
                break;
            case 'Intermedio':
                mensaje = 'Vamos Avanzando';
                break;
            case 'Avanzado':
                mensaje = 'Prepárate para Liderar';
                break;
        }
    } else if (edad > 35) {
        mensaje = 'Nunca es tarde para aprender.';
    } else {
        mensaje = 'Genial joven programador, te recomendamos cursos básicos para iniciar.';
    }

    mensajeDiv.className = 'mensaje success';
    mensajeDiv.textContent = mensaje;
});