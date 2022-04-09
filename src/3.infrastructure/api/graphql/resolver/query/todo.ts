import { QueryResolvers } from '../../types';

export const todoQueryResolvers: Partial<QueryResolvers> = {
    todos: async (_, input, { application, user }) => {
        const todoList = await application.todoRepository.getByUserId(user.id);
        return todoList.todos.map((todo) => ({
            ...todo,
            timeline: {
                createdAt: todo.timeline.createdAt.toISOString(),
                completedAt: todo.timeline.completedAt?.toISOString()
            }
        }));
    }
};
