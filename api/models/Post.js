/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attribute: {
    title: {
      type: "string",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    createdBy: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
    },

    like: {
      collection: "like",
      via: "postId",
    },
    comment: {
      collection: "comment",
      via: "post",
    },

    owner: {
      model: "users",
      required: true,
    },
  },
};
