const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY = process.env.JWT_EXPIRY;

async function registerUser(userDetails) {
  console.log(userDetails);

  const isEmailExist = await User.findOne({ email: userDetails.email });
  const isUsernameExist = await User.findOne({
    userName: userDetails.userName,
  });

  if (isEmailExist) {
    console.log("User already exists with the same email", isEmailExist);
    throw new Error("User already exists with the same email");
  }

  if (isUsernameExist) {
    console.log("User already exists with the same username", isUsernameExist);
    throw new Error("User already exists with the same username");
  }

  const newUser = await User.create(userDetails);

  // Hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  await newUser.save();
  console.log(newUser);

  const newUserDetails = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    userName: newUser.userName,
    contactNumber: newUser.contactNumber,
    gender: newUser.gender,
    organization: newUser.organization,
    profession: newUser.profession,
    profilePhoto: newUser.profilePhoto,
  };
  const token = issueJWT(newUserDetails);

  return {
    userDetails: newUserDetails,
    token,
  };
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
    userName: user.userName,
    contactNumber: user.contactNumber,
    gender: user.gender,
    organization: user.organization,
    profession: user.profession,
    profilePhoto: user.profilePhoto,
  };

  const token = issueJWT(userDetails);

  return {
    userDetails,
    token,
  };
}

async function getAllUsers() {
  const allUsers = await User.find();
  return allUsers;
}

async function deleteUserById(userId) {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return deletedUser;
}

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUserById,
};

// helper functions
function issueJWT(userDetails) {
  // Generate JWT with expiration time of 1 hour
  const token = jwt.sign(userDetails, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY,
  });
  return token;
}
