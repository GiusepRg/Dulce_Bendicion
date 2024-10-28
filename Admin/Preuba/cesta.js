const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const pagarBtn = document.getElementById('pagar-btn');
const metodoPago = document.getElementById('metodo-pago');
const cerrarPago = document.getElementById('cerrar-pago');
const formularioCompra = document.getElementById('formulario-compra');

function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((producto, index) => {
        listaCarrito.innerHTML += `
            <li>
                ${producto.nombre} - $${producto.precio}
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </li>
        `;
        total += parseFloat(producto.precio);
    });
    totalElement.textContent = total;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

pagarBtn.addEventListener('click', () => {
    metodoPago.style.display = 'block';
});

cerrarPago.addEventListener('click', () => {
    metodoPago.style.display = 'none';
});

formularioCompra.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    alert(`Gracias por tu compra, ${nombre}! Tu pedido será enviado a ${direccion}.`);
    // Aquí puedes integrar con una API de pago si lo deseas
    localStorage.removeItem('carrito');
    mostrarCarrito();
});

mostrarCarrito();
