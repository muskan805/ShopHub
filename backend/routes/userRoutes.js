const express = require("express");
const router = express.Router();

const {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// Register User
router.post("/", registerUser);

// Login User
router.post("/login", authUser);

// User Profile (Protected)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// Admin Route (Test)
router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin!",
  });
});

module.exports = router;