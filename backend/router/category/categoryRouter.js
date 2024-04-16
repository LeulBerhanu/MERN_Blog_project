const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const {
  createCategoryController,
  fetchAllCategoriesController,
  updateCategoryController,
  getCategoryController,
  deleteCategoryController,
} = require("../../controllers/category/categoryController");

const categoryRouter = express.Router();

categoryRouter.post("/create", isAuthenticated, createCategoryController);

categoryRouter.get("/", fetchAllCategoriesController);

categoryRouter.put("/:categoryId", isAuthenticated, updateCategoryController);

categoryRouter.get("/:categoryId", getCategoryController);

categoryRouter.delete(
  "/:categoryId",
  isAuthenticated,
  deleteCategoryController
);

module.exports = categoryRouter;
