const raizContacto = document.querySelector("main");
raizContacto.className = "mainContacto";
const divContacto = document.createElement("div");
divContacto.innerHTML = `
        <h3 class="redes"><strong>Redes Sociales: </strong></h3>
            <ul class="ulRedes">
                <a href="https://www.facebook.com/Coderhouse">Facebook</a>
                <a href="https://www.instagram.com/coderhouse">Instagram</a>
                <a href="https://x.com/coderhouse">Twitter</a>
            </ul>
    `;

raizContacto.appendChild(divContacto)

document.getElementById("divCarrito").style.display = "none";