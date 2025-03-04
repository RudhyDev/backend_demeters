export interface DomainEvent {
  readonly occurredOn: Date;
  readonly eventName: string;
}
