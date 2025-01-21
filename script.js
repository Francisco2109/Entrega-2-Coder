let containerProductos = document.querySelector('.products');
let containerCompras = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let compras = [];
let precioAcumulado = 0;
let contadorProductos = 0;

eventos();
cargarLocalStorage();

function eventos(){
    containerProductos.addEventListener('click', aggProducto);
    containerCompras.addEventListener('click', removerProducto);
}

function aggProducto(e) {
    if (e.target.classList.contains('btn-comprar')) {
        const selectProduct = e.target.parentElement; 
        leerDatosHtml(selectProduct);
    }
}

function removerProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const deleteId = e.target.getAttribute('data-id');

        compras.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                precioAcumulado =  precioAcumulado - priceReduce;
                precioAcumulado = precioAcumulado.toFixed(2);
            }
        });

        compras = compras.filter(product => product.id !== deleteId);
        contadorProductos--;
    }

    if (compras.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function leerDatosHtml(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    precioAcumulado = parseFloat(precioAcumulado) + parseFloat(infoProduct.price);
    precioAcumulado = precioAcumulado.toFixed(2);

    const exist = compras.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = compras.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        compras = [...pro];
    } else {
        compras = [...compras, infoProduct];
        contadorProductos++;
    }

    cargarHtmlCarrito();
    guardarLocalStorage();
}

function cargarHtmlCarrito() {
    limpiarHtmlCarrito();
    compras.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="borrar-producto" data-id="${id}">X</span>
        `;
        containerCompras.appendChild(row);
    });

    priceTotal.innerHTML = precioAcumulado;
    amountProduct.innerHTML = contadorProductos;
}

function limpiarHtmlCarrito() {
    containerCompras.innerHTML = '';
}

function guardarLocalStorage() {
    const cartData = {
        compras: compras,
        precioAcumulado: precioAcumulado,
        contadorProductos: contadorProductos
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
}

function cargarLocalStorage() {
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
        compras = cartData.compras;
        precioAcumulado = parseFloat(cartData.precioAcumulado);
        contadorProductos = cartData.contadorProductos;
        cargarHtmlCarrito();
    }
}

// Funciones display
function abrirCarrito(){
    if ((document.getElementById("products-id").style.display) == "block" ){
        document.getElementById("products-id").style.display = "none";
    }
    else{
        document.getElementById("products-id").style.display = "block";
    }
}
function bienvenido(){
    alert("Bienvenido! Tenemos Ofertas en Fernet para el este caluroso Finde!")
}