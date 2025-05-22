document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offset = 250; // Ajusta esto según tu header fijo (en píxeles)
            const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: topPos,
                behavior: 'smooth'
            });
        }
    });
});
