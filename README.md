# GraphQL-NodeJS Server

GraphQL server in Node.js using Express, Babel, MongoDB and Mongoose.

This project has been developed to practice my skills with the tech stack shown above.

## Running


```bash
npm install
npm start
```

## Requirements

* [Node.js](http://nodejs.org/)
* [MongoDB](https://www.mongodb.org/) 

A MongoDB instance running locally (sudo mongod) is required to run any of the user related queries and mutations.


## Graphql examples

* Blog (blog folder --> graphql-nodejs/graphql/blog).
* Pokemon (pokemon  --> graphql-nodejs/graphql/pokemon).

## Test

We can see it in action by sending a POST request to our server and sending the query as the request body:

*Pokemon request examples*

* curl -XPOST -H 'Content-Type:application/graphql'  -d '{ pokemon { name } }' http://localhost:3000/graphql
* curl -XPOST -H 'Content-Type:application/graphql'  -d '{ user(name: "Ana") { name, caught, created } }' http://localhost:3000/graphql
* curl -XPOST -H 'Content-Type:application/graphql'  -d 'mutation M { newUser(name: "Paco") { name, caught, created } }' http://localhost:3000/graphql
* curl -XPOST -H 'Content-Type:application/graphq'  -d 'mutation M { caughtPokemon(name: "Juan" pokemon: "Snorlax") { name, caught, created } }' http://localhost:3000/graphql


## License

The MIT License (MIT) Copyright (c)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Original work Copyright (c) 2017 Adrián Brito Pacheco
