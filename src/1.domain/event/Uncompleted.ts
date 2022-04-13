import { DomainEvent } from '../../0.shared/event/DomainEvent';

export interface Uncompleted extends DomainEvent {
    type: 'Uncompleted';
    payload: {
        todoId: string;
    };
}
