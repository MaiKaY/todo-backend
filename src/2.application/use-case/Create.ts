import { User } from '../../0.shared/User';
import { TodoList } from '../../1.domain/TodoList';
import { TodoRepository } from '../repository/TodoRepository';
import { NotificationService } from '../service/NotificationService';

interface Request {
    user: User;
    description: string;
}

export class Create {
    constructor(
        private readonly todoRepository: TodoRepository,
        private readonly notificationService: NotificationService
    ) {}

    public async invoke(request: Request): Promise<TodoList> {
        let todoList = await this.todoRepository.getByUserId(request.user.id);

        todoList = todoList.create(request.description);
        await this.todoRepository.persist(request.user.id, todoList);
        await this.notificationService.onTodoCreated(request.user.id, todoList.todos[todoList.todos.length - 1].id);

        return todoList;
    }
}
