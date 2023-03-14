/**
 * Like.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

 like:{
  type: 'boolean', defaultsTo: false,
 }
,
 owner:{
  model:'users',
  unique: true
}
  },

};

