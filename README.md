# tienda_proyecto

# Proyecto Web de Ecommerce (Frontend)

Este proyecto web de comercio electrónico es un frontend completo desarrollado con HTML5, CSS3, JavaScript y Bootstrap. Simula la interacción con datos de una API pública (FakeStore API) para mostrar productos, gestionar un carrito de compras y simular un proceso de pago con generación de factura en PDF.

## **Requisitos Generales:**

1.  La página es semántica y sigue buenas prácticas de desarrollo web.
2.  Es completamente responsiva y se adapta bien a dispositivos móviles, tablets y escritorios.
3.  Utiliza HTML5, CSS3, JavaScript y Bootstrap para el diseño frontend.
4.  Implementa animaciones y efectos visuales atractivos (hover, transiciones suaves).
5.  Simula la interacción con datos desde la [FakeStore API](https://fakestoreapi.com/).

## **Estructura de la Página:**

1.  **Encabezado (`<header>`):**
    * Incluye un logo: [![Icono](https://cdn-icons-png.freepik.com/256/11181/11181797.png?semt=ais_hybrid)](https://www.freepik.com/)
    * Menú de navegación fijo con enlaces a Inicio, Categorías y Carrito.
    * Icono de carrito con notificación del número de productos añadidos.
2.  **Sección de Inicio:**
    * Título de bienvenida.
    * Texto breve describiendo la tienda.
3.  **Sección de Categorías:**
    * Productos organizados en tarjetas (`<div class="card">`) con:
        * Imagen del producto.
        * Nombre del producto.
        * Precio.
        * Botón "Añadir al carrito".
4.  **Modal de Cantidad:**
    * Aparece antes de añadir un producto al carrito para seleccionar la cantidad.
5.  **Carrito:**
    * Modal que muestra los productos añadidos, su cantidad y el total.
    * Botón para "Pagar".
6.  **Simulación de Pasarela de Pago:**
    * Formulario genérico para introducir datos de pago simulados.
    * Al procesar el pago, genera una factura en formato PDF.

## **Detalles Funcionales:**

1.  **Búsqueda dinámica:** Campo de búsqueda para filtrar productos por nombre o categoría.
2.  **Interacción dinámica (JavaScript):**
    * Carga de productos desde la API y visualización dinámica.
    * Funcionalidad del carrito (añadir, cantidades personalizadas, calcular total).
    * Actualización de la notificación del carrito en tiempo real.
3.  **Generación de factura (jsPDF):**
    * Crea un archivo PDF con los productos comprados y el total.
    * Incluye un formulario para introducir datos de pago y un botón "Pagar" para generar el PDF.
