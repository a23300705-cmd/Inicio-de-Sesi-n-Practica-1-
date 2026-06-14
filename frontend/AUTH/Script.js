// URL base del backend
const API_URL =
    "http://localhost:3000/api";

async function register() {

    const correo =
        document.getElementById(
            "registerCorreo"
        ).value;

    const contrasena =
        document.getElementById(
            "registerContrasena"
        ).value;

    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                correo: correo,
                contrasena: contrasena
            })
        }
    );

    const data =
        await response.json();

    alert(data.message);
}

async function login() {

    const correo =
        document.getElementById(
            "loginCorreo"
        ).value;

    const contrasena =
        document.getElementById(
            "loginContrasena"
        ).value;

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                correo: correo,
                contrasena: contrasena
            })
        }
    );

    const data =
        await response.json();

    if (!response.ok) {
        alert(data.message);
        return;
    }

    // Guarda el token para usarlo en la pantalla de tareas
    localStorage.setItem("token", data.token);

    alert(data.message);

    // Redirige a la pantalla de tareas
    window.location.href =
        "../GestorDeTareas/PantallaGestor.html";
}