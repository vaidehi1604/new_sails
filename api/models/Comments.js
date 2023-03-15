/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

   comments:{
    type:"string",
    required:true
   },
   post:{
    model:"post"
   }
   ,
   user:{
    model:"users"
   }

  },

};

