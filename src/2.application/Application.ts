import { TodoRepository } from './repository/TodoRepository';
import { Complete } from './use-case/Complete';
import { Create } from './use-case/Create';

export class Application {
    public readonly complete: Complete;
    public readonly create: Create;

    constructor(public readonly todoRepository: TodoRepository) {
        this.complete = new Complete(this.todoRepository);
        this.create = new Create(this.todoRepository);
    }
}
