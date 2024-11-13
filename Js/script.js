// script.js
// Slide de productos


// FAQS Animaciones
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
        
        // Alternar el ícono de apertura/cierre (opcional)
        question.classList.toggle('open');
    });
});

// Scroll Animación Web
// Seleccionar todos los elementos que deseas animar al hacer scroll
const scrollItems = document.querySelectorAll('.scroll-item');

// Crear el observer para detectar cuando los elementos entran en vista
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Agrega la clase 'show' cuando el elemento está en vista
        } else {
            entry.target.classList.remove('show'); // Opcional: quita la clase si el elemento sale de la vista
        }
    });
}, {
    threshold: 0.1 // El porcentaje del elemento visible para activar la animación (10%)
});

// Aplicar el observer a cada elemento
scrollItems.forEach(item => observer.observe(item));

// Menu Barra Desplegable
const menuToggle = document.querySelector('#menu-toggle');
const navList = document.querySelector('#nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuToggle.classList.toggle('active');
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
                <button class="eliminar" 
                onclick="EliminarIndividual()"data-id="${producto.id}" data-size="${producto.size}">X</button>
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
function eliminarProductoIndividual(e) {
    if (e.target.classList.contains('eliminar')) {
        const idProducto = e.target.getAttribute('data-id');
        const sizeProducto = e.target.getAttribute('data-size');
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Filtrar productos que no coincidan con el id y tamaño
        carrito = carrito.filter(producto => !(producto.id === idProducto && producto.size === sizeProducto));

        // Guardar el carrito actualizado y actualizar la vista
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Escuchar los clics en el documento y delegar a la función de eliminación
document.addEventListener('click', eliminarProductoIndividual);
function EliminarIndividual() {
    const idProducto = e.target.dataset.id;
        const sizeProducto = e.target.dataset.size;
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito = carrito.filter(producto => !(producto.id === idProducto && producto.size === sizeProducto));

        localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}
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

// Enviar Formulario de Correo
const btn = document.getElementById('button');
const form = document.getElementById('form');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_0ngkqw9';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Enviar';
                alert('Mensaje enviado con éxito!');
                form.reset();
            }, (err) => {
                btn.value = 'Enviar';
                alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
                console.error('EmailJS Error:', JSON.stringify(err));
            });
    });
}

////////////////////////////////

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

///////////////////////////////////////////



//////////////////////////////////
window.addEventListener('scroll', handleScroll);
handleScroll();

// Event listener para el scroll
window.addEventListener('scroll', handleScrollAnimation);

// Inicializar animación en carga
window.addEventListener('load', handleScrollAnimation);
