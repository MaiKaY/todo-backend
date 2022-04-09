import { gql } from 'apollo-server';

export const typeDefs = gql`
    """
    ISO-8601 encoded UTC date string. Example value: \`"2022-01-01T13:37:01.337Z"\`
    """
    scalar DateTime

    type Timeline {
        createdAt: DateTime!
        completedAt: DateTime
    }

    type Todo {
        id: ID!
        description: String!
        isCompleted: Boolean!
        timeline: Timeline!
    }

    type Query {
        """
        Get all todos
        """
        todos: [Todo!]!
    }

    type Mutation {
        """
        Create new todo
        """
        create(input: CreateInput!): CreateOutput!

        """
        Complete todo
        """
        complete(input: CompleteInput!): CompleteOutput!
    }

    input CreateInput {
        description: String!
    }

    type CreateOutput {
        error: CreateOutputError
    }

    enum CreateOutputError {
        INTERNAL
    }

    input CompleteInput {
        todoId: ID!
    }

    type CompleteOutput {
        error: CompleteOutputError
    }

    enum CompleteOutputError {
        TODO_DOES_NOT_EXISTS
        TODO_ALREADY_COMPLETED
        INTERNAL
    }
`;
