export class TodoAlreadyCompleted extends Error {
    constructor() {
        super('Todo already completed');
    }
}
