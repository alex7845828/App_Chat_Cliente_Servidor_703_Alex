var express = require('express');
var socket = require('socket.io');

var app = express();

// 1. AJUSTE CRÍTICO: Usar el puerto de Render o el 4000 local
const port = process.env.PORT || 4000; 

// Iniciar el servidor, usando la variable de puerto
var server = app.listen(port, function(){
    console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(express.static('public'));

// 2. AJUSTE: Socket.io para la nube (Render)
// En la nube, es mejor omitir la configuración CORS, ya que el dominio de Render
// y el de Firebase son diferentes y no habrá conflicto de localhost.
// Render automáticamente gestiona la conexión HTTPS/WSS.
var io = socket(server);

// 3. Modificación del manejo de eventos (mismo código)
io.on('connection', function(socket){
    console.log('Hay una conexion', socket.id);

    socket.on('chat', function(data){
        console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});