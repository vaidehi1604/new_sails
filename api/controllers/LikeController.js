/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  addLike: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { like, owner } = req.body;
    //   const likeuser = await Like.find({ owner });

      const addlike = await Like.create({
        like,
        owner,
      });

      return res.status(201).json({
        message: sails.__("dataStore", lang),
        // addlike: addlike,
      });
    } catch (error) {
      return res.status(201).json({
        error: error,
        message: sails.__("notStore", lang),
      });
    }
  },
};
