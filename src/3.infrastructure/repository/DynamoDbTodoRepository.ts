import { chunk } from 'lodash';

import { UserId } from '../../0.shared/User';
import { DomainEvent, TodoList } from '../../1.domain/TodoList';
import { TodoRepository } from '../../2.application/repository/TodoRepository';

import { AbstractDynamoDb } from './AbstractDynamoDb';

interface PersistedEvent {
    userId: string;
    eventType: 'Completed' | 'Created' | 'Deleted';
    eventDate: string;
    payload: string;
}

export class DynamoDbTodoRepository extends AbstractDynamoDb implements TodoRepository {
    constructor(protected readonly eventStore: string) {
        super();
    }

    public async getByUserId(userId: UserId): Promise<TodoList> {
        const persistedEvents = (await this.query({
            TableName: this.eventStore,
            KeyConditionExpression: 'userId = :userId',
            ConsistentRead: true,
            ExpressionAttributeValues: {
                ':userId': userId
            }
        })) as PersistedEvent[];

        const events = persistedEvents
            .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
            .map(
                (persistedEvent): DomainEvent => ({
                    type: persistedEvent.eventType,
                    eventDate: new Date(persistedEvent.eventDate),
                    payload: JSON.parse(persistedEvent.payload)
                })
            );

        return TodoList.fromEvents(events);
    }

    public async persist(userId: UserId, todoList: TodoList): Promise<void> {
        const eventsToPersist = todoList.changes.map(
            (change): PersistedEvent => ({
                userId,
                eventType: change.type,
                eventDate: change.eventDate.toISOString(),
                payload: JSON.stringify(change.payload || {})
            })
        );

        const chunks = chunk(eventsToPersist, 25);
        const putRequests = chunks.map((chunk: PersistedEvent[]) =>
            this.documentClient
                .batchWrite({
                    RequestItems: {
                        [this.eventStore]: chunk.map((chunkItem) => ({
                            PutRequest: {
                                Item: chunkItem
                            }
                        }))
                    }
                })
                .promise()
        );
        await Promise.all(putRequests);
    }
}
