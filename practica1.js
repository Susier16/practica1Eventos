// Array inicial
let listaCompra = ["leche", "pan", "huevos"];

// Pilla los elementos del DOM
const inputProducto = document.getElementById("input-producto");
const btnAgregar = document.getElementById("btn-agregar");
const btnEliminar = document.getElementById("btn-eliminar");
const btnOrdenar = document.getElementById("btn-ordenar");
const buscador = document.getElementById("buscador");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

// FUNCIÓN PINTAR LA LISTA
//Apartados 1, 4 y 5
// Le pongo un parámetro opcional 'filtro' por si estamos usando el buscador.
function pintarLista(filtro = "") {
    // Primero vacia el <ul> para que no se dupliquen las cosas cada vez que redibujamos
    lista.innerHTML = "";

    // Apartado 4: Filtramos el array si el usuario ha escrito algo en el buscador.
    // Pasamos todo a minúsculas (.toLowerCase()) para que no importe si escriben mayúsculas.
    let elementosFiltrados = listaCompra.filter(producto => 
        producto.toLowerCase().includes(filtro.toLowerCase())
    );

    // Recorremos los elementos filtrados para pintarlos en pantalla
    elementosFiltrados.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = producto;

        // Apartado 5: Si hacemos clic en un producto de la lista, lo borramos.
        li.addEventListener("click", () => {
            // Busca el índice en el array ORIGINAL (por si estamos filtrando y el índice cambia)
            const indexReal = listaCompra.indexOf(producto);
            if (indexReal > -1) {
                listaCompra.splice(indexReal, 1); // Borramos 1 elemento
                // Volvemos a pintar manteniendo lo que hubiera en el buscador
                pintarLista(buscador.value); 
            }
        });

        // Metemos el <li> dentro del <ul>
        lista.appendChild(li);
    });

    // Actualizamos el texto de abajo (Apartado 3)
    actualizarContador();
}

// APARTADO 3: CONTADOR DE PRODUCTOS

function actualizarContador() {
    const total = listaCompra.length;

    if (total === 0) {
        contador.textContent = "La lista está vacía";
    } else if (total === 1) {
        contador.textContent = "Tienes 1 producto en la lista";
    } else {
        contador.textContent = `Tienes ${total} productos en la lista`;
    }
}

// APARTADO 2 y 6.2: AÑADIR PRODUCTO (Validaciones y repetidos)

function agregarProducto() {
    // .trim() quita los espacios tontos del principio y final que meta el usuario
    const texto = inputProducto.value.trim();

    // Si está vacío, no hacemos nada (return y fuera)
    if (texto === "") return;

    // Apartado 6.2: Comprobamos si ya existe en el array para no repetirlo
    if (listaCompra.includes(texto)) {
        alert("¡Ese producto ya está en la lista!");
        return; // Paramos aquí
    }

    // Lo metemos al array
    listaCompra.push(texto);

    // Limpiamos el input para que quede preparado para el siguiente
    inputProducto.value = "";

    // Repintamos la lista (pasándole lo que hubiera en el buscador por si acaso)
    pintarLista(buscador.value);
}

// EVENTOS (Listeners)

// Botón de agregar por clic
btnAgregar.addEventListener("click", agregarProducto);

// Apartado 6.1: Añadir también pulsando la tecla "Enter" en el input
inputProducto.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        agregarProducto();
    }
});

// Botón de eliminar el último elemento (Usa .pop())
btnEliminar.addEventListener("click", () => {
    listaCompra.pop();
    pintarLista(buscador.value);
});

// Apartado 4: Evento 'input' del buscador (salta cada vez que escribes una letra)
buscador.addEventListener("input", (evento) => {
    pintarLista(evento.target.value);
});

// Apartado 6.3: Botón para ordenar alfabéticamente con .sort()
btnOrdenar.addEventListener("click", () => {
    listaCompra.sort();
    pintarLista(buscador.value);
});



// INICIALIZACIÓN

// Cuando el HTML carga por completo, pintamos la lista inicial con los 3 elementos por defecto (Apartado 1)
document.addEventListener("DOMContentLoaded", () => {
    pintarLista();
});