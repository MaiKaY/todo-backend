export class TodoNotCompleted extends Error {
    constructor() {
        super('Todo not completed');
    }
}
