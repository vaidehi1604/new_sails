/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //user can comment
  postComment: async (req, res) => {
    const lang = req.getLocale();
    try {
      console.log(req.userData);
      const userId = req.userData.id;
      const { post } = req.body;
      const comments = req.body.comments;

      //find user
      const user = await Users.findOne({ id: userId });
      console.log(user);
      //find post
      const posts = await Post.findOne({ id: post });

      console.log(posts);
      const comment = await Comments.create({
        comments: `@${user.username} ${":" + comments}`,
        post: post,
        user: userId,
      });
      return res.status(201).json({
        message: sails.__("addcomment", lang),
      });
    } catch (error) {
      return res.status(201).json({
        message: sails.__("notaddcomment", lang),
      });
    }
  },
};
