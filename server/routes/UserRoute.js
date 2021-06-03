//to set up the router point declare router here
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/UserModel");

router.post("/register", async (req, res) => {
  try {
    ///the destructuring of the inputed data
    const { email, password, passwordCheck, uniqueOrganizationCode } = req.body;
    //validtion
    if (!email || !password || !passwordCheck || !uniqueOrganizationCode)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 8 characters long!!" });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });
    //you can omit this part if this field is not what you want to include in your project
    if (uniqueOrganizationCode !== "uniqueOrganizationCode")
      return res.status(400).json({
        msg: "Invalid organization code! Please enter a valid organization code.",
      });

    //vaidation for no account with the same user
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists!" });
    //we dont want to ever store the password as a plain text in the database, HASHING PASSWORD
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new User({
      email,
      password: passwordHash,
      uniqueOrganizationCode: uniqueOrganizationCode,
    });
    //save the new user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//code or route for login
router.post("/login", async (req, res) => {
  try {
    ///the destructuring of the inputed data
    const { email, password } = req.body;
    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });

    //if the user doesnt exists
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered!" });

    //matching the password while logging in
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials..." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//for verifying the log in credentials from the frontend
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
  });
});

module.exports = router;
