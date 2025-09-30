var socket = io.connect('http://localhost:4000');

var persona = document.getElementById('persona'),
    ingresar = document.getElementById('ingresar'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    appChat = document.getElementById('app-chat'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje'),
    enviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');

// Evento para el botón de "Ingresar al chat"
ingresar.addEventListener('click', function() {
    if (persona.value) {
        panelBienvenida.style.display = "none";
        appChat.style.display = "block";
        usuario.value = persona.value;
        usuario.readOnly = true;

        // SweetAlert2 para dar la bienvenida al usuario
        Swal.fire({
            title: `¡Hola, ${usuario.value}!`,
            text: 'Has ingresado al chat. ¡Empieza a chatear!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
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
});

// Recibir notificación de que alguien está escribiendo
socket.on('typing', function(data) {
    if (data.texto) {
        escribiendoMensaje.innerHTML = '<p><en>' + data.nombre + ' esta escribiendo un mensaje...</en></p>';
    } else {
        escribiendoMensaje.innerHTML = "";
    }
});