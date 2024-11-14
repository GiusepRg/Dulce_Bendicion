document.addEventListener("DOMContentLoaded", function() {
    const productGrid = document.querySelector('.product-grid');
    const searchBar = document.getElementById('search-bar');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const filterTags = document.querySelectorAll('.filter-tag');
    const sortOptions = document.getElementById('sort-options');
    const filterSidebar = document.querySelector('.filter-sidebar');

    
    function toggleFilterSidebar() {
        filterSidebar.classList.toggle('show');
    }
    window.toggleFilterSidebar = toggleFilterSidebar;

    // Aplicar filtros y cerrar barra lateral en móviles
    function applyFilters() {
        toggleFilterSidebar();
        filterProducts();
    }
    window.applyFilters = applyFilters;

    let products;
    try {
        products = JSON.parse(localStorage.getItem("products")) || [];
    } catch (error) {
        console.error("Error cargando productos desde localStorage:", error);
        products = [];
    }

    let activeTags = [];
    let minPrice = 0;
    let maxPrice = Infinity;

    // Actualizar precios mínimos y máximos
    priceMinInput.addEventListener("input", function() {
        minPrice = parseFloat(priceMinInput.value) || 0;
        filterProducts();
    });

    priceMaxInput.addEventListener("input", function() {
        maxPrice = parseFloat(priceMaxInput.value) || Infinity;
        filterProducts();
    });

    searchBar.addEventListener("input", filterProducts);

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

    sortOptions.addEventListener("change", filterProducts);

    function filterProducts() {
        const searchText = searchBar.value.toLowerCase();
        const filteredProducts = products
            .filter(product => 
                product.name.toLowerCase().includes(searchText) &&
                product.price >= minPrice &&
                product.price <= maxPrice &&
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

    function displayProducts(products) {
        productGrid.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.addEventListener("click", () => {
                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "/Dulce_Bendicion/Usuario/Paginas/Subpages/ProductoIndividual.html";
            });

            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.name;

            const productName = document.createElement("div");
            productName.classList.add("product-name");
            productName.textContent = product.name;

            const productPrice = document.createElement("div");
            productPrice.classList.add("product-price");
            productPrice.textContent = `$${product.price}`;

            productCard.append(productImage, productName, productPrice);
            productGrid.appendChild(productCard);
        });
    }

    filterProducts();
});
