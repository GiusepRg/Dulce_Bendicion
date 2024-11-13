// Función para agregar productos al carrito
function addToCart() {
    const quantitySelect = document.getElementById("quantity");
    const sizeSelect = document.getElementById("size");

    const selectedQuantity = parseInt(quantitySelect.value, 10) || 1;
    const selectedSize = sizeSelect.value || "Unica";

    // Obtener los detalles del producto actual
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    const productoCarrito = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: selectedQuantity,
        size: selectedSize,
        image: product.image
    };

    // Obtener el carrito del localStorage o inicializarlo si no existe
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoCarrito.id && item.size === productoCarrito.size);

    if (productoExistente) {
        productoExistente.quantity += selectedQuantity;
    } else {
        carrito.push(productoCarrito);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Llamar a actualizarCarrito() para refrescar la vista
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito en el header
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Actualizar contador en el header
    const contador = document.querySelector('.item-count');
    if (contador) {
        contador.textContent = carrito.reduce((acc, producto) => acc + producto.quantity, 0);
    }

    // Actualizar contenido desplegable del carrito
    const desplegable = document.querySelector('.carrito-desplegable');
    if (desplegable) {
        desplegable.innerHTML = carrito.map(producto => `
            <div class="producto-carrito">
                <img src="${producto.image}" alt="${producto.name}" class="carrito-img">
                <div class="carrito-info">
                    <p>${producto.name}</p>
                    <p>Tamaño: ${producto.size}</p>
                    <p>Cantidad: ${producto.quantity}</p>
                    <p>Precio: $${producto.price}</p>
                </div>
                <button 
                    class="eliminar" 
                    data-id="${producto.id}" 
                    data-size="${producto.size}">X</button>
            </div>
        `).join('');

        // Agregar el botón "Eliminar Todo" si hay productos en el carrito
        if (carrito.length > 0) {
            desplegable.innerHTML += `
                <button class="vaciar-carrito" onclick="vaciarCarrito()">Eliminar Todo</button>
            `;
        }
    }
}

// Función para eliminar productos individuales del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const idProducto = e.target.dataset.id;
        const sizeProducto = e.target.dataset.size;

        // Obtener el carrito de localStorage y eliminar el producto específico
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(producto => 
            !(producto.id === idProducto && producto.size === sizeProducto)
        );

        // Guardar el carrito actualizado en localStorage y actualizar la vista
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
});

// Función para eliminar todos los productos del carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

// Escuchar cambios en `localStorage` y actualizar el carrito
window.addEventListener("storage", (event) => {
    if (event.key === "carrito") {
        actualizarCarrito();
    }
});
// Función que actualiza el carrito automáticamente cada segundo
setInterval(actualizarCarrito, 1000);

// Inicializar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);
