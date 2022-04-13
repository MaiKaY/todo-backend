import { TodoAlreadyCompleted } from '../../../../../1.domain/exception/TodoAlreadyCompleted';
import { TodoDoesNotExists } from '../../../../../1.domain/exception/TodoDoesNotExists';
import { TodoNotCompleted } from '../../../../../1.domain/exception/TodoNotCompleted';
import {
    CompleteOutputError,
    CreateOutputError,
    DeleteOutputError,
    MutationResolvers,
    UncompleteOutputError
} from '../../types';

export const todoMutationResolvers: Partial<MutationResolvers> = {
    create: async (_, { input }, { application, user }) => {
        try {
            await application.create.invoke({
                user,
                description: input.description
            });
            return { error: null };
        } catch (e) {
            console.log(e);
            return {
                error: CreateOutputError.Internal
            };
        }
    },
    complete: async (_, { input }, { application, user }) => {
        try {
            await application.complete.invoke({
                user,
                todoId: input.todoId
            });
            return { error: null };
        } catch (e) {
            console.log(e);
            return {
                error:
                    e instanceof TodoDoesNotExists
                        ? CompleteOutputError.TodoDoesNotExists
                        : e instanceof TodoAlreadyCompleted
                        ? CompleteOutputError.TodoAlreadyCompleted
                        : CompleteOutputError.Internal
            };
        }
    },
    delete: async (_, { input }, { application, user }) => {
        try {
            await application.delete.invoke({
                user,
                todoId: input.todoId
            });
            return { error: null };
        } catch (e) {
            console.log(e);
            return {
                error: e instanceof TodoDoesNotExists ? DeleteOutputError.TodoDoesNotExists : DeleteOutputError.Internal
            };
        }
    },
    uncomplete: async (_, { input }, { application, user }) => {
        try {
            await application.uncomplete.invoke({
                user,
                todoId: input.todoId
            });
            return { error: null };
        } catch (e) {
            console.log(e);
            return {
                error:
                    e instanceof TodoDoesNotExists
                        ? UncompleteOutputError.TodoDoesNotExists
                        : e instanceof TodoNotCompleted
                        ? UncompleteOutputError.TodoNotCompleted
                        : UncompleteOutputError.Internal
            };
        }
    }
};
