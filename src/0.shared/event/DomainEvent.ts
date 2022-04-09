export interface DomainEvent {
    type: string;
    eventDate: Date;
    payload: Record<string, unknown>;
}
