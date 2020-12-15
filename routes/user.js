const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/user");
const { auth } = require("../firebase");

// saving a router cart
router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get Cart
router.delete("/user/cart", authCheck, emptyCart); // empty Cart
router.post("/user/address", authCheck, saveAddress); // save cart

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// order
router.post("/user/order", authCheck, createOrder); // stripe order
router.post("/user/cash-order", authCheck, createCashOrder); // COD order

// orders history for user
router.get("/user/orders", authCheck, orders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
