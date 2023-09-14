const router = require("express").Router();
// will need path for user model
const { User, List, Product, ListProduct } = require("../models");

// Render homepage page
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: Boolean(req?.session?.loggedIn),
      userId: req?.session?.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render Sign up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new user
// make sure variables correspond with user model once created
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login up page
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
// check with model for variables
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.email,
      },
    });
    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// trial delete after get all list that connect to user
router.get("/:id", async (req, res) => {
  try {
    const adListData = await List.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.params.id,
      },
    });

    const list = adListData.map((lists) => lists.get({ plain: true }));

    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// doesnt have a way to find users that belong to list would have to be many to many
router.get("/data/:id", async (req, res) => {
  try {
    const adListData = await User.findAll({
      include: [{ model: List }],
      where: {
        user_id: req.params.id,
      },
    });

    const list = adListData.map((lists) => lists.get({ plain: true }));

    res.json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// trial find list with all products and quanitity
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

// if product not exist in database create
router.post("/addItem", async (req, res) => {
  try {
    const dbUserData = await Product.create({
      name: req.body.name,
      food_id: req.body.food_id,
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// if product does exist add to list
router.post("/addItem/:list_id", async (req, res) => {
  try {
    const dbUserData = await ListProduct.create({
      product_id: req.body.product_id,
      list_id: req.params.list_id,
      quantity: req.body.quantity,
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
