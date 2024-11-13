document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar los artículos en el blog
    function loadBlogArticles() {
        const articleContainer = document.getElementById("blog-articles");
        articleContainer.innerHTML = ""; // Limpiar la sección de artículos antes de cargar

        // Obtener los artículos desde localStorage
        const articles = JSON.parse(localStorage.getItem("articles")) || [];

        articles.forEach((article, index) => {
            const articleCard = document.createElement("div");
            articleCard.classList.add("blog-article");

            // Estructura de cada tarjeta de artículo en el blog
            articleCard.innerHTML = `
                <h3>${article.title}</h3>
                <img src="${article.image}" alt="${article.title}" class="article-thumbnail" />
                <button onclick="viewArticle(${index})">LEER</button>
            `;

            articleContainer.appendChild(articleCard);
        });
    }

    // Función para redirigir a la página del artículo seleccionado
    window.viewArticle = function(index) {
        localStorage.setItem('selectedArticleIndex', index);
        window.location.href = "/Dulce_Bendicion/Usuario/Paginas/Subpages/Articulo.html";
    };

    // Función para cargar el artículo seleccionado en Articulo.html
    function loadSelectedArticle() {
        const articleContainer = document.querySelector(".articulo-contenedor");
        const selectedIndex = localStorage.getItem("selectedArticleIndex");
        const articles = JSON.parse(localStorage.getItem("articles")) || [];
    
        if (selectedIndex !== null && articles[selectedIndex]) {
            const article = articles[selectedIndex];
            articleContainer.innerHTML = `
            <div class="encabezado-gradiente">
                <h1 class="tituloArticulo">${article.title}</h1>
                <h2 class="encabezadoArticulo">${article.header}</h2>
                </div>
                <div class="articulo-imagen">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="articulo-contenidoArticulo">
                    ${article.content}
                </div>
            `;
            // Agregar clase `.show` para activar la animación `fade-in`
            articleContainer.classList.add("show");
        } else {
            articleContainer.innerHTML = "<p>Artículo no encontrado.</p>";
        }
    }
    

    // Verificar en qué página estamos y ejecutar la función correspondiente
    if (document.getElementById("blog-articles")) {
        loadBlogArticles();
    } else if (document.querySelector(".articulo-contenedor")) {
        loadSelectedArticle();
    }
});
