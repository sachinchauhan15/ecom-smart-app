const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.use("/admin/products", adminProductRoutes);
app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/", shopRoutes);

app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

module.exports = app;
