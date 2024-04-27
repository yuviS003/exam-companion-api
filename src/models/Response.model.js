const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true }, // Reference to the form
    userId: { type: String, required: true }, // Reference to the user
    form_response: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
