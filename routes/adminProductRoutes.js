const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.adminProducts);
router.get("/add", productController.addForm);
router.post("/add", productController.createProduct);
router.get("/edit/:id", productController.editForm);
router.post("/edit/:id", productController.updateProduct);
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
