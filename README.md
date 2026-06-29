# Usabilidad_Accesibilidad_ProyectoFinal

# BibioTec - Plataforma Web Accesible conforme al Ecosistema W3C/WAI

Este repositorio contiene el código fuente de **BibioTec**, una biblioteca digital interactiva y responsiva desarrollada como proyecto final para la asignatura de **Usabilidad y Accesibilidad** de la **Carrera de Ingeniería de Software** en la **Escuela Politécnica Nacional**.

El objetivo central del proyecto es diseñar, implementar y evaluar una interfaz web que demuestre plena conformidad con el **Nivel AA de las Pautas de Accesibilidad para el Contenido Web (WCAG 2.2)**, integrando de manera armoniosa el ecosistema W3C/WAI.

---

## 1. Estructura de Pantallas y Arquitectura del Sitio
1. **Página de Inicio (`index.html`):** Portal de aterrizaje (*landing*) que introduce la plataforma.
2. **Catálogo de Libros (`catalogo.html`):** Presentación interactiva dividida en dos subsecciones.
   * *Libros Populares:* Un carrusel accesible controlado por el usuario de libros populares.
   * *Libros Disponibles:* Un listado de todos los libros publicados.
3. **Detalle del Libro (`detalleLibro.html`):** Vista de un recurso individual. Muestra toda la información del libro disponible.
4. **Acerca de Nosotros (`acercaDe.html`):** Sección institucional que expone la misión, visión y los pilares de inclusión de la biblioteca. Integra un reproductor de video nativo HTML5 con subtítulos sincronizados de respaldo y un acordeón interactivo.
5. **Formulario de Contacto/Sugerencias (`formulario.html`):** Formulario simulado con instrucciones claras, validaciones de campos obligatorios y notificación de errores de forma perceptible.

---

## 2. Tecnologías Utilizadas

* **HTML5 Semántico:** Estructuración pura mediante contenedores nativos (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`).
* **JavaScript:** Lógica modular externa para el control de accesibilidad en componentes interactivos.
* **Tailwind CSS v4:** Framework de diseño utilizado para agilizar la maquetación responsiva y centralizar las variables de color accesibles del sistema.
* **Node.js & NPM:** Entorno de ejecución y gestor de paquetes encargado de controlar los scripts de compilación de estilos.

---

## Para ejecutar
En consola ejecutar los comandos: ```npm install```, ```npm run watch``` (solo actualiza el css), y live server de VSCode. 

