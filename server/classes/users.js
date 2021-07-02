class Users {
    constructor() {
        this.persons = [];
    }

    // Agregar persona
    addPerson(id, name) {
        let person = { id, name };
        this.persons.push(person);
        return this.persons;
    }

    // Obtener una persona por id.
    getPersonById(id) {
        let person = this.persons.filter(person => person.id === id)[0];
        return person;
    }

    // Obtener personas.
    getPersons() {
        return this.persons;
    }

    // Obtener personas por sala.
    getPersonsByRoom(room) {}

    // Eliminar persona.
    deletePerson(id) {
        let personDelete = this.getPersonById(id);
        this.persons = this.persons.filter(person => person.id != id);

        return personDelete;
    }
}

module.exports = {
    Users
}