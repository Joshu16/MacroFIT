// Cargar los datos del usuario desde localStorage
document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
      // Mostrar los datos del usuario en la interfaz
      document.getElementById("nombre-usuario").textContent = userData.usuario;
      document.getElementById("email-usuario").textContent = `Email: ${userData.email}`;
      document.getElementById("peso-usuario").textContent = `Peso: ${userData.peso} kg`;
      document.getElementById("altura-usuario").textContent = `Altura: ${userData.altura} m`;
      document.getElementById("frecuencia-usuario").textContent = `Frecuencia de Entrenamiento: ${userData.frecuencia} días por semana`;
  } else {
      alert("No se encontraron datos del usuario.");
      // Redirigir al usuario a la página de inicio de sesión si no hay datos
      window.location.href = "login.html"; // Cambia esto a la URL de tu página de inicio de sesión
  }
});

// Funciones para mostrar los formularios de cambio
document.getElementById("cambiar-nombre").addEventListener("click", () => {
  document.getElementById("cambiar-nombre-form").style.display = 'block';
});

document.getElementById("cambiar-email").addEventListener("click", () => {
  document.getElementById("cambiar-email-form").style.display = 'block';
});

document.getElementById("cambiar-peso").addEventListener("click", () => {
  document.getElementById("cambiar-peso-form").style.display = 'block';
});

document.getElementById("cambiar-altura").addEventListener("click", () => {
  document.getElementById("cambiar-altura-form").style.display = 'block';
});

document.getElementById("cambiar-frecuencia").addEventListener("click", () => {
  document.getElementById("cambiar-frecuencia-form").style.display = 'block';
});

// Guardar los cambios en los datos
document.getElementById("guardar-nombre").addEventListener("click", () => {
  const nuevoNombre = document.getElementById("nuevo-nombre").value;
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (nuevoNombre && userData) {
      userData.usuario = nuevoNombre; // Actualizar el nombre
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("nombre-usuario").textContent = nuevoNombre;
      document.getElementById("cambiar-nombre-form").style.display = 'none';
      alert("Nombre actualizado correctamente.");
  }
});

// Guardar el cambio de email
document.getElementById("guardar-email").addEventListener("click", () => {
  const nuevoEmail = document.getElementById("nuevo-email").value;
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (nuevoEmail && userData) {
      userData.email = nuevoEmail;
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("email-usuario").textContent = `Email: ${nuevoEmail}`;
      document.getElementById("cambiar-email-form").style.display = 'none';
      alert("Email actualizado correctamente.");
  }
});

// Guardar el cambio de peso
document.getElementById("guardar-peso").addEventListener("click", () => {
  const nuevoPeso = document.getElementById("nuevo-peso").value;
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (nuevoPeso && userData) {
      userData.peso = nuevoPeso;
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("peso-usuario").textContent = `Peso: ${nuevoPeso} kg`;
      document.getElementById("cambiar-peso-form").style.display = 'none';
      alert("Peso actualizado correctamente.");
  }
});

// Guardar el cambio de altura
document.getElementById("guardar-altura").addEventListener("click", () => {
  const nuevaAltura = document.getElementById("nueva-altura").value;
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (nuevaAltura && userData) {
      userData.altura = nuevaAltura;
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("altura-usuario").textContent = `Altura: ${nuevaAltura} m`;
      document.getElementById("cambiar-altura-form").style.display = 'none';
      alert("Altura actualizada correctamente.");
  }
});

// Guardar el cambio de frecuencia
document.getElementById("guardar-frecuencia").addEventListener("click", () => {
  const nuevaFrecuencia = document.getElementById("nueva-frecuencia").value;
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (nuevaFrecuencia && userData) {
      userData.frecuencia = nuevaFrecuencia;
      localStorage.setItem("userData", JSON.stringify(userData));
      document.getElementById("frecuencia-usuario").textContent = `Frecuencia de Entrenamiento: ${nuevaFrecuencia} días por semana`;
      document.getElementById("cambiar-frecuencia-form").style.display = 'none';
      alert("Frecuencia actualizada correctamente.");
  }
});

// Función para cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
  localStorage.clear(); // Eliminar los datos del usuario del localStorage
  alert("Has cerrado sesión correctamente.");
  window.location.href = "login.html"; // Redirigir al usuario a la página de inicio de sesión
});
