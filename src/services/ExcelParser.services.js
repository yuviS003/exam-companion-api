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

module.exports = {
  readExcelFile,
};
