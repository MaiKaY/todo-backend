import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';

import { app, createContext, defaultConfig } from '../../3.infrastructure/api/api';

export const server = new ApolloServer({
    ...defaultConfig,
    context: () => createContext('1337')
});

server.start().then(() => {
    app.use(morgan('dev'));
    server.applyMiddleware({ app });
    app.listen({ port: 1337 }, () => {
        console.log('Listening on http://localhost:1337' + server.graphqlPath);
    });
});
