const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMSG } = require('../utils/utils');

// Inicialización de los objetos.
const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        console.log(data);

        if (!data.name || !data.room) {
            return callback({
                code: false,
                message: 'El nombre y sala son necesarios.'
            });
        }

        client.join(data.room);

        users.addPerson(client.id, data.name, data.room);

        // Person entra o sale del chat.
        client.broadcast.to(data.room).emit('listPersons', users.getPersonsByRoom(data.room));
        client.broadcast.to(data.room).emit('createMSG', createMSG('Administrador', `${ data.name } se unió`));

        callback(users.getPersonsByRoom(data.room));
    });

    client.on('createMSG', (data, callback) => {
        let person = users.getPersonById(client.id);
        let message = createMSG(person.name, data.message);

        client.broadcast.to(person.room).emit('createMSG', message);
        callback(message);
    });

    client.on('disconnect', () => {
        let person = users.deletePerson(client.id);

        client.broadcast.to(person.room).emit('createMSG', createMSG('Administrador', `El usuario ${ person.name } salio del chat.`));
        
        // Person entra o sale del chat.
        client.broadcast.to(person.room).emit('listPersons', users.getPersonsByRoom(person.room));
    });

    // Mensajes privados
    client.on('privateMSG', data => {
        let person = users.getPersonById(client.id);
        client.broadcast.to(data.for).emit('privateMSG', createMSG(person.name, data.message));
    });

});