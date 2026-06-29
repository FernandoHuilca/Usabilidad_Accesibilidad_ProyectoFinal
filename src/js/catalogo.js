document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const toggleBtn = document.getElementById('toggle-carousel-btn');
    const iconPause = toggleBtn.querySelector('.icon-pause');
    const iconPlay = toggleBtn.querySelector('.icon-play');
    
    let isPlaying = true;
    let autoPlayInterval;
    let currentPosition = 0;
    const slideWidth = 250; // Ajustado al tamaño mínimo en CSS
    const totalSlides = document.querySelectorAll('.carousel-slide').length;

    function moveCarousel() {
        currentPosition++;
        if (currentPosition >= totalSlides - 1) {
            currentPosition = 0; // Reinicia cuando llega al final
        }
        track.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
    }

    function startCarousel() {
        autoPlayInterval = setInterval(moveCarousel, 3000); // Se mueve cada 3 segundos
        track.setAttribute('aria-live', 'off'); // Evita que el lector de pantalla lea constantemente
    }

    function stopCarousel() {
        clearInterval(autoPlayInterval);
        track.setAttribute('aria-live', 'polite'); // Informa cambios solo cuando sea prudente
    }

    // Iniciar automáticamente
    startCarousel();

    // Evento del botón de control de accesibilidad
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            stopCarousel();
            toggleBtn.setAttribute('aria-label', 'Reproducir carrusel automático');
            toggleBtn.setAttribute('aria-pressed', 'true');
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
        } else {
            startCarousel();
            toggleBtn.setAttribute('aria-label', 'Pausar carrusel automático');
            toggleBtn.setAttribute('aria-pressed', 'false');
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        }
        isPlaying = !isPlaying;
    });
});