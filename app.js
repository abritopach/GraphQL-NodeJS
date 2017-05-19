import express from 'express';
import graphqlHTTP from 'express-graphql';

import { serverConfig } from './config/config'

import pokemonSchema from './graphql/pokemon/schema';

import blogSchema from './graphql/blog/schema';

// MongoDB connection.
import {} from './database';

var app = express();

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  //schema: pokemonSchema,
  schema: blogSchema,
  pretty: true,
  graphiql: true
})));

// Start server.
var server = app.listen(serverConfig.port, () => {
  console.log('Listening at port', server.address().port);
});
