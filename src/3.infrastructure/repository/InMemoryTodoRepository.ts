import { UserId } from '../../0.shared/User';
import { TodoList } from '../../1.domain/TodoList';
import { TodoRepository } from '../../2.application/repository/TodoRepository';

const cache: Map<UserId, TodoList> = new Map();

export class InMemoryTodoRepository implements TodoRepository {
    public async getByUserId(userId: UserId): Promise<TodoList> {
        return cache.get(userId) ?? TodoList.fromEvents([]);
    }

    public async persist(userId: UserId, todoList: TodoList): Promise<void> {
        cache.set(userId, todoList);
    }
}
