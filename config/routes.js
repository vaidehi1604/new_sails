/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
//user routes
"POST /user":"UsersController.createUser",
"PATCH /user/:id":"UsersController.updatepws",
//post routes
"POST /post":"PostController.createPost",
"PATCH /post/:id":"PostController.likeBtn"
};
