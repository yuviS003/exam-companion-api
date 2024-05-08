const Response = require("../models/Response.model");

async function createResponse(formRespDetails) {
  console.log(formRespDetails);

  const doesResponseExists = await Response.findOne({
    formId: formRespDetails.formId,
    userId: formRespDetails.userId,
  });
  console.log("doesResponseExists", doesResponseExists);

  if (doesResponseExists)
    throw new Error("You have already answered this form!");

  const newResponse = await Response.create(formRespDetails);

  return newResponse;
}

async function getResponseById(formId, userId) {
  const doesResponseExists = await Response.findOne({
    formId,
    userId,
  });

  console.log("doesResponseExists", doesResponseExists);

  return doesResponseExists;
}

async function getAllResponses() {
  const doesResponseExists = await Response.find();

  console.log("doesResponseExists", doesResponseExists);

  return doesResponseExists;
}

async function getAllResponseByUserId(userId) {
  console.log("userId", userId);
  const doesResponseExists = await Response.find({
    userId,
  });

  console.log("doesResponseExists", doesResponseExists);

  return doesResponseExists;
}

module.exports = {
  createResponse,
  getResponseById,
  getAllResponseByUserId,
  getAllResponses,
};
