const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    formName: { type: String, required: true },
    formDescription: { type: String, required: true },
    formDueDate: { type: String, required: true },
    formDuration: { type: String, default: null },
    formQuestions: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
