const express = require("express");
const userModel = require("../models/userModel.js");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController.js");
const { isAdmin, requireSignIn } = require("../middlewares/authMiddleware.js");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.post("/verify", async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Find the user by email and verification code
    const user = await userModel.findOne({ email, verificationCode });

    // Check if the user is found and verification code is correct
    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or verification code is incorrect" });
    }

    // Update the user's isVerified field to true
    user.isVerified = true;
    await user.save();

    // Return a success message
    return res
      .status(200)
      .json({ message: "User verified successfully Please Login" });
  } catch (error) {
    // Return an error message if something goes wrong
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
