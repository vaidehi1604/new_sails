const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Generate token",

  description: "",

  inputs: {
    email: {
      type: "string",
      required: true,
    },
    id: {
      type: "string",
      required: true,
    },
    expiresIn: {
      type: "string",
      required: true,
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
    error: {
      description: "Token is not generate",
    },
  },

  fn: async function (inputs, exits) {
    try {
      const { email, id, expiresIn } = inputs;
      //generate token
      const token = jwt.sign(
        {
          email,
          id,
        },
        process.env.JWT_KEY,
        {
          expiresIn,
        }
      );
      return exits.success(token);
    } catch (error) {
      return exits.error(error);;
    }
  },
};
