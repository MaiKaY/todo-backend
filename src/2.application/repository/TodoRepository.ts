import { UserId } from '../../0.shared/User';
import { TodoList } from '../../1.domain/TodoList';

export interface TodoRepository {
    getByUserId(userId: UserId): Promise<TodoList>;

    persist(userId: UserId, todoList: TodoList): Promise<void>;
}
