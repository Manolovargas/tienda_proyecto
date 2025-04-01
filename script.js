document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const carritoCount = document.getElementById('carrito-count');
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotalElement = document.getElementById('carrito-total');
    const searchInput = document.getElementById('search-input');
    const cantidadModal = new bootstrap.Modal(document.getElementById('cantidadModal'));
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    const pagoModal = new bootstrap.Modal(document.getElementById('pagoModal'));
    const agregarAlCarritoBtn = document.getElementById('agregar-al-carrito-btn');
    const cantidadInput = document.getElementById('cantidad');
    const productoIdInput = document.getElementById('producto-id');
    const pagarBtn = document.getElementById('pagar-btn');
    const formularioPago = document.getElementById('formulario-pago');

    let productos = [];
    let carrito = [];

    // Función para cargar los productos desde la API
    async function cargarProductos() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            productos = await response.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            productosContainer.innerHTML = '<div class="alert alert-danger">Error al cargar los productos. Por favor, intenta nuevamente más tarde.</div>';
        }
    }

    // Función para mostrar los productos en la interfaz
    function mostrarProductos(productosParaMostrar) {
        productosContainer.innerHTML = '';
        productosParaMostrar.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('col');
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">$${producto.price}</p>
                        <button class="btn btn-primary add-to-cart-btn" data-id="${producto.id}">Añadir al Carrito</button>
                    </div>
                </div>
            `;
            productosContainer.appendChild(card);
        });

        // Agregar event listeners a los botones "Añadir al carrito" después de cargarlos
        const botonesAgregar = document.querySelectorAll('.add-to-cart-btn');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                productoIdInput.value = productId;
                cantidadModal.show();
            });
        });
    }

    // Evento para añadir producto al carrito desde el modal de cantidad
    agregarAlCarritoBtn.addEventListener('click', () => {
        const productId = parseInt(productoIdInput.value);
        const cantidad = parseInt(cantidadInput.value);
        const producto = productos.find(p => p.id === productId);

        if (producto) {
            const existingItem = carrito.find(item => item.id === productId);
            if (existingItem) {
                existingItem.cantidad += cantidad;
            } else {
                carrito.push({ ...producto, cantidad });
            }
            actualizarCarritoUI();
            cantidadModal.hide();
        }
    });

    // Función para actualizar la interfaz del carrito
    function actualizarCarritoUI() {
        carritoItems.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listItem.innerHTML = `
                <div>
                    ${item.title} (x${item.cantidad})
                </div>
                <span>$${(item.price * item.cantidad).toFixed(2)}</span>
            `;
            carritoItems.appendChild(listItem);
            total += item.price * item.cantidad;
        });
        carritoTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        carritoCount.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    }

    // Evento para filtrar productos por búsqueda
    searchInput.addEventListener('input', () => {
        const textoBusqueda = searchInput.value.toLowerCase();
        const productosFiltrados = productos.filter(producto =>
            producto.title.toLowerCase().includes(textoBusqueda) ||
            producto.category.toLowerCase().includes(textoBusqueda)
        );
        mostrarProductos(productosFiltrados);
    });

    // Evento para generar la factura en PDF al enviar el formulario de pago
    formularioPago.addEventListener('submit', function(event) {
        event.preventDefault();
        pagoModal.hide();
        carritoModal.hide();
        generarFacturaPDF();
        carrito = [];
        actualizarCarritoUI();
        alert('¡Pago realizado con éxito! Se ha generado la factura.');
        formularioPago.reset();
    });

    // Función para generar la factura en PDF
    function generarFacturaPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        pdf.setFontSize(20);
        pdf.text('Factura de Compra', 10, 10);
        pdf.setFontSize(12);
        let y = 30;
        carrito.forEach(item => {
            pdf.text(`${item.title} (x${item.cantidad}) - $${(item.price * item.cantidad).toFixed(2)}`, 10, y);
            y += 10;
        });
        pdf.setFontSize(16);
        pdf.text(`Total: $${carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0).toFixed(2)}`, 10, y + 10);
        pdf.save('factura.pdf');
    }

    // Cargar los productos al cargar la página
    cargarProductos();
});