const User = require("./User");
const List = require("./List");
const Product = require("./Product");
const ListProduct = require("./ListProduct");

User.hasMany(List, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

List.belongsTo(User, {
  foreignKey: "user_id",
});

Product.belongsToMany(List, {
  through: ListProduct,
  foreignKey: "product_id",
});

List.belongsToMany(Product, {
  through: ListProduct,
  foreignKey: "list_id",
});

module.exports = { User, List, Product, ListProduct };
