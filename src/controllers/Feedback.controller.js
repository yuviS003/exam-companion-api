const express = require("express");
const router = express.Router();
const feedbackService = require("../services/Feedback.services");

router.post("/create", createFeedback);
router.get("/", getAllFeedbacks);

async function createFeedback(req, res, next) {
  try {
    const feedbackData = req.body;
    const newFeedbackId = await feedbackService.createFeedback(feedbackData);
    res.status(201).json({
      message: "SUCCESS!",
      newFeedbackId,
    });
  } catch (error) {
    console.log("Error in creating feedback:", error);
    next(error);
  }
}

async function getAllFeedbacks(req, res, next) {
  try {
    const feedback = await feedbackService.getAllFeedbacks();
    res.json(feedback);
  } catch (error) {
    console.log("Error in fetching forms:", error);
    next(error);
  }
}

module.exports = router;
