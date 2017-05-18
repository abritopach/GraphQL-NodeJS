import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export const BlogPostType = new GraphQLObjectType({
  name: 'BlogPost',
  description: 'Represents blog.',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the blog post.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the post.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the post.',
    }
  })
});
