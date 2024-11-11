// script.js

// Slide de productos
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
});

// Menú desplegable y botón de hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Alternar el menú y el icono hamburguesa en dispositivos móviles
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

// Cierra el menú cuando se hace clic en un enlace (en dispositivos móviles)
navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('show')) {
            navList.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
});

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

    // Actualizar el contador del carrito en el header
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito en el header
function actualizarCarrito() {
    // Obtener el carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Actualizar contador
    const contador = document.querySelector('.item-count');
    contador.textContent = carrito.reduce((acc, producto) => acc + producto.quantity, 0);

    // Actualizar contenido desplegable del carrito
    const desplegable = document.querySelector('.carrito-desplegable');
    desplegable.innerHTML = carrito.map(producto => `
        <div class="producto-carrito">
            <img src="${producto.image}" alt="${producto.name}" class="carrito-img">
            <div class="carrito-info">
                <p>${producto.name}</p>
                <p>Tamaño: ${producto.size}</p>
                <p>Cantidad: ${producto.quantity}</p>
                <p>Precio: $${producto.price}</p>
            </div>
            <button class="eliminar" data-id="${producto.id}" data-size="${producto.size}">X</button>
        </div>
    `).join('');
}

// Función para eliminar productos del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const idProducto = e.target.dataset.id;
        const sizeProducto = e.target.dataset.size;

        // Obtener el carrito de localStorage y eliminar el producto
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(producto => !(producto.id === idProducto && producto.size === sizeProducto));

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Actualizar el contenido del carrito en el header
        actualizarCarrito();
    }
});

// Inicializar el carrito en el header al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);


// Marquee
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
