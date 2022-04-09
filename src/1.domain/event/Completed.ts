import { DomainEvent } from '../../0.shared/event/DomainEvent';

export interface Completed extends DomainEvent {
    type: 'Completed';
    payload: {
        todoId: string;
    };
}
