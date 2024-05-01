const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const {
  createPlan,
  list,
  updatePlan,
  getPlan,
  deletePlan,
} = require("../../controllers/plan/planController");

const planRouter = express.Router();

planRouter.post("/create", isAuthenticated, createPlan);

planRouter.get("/", list);

planRouter.get("/:planId", getPlan);

planRouter.put("/:planId", isAuthenticated, updatePlan);

planRouter.delete("/:planId", isAuthenticated, deletePlan);

module.exports = planRouter;
