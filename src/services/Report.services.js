const Feedback = require("../models/Feedback.model");
const Response = require("../models/Response.model");
const User = require("../models/User.model");
const Form = require("../models/Form.model");

async function getUserReport(reqQuery) {
  console.log("reqQuery", reqQuery);
  const { userRole, userId } = reqQuery;

  if (userRole === "system-admin") {
    const allUsers = await User.find();
    const allForms = await Form.find();
    const allResponses = await Response.find();
    const allFeedback = await Feedback.find();

    return {
      totalUsers: allUsers.length,
      totalForms: allForms.length,
      totalResponses: allResponses.length,
      totalFeedback: allFeedback.length,
    };
  } else if (userRole === "user") {
    const allUsers = await User.find();
    const allForms = await Form.find({
      userId,
    });
    const allResponses = await Response.find({ userId });
    const allFeedback = await Feedback.find({ userId });

    return {
      totalUsers: allUsers.length,
      totalForms: allForms.length,
      totalResponses: allResponses.length,
      totalFeedback: allFeedback.length,
    };
  }
  return;
}

module.exports = { getUserReport };
