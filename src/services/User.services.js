const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

async function registerUser(userDetails) {
  console.log(userDetails);
  const isUserExist = await User.findOne({ email: userDetails.email });

  if (isUserExist) {
    console.log("User already exists", isUserExist);
    throw new Error("User already exists");
  }

  const newUser = await User.create(userDetails);

  // Hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();
  return;
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist with this email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const userDetails = {
    _id: user._id,
    name: user.name,
    email: user.email,
    contactNumber: user.contactNumber,
    gender: user.gender,
    organization: user.organization,
    profession: user.profession,
    profilePhoto: user.profilePhoto,
  };

  // Generate JWT with expiration time of 1 hour
  const token = jwt.sign(userDetails, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY,
  });

  return {
    userDetails,
    token,
  };
}

module.exports = {
  registerUser,
  loginUser,
};
