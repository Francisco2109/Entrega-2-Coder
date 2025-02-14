const head = document.querySelector('header');
head.className = "header";
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
        <a  class="btn-comprar-carrito">Confirmar Compra</a>
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
    
