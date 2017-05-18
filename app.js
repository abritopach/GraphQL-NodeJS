import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import pokemonSchema from './graphql/pokemon/schema';

import blogSchema from './graphql/blog/schema';

var env = 'development', configDB = require('./config/db')[env]; // Get db config file.
//var env = 'production', configDB = require('./config/db')[env]; // Get db config file.

var app = express();

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  //schema: pokemonSchema,
  schema: blogSchema,
  pretty: true,
  graphiql: true
})));

// MongoDB connection.

mongoose.connect(configDB.url, function (error) {
  if (error) console.error(error);
  else console.log('Mongo connected.');
});

// Start server.
var server = app.listen(3000, () => {
  console.log('Listening at port', server.address().port);
});
