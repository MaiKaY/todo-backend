import { User } from '../../0.shared/User';
import { TodoList } from '../../1.domain/TodoList';
import { TodoRepository } from '../repository/TodoRepository';
import { NotificationService } from '../service/NotificationService';

interface Request {
    user: User;
    todoId: string;
}

export class Uncomplete {
    constructor(
        private readonly todoRepository: TodoRepository,
        private readonly notificationService: NotificationService
    ) {}

    public async invoke(request: Request): Promise<TodoList> {
        let todoList = await this.todoRepository.getByUserId(request.user.id);

        todoList = todoList.uncomplete(request.todoId);
        await this.todoRepository.persist(request.user.id, todoList);
        await this.notificationService.onTodoUncompleted(request.user.id, request.todoId);

        return todoList;
    }
}
