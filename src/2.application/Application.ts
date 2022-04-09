import { TodoRepository } from './repository/TodoRepository';
import { NotificationService } from './service/NotificationService';
import { Complete } from './use-case/Complete';
import { Create } from './use-case/Create';

export class Application {
    public readonly complete: Complete;
    public readonly create: Create;

    constructor(
        public readonly todoRepository: TodoRepository,
        public readonly notificationService: NotificationService
    ) {
        this.complete = new Complete(this.todoRepository, this.notificationService);
        this.create = new Create(this.todoRepository, this.notificationService);
    }
}
