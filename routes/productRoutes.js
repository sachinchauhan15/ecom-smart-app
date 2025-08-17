const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Front-office (customer side)
router.get("/", productController.showProducts);
router.get("/:id", productController.showProductDetail);

module.exports = router;
