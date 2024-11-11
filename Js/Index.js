// script.js
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})
//________________________________________________
// Menú desplegable y botón de hamburguesa
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Alternar el menú y el icono hamburguesa en dispositivos móviles
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');       // Muestra o esconde el menú
    menuToggle.classList.toggle('active');  // Cambia el icono de hamburguesa a "X"
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