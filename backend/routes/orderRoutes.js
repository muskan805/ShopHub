const express = require("express");
const router = express.Router();

const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// Create Order
router.post("/", protect, addOrderItems);

// Get Logged-in User Orders
router.get("/myorders", protect, getMyOrders);

// Get Order By ID
router.get("/:id", protect, getOrderById);

// Mark Order Delivered (Admin Only)
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);

module.exports = router;