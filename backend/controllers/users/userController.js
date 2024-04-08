const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User/User");

const userController = {
  // Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // register user
    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userRegistered });
  }),

  // Login
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      console.log("info", info);

      if (!user) return res.status(401).json({ message: info.message });

      // generate token
      const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });

      res.status(200).json({
        message: "Login success!",
        username: user?.username,
        email: user?.email,
        _id: user?._id,
      });
    })(req, res, next);
  }),
};

module.exports = userController;
