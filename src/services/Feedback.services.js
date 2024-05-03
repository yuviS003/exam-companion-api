const Feedback = require("../models/Feedback.model");

async function createFeedback(reqBody) {
  const { userId, userFeedback } = reqBody;
  const newFeedback = await Feedback.create({ userId, userFeedback });

  return newFeedback?._id;
}

async function getAllFeedbacks() {
  return await Feedback.find();
}

module.exports = { createFeedback, getAllFeedbacks };
