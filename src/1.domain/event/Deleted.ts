import { DomainEvent } from '../../0.shared/event/DomainEvent';

export interface Deleted extends DomainEvent {
    type: 'Deleted';
    payload: {
        todoId: string;
    };
}
