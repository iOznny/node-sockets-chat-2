const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMSG } = require('../utils/utils');

// Inicialización de los objetos.
const users = new Users();

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name) {
            return callback({
                code: false,
                message: 'El nombre es necesario.'
            });
        }

        let persons = users.addPerson(client.id, data.name);

        // Person entra o sale del chat.
        client.broadcast.emit('listPersons', users.getPersons());

        callback(persons);
    });

    client.on('createMSG', (data) => {
        let person = users.getPersons(client.id);
        let message = createMSG(data.name, data.message);
        client.broadcast.emit('createMSG', message);
    });

    client.on('disconnect', () => {
        let person = users.deletePerson(client.id);

        client.broadcast.emit('createMSG', createMSG('Administrador', `El usuario ${ person.name } salio del chat.`));
        
        // Person entra o sale del chat.
        client.broadcast.emit('listPersons', users.getPersons());
    });

});