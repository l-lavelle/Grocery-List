const router = require("express").Router();
// will need path for list model
const { User, List, Product, ListProduct } = require("../../models");

const withAuth = require("../../utils/auth");

router.get("/:user_id", withAuth, async (req, res) => {
  try {
    const listData = await List.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.params.user_id,
      },
    });
    const lists = listData.map((posts) => posts.get({ plain: true }));
    res.render("list", {
      lists,
      loggedIn: Boolean(req?.session?.loggedIn),
      userId: req?.session?.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:user_id", async (req, res) => {
  try {
    const listData = await List.create({
      name: req.body.name,
      user_id: req.params.user_id,
    });
    res.status(200).json(listData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const listData = await List.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(listData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
