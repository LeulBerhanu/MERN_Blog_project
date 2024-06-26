require("dotenv").config();
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

  // googleAuth
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),
  // GoogleAuthCallback
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/login",
        session: false,
      },
      (err, user, info) => {
        if (err) return next(err);

        if (!user) {
          return res.redirect("http://localhost:5173/google-login-error");
        }

        // generate token
        const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });

        // set the token into the cookie
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, //1 day
        });

        // redirect the user to dashboard
        res.redirect("http://localhost:5173/dashboard");
      }
    )(req, res, next);
  }),
  // Check user auth status
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      } else {
        return res.status(200).json({
          isAuthenticated: true,
          _id: user.id,
          username: user.username,
          profilePicture: user.profilePicture,
          email: user.email,
        });
      }
    } catch (error) {
      return res.status(401).json({ isAuthenticated: false, error });
    }
  }),

  logout: asyncHandler(async (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "Logout successfull" });
  }),

  profile: asyncHandler(async (req, res) => {
    const currentUser = await User.findById(req.currentUser)
      .populate("posts")
      .select(
        "-password -passwordResetToken -accountVerificationToken -accountVerificationExpires -passwordResetExpires"
      );
    res.json({ currentUser });
  }),
};

module.exports = userController;
