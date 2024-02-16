require("dotenv").config();

require("./db/db");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Define your routes and controllers here...

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
