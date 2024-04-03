const express = require("express");
const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postRouter = express.Router();

postRouter.post(
  "/create",
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

postRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
  })
);

postRouter.put(
  "/:postId",
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

postRouter.get(
  "/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  })
);

postRouter.delete(
  "/:postId",
  asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const deletePost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletePost);
  })
);

module.exports = postRouter;
