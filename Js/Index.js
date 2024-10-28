// script.js

//Menu Barra desplegable
const menuToggle = document.querySelector('#menu-toggle');
const navList = document.querySelector('#nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuToggle.classList.toggle('active');
});

let carrito = [];

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
    desplegable.innerHTML = carrito.map(id => `<p>Producto ${id} - <button class="eliminar">X</button></p>`).join('');
}
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elements", marqueeContent.children.length);

for(let i=0; i<marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}