export class TodoDoesNotExists extends Error {
    constructor() {
        super('Todo does not exists');
    }
}
