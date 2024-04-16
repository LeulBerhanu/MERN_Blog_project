const asyncHandler = require("express-async-handler");
const Category = require("../../models/Category/Category");

const categoryController = {
  createCategoryController: asyncHandler(async (req, res) => {
    const { categoryName, description } = req.body;

    const categoryFound = await Category.findOne({ categoryName });
    if (categoryFound) {
      throw new Error("Category already exists");
    }

    const categoryCreated = await Category.create({
      categoryName,
      description,
      author: req.currentUser,
    });

    res
      .status(200)
      .json({ message: "Category created successfully!", categoryCreated });
  }),

  fetchAllCategoriesController: asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Category fetched successfully", categories });
  }),

  updateCategoryController: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;

    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error("Category not found");
    }

    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    res
      .status(200)
      .json({ message: "Category updated successfully", categoryUpdated });
  }),

  getCategoryController: asyncHandler(async (req, res) => {
    console.log(req.params);
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    res
      .status(200)
      .json({ message: "Category fetched successfully", category });
  }),

  deleteCategoryController: asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  }),
};

module.exports = categoryController;
