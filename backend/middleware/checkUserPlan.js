const User = require("../models/User/User");
const asyncHandler = require("express-async-handler");

const checkUserPlan = asyncHandler(async (req, res, next) => {
  try {
    // get the loggedin user
    const user = await User.findById(req.user);
    // check user plan
    if (!user?.hasSelectedPlan) {
      return res.json({
        message: "You must select a plan before creating a post.",
      });
    }

    next();
  } catch (err) {
    return res.json(err);
  }
});

module.exports = checkUserPlan;
