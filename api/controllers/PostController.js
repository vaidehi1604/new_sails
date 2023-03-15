/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createPost: async (req, res) => {
    const lang = req.getLocale();
    const newDate = new Date().toLocaleDateString();
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
                date:newDate,
                // like:false,
                // comment: {},
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
  
 
};
