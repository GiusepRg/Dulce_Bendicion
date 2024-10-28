const productos = JSON.parse(localStorage.getItem('productos')) || [];
const listaProductos = document.getElementById('lista-productos');

function mostrarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach((producto, index) => {
        listaProductos.innerHTML += `
            <li>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
            </li>
        `;
    });
}

function agregarAlCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productos[index]);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${productos[index].nombre} ha sido agregado al carrito.`);
}

mostrarProductos();
