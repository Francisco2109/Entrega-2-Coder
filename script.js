let containerProductos = document.querySelector(".productos");
let containerCompras = document.querySelector(".carrito-items");
let precioTotal = document.querySelector(".precio-total");
let cantProducto = document.querySelector(".cuenta-producto");
let botonComprarCarrito = document.querySelector(".btn-comprar-carrito")
let compras = [];
let precioAcumulado = 0;
let contadorProductos = 0;

const productosLista = [
    {id: 0, img: "img/productos/generico.png", title: "teclado gamer1", precio: 1800},
    {id: 1, img: "img/productos/generico.png", title: "teclado gamer2", precio: 3000},
    {id: 2, img: "img/productos/generico.png", title: "teclado gamer3", precio: 5800},
    {id: 3, img: "img/productos/generico.png", title: "teclado gamer4", precio: 4800},
    {id: 4, img: "img/productos/generico.png", title: "teclado gamer5", precio: 7800},
    {id: 5, img: "img/productos/generico.png", title: "teclado gamer6", precio: 9800},
    {id: 6, img: "img/productos/generico.png", title: "teclado gamer7", precio: 800},
    {id: 7, img: "img/productos/generico.png", title: "teclado gamer8", precio: 2800},
    {id: 8, img: "img/productos/generico.png", title: "teclado gamer9", precio: 6800},
    {id: 9, img: "img/productos/generico.png", title: "teclado gamer10", precio: 10800}
]

// Carga de Datos
function cargarProductos() {
    let indice = 0;
    productosLista.forEach(producto => {
        if (indice < productosLista.length) {
                let item = document.createElement("div");
                item.innerHTML = `
                    <div class="cards">
                        <div>
                            <img src="${producto.img}" class="producto-img">
                        </div>
                        <h5 class="producto-title">${producto.title}</h5>
                        <p>$<span class="producto-precio">${producto.precio}</span></p>
                        <a href="" producto-id="${producto.id}" class="btn-comprar">Agregar al Carrito</a>
                    </div>
                `;

                containerProductos.appendChild(item);
                indice ++
            }
        }
    )
}
cargarProductos()


// Eventos y Manejo Carrito 
cargarLocalStorage();

function eventos(){
    containerProductos.addEventListener("click", aggProducto);
    containerCompras.addEventListener("click", removerProducto);
    botonComprarCarrito.addEventListener("click", confirmarCompra)
}

function aggProducto(e) {
    if (e.target.classList.contains("btn-comprar")) {
        const selectProduct = e.target.parentElement; 
        leerDatosHtml(selectProduct);
    }
}

function removerProducto(e) {
    if (e.target.classList.contains("btn-borrar")) {
        const borrarId = e.target.getAttribute("producto-id");

        compras.forEach(producto => {
            if (producto.id == borrarId) {
                let precioReducir = parseFloat(producto.precio) * parseFloat(producto.cant);
                precioAcumulado =  precioAcumulado - precioReducir;
                precioAcumulado = precioAcumulado.toFixed(2);
                contadorProductos = contadorProductos - parseFloat(producto.cant);
            }
        });
        compras = compras.filter(producto => producto.id !== borrarId);
    }

    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        cantProducto.innerHTML = 0;
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function leerDatosHtml(productoSeleccionado) {
    const infoProducto = {
        img: productoSeleccionado.querySelector(".producto-img").src,
        title: productoSeleccionado.querySelector(".producto-title").textContent,
        precio: productoSeleccionado.querySelector(".producto-precio").textContent,
        id: productoSeleccionado.querySelector("a").getAttribute("producto-id"),
        cant: 1 
    }

    precioAcumulado = parseFloat(precioAcumulado) + parseFloat(infoProducto.precio);
    precioAcumulado = precioAcumulado.toFixed(2);

    const existe = compras.some(producto => producto.id === infoProducto.id);
    if (existe) {
        contadorProductos++;
        const pro = compras.map(producto => {
                if (producto.id === infoProducto.id) {
                    producto.cant++;
                    return producto;
                } else {
                    return producto;
                }
            }
        );
    } else {
        contadorProductos++;
        compras.push(infoProducto);
        
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function cargarHtmlCarrito() {
    limpiarHtmlCarrito();
    compras.forEach(producto => {
        const { img, title, precio, cant, id } = producto;
        let row = document.createElement("div");
        row.classList.add("item");
        row.innerHTML = `
            <img src="${img}">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="carrito-precio">$${precio}</h5>
                <h6>Cantidad: ${cant}</h6>
            </div>
            <span class="btn-borrar" producto-id="${id}">X</span>
        `;
        containerCompras.appendChild(row);
    });
    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        cantProducto.innerHTML = 0;
    } else{
        precioTotal.innerHTML = precioAcumulado;
        cantProducto.innerHTML = contadorProductos;
    }
}
function confirmarCompra(){
    alert("Compra Completada!!")
    compras = []
    precioAcumulado = 0;
    contadorProductos = 0;
    precioTotal.innerHTML = 0;
    cantProducto.innerHTML = 0;
    limpiarHtmlCarrito()
    guardarLocalStorage();
}

function limpiarHtmlCarrito() {
    containerCompras.innerHTML = "";
}

// Funciones de Almacenamiento
function guardarLocalStorage() {
    const datos = {
        compras: compras,
        precioAcumulado: precioAcumulado,
        contadorProductos: contadorProductos
    };
    localStorage.setItem("carrito", JSON.stringify(datos));
}

function cargarLocalStorage() {
    const datos = JSON.parse(localStorage.getItem("carrito"));
    if (datos) {
        compras = datos.compras;
        precioAcumulado = parseFloat(datos.precioAcumulado);
        contadorProductos = datos.contadorProductos;
        cargarHtmlCarrito();
    }
}

// Funciones display
function abrirCarrito(){
    if ((document.getElementById("productos-carrito-id").style.display) == "block" ){
        document.getElementById("productos-carrito-id").style.display = "none";
    }
    else{
        document.getElementById("productos-carrito-id").style.display = "block";
    }
}
function bienvenido(){
    alert("Bienvenido! Tenemos Ofertas en Fernet para el este caluroso Finde!")
}

eventos();