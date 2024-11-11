document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItemsElement = document.getElementById("total-items").querySelector("span");
    const subtotalElement = document.getElementById("subtotal").querySelector("span");
    const totalElement = document.getElementById("total").querySelector("span");

    // Cargar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Limpiar el contenedor
        let subtotal = 0;

        carrito.forEach((product, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h3>${product.name}</h3>
                    <p>Precio: $${product.price}</p>
                    <p>Cantidad: ${product.quantity}</p>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += product.price * product.quantity;
        });

        totalItemsElement.textContent = carrito.length;
        subtotalElement.textContent = `$${subtotal}`;
        totalElement.textContent = `$${subtotal}`;

        // Guardar carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function removeFromCart(index) {
        carrito.splice(index, 1);
        updateCartDisplay(); // Actualiza la visualización y el almacenamiento después de eliminar
    }

    window.removeFromCart = removeFromCart;
    updateCartDisplay();
});
