const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated");
const {
  payment,
  verifyPayment,
  free,
} = require("../../controllers/stripePayment/stripePaymentController");

const stripePaymentRouter = express.Router();

stripePaymentRouter.post("/checkout", isAuthenticated, payment);
// verify payment
stripePaymentRouter.get("/verify/:paymentId", verifyPayment);

stripePaymentRouter.get("/free-plan", isAuthenticated, free);

module.exports = stripePaymentRouter;
