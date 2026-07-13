// Función que carga el contenido HTML de un archivo para inyectarlo en un contenedor
async function loadComponent(id, url, basePath) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar: ${url}`);
        }
        let html = await response.text();
        // Reemplaza el marcador __BASE__ por la ruta relativa correcta,
        // para que los enlaces internos del header/footer funcionen
        // sin importar la profundidad de la página ni la subruta del sitio
        // (por ejemplo en GitHub Pages: usuario.github.io/repo/...).
        html = html.replaceAll("__BASE__", basePath);
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error("Error al cargar el componente:", error);
    }
}

// Cargar el header y el footer cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const isInSubfolder = window.location.pathname.includes('/detalle-libros/');
    const basePath = isInSubfolder ? '../' : './';

    loadComponent("header-container", `${basePath}components/header.html`, basePath);
    loadComponent("footer-container", `${basePath}components/footer.html`, basePath);
});