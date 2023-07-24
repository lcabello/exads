import fastify from 'fastify';
import { graphqlHandler } from './graphql/graphql-handler.js';
import { fastifyApolloHandler } from '@as-integrations/fastify';

const start = async () => {
  const app = fastify();

  const apollo = await graphqlHandler();


  app.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: fastifyApolloHandler(apollo)
  });

  app.get('/', (_req, reply) => {
    reply.type('text/html');
    reply.send('<html>Hi! Not much to see here. Try <a href="/graphql">/graphql</a>.</html>');
  });

  app.listen({
    port: 3000
  }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log(`
      🚀  Server is running!
      📭  Query at ${address}
    `);
  });
};

start();
