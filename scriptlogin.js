document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("mail").value.trim();
        const passwordInput = document.getElementById("password").value;

        // Obtener los datos guardados
        const storedUser = JSON.parse(localStorage.getItem("userData"));

        if (!storedUser) {
            alert("No se encontró ningún usuario registrado. Por favor, regístrate primero.");
            return;
        }

        // Validar correo y contraseña
        if (emailInput === storedUser.email && passwordInput === storedUser.password) {
            alert("¡Inicio de sesión exitoso!");
            // Redirigir al usuario a la página principal de su cuenta
            window.location.href = "/Inicio/inicio.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
});
