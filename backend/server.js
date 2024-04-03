const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");

// Connect DB
connectDB();

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

app.post(
  "/api/v1/posts/create",
  asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    // find post by title
    const postFound = await Post.findOne({ title });
    if (postFound) {
      throw new Error("Post already exists");
    }

    const postCreated = await Post.create({ title, description });
    res
      .status(200)
      .json({ message: "Post created successfully!", data: postCreated });
  })
);

app.get(
  "/api/v1/posts",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
  })
);

app.put(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }

    const postUpdated = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).json(postUpdated);
  })
);

app.get(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  })
);

app.delete(
  "/api/v1/posts/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const deletePost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletePost);
  })
);

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
