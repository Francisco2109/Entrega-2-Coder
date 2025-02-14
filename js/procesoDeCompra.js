const body = document.getElementById("ticket");
const div = document.createElement("div");
const ul = document.createElement("ul");
div.className = "datosTicket";
div.appendChild(ul);



function crearTicket(lista, cantItems, precioTotals){
    lista.forEach(dato => {
        const item = document.createElement("li");
        dato.nombre.toUpperCase();
        nombre.innerHTML = `
            <h5 class="nombreTicket">Nombre ${dato.nombre}</h5>
            <h6 class="cantTicket">Cantidad ${dato.cantidadCarrito}</h6>
            <h6 class="precioTicket">Precio ${dato.precio}</h6>
        `;
        ul.appendChild(item);
    });
}
// Agregar Toastify al botón de agregar al carrito
// document.addEventListener("click", function(event) {
//     if (event.target.classList.contains("btn-comprar")) {
//         Toastify({
//             text: "Producto agregado al carrito",
//             duration: 3000,
//             close: true,
//             gravity: "top",
//             position: "right",
//             backgroundColor: "#4CAF50",
//         }).showToast();
//     }
// });