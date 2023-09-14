const router = require("express").Router();
// will need path for list model
const { User, List, Product, ListProduct } = require("../../models");

router.get("/", async (req, res) => {});
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create({
      name: req.body.name,
      food_id: req.body.foodId,
    });
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
