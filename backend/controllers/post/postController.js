const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");

const postController = {
  createPostController: asyncHandler(async (req, res) => {
    console.log("user", req.currentUser);
    const { description } = req.body;

    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.currentUser,
    });
    res
      .status(200)
      .json({ message: "Post created successfully!", data: postCreated });
  }),

  getAllPostsController: asyncHandler(async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
  }),

  updatePostController: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }

    const postUpdated = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    res.status(200).json(postUpdated);
  }),

  getPostController: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json(post);
  }),

  deletePostController: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const deletePost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletePost);
  }),
};

module.exports = postController;
