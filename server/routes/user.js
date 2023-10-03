// you first need to import express and call the Router method to be able to use the router

const express = require("express");
const router = express.Router();

//always remember to import the model you're performing CRUD operations on
const User = require("../models/user");

// In your routes/users.js file
router.post("/create-user", async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(409).json({ message: "User already exists" });
    } else {
      // Create a new user instance
      const newUser = new User({
        username,
        password,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// In your routes/users.js file
router.post("/check-user", async function (req, res) {
  try {
    const { username, password } = req.body;

    // Query the database to find a user with the provided username and password
    const user = await User.findOne({ username, password });

    if (user) {
      // User with the provided credentials exists
      res.status(200).json({ message: "User exists in the database" });
    } else {
      // User with the provided credentials does not exist
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// also don't forget to export your router

module.exports = router;
