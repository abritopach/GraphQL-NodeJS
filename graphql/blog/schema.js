// schema.js
import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean,
    GraphQLList
} from 'graphql';

import { BlogPostType } from './types/blog-post.js';
import { BlogPostInputType } from './types/blog-post-input.js';
import { CommentType } from './types/comment.js';
import { CommentInputType } from './types/comment-input.js'
import getProjection from './get-projection';
import BlogPostModel from '../../models/blog/blog-post';
import CommentModel from '../../models/blog/comment';

let schema = new GraphQLSchema({

    // Queries.

    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            blogPost: {
                type: BlogPostType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                // resolve method it seems info must be the 4th args in new versions (ctx).
                resolve (root, params, ctx, options) {
                    // options.fieldASTs[0] fieldAsTs naming convention has been changed to fieldNodes
                    // https://github.com/graphql/graphql-js/issues/473
                    const projection = getProjection(options.fieldNodes[0]);

                    return BlogPostModel
                        .findById(params.id)
                        .select(projection)
                        .exec();
                }
            },
            blogPosts: {
                type: new GraphQLList(BlogPostType),
                args: {},
                resolve (root, params, ctx, options) {
                    const projection = getProjection(options.fieldNodes[0]);

                    return BlogPostModel
                        .find()
                        .select(projection)
                        .exec();
                }
            },
            comment: {
                type: CommentType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve (root, params, ctx, options) {
                    const projection = getProjection(options.fieldNodes[0]);

                    return CommentModel
                        .findById(params.id)
                        .select(projection)
                        .exec();
                }
            },
            comments: {
                type: new GraphQLList(CommentType),
                args: {
                    postId: {
                        name: 'postId',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve (root, params, ctx, options) {
                    const projection = getProjection(options.fieldNodes[0]);

                    return CommentModel
                        .find({
                            postId: params.postId
                        })
                        .select(projection)
                        .exec();
                }
            }
        }
    }),

    // Mutations.

    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            //
            addBlogPost: {
                type: GraphQLBoolean,
                args: {
                    data: {
                        name: 'data',
                        type: new GraphQLNonNull(BlogPostInputType)
                    }
                },
                async resolve (root, params, options) {
                    const blogPostModel = new BlogPostModel(params.data);
                    const newBlogPost = await blogPostModel.save();

                    if (!newBlogPost) {
                        throw new Error('Error adding new blog post');
                    }
                    return true;
                }
            },
            removeBlogPost: {
                type: BlogPostType,
                args: {
                    _id: {
                        name: '_id',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                async resolve (root, params, ctx, options) {
                    const projection = getProjection(options.fieldNodes[0]);
                    const removedBlogPost = await BlogPostModel
                        .findByIdAndRemove(params._id, {
                            select: projection
                        })
                        .exec();

                    if (!removedBlogPost) {
                        throw new Error('Error removing blog post');
                    }

                    return removedBlogPost;
                }
            },
            removeAllBlogPosts: {
                type: GraphQLBoolean,
                resolve (root, params, ctx, options) {
                    return BlogPostModel
                        .remove({})
                        .exec();
                }
            },
            addComment: {
                type: GraphQLBoolean,
                args: {
                    data: {
                        name: 'data',
                        type: new GraphQLNonNull(CommentInputType)
                    }
                },
                async resolve (root, params, options) {
                    const commentModel = new CommentModel(params.data);
                    const newComment = await commentModel.save();

                    if (!newComment) {
                        throw new Error('Error adding new comment');
                    }
                    return true;
                }
            },
            removeComment: {
                type: CommentType,
                args: {
                    _id: {
                        name: '_id',
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                async resolve (root, params, ctx, options) {
                    const projection = getProjection(options.fieldNodes[0]);
                    const removedComment = await CommentModel
                        .findByIdAndRemove(params._id, {
                            select: projection
                        })
                        .exec();

                    if (!removedComment) {
                        throw new Error('Error removing blog post');
                    }

                    return removedComment;
                }
            },
            removeAllComments: {
                type: GraphQLBoolean,
                resolve (root, params, ctx, options) {
                    return CommentModel
                        .remove()
                        .exec();
                }
            }
        }
    })
});

export default schema;
