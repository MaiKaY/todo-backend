import { User } from '../../0.shared/User';
import { TodoList } from '../../1.domain/TodoList';
import { TodoRepository } from '../repository/TodoRepository';

interface Request {
    user: User;
    description: string;
}

export class Create {
    constructor(private readonly todoRepository: TodoRepository) {}

    public async invoke(request: Request): Promise<TodoList> {
        let todoList = await this.todoRepository.getByUserId(request.user.id);

        todoList = todoList.create(request.description);
        await this.todoRepository.persist(request.user.id, todoList);

        return todoList;
    }
}
