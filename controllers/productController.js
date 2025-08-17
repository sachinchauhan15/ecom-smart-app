const Product = require("../models/product");
const fs = require("fs");
const path = require("path");
exports.showProducts = (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  Product.countAll((err, countResult) => {
    if (err) return res.status(500).send("Server error");

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    Product.getAll(limit, offset, (err, results) => {
      if (err) return res.status(500).send("Server error");

      res.render("products/index", {
        products: results,
        page,
        totalPages,
      });
    });
  });
};

exports.showProductDetail = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Server error");
    if (!result || result.length === 0) {
      return res.status(404).render("404", { pageTitle: "Product Not Found" });
    }
    res.render("products/detail", { product: result[0] });
  });
};

exports.adminProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).send("Database error");
    }
    res.render("admin/products", { products: results || [] });
  });
};

exports.addForm = (req, res) => {
  res.render("admin/addProduct", { pageTitle: "Add Product" });
};

function validateProduct(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 3)
    errors.push("Name must be at least 3 characters");
  if (!data.description || data.description.trim().length < 5)
    errors.push("Description must be at least 5 characters");
  if (!data.price || isNaN(data.price) || data.price <= 0)
    errors.push("Price must be a positive number");
  if (!data.stock || isNaN(data.stock) || data.stock < 0)
    errors.push("Stock must be a non-negative number");
  return errors;
}

exports.createProduct = (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock, 10),
    image: req.file ? "/uploads/" + req.file.filename : null,
  };

  const errors = validateProduct(data);
  if (errors.length > 0) {
    return res.status(400).render("admin/addProduct", {
      pageTitle: "Add Product",
      errors,
      product: data,
    });
  }

  Product.create(data, (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/admin/products");
  });
};

exports.editForm = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Server error");
    if (!result || result.length === 0) {
      return res.status(404).render("404", { pageTitle: "Product Not Found" });
    }
    res.render("admin/editProduct", {
      product: result[0],
      pageTitle: "Edit Product",
    });
  });
};

// UPDATE
exports.updateProduct = (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock, 10),
    image: req.file ? "/uploads/" + req.file.filename : req.body.oldImage,
  };

  const errors = validateProduct(data);
  if (errors.length > 0) {
    return res.status(400).render("admin/editProduct", {
      pageTitle: "Edit Product",
      errors,
      product: { ...data, id: req.params.id },
    });
  }

  Product.update(req.params.id, data, (err) => {
    if (err) return res.status(500).send("Server error");
    res.redirect("/admin/products");
  });
};

// DELETE
exports.deleteProduct = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).send("Server error");
    const product = result[0];

    if (product.image) {
      const imagePath = path.join(__dirname, "..", "public", product.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn("Failed to delete image:", err);
      });
    }

    Product.remove(req.params.id, (err) => {
      if (err) return res.status(500).send("Server error");
      res.redirect("/admin/products");
    });
  });
};
