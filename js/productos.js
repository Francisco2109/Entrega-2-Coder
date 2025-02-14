const raizProducto = document.querySelector("main");
raizProducto.className = "container";
raizProducto.innerHTML = `
        <div class="productos"></div>
        <button id="sortButton">Mayor $ a Menor $</button>
    `;

const containerProductos = document.querySelector(".productos");
const ulProductos = document.createElement("ul");
containerProductos.appendChild(ulProductos);

const containerCompras = document.getElementById("carrito-container");
const ulCompras = document.createElement("ul");
containerCompras.appendChild(ulCompras);

const precioTotal = document.querySelector(".precio-total");
const cantProducto = document.querySelector(".cuenta-producto");
const botonComprarCarrito = document.querySelector(".btn-comprar-carrito")

const ordenarBoton = document.getElementById("sortButton");
let menorOrden = true;
const nombreFiltro = document.getElementById("Button-Search");
const inputNombre = document.getElementById("Busqueda");

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
    limpiarHtml(ulProductos)
    arrayProductos.forEach(item => {
        const card = document.createElement('li');
        card.className = "cards";
        card.innerHTML = `
                <div>
                    <img src="${item.img}" class="producto-img">
                </div>
                <h5 class="producto-title">${item.title}</h5>
                <p>En Stock: ${item.stock}</p>
                <p>$<span class="producto-precio">${item.precio}</span></p>
                <button producto-id="${item.id}" class="btn-comprar">Agregar al Carrito</button>
        `;
        ulProductos.appendChild(card);
    });
}

function filtrarNombre() {
    const buscarTexto = inputNombre.value.toLowerCase();
    const filtroProductos = dataProductos.filter(producto =>
        producto.title.toLowerCase().includes(buscarTexto)
    );
    filtroProductos.sort((a, b) => a.title.localeCompare(b.title));
    cargarProductosHtml(filtroProductos)
}


// Eventos y Manejo Carrito 

function eventos(){
    containerProductos.addEventListener("click", aggProducto);
    containerCompras.addEventListener("click", removerProducto);
    botonComprarCarrito.addEventListener("click", confirmarCompra);
    ordenarBoton.addEventListener("click", ordenarPrecio);
    nombreFiltro.addEventListener("click", filtrarNombre);
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
        dataProductos.forEach(producto => {
            if (producto.id == borrarId) {
                producto.stock++;
            }
        })
        compras.forEach(compra => {
            if (compra.id == borrarId) {
                precioAcumulado =  precioAcumulado - parseFloat(compra.precio);
                contadorProductos--;
                compra.stock++;
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
    cargarProductosHtml(dataProductos);
    guardarLocalStorage();
}

function ordenarPrecio(){
    if (menorOrden) {
        dataProductos.sort((a, b) => a.precio - b.precio);
    } else {
        dataProductos.sort((a, b) => b.precio - a.precio);
    }
    menorOrden = !menorOrden;
    cargarProductosHtml(dataProductos);
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
                if(producto.stock > 0){
                    producto.stock--;
                }
                }
            });
            if (productoSeleccionado.stock > 0){
                precioAcumulado = precioAcumulado + productoSeleccionado.precio;
                contadorProductos++;
            }
            existeEnCarro = compras.some(productoEnCarro => productoEnCarro.id == buscaId);
            if (existeEnCarro) {
                compras = compras.map(compra => {
                    if (compra.id == buscaId) {
                        compra.stock--;
                        if(compra.stock > 0){
                            compra.cantidadCarrito++;
                            return compra;
                        } else {
                            return compra;
                        }
                    } else{
                        return compra;
                    }
                });
            } else {
                compras.push(productoSeleccionado)
            }
            cargarHtmlCarrito();
            cargarProductosHtml(dataProductos)
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
// function confirmarCompra(){
//     alert("Compra Completada!!")
//     crearTicket(compras,contadorProductos, precioAcumulado);
//     // Lo de abajo no funciona reescribir en html/procesoDeCompra.html
//     compras = [];
//     precioAcumulado = 0;
//     contadorProductos = 0;
//     precioTotal.innerHTML = 0;
//     cantProducto.innerHTML = 0;
//     limpiarHtml(ulCompras);
//     guardarLocalStorage();
// }

function confirmarCompra() {
    Swal.fire({
        title: 'Ingrese sus datos',
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
            <input id="swal-email" class="swal2-input" placeholder="Email">
            <input id="swal-Direccion" class="swal2-input" placeholder="Direccion">
            <select id="swal-pago" class="swal2-select">
                <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia Bancaria</option>
            </select>`,
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        preConfirm: () => {
            const nombre = document.getElementById('swal-nombre').value;
            const email = document.getElementById('swal-email').value;
            const Direccion = document.getElementById('swal-Direccion').value;
            const pago = document.getElementById('swal-pago').value;
            if (!nombre || !email || !Direccion || !pago) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }
            return { nombre, email, Direccion, pago };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Confirmar compra',
                html: `
                    <p><strong>Nombre:</strong> ${result.value.nombre}</p>
                    <p><strong>Email:</strong> ${result.value.email}</p>
                    <p><strong>Direccion:</strong> ${result.value.Direccion}</p>
                    <p><strong>Método de pago:</strong> ${result.value.pago}</p>
                    <p><strong>Total a pagar:</strong> $${precioAcumulado}</p>
                `,
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
            }).then((finalResult) => {
                if (finalResult.isConfirmed) {
                    generarPDF(result.value);
                    Swal.fire('¡Compra confirmada!', `Gracias por tu compra, ${result.value.nombre}!`, 'success');
                    
                    // Limpiar carrito
                    compras = [];
                    precioAcumulado = 0;
                    contadorProductos = 0;
                    precioTotal.innerHTML = 0;
                    cantProducto.innerHTML = 0;
                    limpiarHtml(containerCompras);
                    guardarLocalStorage();
                }
            });
        }
    });
}

// Función para generar el PDF
function generarPDF(datosCliente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Factura de Compra", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Nombre: ${datosCliente.nombre}`, 20, 40);
    doc.text(`Email: ${datosCliente.email}`, 20, 50);
    doc.text(`Direccion: ${datosCliente.Direccion}`, 20, 60);
    doc.text("Productos Comprados:", 20, 100);
    doc.text(`Método de pago: ${datosCliente.pago}`, 20, 270);
    doc.text(`Total: $${precioAcumulado}`, 20, 280);

    let y = 110;
    compras.forEach((producto, index) => {
        doc.text(`${index + 1}. ${producto.title} - $${producto.precio}`, 20, y);
        y += 10;
    });

    doc.save("Factura_Compra.pdf");
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
// Agregar Toastify al botón de agregar al carrito
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-comprar") || event.target.classList.contains("btn-agregar")) {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 800,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
        }).showToast();
    }
    if (event.target.classList.contains("btn-borrar"))
        Toastify({
            text: "Producto removido con exito",
            duration: 800, 
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "rgb(243, 163, 77)",
        }).showToast();
    })
