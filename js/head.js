const head = document.getElementById('header');
const barra = document.createElement("div");
barra.className = "navBar container";
barra.innerHTML = `
        <nav>
            <ul id="navUl">
            </ul>
        </nav>
    `;
head.appendChild(barra);

const ulNav = document.getElementById('navUl');
// Agregamos el logo
const liLogo = document.createElement('li');
liLogo.innerHTML = `
        <a href="index.html">
            <img class="logo" src="img/iconos/tienda.png">
        </a>
    `;
    ulNav.appendChild(liLogo);
// Agregamos los links
const links = ['Productos', 'Contacto'];
for (const link of links){
    const liLinks = document.createElement('li');
    liLinks.className = "link";
    liLinks.innerHTML = `
        <a href="/html/${link.toLowerCase()}.html">
        ${link}
        </a>
    `;
    ulNav.appendChild(liLinks);
}
// Agregamos el Carrito
const divCarrito = document.createElement('div');
divCarrito.innerHTML = `
        <img onclick="abrirCarrito()" class="carrito" src="img/iconos/carrito.png">
        <p class="cuenta-producto">0</p>
    `;
barra.appendChild(divCarrito);

const divCarritoAbierto = document.createElement('div');
divCarritoAbierto.className = "productos-carrito";
divCarritoAbierto.id = "productos-carrito-id";
divCarritoAbierto.innerHTML = `
        <h3>Mi carrito</h3>
        <div class="carrito-items" id="carrito-container"></div>
        <h2>Total: $<strong class="precio-total">0</strong></h2>
        <a href="/html/procesoDeCompra.html" class="btn-comprar-carrito">Confirmar Compra</a>
    `;
barra.appendChild(divCarritoAbierto);

// Funciones display
function abrirCarrito(){
    if ((document.getElementById("productos-carrito-id").style.display) == "block" ){
        document.getElementById("productos-carrito-id").style.display = "none";
    }
    else{
        document.getElementById("productos-carrito-id").style.display = "block";
    }
};

// Barra de Busqueda

const searchBar = document.createElement("div");
searchBar.className = "Buscado";
// Falta invocar la funcion de busqueda
searchBar.innerHTML = `
        <label for="Busqueda"></label>
        <input type="Busqueda" id="Busqueda">
        <button id="Button-Search" type="submit">
        <img src="img/iconos/busqueda1.svg" alt="buttonpng" border="0" />
        </button>
`;
ulNav.appendChild(searchBar)

// Evento para la barra de búsqueda
document.getElementById("Button-Search").addEventListener("click", function () {
    const searchText = this.value.toLowerCase();
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.filter(product =>
                product.title.toLowerCase().includes(searchText)
            );
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            let listContainer = document.querySelector(".productos ul");
            listContainer.innerHTML = "";
            filteredProducts.forEach(product => {
                let listItem = document.createElement("div");
                listItem.className = "cards";
                listItem.innerHTML = `
                    <div>
                        <img src="${product.img}" class="producto-img">
                    </div>
                    <h5 class="producto-title">${product.title}</h5>
                    <p>$<span class="producto-precio">${product.precio}</span></p>
                    <button producto-id="${product.id}" class="btn-comprar">Agregar al Carrito</button>
                `;
                listContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error al obtener el archivo JSON:", error);
        });
});

// Boton de ordernar alfabeticamente

document.addEventListener("DOMContentLoaded", function() {
    let sortAscending = true;
    const sortButton = document.getElementById("sortButton");
    if (sortButton) {
        sortButton.addEventListener("click", function() {
            console.log("Botón de ordenar clickeado");
            console.log("Orden actual: " + (sortAscending ? "Ascendente" : "Descendente"));
            fetch("productos.json")
                .then(response => response.json())
                .then(data => {
                    if (sortAscending) {
                        data.sort((a, b) => a.precio - b.precio);
                    } else {
                        data.sort((a, b) => b.precio - a.precio);
                    }
                    sortAscending = !sortAscending;
                    let listContainer = document.querySelector(".productos ul");
                    listContainer.innerHTML = "";
                    data.forEach(product => {
                        let listItem = document.createElement("div");
                        listItem.className = "cards";
                        listItem.innerHTML = `
                            <div>
                                <img src="${product.img}" class="producto-img">
                            </div>
                            <h5 class="producto-title">${product.title}</h5>
                            <p>$<span class="producto-precio">${product.precio}</span></p>
                            <button producto-id="${product.id}" class="btn-comprar">Agregar al Carrito</button>
                        `;
                        listContainer.appendChild(listItem);
                    });
                })
            })
        }
    })
