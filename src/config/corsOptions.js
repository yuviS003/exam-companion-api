const allowedOrigins = require("../../allowedOrigins.json");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.origins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
