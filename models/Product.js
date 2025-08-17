const db = require("../config/db");

exports.getAll = (callback) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

exports.countAll = (callback) => {
  db.query("SELECT COUNT(*) AS total FROM products", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

exports.create = (data, callback) => {
  db.query(
    "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
    [data.name, data.description, data.price, data.stock],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.query(
    "UPDATE products SET name=?, description=?, price=?, stock=? WHERE id=?",
    [data.name, data.description, data.price, data.stock, id],
    callback
  );
};

exports.remove = (id, callback) => {
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};
