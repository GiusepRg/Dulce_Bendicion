document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("product-form");
    const articleForm = document.getElementById("article-form");
    const productList = document.getElementById("product-list");
    const articleList = document.getElementById("article-list");
    const productImagePreview = document.getElementById("product-image-preview");
    let editingIndex = -1;
    let editingArticleIndex = -1;

    // Función para mostrar la sección seleccionada
    window.showSection = function(section) {
        document.querySelectorAll('.admin-section').forEach(s => s.style.display = 'none');
        document.getElementById(`${section}`).style.display = 'block';
    };

    // --- Productos ---
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
            imageUrl = products[editingIndex].image; // Mantener la imagen previa al editar
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
        productImagePreview.style.display = 'none'; // Ocultar preview después de guardar
        loadProducts();
    });

    document.getElementById("product-image").addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file).then(base64 => {
                productImagePreview.src = base64;
                productImagePreview.style.display = 'block';
            });
        }
    });

    // Función para cargar la imagen de un archivo
    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // --- Funciones de eliminar y editar ---
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
        productImagePreview.src = product.image;
        productImagePreview.style.display = 'block';
        editingIndex = index;
    };

    // Función para cargar artículos desde localStorage
    function loadArticles() {
        articleList.innerHTML = "";
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        articles.forEach((article, index) => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("article-card");
            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.header}</p>
                <img src="${article.image}" alt="${article.title}" style="width: 150px; height: 150px;">
                <button onclick="deleteArticle(${index})">Eliminar</button>
                <button onclick="editArticle(${index})">Editar</button>
            `;
            articleList.appendChild(articleCard);
        });
    }

    // Evento submit del formulario de artículos
    articleForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = document.getElementById("article-title").value;
        const header = document.getElementById("article-header").value;
        const content = document.getElementById("article-content").value;
        const imageFile = document.getElementById("article-image").files[0];

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await convertToBase64(imageFile);
        } else if (editingArticleIndex >= 0) {
            const articles = JSON.parse(localStorage.getItem("articles")) || [];
            imageUrl = articles[editingArticleIndex].image;  // Mantener la imagen existente al editar
        }

        const newArticle = { title, header, content, image: imageUrl };
        const articles = JSON.parse(localStorage.getItem("articles")) || [];

        if (editingArticleIndex >= 0) {
            articles[editingArticleIndex] = newArticle;
            editingArticleIndex = -1;
        } else {
            articles.push(newArticle);
        }

        localStorage.setItem("articles", JSON.stringify(articles));
        articleForm.reset();
        document.getElementById("article-image-preview").style.display = "none"; // Ocultar la vista previa de la imagen
        loadArticles();
    });

    // Convertir archivo a base64
    async function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    // Función para eliminar artículo
    window.deleteArticle = function(index) {
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        articles.splice(index, 1);
        localStorage.setItem("articles", JSON.stringify(articles));
        loadArticles();
    };

    // Función para editar artículo
    window.editArticle = function(index) {
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
        const article = articles[index];

        document.getElementById("article-title").value = article.title;
        document.getElementById("article-header").value = article.header;
        document.getElementById("article-content").value = article.content;
        document.getElementById("article-image-preview").src = article.image; // Muestra la imagen en el preview
        document.getElementById("article-image-preview").style.display = 'block';
        editingArticleIndex = index;
    };



    // Mostrar la sección de productos por defecto
    showSection('product-section');
    loadProducts();
    loadArticles();
});
