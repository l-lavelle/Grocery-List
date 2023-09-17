const router = require("express").Router();
const { Product } = require("../../models");

// get product by product name
router.get("/:product_name", async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {
        name: req.params.product_name,
      },
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// creates new product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create({
      name: req.body.foodLabel,
      food_id: req.body.foodId,
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
