document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    function addToCart() {
        const product = {
            id: "123", // ID del producto actual
            name: "Producto Ejemplo", // Nombre del producto
            price: 20, // Precio del producto
            quantity: 1, // Cantidad inicial
            image: "/ruta/a/imagen.jpg" // Ruta a la imagen
        };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push(product);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        window.location.href = "/Dulce_Bendicion/Usuario/Paginas/CarritoDeCompras.html";
    }
    if (!product) {
        console.error("Error: Producto no encontrado en localStorage.");
        document.getElementById("product-detail-content").innerHTML = "<p>Error: Producto no encontrado.</p>";
        return;
    }

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-image").alt = product.name;

    const quantitySelect = document.getElementById("quantity");
    const sizeSelect = document.getElementById("size");

    if (product.sizes) {
        sizeSelect.innerHTML = product.sizes.map(size => `<option value="${size}">${size}</option>`).join('');
    }

    if (product.quantityAvailable) {
        quantitySelect.innerHTML = Array.from({ length: product.quantityAvailable }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('');
    }

    console.log("Producto cargado correctamente:", product);
});
