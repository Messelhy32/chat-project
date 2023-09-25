// In your routes/users.js file
router.post("/create-user", async function (req, res) {
  try {
    const { username, password } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
