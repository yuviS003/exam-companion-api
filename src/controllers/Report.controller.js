const express = require("express");
const router = express.Router();
const reportService = require("../services/Report.services");

router.get("/", getUserReport);

async function getUserReport(req, res, next) {
  try {
    const report = await reportService.getUserReport(req.query);
    res.json(report);
  } catch (error) {
    console.log("Error in reports:", error);
    next(error);
  }
}

module.exports = router;
