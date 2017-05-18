import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

export const CommentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});
