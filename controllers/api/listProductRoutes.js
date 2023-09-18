const router = require("express").Router();
const { List, Product, ListProduct } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:list_id", withAuth, async (req, res) => {
  try {
    const listProductData = await List.findByPk(req.params.list_id, {
      include: [{ model: Product, through: ListProduct }],
    });
    const listProduct = listProductData.map((posts) =>
      posts.get({ plain: true })
    );
    res.render("listProducts", {
      listProduct,
      loggedIn: Boolean(req?.session?.loggedIn),
      userId: req?.session?.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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

//route to update quantity
router.post("/quantity/:id", async (req, res) => {
  try {
    const listProductData = await ListProduct.update(req.body, {
      where: {
        id: req.params.id,
      },
      quantity: req.body.quantity,
    });
    console.log(listProductData);
    res.status(200).json(listProductData);
  } catch (err) {
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
