document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        console.error("Error: Producto no encontrado en localStorage.");
        document.getElementById("product-detail-content").innerHTML = "<p>Error: Producto no encontrado.</p>";
        return;
    }
    
    // Mostrar detalles del producto en la página
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;

    // Actualizar el contador del carrito en el header
    function updateCartCount() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const itemCount = carrito.reduce((total, item) => total + item.quantity, 0);
        document.querySelector(".item-count").textContent = itemCount;
    }

    // Función para añadir el producto al carrito
    window.addToCart = function() {
        const selectedQuantity = parseInt(document.getElementById("quantity").value, 10) || 1;
        const selectedSize = document.getElementById("size").value || "Unica";

        const productoCarrito = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: selectedQuantity,
            size: selectedSize,
            image: product.image
        };

        // Obtener el carrito actual del localStorage
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const productoExistente = carrito.find(item => item.id === productoCarrito.id && item.size === productoCarrito.size);

        if (productoExistente) {
            // Si el producto ya está en el carrito, solo aumentar la cantidad
            productoExistente.quantity += selectedQuantity;
        } else {
            // Si no está, añadir el nuevo producto
            carrito.push(productoCarrito);
        }

        // Guardar el carrito actualizado en localStorage y actualizar el contador
        localStorage.setItem("carrito", JSON.stringify(carrito));
        updateCartCount(); // Actualizar el contador del carrito
        alert("Producto añadido al carrito"); // Mensaje de confirmación
    };

    // Inicializar el contador del carrito cuando se carga la página
    updateCartCount();
});
