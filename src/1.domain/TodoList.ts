import { v4 as uuid } from 'uuid';

import { Completed } from './event/Completed';
import { Created } from './event/Created';
import { Deleted } from './event/Deleted';
import { Uncompleted } from './event/Uncompleted';
import { TodoAlreadyCompleted } from './exception/TodoAlreadyCompleted';
import { TodoDoesNotExists } from './exception/TodoDoesNotExists';
import { TodoNotCompleted } from './exception/TodoNotCompleted';

export type DomainEvent = Completed | Created | Deleted | Uncompleted;

export type Timeline = {
    createdAt: Date;
    completedAt?: Date;
};

export type Todo = {
    id: string;
    description: string;
    isCompleted: boolean;
    timeline: Timeline;
};

export type Attributes = {
    todos: Todo[];
};

const defaultAttributes: Attributes = {
    todos: []
};

export class TodoList {
    public static fromEvents(events: DomainEvent[]): TodoList {
        return events.reduce((item, event) => item.apply(event), new TodoList(defaultAttributes, []));
    }

    private constructor(public readonly attributes: Attributes, public readonly changes: DomainEvent[]) {}

    public get todos(): Todo[] {
        return this.attributes.todos;
    }

    public create(description: string): TodoList {
        const event: Created = {
            type: 'Created',
            eventDate: new Date(),
            payload: {
                todoId: uuid(),
                description
            }
        };
        return this.causes(event);
    }

    public complete(todoId: string): TodoList {
        const todo = this.todos.find((item) => item.id === todoId);
        if (!todo) {
            throw new TodoDoesNotExists();
        }
        if (todo.isCompleted) {
            throw new TodoAlreadyCompleted();
        }
        const event: Completed = {
            type: 'Completed',
            eventDate: new Date(),
            payload: {
                todoId
            }
        };
        return this.causes(event);
    }

    public uncomplete(todoId: string): TodoList {
        const todo = this.todos.find((item) => item.id === todoId);
        if (!todo) {
            throw new TodoDoesNotExists();
        }
        if (!todo.isCompleted) {
            throw new TodoNotCompleted();
        }
        const event: Uncompleted = {
            type: 'Uncompleted',
            eventDate: new Date(),
            payload: {
                todoId
            }
        };
        return this.causes(event);
    }

    public delete(todoId: string): TodoList {
        const todo = this.todos.find((item) => item.id === todoId);
        if (!todo) {
            throw new TodoDoesNotExists();
        }
        const event: Deleted = {
            type: 'Deleted',
            eventDate: new Date(),
            payload: {
                todoId
            }
        };
        return this.causes(event);
    }

    private causes(event: DomainEvent): TodoList {
        return this.copyWith({ changes: [...this.changes, event] }).apply(event);
    }

    private apply(event: DomainEvent): TodoList {
        switch (event.type) {
            case 'Created': {
                return this.copyWith({
                    attributes: {
                        ...this.attributes,
                        todos: [
                            ...this.todos,
                            {
                                id: event.payload.todoId,
                                description: event.payload.description,
                                isCompleted: false,
                                timeline: {
                                    createdAt: event.eventDate
                                }
                            }
                        ]
                    }
                });
            }
            case 'Completed': {
                return this.copyWith({
                    attributes: {
                        ...this.attributes,
                        todos: this.todos.map((todo) => ({
                            ...todo,
                            isCompleted: todo.id !== event.payload.todoId ? todo.isCompleted : true,
                            timeline:
                                todo.id !== event.payload.todoId
                                    ? todo.timeline
                                    : {
                                          ...todo.timeline,
                                          completedAt: event.eventDate
                                      }
                        }))
                    }
                });
            }
            case 'Uncompleted': {
                return this.copyWith({
                    attributes: {
                        ...this.attributes,
                        todos: this.todos.map((todo) => ({
                            ...todo,
                            isCompleted: todo.id !== event.payload.todoId ? todo.isCompleted : false,
                            timeline:
                                todo.id !== event.payload.todoId
                                    ? todo.timeline
                                    : {
                                          ...todo.timeline,
                                          completedAt: undefined
                                      }
                        }))
                    }
                });
            }
            case 'Deleted': {
                return this.copyWith({
                    attributes: {
                        ...this.attributes,
                        todos: this.todos.filter((todo) => todo.id !== event.payload.todoId)
                    }
                });
            }
        }
    }

    private copyWith({ attributes, changes }: { attributes?: Attributes; changes?: DomainEvent[] }): TodoList {
        return new TodoList(attributes || this.attributes, changes || this.changes);
    }
}
