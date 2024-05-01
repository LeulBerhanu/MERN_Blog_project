const asyncHandler = require("express-async-handler");
const Plan = require("../../models/Plan/Plan");

const planController = {
  createPlan: asyncHandler(async (req, res) => {
    const { planName, features, price } = req.body;

    const planFound = await Plan.findOne({ planName });
    if (planFound) {
      throw new Error("Plan already exists");
    }

    // check if total plans are two
    const planCount = await Plan.countDocuments();
    if (planCount >= 2) {
      throw new Error("You cannot add more than two plans!");
    }

    const planCreated = await Plan.create({
      planName,
      features,
      price,
      user: req.currentUser,
    });

    res.status(200).json({
      status: "success",
      message: "Plan created successfully!",
      planCreated,
    });
  }),

  // get all plans
  list: asyncHandler(async (req, res) => {
    const plans = await Plan.find();
    res.status(200).json({
      status: "success",
      message: "Plans fetched successfully",
      plans,
    });
  }),

  getPlan: asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const plan = await Plan.findById(planId);
    res.status(200).json({
      status: "success",
      message: "Plan fetched successfully",
      plan,
    });
  }),

  updatePlan: asyncHandler(async (req, res) => {
    const planId = req.params.planId;

    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error("Plan not found");
    }

    const planUpdated = await Plan.findByIdAndUpdate(planId, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Plan updated successfully",
      planUpdated,
    });
  }),

  deletePlan: asyncHandler(async (req, res) => {
    const planId = req.params.planId;
    const deletePlan = await Plan.findByIdAndDelete(planId);
    res
      .status(200)
      .json({ status: "status", message: "Plan deleted successfully" });
  }),
};

module.exports = planController;
