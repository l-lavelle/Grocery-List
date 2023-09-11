const sequelize = require("../config/connection");
const { User, List, Product, ListProduct } = require("../models");

const userData = require("./userSeeds.json");
const listData = require("./listSeeds.json");
const productData = require("./productSeeds.json");
const listProduct = require("./listProductSeeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, { individualHooks: true });

  await List.bulkCreate(listData);

  await Product.bulkCreate(productData);

  await ListProduct.bulkCreate(listProduct);

  process.exit(0);
};

seedDatabase();
