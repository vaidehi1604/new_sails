/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  adduser: async (req, res) => {
    try {
      var username = await Like.find({ like: "true" }).populate("postId");
      var user = await Like.find({ like: "true" }).populate("owner");

      return res.json({
        message: " store data !!",
        username: username,
        user: user,
      });
    } catch (error) {
      return res.json({
        error: error + "err",
        message: " store data !!",
      });
    }
  },
  addLike: async (req, res) => {
    const lang = req.getLocale();
    try {
      // console.log(req.userData);
      const userId = req.userData.id;
      const { postId } = req.body;
      //find user
      const user = await Users.findOne({ id: userId });
      //find post
      const post = await Post.findOne({ id: postId });
      //find like
      const like = await Like.findOne({ owner: userId, like: true });
      if (like) {
        if (postId == like.postId) {
          const newLike = await Like.updateOne(
            { id: like.id },
            { like: false }
          );
          return res.status(200).json({
            message: sails.__("dislike", lang),
          });
        } else {
          const addlike = await Like.create({
            like: true,
            owner: user.id,
            postId,
          }).fetch();

          return res.status(201).json({
            message: sails.__("postlike", lang),
            addlike: addlike,
          });
        }
      } else {
        const addlike = await Like.create({
          like: true,
          owner: user.id,
          postId,
        }).fetch();

        return res.status(201).json({
          message: sails.__("postlike", lang),
          addlike: addlike,
        });
      }
    } catch (error) {
      return res.status(201).json({
        error: error + "err",
        message: sails.__("notStore", lang),
      });
    }
  },
};
