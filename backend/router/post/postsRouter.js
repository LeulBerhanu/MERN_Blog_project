const express = require("express");
const multer = require("multer");
const storage = require("../../utils/fileupload");
const {
  createPostController,
  getAllPostsController,
  updatePostController,
  getPostController,
  deletePostController,
} = require("../../controllers/post/postController");

// multer instance
const upload = multer({ storage });

const postRouter = express.Router();

postRouter.post("/create", upload.single("image"), createPostController);

postRouter.get("/", getAllPostsController);

postRouter.put("/:postId", updatePostController);

postRouter.get("/:postId", getPostController);

postRouter.delete("/:postId", deletePostController);

module.exports = postRouter;
