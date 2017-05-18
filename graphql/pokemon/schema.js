// schema.js
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
} from 'graphql';

import { PokemonType, UserType } from './schemaTypes';

import { Pokemon } from './pokemon';
import User from '../../models/pokemon/user';

let schema = new GraphQLSchema({

    // Queries.

    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            // Fetch the list of Pokemon.
            pokemon: {
                type: new GraphQLList(PokemonType),
                resolve: () => Pokemon
            },
            users: {
                type: new GraphQLList(UserType),
                description: 'Pokemon users',
                resolve: () => {
                    return User.find({}, (err, res) => {
                        return res;
                    });
                }
            },
            // User’s caught Pokemon.
            user: {
                type: UserType,
                args: {
                    name: {
                        description: 'The name of the user',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {name}) => {
                    console.log("name: " + name);
                    return User.findOne({name: name}, (err, res) => {
                        return res;
                    });
                }
            }
        }
    }),

    // Mutations.

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            // Create new user.
            newUser: {
                type: UserType,
                args: {
                    name: {
                        description: 'The name of the user.',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (obj, {name}) => {

                    return User.findOne({name: name}, (err, res) => {

                        if (err) throw err;
                        if (!res) {
                            User.create({
                                name:                   name,
                                caught:                 [],
                                created:                Date.now(),
                            }, function(err) {
                                if (err) {
                                    console.log(err);
                                    //throw err;
                                    return err;
                                }
                                else {
                                    console.log("User saved successfully.");
                                    return {sucess: true, message: "User saved successfully."};
                                }
                            });
                        }
                        else {
                            console.log("User already exists.");
                            return {success: false, message: "User already exists."}
                        }
                    });
                }
            },
            // Add Pokemon into their caught user list.
            caughtPokemon: {
                type: UserType,
                args: {
                    name: {
                        description: 'The name of the user.',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    pokemon: {
                        description: 'The name of the Pokemon that was caught.',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (obj, {name, pokemon}) => {

                    return User.findOne({name: name}, (err, res) => {

                        if (err) throw err;
                        if (!res) {
                            console.log("User not found.");
                            return {success: false, message: "User not found."}
                        }
                        else {

                            console.log(res);

                            var caught = res.caught;

                            caught.push(pokemon);


                            var query = { name: name };
                            var options = { multi: false };
                            var update = {caught: caught};

                            User.update(query, update, options, function(err){
                                if(err) throw err;
                                console.log("User info updated successfully.");
                                return {success: true, message: "User info updated successfully."}
                            });
                        }
                    });
                }
            }
        }
    })
});

export default schema;
