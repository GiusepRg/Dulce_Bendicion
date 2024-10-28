const productos = [];

const form = document.getElementById('admin-form');
const listaProductos = document.getElementById('lista-productos');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const producto = { nombre, precio, imagen };
    productos.push(producto);

    mostrarProductos();
});

function mostrarProductos() {
    listaProductos.innerHTML = '';
    productos.forEach((producto, index) => {
        listaProductos.innerHTML += `
            <li>
                <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                <span>${producto.nombre} - $${producto.precio}</span>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
                <button onclick="editarProducto(${index})">Editar</button>
            </li>
        `;
    });
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    mostrarProductos();
}

function editarProducto(index) {
    const producto = productos[index];
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('imagen').value = producto.imagen;
    productos.splice(index, 1);
}
