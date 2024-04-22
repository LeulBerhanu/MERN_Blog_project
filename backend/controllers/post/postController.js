const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Category/Category");

const postController = {
  createPostController: asyncHandler(async (req, res) => {
    const { description, category } = req.body;

    // find the category
    const categoryFound = await Category.findById(category);
    if (!categoryFound) {
      throw new Error("Category not found");
    }

    const postCreated = await Post.create({
      description,
      image: req.file,
      author: req.currentUser,
      category,
    });

    console.log("postCreated", postCreated);
    // push the post into category
    categoryFound.posts.push(postCreated?._id);
    // resave the category
    await categoryFound.save();

    res
      .status(200)
      .json({ message: "Post created successfully!", data: postCreated });
  }),

  getAllPostsController: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 10 } = req.query;

    // basic filter
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.description = { $regex: title, $options: "i" }; //case insensitive
    }

    console.log(filter);

    const posts = await Post.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // total posts
    const totalPosts = await Post.countDocuments(filter);

    res.status(200).json({
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    });
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
