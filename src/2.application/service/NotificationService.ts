import { UserId } from '../../0.shared/User';

export interface NotificationService {
    onTodoCreated(userId: UserId, todoId: string): Promise<void>;

    onTodoCompleted(userId: UserId, todoId: string): Promise<void>;

    onTodoDeleted(userId: UserId, todoId: string): Promise<void>;

    onTodoUncompleted(userId: UserId, todoId: string): Promise<void>;
}
