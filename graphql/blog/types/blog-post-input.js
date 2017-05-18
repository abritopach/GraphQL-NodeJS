import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

export const BlogPostInputType = new GraphQLInputObjectType({
  name: 'BlogPostInput',
  fields: {
    _id: {type: GraphQLID},
    title: {type: GraphQLString},
    description: {type: GraphQLString}
  }
});
