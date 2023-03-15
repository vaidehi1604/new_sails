const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  createUser: async (req, res) => {
    const lang = req.getLocale();
    try {
      const { username, email, password } = req.body;
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

            if (uploadedFiles.length > 0) {
              imageFd = await uploadedFiles[0].fd;
            }
            const emails = await Users.find({ email: req.body.email });
            if (emails.length > 0) {
              return res.status(409).json({
                message: sails.__("email", lang),
              });
            }
            try {
              bcrypt.hash(password, 10, async (err, hash) => {
                const users = await Users.create({
                  username,
                  email,
                  password: hash,
                  image: imageFd,
                  followers: {},
                  following: {},
                }).fetch();
                return res.status(201).json({
                  message: sails.__("dataStore", lang),
                  user: users,
                });
              });
            } catch (error) {
              return res
                .status(201)
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

  //login user
  userLogin: async (req, res) => {
    const lang = req.getLocale();
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    console.log(email);
    console.log(user.id);
    const checkpass = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(404).json({
        message: sails__("notUser", lang),
      });
    } else {
      if (checkpass === true) {
        try {
          const token = await sails.helpers.generateToken(email, user.id, "8h");
          console.log(token);
          const userUpdate = await Users.updateOne({ email },{ token: token });
          return res.status(200).json({
            message: sails.__("token", lang),
            token: token,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            error: error + "err",
            message: sails.__("nottoken", lang),
          });
        }
      } else {
        return res.status(500).json({
          error: error + "err",
          message: sails.__("notlogin", lang),
        });
      }
    }
  },
//user can seen all user 
getAllUser:async(req,res)=>{
  const lang = req.getLocale();

try {
  const getUser=await Users.find()
  console.log(getUser);
  return res.status(200).json({
    count:doc.length,
    message:sails.__("getUser",lang),
    getUser:getUser,
  })
  
} catch (error) {
  return res.status(200).json({
    message:sails.__("notgetUser",lang),
   
  })
}

},

  //update pws and image
  updatepws: async (req, res) => {
    const lang = req.getLocale();

    try {
      const { id } = req.params;
      const user = await Users.findOne(id);
      if (id === user.id) {
        const updated = await Users.updateOne({ id: id }).set(req.body);
        return res.status(200).json({
          message: sails.__("dataupdate", lang),
          updated: updated,
        });
      } else {
        return res.status(404).json({
          message: sails.__("notupdate", lang),
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: error + "err",
        message: sails.__("notupdate", lang),
      });
    }
  },
};
