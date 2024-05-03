require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./db/db");
const { verifyToken } = require("./middlewares/authHandler");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// routes
app.use("/api/user", require("./controllers/User.controller"));

// middleware to verify jwt
// app.use(verifyToken);

app.use("/api/excel", require("./controllers/ExcelParser.controller"));
app.use("/api/form", require("./controllers/Form.controller"));
app.use("/api/response", require("./controllers/Response.controller"));
app.use("/api/feedback", require("./controllers/Feedback.controller"));
app.use("/api/report", require("./controllers/Report.controller"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
