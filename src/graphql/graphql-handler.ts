import { ApolloServer } from '@apollo/server';
import resolvers from './resolvers.js';
import typeDefs from "./schema.js";

export const graphqlHandler = async () => {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();

    return apolloServer;
};