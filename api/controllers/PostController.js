/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createPost: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { title, content, createdBy, date, owner } = req.body;
      req
        .file("image")
        .upload({ maxBytes: 10000000 }, async (err, uploadedFiles) => {
          if (err) {
            return res.status(500).json({
              message: sails.__("notpost", lang),
              error: err,
            });
          } else {
            let imageFd = "";
            console.log(uploadedFiles);

            if (uploadedFiles.length > 0) {
              imageFd = await uploadedFiles[0].fd;
            }

            try {
              const posts = await Post.create({
                title,
                content,
                image: imageFd,
                createdBy,
                date,
                like: {},
                comments: {},
                owner,
              }).fetch();
              return res.status(201).json({
                message: sails.__("dataStore", lang),
                posts: posts,
              });
            } catch (error) {
              return res
                .status(404)
                .json({
                  message: sails.__("notStore", lang),
                  error: error + "hello",
                });
            }
          }
        });
    } catch (error) {
      return res.json({
        message: sails.__("notStore", lang),
        error: error + "hello",
      });
    }
  },
  //user like post
  likeBtn: async (req, res) => {
    try {
      const { owner } = req.params;
      const user = await Users.find({ id: id });

      if ((owner = user.id)) {
        const like = await Post.update({ owner: owner }).set({
          like: id + "like",
        });
      }
      return res.status(200).json({
        message: " like your post!!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "not like  post!!",
      });
    }
  },
};
