// loadLayout.js: Carga el header y footer desde archivos HTML externos para mantener la consistencia en todas las páginas del sitio. Esto permite actualizar el header y footer en un solo lugar
(function () {
  'use strict';

  const RUTAS = {
    header: '/src/components/header.html',
    footer: '/src/components/footer.html',
  };

  function cargarComponente(id, ruta) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;

    fetch(ruta)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        // Template parsea en contexto HTML sin romper SVG
        const tpl = document.createElement('template');
        tpl.innerHTML = html;
        // Reemplaza el div placeholder por el contenido real
        placeholder.replaceWith(tpl.content);
      })
      .catch(function (err) {
        console.error('Error cargando ' + ruta + ':', err);
      });
  }

  function init() {
    cargarComponente('header', RUTAS.header);
    cargarComponente('footer', RUTAS.footer);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();