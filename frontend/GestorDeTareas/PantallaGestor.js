const API_URL = "http://localhost:3000/api/tareas";

// Recupera el token guardado al iniciar sesion
const token = localStorage.getItem("token");

// Si no hay token, regresa a la pantalla de login
if (!token) {
    window.location.href = "../AUTH/Index.html";
}

let tareas = [];
let seleccionada = -1;

// Encabezados con el token para las peticiones protegidas
function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// Si el token ya no es valido, regresa al login
function manejarNoAutorizado(response) {
    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "../AUTH/Index.html";
        return true;
    }
    return false;
}

// Pide al backend todas las tareas del usuario y las dibuja en la lista
async function Mostrartareas() {

    const response = await fetch(`${API_URL}/show`, {
        headers: headers()
    });

    if (manejarNoAutorizado(response)) return;

    tareas = await response.json();

    let html = "";

    for (let i = 0; i < tareas.length; i++) {

        let clase = tareas[i].completada ? "completado" : "";
        let seleccion = i === seleccionada ? "seleccionada" : "";

        html += `
            <li class="${clase} ${seleccion}" onclick="Seleccionartarea(${i})">
                ${tareas[i].titulo}
            </li>
        `;
    }

    document.getElementById("lista").innerHTML = html;
}

// Crea una nueva tarea
async function Agregartareas() {

    let input = document.getElementById("tareas");
    let texto = input.value.trim();

    if (texto === "") return;

    const response = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ titulo: texto })
    });

    if (manejarNoAutorizado(response)) return;

    input.value = "";
    seleccionada = -1;

    Mostrartareas();
}

// Selecciona una tarea de la lista
function Seleccionartarea(i) {
    seleccionada = i;
    Mostrartareas();
}

// Elimina la tarea seleccionada
async function Eliminartareas() {

    if (seleccionada === -1) return;

    const id = tareas[seleccionada].id;

    const response = await fetch(`${API_URL}/delete`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ id: id })
    });

    if (manejarNoAutorizado(response)) return;

    seleccionada = -1;

    Mostrartareas();
}

// Marca/desmarca la tarea seleccionada como completada
async function Marcarcompletada() {

    if (seleccionada === -1) return;

    const id = tareas[seleccionada].id;

    const response = await fetch(`${API_URL}/check`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ id: id })
    });

    if (manejarNoAutorizado(response)) return;

    Mostrartareas();
}

// Cierra sesion y regresa al login
function Cerrarsesion() {
    localStorage.removeItem("token");
    window.location.href = "../AUTH/Index.html";
}

// Carga la lista al abrir la pagina
Mostrartareas();