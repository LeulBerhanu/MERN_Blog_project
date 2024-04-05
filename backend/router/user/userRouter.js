const express = require("express");
const userController = require("../../controllers/users/userController");

const userRouter = express.Router();

// Register
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

module.exports = userRouter;