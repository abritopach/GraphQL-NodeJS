import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export const CommentType =  new GraphQLObjectType({
  name: 'Comment',
  description: 'Represents a comment.',
  fields: () => ( {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the comment.'
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the post.'
    },
    text: {
      type: GraphQLString,
      description: 'The text of the comment.',
    }
  })
});
