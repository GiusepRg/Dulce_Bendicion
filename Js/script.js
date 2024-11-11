// script.js

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

// Simulación de artículos de blog
const articles = [
    {
        title: "Artículo 1",
        description: "Esta es una breve descripción del artículo 1. Explora más para conocer los detalles.",
        link: "articulo1.html"
    },
    {
        title: "Artículo 2",
        description: "Una breve introducción sobre el artículo 2. Haz clic para saber más.",
        link: "articulo2.html"
    },
    {
        title: "Artículo 3",
        description: "Descubre de qué trata el artículo 3. Haz clic para leer más.",
        link: "articulo3.html"
    },
    {
        title: "Artículo 4",
        description: "Explora los detalles de este artículo en profundidad.",
        link: "articulo4.html"
    }
];

// Generar los artículos en el DOM
const blogArticlesContainer = document.getElementById('blog-articles');

if (blogArticlesContainer) {
    articles.forEach((article, index) => {
        const articleCard = document.createElement('div');
        articleCard.classList.add('blog-article', 'scroll-item'); // Agregamos 'scroll-item' para que se animen al hacer scroll
        articleCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <button onclick="window.location.href='${article.link}'">Leer más</button>
        `;
        blogArticlesContainer.appendChild(articleCard);
    });
}

// Animación de scroll para revelar artículos
function handleScrollAnimation() {
    const articles = document.querySelectorAll('.blog-article');
    const triggerHeight = window.innerHeight * 0.8;

    articles.forEach(article => {
        const articleTop = article.getBoundingClientRect().top;
        if (articleTop < triggerHeight) {
            article.classList.add('visible');
        }
    });
}

// Event listener para el scroll
window.addEventListener('scroll', handleScrollAnimation);

// Inicializar animación en carga
window.addEventListener('load', handleScrollAnimation);
