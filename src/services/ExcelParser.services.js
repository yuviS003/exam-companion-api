const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

async function readExcelFile(fileName) {
  const filePath = path.join(__dirname, `../../assets/${fileName}`);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found." });
  }

  // Read Excel file
  const workbook = xlsx.readFile(filePath);

  // Assuming the first sheet is the one you want to read
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  // Extract data from the worksheet
  const allRows = xlsx.utils.sheet_to_json(worksheet);

  allRows.forEach((row) => {
    if (row?.Option) {
      row.Option = row.Option.split(",");
    }
  });

  return allRows;
}

async function downloadFormTemplate(fileName) {
  return new Promise((resolve, reject) => {
    // Assuming the assets folder path
    const filePath = path.join(__dirname, "../../assets", fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      reject(new Error("File not found."));
    }

    // Read the file asynchronously
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

async function parseExcelBuffer(buffer) {
  try {
    // Load Excel workbook from buffer
    const workbook = xlsx.read(buffer, { type: "buffer" });

    // Assuming the first sheet is the one you want to read
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Extract data from the worksheet
    const allRows = xlsx.utils.sheet_to_json(worksheet);

    allRows.forEach((row) => {
      if (row?.Option) {
        row.Option = row.Option.split(",");
      }
    });

    return allRows;
  } catch (error) {
    throw new Error("Error parsing Excel data from buffer: " + error.message);
  }
}

module.exports = {
  readExcelFile,
  downloadFormTemplate,
  parseExcelBuffer,
};
