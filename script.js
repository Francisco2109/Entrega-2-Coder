let containerProductos = document.querySelector(".products");
let containerCompras = document.querySelector(".card-items");
let precioTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");
let botonComprarCarrito = document.querySelector(".btn-comprar-carrito")
let compras = [];
let precioAcumulado = 0;
let contadorProductos = 0;

eventos();
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
        const deleteId = e.target.getAttribute("producto-id");

        compras.forEach(producto => {
            if (producto.id == deleteId) {
                let priceReduce = parseFloat(producto.price) * parseFloat(producto.cant);
                precioAcumulado =  precioAcumulado - priceReduce;
                precioAcumulado = precioAcumulado.toFixed(2);
                contadorProductos = contadorProductos - parseFloat(producto.cant);
            }
        });
        compras = compras.filter(producto => producto.id !== deleteId);
    }

    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function leerDatosHtml(producto) {
    const infoProducto = {
        image: producto.querySelector("div img").src,
        title: producto.querySelector(".title").textContent,
        price: producto.querySelector(".producto-precio").textContent,
        id: producto.querySelector("a").getAttribute("producto-id"),
        cant: 1 
    }

    precioAcumulado = parseFloat(precioAcumulado) + parseFloat(infoProducto.price);
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
    compras.forEach(product => {
        const { image, title, price, cant, id } = product;
        const row = document.createElement("div");
        row.classList.add("item");
        row.innerHTML = `
            <img src="${image}">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${cant}</h6>
            </div>
            <span class="btn-borrar" producto-id="${id}">X</span>
        `;
        containerCompras.appendChild(row);
    });
    if (compras.length === 0) {
        precioTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    } else{
        precioTotal.innerHTML = precioAcumulado;
        amountProduct.innerHTML = contadorProductos;
    }
}
function confirmarCompra(){
    alert("Compra Completada!!")
    compras = []
    precioAcumulado = 0;
    contadorProductos = 0;
    precioTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
    limpiarHtmlCarrito()
    guardarLocalStorage();
}

function limpiarHtmlCarrito() {
    containerCompras.innerHTML = "";
}

function guardarLocalStorage() {
    const datos = {
        compras: compras,
        precioAcumulado: precioAcumulado,
        contadorProductos: contadorProductos
    };
    localStorage.setItem("cart", JSON.stringify(datos));
}

function cargarLocalStorage() {
    const datos = JSON.parse(localStorage.getItem("cart"));
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