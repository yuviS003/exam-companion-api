const express = require("express");
const router = express.Router();
const multer = require("multer");
const excelParserServices = require("../services/ExcelParser.services");

// Multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory

// Multer instance
const upload = multer({ storage: storage });

router.get("/read", readExcel);
router.get("/downloadFormTemplate", downloadFormTemplate);
router.post("/uploadFormTemplate", upload.single("file"), uploadFormTemplate); // Handle file upload

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

async function downloadFormTemplate(req, res, next) {
  try {
    const fileName = process.env.FORM_TEMPLATE_FILENAME;

    if (!fileName) {
      throw new Error("File Name not found in request parameters.");
    }

    const fileData = await excelParserServices.downloadFormTemplate(fileName);

    // Set the content type and attachment disposition for download
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // Send the file data as response
    res.send(fileData);
  } catch (error) {
    console.error("Error downloading file:", error);
    res
      .status(500)
      .json({ message: error.message || "Error downloading file." });
  }
}

async function uploadFormTemplate(req, res, next) {
  try {
    if (!req.file) {
      throw new Error("No file uploaded.");
    }

    // Read Excel file directly from memory
    const bufferData = req.file.buffer;
    const data = await excelParserServices.parseExcelBuffer(bufferData);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: error.message || "Error uploading file." });
  }
}
