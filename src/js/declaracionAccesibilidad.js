(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            // Busca el enlace de la Declaración de Accesibilidad en el pie de página
            var footerLinks = document.querySelectorAll('#footer-container a');
            footerLinks.forEach(function (link) {
                var href = link.getAttribute('href');
                if (href && href.includes('declaracionAccesibilidad.html')) {
                    link.setAttribute('aria-current', 'page');
                    // Aplica estilo activo en el pie de página (color blanco y mayor contraste)
                    link.style.color = '#ffffff';
                    link.style.fontWeight = 'bold';
                }
            });
        }, 250); // Pequeño retardo para asegurar que los componentes dinámicos se hayan inyectado
    });
})();
