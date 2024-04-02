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

app.put("/api/v1/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }

    const postUpdated = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).json(postUpdated);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/v1/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const deletePost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletePost);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`server is up and running on port ${PORT}`));
