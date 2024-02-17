const express = require("express");
const router = express.Router();
const excelParserServices = require("../services/ExcelParser.services");

router.get("/read", readExcel);

module.exports = router;

async function readExcel(req, res, next) {
  try {
    if (!req.query?.fileName) {
      throw new Error(
        "File Name not found in request. Make sure you have included them in query parameters"
      );
    }

    const data = await excelParserServices.readExcelFile(req.query?.fileName);

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res
      .status(500)
      .json({ message: error?.message || "Error reading Excel file." });
  }
}
