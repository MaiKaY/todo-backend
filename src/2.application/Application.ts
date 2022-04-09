import { TodoRepository } from './repository/TodoRepository';
import { NotificationService } from './service/NotificationService';
import { Complete } from './use-case/Complete';
import { Create } from './use-case/Create';
import { Delete } from './use-case/Delete';

export class Application {
    public readonly complete: Complete;
    public readonly create: Create;
    public readonly delete: Delete;

    constructor(
        public readonly todoRepository: TodoRepository,
        public readonly notificationService: NotificationService
    ) {
        this.complete = new Complete(this.todoRepository, this.notificationService);
        this.create = new Create(this.todoRepository, this.notificationService);
        this.delete = new Delete(this.todoRepository, this.notificationService);
    }
}