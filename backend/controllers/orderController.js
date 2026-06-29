const Order = require("../models/Order");

// Create Order
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice,
    } = req.body;

    if (orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
};