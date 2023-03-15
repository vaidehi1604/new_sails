const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const lang = req.getLocale();

  try {
    const token = await req.headers.authorization.split(" ")[1];
    // console.log(token);
    //verify token
    const decode = await sails.helpers.verifyToken.with({
      token: token,
    });
    req.userData = decode;
    const user = await Users.findOne({ email: decode.email });
    // console.log(user);
    if (!decode) {
      return res.status(404).json({
        message: sails.__("notmatch", lang),
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: sails.__("authFail", lang),
    });
  }
};
