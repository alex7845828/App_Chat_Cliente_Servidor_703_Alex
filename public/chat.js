// La URL de ngrok es: https://suzette-unarbored-gutsily.ngrok-free.dev

// Temporalmente, usamos tu IP local para evitar ngrok y probar la conexión directa
var socket = io.connect('https://suzette-unarbored-gutsily.ngrok-free.dev');

var persona = document.getElementById('persona'),
    ingresar = document.getElementById('ingresar'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    appChat = document.getElementById('app-chat'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje'),
    enviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');

// Variable para el sonido
var audioNotificacion = document.getElementById('tono-notificacion'); 

// Evento para el botón de "Ingresar al chat"
ingresar.addEventListener('click', function() {
    if (persona.value) {
        // Lógica simple de cambio de panel (sin SweetAlert)
        panelBienvenida.style.display = "none";
        appChat.style.display = "block";
        usuario.value = persona.value;
        usuario.readOnly = true;
    }
});

// Evento para el botón de "Enviar mensaje"
enviar.addEventListener('click', function() {
    if (mensaje.value) {
        socket.emit('chat', {
            mensaje: mensaje.value,
            usuario: usuario.value
        });
        mensaje.value = "";
    }
});

// Evento para detectar que el usuario está escribiendo
mensaje.addEventListener('keypress', function() {
    if (persona.value) {
        socket.emit('typing', {
            nombre: usuario.value,
            texto: mensaje.value
        });
    }
});

// Recibir mensajes del servidor
socket.on('chat', function(data) {
    escribiendoMensaje.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.usuario + ': ' + '</strong>' + data.mensaje + '</p>';
    // Reproducir el sonido al recibir un mensaje
    audioNotificacion.play(); 
});

// Recibir notificación de que alguien está escribiendo
socket.on('typing', function(data) {
    if (data.texto) {
        escribiendoMensaje.innerHTML = '<p><en>' + data.nombre + ' esta escribiendo un mensaje...</en></p>';
    } else {
        escribiendoMensaje.innerHTML = "";
    }
});