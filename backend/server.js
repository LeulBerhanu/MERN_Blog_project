const express = require("express");
const cors = require("cors");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");

// Connect DB
connectDB();

console.log("hi");

const app = express();

const PORT = 5000;

// Middlewares
app.use(express.json());

//cors
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

app.post("/api/v1/posts/create", async (req, res) => {
  try {
    const postData = req.body;
    const postCreated = await Post.create(postData);
    res
      .status(200)
      .json({ message: "Post created successfully!", data: postCreated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
