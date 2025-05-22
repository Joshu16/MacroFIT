// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Verificar si hay un usuario logueado (de dos formas posibles)
    const usuarioGuardado = localStorage.getItem("usuario") || 
                          (JSON.parse(localStorage.getItem("userData"))?.usuario);
    
    console.log("Usuario en localStorage:", usuarioGuardado); // Depuración
    
    if (usuarioGuardado) {
        console.log("Redirigiendo a inicio..."); // Depuración
        // Intentar varias rutas posibles
        const posiblesRutas = [
            "inicio.html"
        ];
        
        // Redirigir a la primera ruta que exista
        for (const ruta of posiblesRutas) {
            // Verificar si la ruta existe antes de redirigir
            fetch(ruta, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        window.location.href = ruta;
                        return;
                    }
                })
                .catch(() => {});
        }
        
        // Si ninguna ruta funcionó, mostrar error en consola
        console.error("No se pudo encontrar la página de inicio");
        return;
    }
    
    // Si no hay usuario, mostrar el carrusel
    initCarousel();
});

// Datos de gimnasios con URLs de imágenes verificadas
const gimnasios = [
    {
        nombre: 'SmartFIT',
        url: 'https://www.smartfit.cr',
        imagen: 'https://assets.smartfit.com.br/images/new_home_cr/xp_1.webp',
        localidad: 'San Pedro, Curridabat, Escazú, Heredia, Alajuela, Sabana.'
    },
    {
        nombre: 'Golds Gym',
        url: 'https://www.goldsgymcr.com',
        imagen: 'https://static.wixstatic.com/media/bba649_7f4dec8e9edf4dbda871544c2f38d1a9~mv2.png/v1/fill/w_1000,h_567,al_c,q_90,usm_0.66_1.00_0.01/bba649_7f4dec8e9edf4dbda871544c2f38d1a9~mv2.png',
        localidad: 'San José'
    },
    {
        nombre: 'World Gym',
        url: 'https://www.worldgymcr.com',
        imagen: 'https://mercadofitness.com/wp-content/uploads/2023/05/httpswww.worldgymcr.com_.jpg',
        localidad: 'San José'
    }
];

const carousel = document.querySelector('.carousel');
let currentIndex = 0;

// Función para renderizar los gimnasios en el carrusel
function renderGimnasios() {
    carousel.innerHTML = '';
    const gimnasio = gimnasios[currentIndex];

    // Crear un contenedor de imagen
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('carousel-item');

    // Crear la imagen del gimnasio
    const img = document.createElement('img');
    img.src = gimnasio.imagen;
    img.alt = gimnasio.nombre;
    img.onclick = () => window.location.href = gimnasio.url;
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible';
    };

    // Crear elementos de texto
    const nombre = document.createElement('h3');
    nombre.textContent = gimnasio.nombre;

    const localidad = document.createElement('p');
    localidad.classList.add('locality');
    localidad.textContent = gimnasio.localidad;

    // Añadir elementos al contenedor
    imgContainer.appendChild(img);
    imgContainer.appendChild(nombre);
    imgContainer.appendChild(localidad);

    // Añadir al carrusel
    carousel.appendChild(imgContainer);

    // Activar la opacidad después de un pequeño retraso
    setTimeout(() => {
        imgContainer.classList.add('active');
    }, 10);
}

// Funciones de navegación
function prevGimnasio() {
    currentIndex = (currentIndex - 1 + gimnasios.length) % gimnasios.length;
    renderGimnasios();
}

function nextGimnasio() {
    currentIndex = (currentIndex + 1) % gimnasios.length;
    renderGimnasios();
}

// Event listeners
document.getElementById('left-arrow').addEventListener('click', prevGimnasio);
document.getElementById('right-arrow').addEventListener('click', nextGimnasio);

// Inicializar (esto solo se ejecutará si no hay usuario logueado)
renderGimnasios();