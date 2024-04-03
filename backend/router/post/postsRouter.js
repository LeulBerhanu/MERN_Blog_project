const express = require("express");
const {
  createPostController,
  getAllPostsController,
  updatePostController,
  getPostController,
  deletePostController,
} = require("../../controllers/post/postController");

const postRouter = express.Router();

postRouter.post("/create", createPostController);

postRouter.get("/", getAllPostsController);

postRouter.put("/:postId", updatePostController);

postRouter.get("/:postId", getPostController);

postRouter.delete("/:postId", deletePostController);

module.exports = postRouter;
