const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("./utils/passport-config");
const connectDB = require("./utils/connectDB");
const postRouter = require("./router/post/postsRouter");
const userRouter = require("./router/user/userRouter");

// Connect DB
connectDB();

const app = express();

const PORT = 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// passport middleware
app.use(passport.initialize());

//cors
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

// Not found handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on our server" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // prepare the error message
  const message = err.message;
  const stack = err.stack;
  res.status(500).send({ message, stack });
});

app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
