// script.js

// Slide de productos
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let isTransitioning = false; // Variable para controlar la transición

next.addEventListener('click', function() {
    if (isTransitioning) return; // Salir si ya está en transición
    isTransitioning = true;

    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);

    setTimeout(() => {
        isTransitioning = false; // Permitir clic después de la transición
    }, 500); // Duración de la transición en milisegundos
});

prev.addEventListener('click', function() {
    if (isTransitioning) return; // Salir si ya está en transición
    isTransitioning = true;

    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);

    setTimeout(() => {
        isTransitioning = false; // Permitir clic después de la transición
    }, 500); // Duración de la transición en milisegundos
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

// Función para abrir/cerrar el carrito desplegable
function toggleCarrito() {
    const desplegable = document.querySelector('.carrito-desplegable');
    desplegable.style.display = desplegable.style.display === 'block' ? 'none' : 'block';
}

// Función para agregar productos al carrito
function addToCart() {
    const quantitySelect = document.getElementById("quantity");
    const sizeSelect = document.getElementById("size");

    const selectedQuantity = parseInt(quantitySelect.value, 10) || 1;
    const selectedSize = sizeSelect.value || "Unica";

    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    const productoCarrito = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: selectedQuantity,
        size: selectedSize,
        image: product.image
    };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(item => item.id === productoCarrito.id && item.size === productoCarrito.size);

    if (productoExistente) {
        productoExistente.quantity += selectedQuantity;
    } else {
        carrito.push(productoCarrito);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito en el header
function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const contador = document.querySelector('.item-count');
    if (contador) {
        contador.textContent = carrito.reduce((acc, producto) => acc + producto.quantity, 0);
    }

    const desplegable = document.querySelector('.carrito-desplegable');
    if (desplegable) {
        desplegable.innerHTML = carrito.map(producto => `
            <div class="producto-carrito">
                <img src="${producto.image}" alt="${producto.name}" class="carrito-img">
                <div class="carrito-info">
                    <p>${producto.name}</p>
                    <p>${producto.size}</p>
                    <p>${producto.quantity} x $${producto.price}</p>
                </div>
                <button class="eliminar" data-id="${producto.id}" data-size="${producto.size}">X</button>
            </div>
        `).join('');

        if (carrito.length > 0) {
            desplegable.innerHTML += `
                <div class="botones-acciones">
                    <button class="vaciar-carrito" onclick="vaciarCarrito()">Eliminar Todo</button>
                    <button class="ir-al-carrito" onclick="irAlCarrito()">
                        <img src="/Dulce_Bendicion/Img/Cesta.png" alt="Ir al Carrito">
                    </button>
                </div>
            `;
        }
    }
}

// Eliminar producto individual del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const idProducto = e.target.dataset.id;
        const sizeProducto = e.target.dataset.size;

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(producto => !(producto.id === idProducto && producto.size === sizeProducto));

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
});

// Vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

// Ir a la página del carrito
function irAlCarrito() {
    window.location.href = "/Dulce_Bendicion/Usuario/Paginas/CarritoDeCompras.html";
}

// Detectar cambios en `localStorage` y actualizar el carrito
window.addEventListener("storage", (event) => {
    if (event.key === "carrito") {
        actualizarCarrito();
    }
});

// Inicializar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", actualizarCarrito);

// Marquee
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
