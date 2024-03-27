const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error("error handler", err);
  res
    .status(500)
    .json({ message: err?.message || err || "Internal Server Error" });
};

module.exports = errorHandler;
