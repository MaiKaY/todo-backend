import { UserId } from '../../0.shared/User';
import { NotificationService } from '../../2.application/service/NotificationService';

export class InMemoryNotificationService implements NotificationService {
    public async onTodoCreated(userId: UserId, todoId: string): Promise<void> {
        console.log('onTodoCreated', userId, todoId);
    }

    public async onTodoCompleted(userId: UserId, todoId: string): Promise<void> {
        console.log('onTodoCompleted', userId, todoId);
    }

    public async onTodoDeleted(userId: UserId, todoId: string): Promise<void> {
        console.log('onTodoDeleted', userId, todoId);
    }
}
