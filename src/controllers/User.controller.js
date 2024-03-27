const express = require("express");
const router = express.Router();
const userService = require("../services/User.services");
const { createUserSchema } = require("../schemas/User.schema");

router.post("/signup", createUserSchema, registerUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUserById);

module.exports = router;

async function registerUser(req, res, next) {
  try {
    console.log("req.body received", req.body);
    const userSignupDetails = await userService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully!",
      userDetails: userSignupDetails.userDetails,
      token: userSignupDetails.token,
    });
  } catch (error) {
    console.log("from controllers", error);
    next(error);
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: error?.message || "Internal Server Error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}

async function deleteUserById(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUserById(userId);
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
}
