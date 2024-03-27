const Joi = require("joi");
const { validateRequestJson } = require("../middlewares/validateRequestJson");

function createUserSchema(req, res, next) {
  const User = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    contactNumber: Joi.string(),
    gender: Joi.string(),
    organization: Joi.string(),
    profession: Joi.string(),
    profilePhoto: Joi.string(),
  });
  validateRequestJson(req, next, User);
}

module.exports = { createUserSchema };
