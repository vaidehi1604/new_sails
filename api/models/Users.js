/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attribute: {
    username: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
    },
    post: {
      collection: "post",
      via: "owner",
    },
    followers: {
      type: "json",
    },
    following: {
      type: "json",
    },
    like: {
      collection:'like',
      via: 'owner'
    },
    comment: {
      collection:'comment',
      via: 'user'
    },
  },
};
