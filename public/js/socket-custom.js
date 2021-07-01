var socket = io();

// Obtener nombre de user por URL
var params = new URLSearchParams(window.location.search);

if (!params.has('name')) {
    window.location = 'index.html';
    throw new Error('Nombre necesario') ;
}

var user = {
    name: params.get('name')
};

// Conexión entrante
socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enterChat', user, function(res) {
        console.log(res);
    });
});

// Conexión perdida
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Enviar mensajes
socket.on('createMSG', function(message) {
    console.log('Servidor:', message);
});

// Esuchar cambios de usuarios (entra o sale del chat)
socket.on('listPersons', function(persons) {
    console.log(persons);
});