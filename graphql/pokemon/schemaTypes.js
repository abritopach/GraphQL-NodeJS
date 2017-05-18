import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
} from 'graphql';

import {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime
} from 'graphql-iso-date';



export const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    description: 'Represents pokemon.',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The name of the pokemon.',
        },
        type: {
            type: GraphQLString,
            description: 'The type of the pokemon.',
        },
        stage: {
            type: GraphQLInt,
            description: 'The level of the pokemon.',
        },
        species: {
            type: GraphQLString,
            description: 'The species of the pokemon.',
        }
    })
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Represents user.',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The name of the user.',
        },
        caught: {
            type: new GraphQLList(GraphQLString),
            description: 'The Pokemon that have been caught by the user.',
        },
        created: {
            type: GraphQLDateTime,
            description: 'The creation datetime of the user.'
        }
    })
});