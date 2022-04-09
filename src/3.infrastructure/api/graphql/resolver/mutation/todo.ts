import { TodoAlreadyCompleted } from '../../../../../1.domain/exception/TodoAlreadyCompleted';
import { TodoDoesNotExists } from '../../../../../1.domain/exception/TodoDoesNotExists';
import { CompleteOutputError, CreateOutputError, MutationResolvers } from '../../types';

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
    }
};
