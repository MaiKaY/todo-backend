import AWS from 'aws-sdk';

import { UserId } from '../../0.shared/User';
import { NotificationService } from '../../2.application/service/NotificationService';

const eventBridge = new AWS.EventBridge();

export class EventBridgeNotificationService implements NotificationService {
    constructor(private readonly eventBusName: string) {}

    public async onTodoCreated(userId: UserId, todoId: string): Promise<void> {
        await this.publish('Created', userId, todoId);
    }

    public async onTodoCompleted(userId: UserId, todoId: string): Promise<void> {
        await this.publish('Completed', userId, todoId);
    }

    public async onTodoDeleted(userId: UserId, todoId: string): Promise<void> {
        await this.publish('Deleted', userId, todoId);
    }

    private async publish(eventType: string, userId: UserId, todoId: string): Promise<void> {
        await eventBridge
            .putEvents({
                Entries: [
                    {
                        EventBusName: this.eventBusName,
                        Source: 'todo',
                        DetailType: eventType,
                        Detail: JSON.stringify({
                            userId,
                            todoId
                        })
                    }
                ]
            })
            .promise();
    }
}
