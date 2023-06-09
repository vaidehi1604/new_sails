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
"POST /user/login":"UsersController.userLogin",
"PATCH /user/:id":"UsersController.updatepws",
"POST /user/logout":"UsersController.userLogout",

//post routes
"POST /post":"PostController.createPost",
"PATCH /post/:owner":"PostController.likeBtn",
"GET /post":"PostController.getPost",

//Like
"POST /like":"LikeController.addLike",
//Comment
"POST /comment":"CommentsController.postComment",

//user can get all place
"GET /alluser":"UsersController.getAllUser",
"GET /populate":"LikeController.adduser",
//following
"POST /following":"FollowingController.userFollowing"
};
