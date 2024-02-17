const express = require("express");
const router = express.Router();
const userService = require("../services/User.services");

router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports = router;

async function registerUser(req, res, next) {
  try {
    const {
      name,
      email,
      contactNumber,
      gender,
      organization,
      profession,
      profilePhoto,
      password,
    } = req.body;

    await userService.registerUser({
      name,
      email,
      contactNumber,
      gender,
      organization,
      profession,
      profilePhoto,
      password,
    });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
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
