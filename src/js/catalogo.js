/* ============================================================
   catalogo.js — BibioTec
   Carrusel accesible (WCAG 2.2 AA) + Filtros por género
   ============================================================ */

(function () {
    'use strict';

    /* ════════════════════════════════════════
       CARRUSEL
    ════════════════════════════════════════ */
    var track      = document.getElementById('carousel-track');
    var prevBtn    = document.getElementById('carousel-prev');
    var nextBtn    = document.getElementById('carousel-next');
    var pauseBtn   = document.getElementById('carousel-pause');
    var dots       = document.querySelectorAll('.carousel-dot');
    var iconPause  = pauseBtn ? pauseBtn.querySelector('.icon-pause') : null;
    var iconPlay   = pauseBtn ? pauseBtn.querySelector('.icon-play') : null;
    var btnLabel   = pauseBtn ? pauseBtn.querySelector('.carousel-btn-label') : null;

    if (!track) return; // salir si no hay carrusel en la página

    var slides     = track.querySelectorAll('.carousel-slide');
    var total      = slides.length;
    var current    = 0;
    var interval   = null;
    var DELAY      = 2500; // ms entre slides automáticos

    /* Respeta prefers-reduced-motion: no autoplay si el usuario lo pide */
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isPlaying = !prefersReduced; // empieza pausado si reduce-motion activo

    /* ── Ir a un slide específico ── */
    function updateSlideFocusability() {
        slides.forEach(function (slide, i) {
            var active = i === current;
            var cta = slide.querySelector('.carousel-cta');

            slide.setAttribute('aria-hidden', String(!active));

            if (cta) {
                if (active) {
                    cta.removeAttribute('tabindex');
                } else {
                    cta.setAttribute('tabindex', '-1');
                }
            }
        });
    }

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';

        /* Actualizar dots */
        dots.forEach(function (dot, i) {
            var active = i === current;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-pressed', String(active));
        });

        /* Actualizar aria-label de los slides (posición) */
        slides.forEach(function (slide, i) {
            slide.setAttribute('aria-label', (i + 1) + ' de ' + total);
        });

        updateSlideFocusability();
    }

    /* ── Autoplay ── */
    function startAutoplay() {
        if (prefersReduced) return; // nunca autoplay si reduce-motion
        clearInterval(interval);
        interval = setInterval(function () {
            goTo(current + 1);
        }, DELAY);
        isPlaying = true;
        updatePauseBtn();
    }

    function stopAutoplay() {
        clearInterval(interval);
        interval = null;
        isPlaying = false;
        updatePauseBtn();
    }

    function updatePauseBtn() {
        if (!pauseBtn) return;
        if (isPlaying) {
            pauseBtn.setAttribute('aria-label', 'Pausar reproducción automática del carrusel');
            pauseBtn.setAttribute('aria-pressed', 'false');
            if (iconPause) iconPause.style.display = '';
            if (iconPlay)  iconPlay.style.display  = 'none';
            if (btnLabel)  btnLabel.textContent     = 'Pausar';
        } else {
            pauseBtn.setAttribute('aria-label', 'Reanudar reproducción automática del carrusel');
            pauseBtn.setAttribute('aria-pressed', 'true');
            if (iconPause) iconPause.style.display = 'none';
            if (iconPlay)  iconPlay.style.display  = '';
            if (btnLabel)  btnLabel.textContent     = 'Reanudar';
        }
    }

    /* ── Eventos de navegación ── */
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            goTo(current - 1);
            stopAutoplay(); // al navegar manualmente, detener autoplay
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            goTo(current + 1);
            stopAutoplay();
        });
    }

    if (pauseBtn) {
        pauseBtn.addEventListener('click', function () {
            if (isPlaying) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });
    }

    /* Dots */
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goTo(i);
            stopAutoplay();
        });
    });

    /* Teclado en el track: ← → */
    track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goTo(current - 1);
            stopAutoplay();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            goTo(current + 1);
            stopAutoplay();
        }
    });

    /* Pausar al hacer hover/focus (buena práctica WCAG 2.2 - 2.2.2) */
    var carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', function () {
            if (isPlaying) clearInterval(interval);
        });
        carouselWrapper.addEventListener('mouseleave', function () {
            if (isPlaying) startAutoplay();
        });
        carouselWrapper.addEventListener('focusin', function () {
            if (isPlaying) clearInterval(interval);
        });
        carouselWrapper.addEventListener('focusout', function () {
            if (isPlaying) startAutoplay();
        });
    }

    /* ── Inicio ── */
    goTo(0);
    if (isPlaying) {
        startAutoplay();
    } else {
        updatePauseBtn(); // mostrar botón "Reanudar" desde el inicio
    }


    /* ════════════════════════════════════════
       FILTROS POR GÉNERO
    ════════════════════════════════════════ */
    var filterBtns  = document.querySelectorAll('.filter-btn');
    var booksGrid   = document.getElementById('books-grid');
    var noResults   = document.getElementById('no-results');
    var filterStatus = document.getElementById('filter-status');

    if (!booksGrid || filterBtns.length === 0) return;

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var genre = btn.getAttribute('data-genre');

            /* Actualizar estado visual y aria de los botones */
            filterBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');

            /* Mostrar/ocultar tarjetas */
            var items   = booksGrid.querySelectorAll('li');
            var visible = 0;

            items.forEach(function (item) {
                var itemGenre = item.getAttribute('data-genre');
                var show = genre === 'todos' || itemGenre === genre;

                if (show) {
                    item.removeAttribute('hidden');
                    visible++;
                } else {
                    item.setAttribute('hidden', '');
                }
            });

            /* Anuncio para lector de pantalla */
            if (filterStatus) {
                if (genre === 'todos') {
                    filterStatus.textContent = 'Mostrando todos los libros (' + visible + ').';
                } else if (visible === 0) {
                    filterStatus.textContent = 'No se encontraron libros en la categoría ' + btn.textContent.trim() + '.';
                } else {
                    filterStatus.textContent =
                        'Mostrando ' + visible + (visible === 1 ? ' libro' : ' libros') +
                        ' en la categoría ' + btn.textContent.trim() + '.';
                }
            }

            /* Mostrar/ocultar mensaje sin resultados */
            if (noResults) {
                if (visible === 0) {
                    noResults.removeAttribute('hidden');
                } else {
                    noResults.setAttribute('hidden', '');
                }
            }
        });
    });

})();