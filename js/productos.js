const containerProductos = document.querySelector(".productos");
const ul = document.createElement("ul");
const containerCompras = document.querySelector(".carrito-items");
const precioTotal = document.querySelector(".precio-total");
const cantProducto = document.querySelector(".cuenta-producto");
const botonComprarCarrito = document.querySelector(".btn-comprar-carrito")
let compras = [];
let precioAcumulado = 0;
let contadorProductos = 0;

containerProductos.appendChild(ul);

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
    // let indice = 0;
    // productosLista.forEach(producto => {
    //     if (indice < productosLista.length) {
    //             let item = document.createElement("li");
    //             item.className = "cards";
    //             item.innerHTML = `
    //                     <div>
    //                         <img src="${producto.img}" class="producto-img">
    //                     </div>
    //                     <h5 class="producto-title">${producto.title}</h5>
    //                     <p>$<span class="producto-precio">${producto.precio}</span></p>
    //                     <button producto-id="${producto.id}" class="btn-comprar">Agregar al Carrito</button>
    //             `;

    //             ul.appendChild(item);
    //             indice ++
    //         }
    //     }
    // )
    fetch('productos.json')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const data = datos;
            data.forEach(item => {
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
                ul.appendChild(card);
            });
        }
    )
        .catch((error) => {
            console.error("Algo salio mal. ", error);
        }
    )
}
cargarProductos()


// Eventos y Manejo Carrito 

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

function stringToProducto(string){
    const Producto = {
        id: string.id,
        img: string.img,
        title: string.title,
        precio: string.precio,
        cantidadCarrito: string.cantidadCarrito,
        stock: string.stock
    }
    return Producto
}

function leerDatosHtml(productoSeleccionado) {
    buscaId = productoSeleccionado.querySelector("button").getAttribute("producto-id")
    fetch('productos.json')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            const data = datos;
            data.forEach(producto => {
                if (producto.id == buscaId) {
                productoSeleccionado = stringToProducto(producto);
                }
            });
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
    )
        .catch((error) => {
            console.error("Algo salio mal leyendo datos. ", error);
        }
    )
}

function cargarHtmlCarrito() {
    limpiarHtmlCarrito();
    compras.forEach(compra => {
        let row = document.createElement("div");
        row.classList.add("item");
        row.innerHTML = `
            <img src="${compra.img}">
            <div class="item-content">
                <h5>${compra.title}</h5>
                <h5 class="carrito-precio">$${compra.precio}</h5>
                <h6>Cantidad: ${compra.cantidadCarrito}</h6>
            </div>
            <span class="btn-borrar" producto-id="${compra.id}">X</span>
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