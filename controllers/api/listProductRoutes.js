const router = require("express").Router();
const { List, Product, ListProduct } = require("../../models");

// Fetch route for Dashboard list of items
router.get("/list/:list_id", async (req, res) => {
  try {
    const tagid = await List.findByPk(req.params.list_id, {
      include: [{ model: Product, through: ListProduct }],
    });
    return res.json(tagid);
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

// Add product to user list
router.post("/:product_id", async (req, res) => {
  try {
    const listProductData = await ListProduct.create({
      product_id: req.params.product_id,
      list_id: req.body.list_id,
      quantity: req.body.quantity,
    });
    res.status(200).json(listProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a product from user list
router.delete("/:id", async (req, res) => {
  try {
    const listProductData = await ListProduct.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(listProductData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
