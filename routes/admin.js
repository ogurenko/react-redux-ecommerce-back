const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, ordersStatus } = require("../controllers/admin");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/orders-status", authCheck, adminCheck, ordersStatus);

module.exports = router;
