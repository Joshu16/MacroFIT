// Función para mostrar la siguiente pantalla
function nextScreen(screenNumber) {
    // Ocultar todas las pantallas
    for (let i = 1; i <= 7; i++) {
        document.getElementById('screen' + i).style.display = 'none';
    }
    // Mostrar la pantalla correspondiente
    document.getElementById('screen' + screenNumber).style.display = 'block';
}

// Función para mostrar la pantalla anterior
function previousScreen(screenNumber) {
    // Ocultar todas las pantallas
    for (let i = 1; i <= 7; i++) {
        document.getElementById('screen' + i).style.display = 'none';
    }
    // Mostrar la pantalla correspondiente
    document.getElementById('screen' + screenNumber).style.display = 'block';
}

// Función para validar y enviar el formulario
function submitForm(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Recoger los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    const genero = document.getElementById("genero").value;
    const frecuencia = document.getElementById("frecuencia").value;

    // Validar que todos los campos tengan un valor
    if (!nombre || !usuario || !email || !password || !confirmPassword || !altura || !peso || !genero || !frecuencia) {
        alert("Por favor, completa todos los campos.");
        return; // Evitar el envío del formulario si hay campos vacíos
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, intenta nuevamente.");
        return;
    }

    // Si todas las validaciones son correctas, guardar los datos en localStorage
    const userData = {
        nombre,
        usuario,
        email,
        password,
        altura,
        peso,
        genero,
        frecuencia
    };

    // Guardar la información en localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Verificar que los datos se guardaron correctamente
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.email === email) {
        alert("¡Registro completado con éxito!");
        window.location.href = 'login.html'; // Cambiar a la página de login o la página que desees
    } else {
        alert("Hubo un error al guardar tus datos. Por favor, intenta nuevamente.");
    }
}

// Agregar el evento de envío al formulario
document.getElementById("registro-form").addEventListener("submit", submitForm);
localStorage.setItem("usuarioRegistrado", "true");
