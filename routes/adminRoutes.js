const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Login
router.get("/login", adminController.loginForm);
router.post("/login", adminController.login);

// Dashboard (protected later with session/auth middleware)
router.get("/", adminController.dashboard);

// Products, Orders, Customers
router.get("/products", adminController.listProducts);
router.get("/orders", adminController.listOrders);
router.get("/customers", adminController.listCustomers);

module.exports = router;
