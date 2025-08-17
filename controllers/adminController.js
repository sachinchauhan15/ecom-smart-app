// Fake auth (replace with real session + DB later)
exports.loginForm = (req, res) => {
  res.render("admin/login", { pageTitle: "Admin Login" });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  
  if (username === "admin" && password === "admin123") {
    // For now, just redirect (later store session)
    return res.redirect("/admin");
  }
  res.render("admin/login", { pageTitle: "Admin Login", error: "Invalid credentials" });
};

exports.dashboard = (req, res) => {
  res.render("admin/dashboard", { pageTitle: "Admin Dashboard" });
};

exports.listProducts = (req, res) => {
  res.render("admin/products", { pageTitle: "Manage Products", products: [] });
};

exports.listOrders = (req, res) => {
  res.render("admin/orders", { pageTitle: "Manage Orders", orders: [] });
};

exports.listCustomers = (req, res) => {
  res.render("admin/customers", { pageTitle: "Manage Customers", customers: [] });
};
