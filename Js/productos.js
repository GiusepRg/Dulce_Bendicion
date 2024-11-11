document.addEventListener("DOMContentLoaded", function() {
    const productGrid = document.querySelector('.product-grid');
    const searchBar = document.getElementById('search-bar');
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    const filterTags = document.querySelectorAll('.filter-tag');
    const sortOptions = document.getElementById('sort-options');

    // Cargar productos desde localStorage
    let products;
    try {
        products = JSON.parse(localStorage.getItem("products")) || [];
    } catch (error) {
        console.error("Error cargando productos desde localStorage:", error);
        products = [];
    }
    
    let activeTags = [];
    let minPrice = priceRange.value;

    // Actualizar visualización de precio
    priceRange.addEventListener("input", function() {
        minPrice = priceRange.value;
        priceDisplay.textContent = `Precio: $${minPrice}`;
        filterProducts();
    });

    // Buscar productos
    searchBar.addEventListener("input", filterProducts);

    // Filtro por etiquetas
    filterTags.forEach(tag => {
        tag.addEventListener("click", () => {
            tag.classList.toggle("active");
            const tagText = tag.dataset.tag;
            if (activeTags.includes(tagText)) {
                activeTags = activeTags.filter(t => t !== tagText);
            } else {
                activeTags.push(tagText);
            }
            filterProducts();
        });
    });

    // Ordenar productos
    sortOptions.addEventListener("change", filterProducts);

    // Filtrar y ordenar productos
    function filterProducts() {
        const searchText = searchBar.value.toLowerCase();
        const filteredProducts = products
            .filter(product => 
                product.name.toLowerCase().includes(searchText) &&
                product.price >= minPrice &&
                (activeTags.length === 0 || activeTags.some(tag => product.tags.includes(tag)))
            )
            .sort((a, b) => {
                const sortValue = sortOptions.value;
                if (sortValue === "price-asc") return a.price - b.price;
                if (sortValue === "price-desc") return b.price - a.price;
                if (sortValue === "rating") return b.rating - a.rating;
                return 0;
            });

        displayProducts(filteredProducts);
    }

    // Mostrar productos en la cuadrícula con detalles de interacción
    function displayProducts(products) {
        productGrid.innerHTML = ""; // Limpiar productos
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            // Redireccionar a detalles del producto al hacer clic
            productCard.addEventListener("click", () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "/Dulce_Bendicion/Usuario/Paginas/Subpages/ProductoIndividual.html";
            });
            
            // Crear elementos visuales del producto
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = product.name;

            const productPrice = document.createElement("div");
            productPrice.classList.add("product-price");
            productPrice.textContent = `$${product.price}`;

            const productRating = document.createElement("div");
            productRating.classList.add("product-rating");
            productRating.textContent = `Rating: ${product.rating} ⭐`;

            // Añadir elementos al productCard
            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(productRating);

            // Agregar tarjeta de producto a la cuadrícula
            productGrid.appendChild(productCard);
        });
    }

    // Cargar productos al inicio
    filterProducts();
});
