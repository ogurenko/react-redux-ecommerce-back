const Order = require("../models/order");

// fetch all the orders
exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};


exports.ordersStatus = async (req, res) => {
  console.log(req.body);
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec()

  res.json(updated);
};
