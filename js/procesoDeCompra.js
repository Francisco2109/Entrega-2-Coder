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

