var socket = io();

// Obtener nombre de user por URL
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios.') ;
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

// Conexión entrante
socket.on('connect', function() {
    socket.emit('enterChat', user, function(res) {        
        renderizarUsuarios(res);
    });
});

// Conexión perdida
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Enviar mensajes
socket.on('createMSG', function(message) {
    renderizarMensajes(message, false);
    scrollBottom();
});

// Esuchar cambios de usuarios (entra o sale del chat)
socket.on('listPersons', function(persons) {
    renderizarUsuarios(persons);
});

// Mensajes privados
socket.on('privateMSG', function(message) {
    console.log('Mensaje Privado:', message);
});