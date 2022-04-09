import { UserId } from '../../0.shared/User';
import { NotificationService } from '../../2.application/service/NotificationService';

export class EventBridgeNotificationService implements NotificationService {
    public async onTodoCreated(userId: UserId, todoId: string): Promise<void> {
        console.log('onTodoCreated', userId, todoId);
        // @todo implement event bridge publishing
    }

    public async onTodoCompleted(userId: UserId, todoId: string): Promise<void> {
        console.log('onTodoCompleted', userId, todoId);
        // @todo implement event bridge publishing
    }
}
