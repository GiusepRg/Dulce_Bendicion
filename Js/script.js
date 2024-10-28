// script.js

//Menu Barra desplegable
const menuToggle = document.querySelector('#menu-toggle');
const navList = document.querySelector('#nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

let carrito = [];
//----------------------------CORREO
const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_0ngkqw9';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Enviar';
                alert('Mensaje enviado con éxito!');
                document.getElementById('form').reset();
            }, (err) => {
                btn.value = 'Enviar';
                alert('Ocurrió un error al enviar el mensaje. Intenta nuevamente.');
                console.error('EmailJS Error:', JSON.stringify(err));
            });
    });
// Toggle de navegación
// Agregar productos al carrito
document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const idProducto = e.target.dataset.productoId;
        agregarProductoAlCarrito(idProducto);
    });
});

function agregarProductoAlCarrito(idProducto) {
    carrito.push(idProducto);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contador = document.querySelector('.item-count');
    contador.textContent = carrito.length;
    const desplegable = document.querySelector('.carrito-desplegable');
    desplegable.innerHTML = carrito.map(id => `<p>Producto ${id} <button class="eliminar">X</button></p>`).join('');
}
//====================
//====================
// Eliminar productos del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar')) {
        const productoEliminado = e.target.parentElement;
        productoEliminado.remove();
        // Lógica adicional para quitar del carrito
    }
});


