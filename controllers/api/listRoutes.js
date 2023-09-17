const router = require("express").Router();
const { User, List } = require("../../models");

// get all user lists and render List page
router.get("/:user_id", async (req, res) => {
  try {
    const listData = await List.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.userId,
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

// Create new list for user
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

// Delete user list
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
