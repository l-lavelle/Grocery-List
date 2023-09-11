const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ListProduct extends Model {}

ListProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      },
    },
    list_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "list",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "list_product",
  }
);

module.exports = ListProduct;
