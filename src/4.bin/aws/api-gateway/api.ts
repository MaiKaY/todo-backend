import { ApolloServer } from 'apollo-server-lambda';

import { createContext, defaultConfig } from '../../../3.infrastructure/api/api';

const server = new ApolloServer({
    ...defaultConfig,
    context: ({ event }) => createContext(event.requestContext.authorizer.claims.sub)
});

exports.handler = server.createHandler();
