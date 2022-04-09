import { Config } from 'apollo-server-core';
import cors from 'cors';
import express from 'express';
import { GraphQLError, SourceLocation } from 'graphql';
import helmet from 'helmet';

import { User, UserId } from '../../0.shared/User';
import { Application } from '../../2.application/Application';
import { DynamoDbTodoRepository } from '../repository/DynamoDbTodoRepository';
import { InMemoryTodoRepository } from '../repository/InMemoryTodoRepository';
import { EventBridgeNotificationService } from '../service/EventBridgeNotificationService';

import { Context } from './graphql/Context';
import { todoMutationResolvers } from './graphql/resolver/mutation/todo';
import { todoQueryResolvers } from './graphql/resolver/query/todo';
import { typeDefs } from './graphql/schema';

const { ENVIRONMENT, EVENT_BUS_NAME, TODO_EVENT_STORE } = process.env as Record<string, string>;

export const app = express();
app.use(helmet());
app.use(
    helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true
    })
);
app.use(cors());

const errorFormatter = (
    error: GraphQLError
): {
    type?: string;
    message: string;
    locations?: readonly SourceLocation[];
    path?: ReadonlyArray<string | number>;
} => {
    console.log('Original Error', error.originalError);
    console.log('[ERROR][GraphQL:Response]', error);

    return {
        message: error.message,
        locations: ENVIRONMENT === 'Staging' ? error.locations : undefined,
        path: ENVIRONMENT === 'Staging' ? error.path : undefined
    };
};

export const createContext = async (userId: UserId): Promise<Context> => {
    const user = new User(userId);
    const application = new Application(
        ENVIRONMENT === 'Staging' ? new InMemoryTodoRepository() : new DynamoDbTodoRepository(TODO_EVENT_STORE),
        new EventBridgeNotificationService(EVENT_BUS_NAME)
    );
    return new Context(user, application);
};

export const defaultConfig: Config = {
    typeDefs,
    resolvers: {
        Query: {
            ...todoQueryResolvers
        },
        Mutation: {
            ...todoMutationResolvers
        }
    },
    formatError: errorFormatter,
    plugins: [
        {
            requestDidStart: async () => {
                const startTime = Date.now();
                return {
                    willSendResponse: async (requestContext) => {
                        requestContext.response.extensions = {
                            executionTimeInMilliseconds: Date.now() - startTime
                        };
                    }
                };
            }
        }
    ]
};
