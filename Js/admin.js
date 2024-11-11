document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const productList = document.getElementById("product-list");
    let editingIndex = -1;

    function loadProducts() {
        productList.innerHTML = "";
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>ID: ${product.id}</p>
                <p>Precio: $${product.price}</p>
                <p>Descripción: ${product.description}</p>
                <p>Categoría: ${product.category}</p>
                <p>Rating: ${product.rating}</p>
                <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px;">
                <button onclick="deleteProduct(${index})">Eliminar</button>
                <button onclick="editProduct(${index})">Editar</button>
            `;
            productList.appendChild(productCard);
        });
    }

    productForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = editingIndex >= 0 ? document.getElementById("product-id").value : Date.now();
        const name = document.getElementById("product-name").value;
        const price = parseFloat(document.getElementById("product-price").value);
        const description = document.getElementById("product-description").value;
        const keywords = document.getElementById("product-keywords").value.split(",").map(k => k.trim());
        const color = document.getElementById("product-color").value;
        const size = document.getElementById("product-size").value;
        const category = document.getElementById("product-category").value;
        const rating = parseInt(document.getElementById("product-rating").value, 10);
        const imageFile = document.getElementById("product-image").files[0];

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await convertToBase64(imageFile);
        } else if (editingIndex >= 0) {
            const products = JSON.parse(localStorage.getItem("products")) || [];
            imageUrl = products[editingIndex].image;
        }

        const newProduct = { id, name, price, description, keywords, color, size, category, rating, image: imageUrl };

        const products = JSON.parse(localStorage.getItem("products")) || [];
        if (editingIndex >= 0) {
            products[editingIndex] = newProduct;
            editingIndex = -1;
        } else {
            products.push(newProduct);
        }

        localStorage.setItem("products", JSON.stringify(products));
        productForm.reset();
        loadProducts();
    });

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    window.deleteProduct = function(index) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    };

    window.editProduct = function(index) {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const product = products[index];

        document.getElementById("product-id").value = product.id;
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-description").value = product.description;
        document.getElementById("product-keywords").value = product.keywords.join(", ");
        document.getElementById("product-color").value = product.color;
        document.getElementById("product-size").value = product.size;
        document.getElementById("product-category").value = product.category;
        document.getElementById("product-rating").value = product.rating;
        
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = product.image;
        imagePreview.style.display = "block";

        editingIndex = index;
    };

    loadProducts();
});
