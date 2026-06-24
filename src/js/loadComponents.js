// Función que carga el contenido HTML de un archivo para inyectarlo en un contenedor
async function loadComponent(id, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar: ${url}`);
        }
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error("Error al cargar el componente:", error);
    }
}

// Cargar el header y el footer cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-container", "./components/header.html");
    loadComponent("footer-container", "./components/footer.html");
});