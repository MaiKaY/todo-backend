import { DomainEvent } from '../../0.shared/event/DomainEvent';

export interface Created extends DomainEvent {
    type: 'Created';
    payload: {
        todoId: string;
        description: string;
    };
}
