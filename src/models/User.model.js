const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: false },
    gender: { type: String, required: false },
    organization: { type: String, required: false },
    profession: { type: String, required: false },
    profilePhoto: { type: String, required: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
