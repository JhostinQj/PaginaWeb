document.getElementById("inscripcionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    let objetivo = document.getElementById("objetivo").value;

    if (objetivo === "perder_peso") {
        window.location.href = "PerderPeso.html";
    } else if (objetivo === "mantenerme") {
        window.location.href = "Mantenerme.html";
    } else if (objetivo === "ganar_musculo") {
        window.location.href = "GanarMusculo.html";
    } else {
        alert("Por favor, selecciona un objetivo válido.");
    }
});
