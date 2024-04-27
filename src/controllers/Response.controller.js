const express = require("express");
const router = express.Router();
const responseService = require("../services/Response.services");

router.post("/create", createResponse);
router.get("/getById", getResponseById);

module.exports = router;

async function createResponse(req, res, next) {
  try {
    console.log("req.body received", req.body);
    const responseDetails = await responseService.createResponse(req.body);

    res.status(201).json({
      message: "Response saved successfully!",
      responseDetails,
    });
  } catch (error) {
    console.log("from controllers", error);
    next(error);
  }
}

async function getResponseById(req, res, next) {
  try {
    console.log("req.query received", req.query);

    const { formId, userId } = req.query;
    const responseDetails = await responseService.getResponseById(
      formId,
      userId
    );

    res.status(201).json(responseDetails);
  } catch (error) {
    console.log("from controllers", error);
    next(error);
  }
}
