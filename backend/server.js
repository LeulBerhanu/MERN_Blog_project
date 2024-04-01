const express = require("express");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");

// Connect DB
connectDB();

console.log("hi");

const app = express();

const PORT = 5000;

// Middlewares
app.use(express.json());

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
  console.log("hi");
});

app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
