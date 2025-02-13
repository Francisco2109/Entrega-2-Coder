const containerProductos = document.querySelector(".productos");
const ulProductos = document.createElement("ul");
containerProductos.appendChild(ulProductos);

const containerCompras = document.getElementById("carrito-container");
const ulCompras = document.createElement("ul");
containerCompras.appendChild(ulCompras);

const precioTotal = document.querySelector(".precio-total");
const cantProducto = document.querySelector(".cuenta-producto");
const botonComprarCarrito = document.querySelector(".btn-comprar-carrito")

let dataProductos;
let compras = [];
let precioAcumulado = 0;
let contadorProductos = 0;



// Carga de Datos
function cargarProductosFromJson() {
    fetch('productos.json')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            dataProductos = datos;
            cargarProductosHtml(dataProductos)
        }
    )
        .catch((error) => {
            console.error("Algo salio mal. ", error);
        }
    )
}
cargarProductosFromJson()

function cargarProductosHtml(arrayProductos){
    arrayProductos.forEach(item => {
        const card = document.createElement('li');
        card.className = "cards";
        card.innerHTML = `
                <div>
                    <img src="${item.img}" class="producto-img">
                </div>
                <h5 class="producto-title">${item.title}</h5>
                <p>$<span class="producto-precio">${item.precio}</span></p>
                <button producto-id="${item.id}" class="btn-comprar">Agregar al Carrito</button>
        `;
        ulProductos.appendChild(card);
    });
}

// Eventos y Manejo Carrito 

function eventos(){
    containerProductos.addEventListener("click", aggProducto);
    containerCompras.addEventListener("click", removerProducto);
    botonComprarCarrito.addEventListener("click", confirmarCompra)
}

function aggProducto(event) {
    if (event.target.classList.contains("btn-comprar")) {
        const selectProduct = event.target.parentElement; 
        leerDatos(selectProduct);
    }
}

function removerProducto(event) {
    if (event.target.classList.contains("btn-borrar")) {
        const borrarId = event.target.getAttribute("producto-id");

        compras.forEach(compra => {
            if (compra.id == borrarId) {
                precioAcumulado =  precioAcumulado - parseFloat(compra.precio);
                contadorProductos--;
                if (compra.cantidadCarrito == 1) {
                    compras = compras.filter(compra => compra.id != borrarId);
                }
                compra.cantidadCarrito--;
            }
        });
        
    }
    if (event.target.classList.contains("btn-agregar")){
        const agregarId = event.target.getAttribute("producto-id");

        compras.forEach(compra => {
            if (compra.id == agregarId) {
                precioAcumulado =  precioAcumulado + parseFloat(compra.precio);
                contadorProductos++;
                compra.cantidadCarrito++;
            }
        });
    }

    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        cantProducto.innerHTML = 0;
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function stringToProducto(string){
    const Producto = {
        id: string.id,
        img: string.img,
        title: string.title,
        precio: parseFloat(string.precio),
        cantidadCarrito: string.cantidadCarrito,
        stock: string.stock
    }
    return Producto
}

function leerDatos(productoSeleccionado) {
    buscaId = productoSeleccionado.querySelector("button").getAttribute("producto-id")
            dataProductos.forEach(producto => {
                if (producto.id == buscaId) {
                productoSeleccionado = stringToProducto(producto);
                }
            });
            precioAcumulado = precioAcumulado + productoSeleccionado.precio;
            contadorProductos++;
            existeEnCarro = compras.some(productoEnCarro => productoEnCarro.id == buscaId);
            if (existeEnCarro) {
                compras = compras.map(compra => {
                    if (compra.id == buscaId) {
                        compra.cantidadCarrito++;
                        return compra;
                    } else{
                        return compra;
                    }
                });
            } else {
                compras.push(productoSeleccionado)
            }
            cargarHtmlCarrito();
            guardarLocalStorage();
        }

function cargarHtmlCarrito() {
    limpiarHtml(ulCompras);
    compras.forEach(compra => {
        let item = document.createElement("li");
        item.classList.add("item");
        item.innerHTML = `
            <img src="${compra.img}">
            <div class="item-content">
                <h5>${compra.title}</h5>
                <h5 class="carrito-precio">$${compra.precio}</h5>
                <h6>Cantidad: ${compra.cantidadCarrito}</h6>
            </div>
            <span class="btn-agregar" producto-id="${compra.id}">+</span>
            <span class="btn-borrar" producto-id="${compra.id}">-</span>
        `;
        ulCompras.appendChild(item);
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
    crearTicket(compras,contadorProductos, precioAcumulado);
    // Lo de abajo no funciona reescribir en html/procesoDeCompra.html
    compras = [];
    precioAcumulado = 0;
    contadorProductos = 0;
    precioTotal.innerHTML = 0;
    cantProducto.innerHTML = 0;
    limpiarHtml(containerCompras);
    guardarLocalStorage();
}

function limpiarHtml(raiz) {
    raiz.innerHTML = "";
}

// Funciones de Almacenamiento
function guardarLocalStorage() {
    const storage = {
        compras: compras,
        precioAcumulado: precioAcumulado,
        contadorProductos: contadorProductos
    };
    localStorage.setItem("carrito", JSON.stringify(storage));
}

function cargarLocalStorage() {
    const storage = JSON.parse(localStorage.getItem("carrito"));
    if (storage) {
        compras = storage.compras;
        precioAcumulado = parseFloat(storage.precioAcumulado);
        contadorProductos = storage.contadorProductos;
        cargarHtmlCarrito();
    }
}

cargarLocalStorage();
eventos();