import { ApolloServer } from 'apollo-server-lambda';

import { createContext, defaultConfig } from '../../../3.infrastructure/api/api';

const server = new ApolloServer({
    ...defaultConfig,
    // context: ({ event }) => createContext(event.requestContext.authorizer.claims.sub) // AuthorizationType.COGNITO
    context: () => createContext('1337')
});

exports.handler = server.createHandler();
