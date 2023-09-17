const router = require("express").Router();
const { User, List } = require("../models");
const withAuth = require("../utils/auth");

// Render homepage page
router.get("/", withAuth, async (req, res) => {
  try {
    const listData = await List.findAll({
      include: [{ model: User }],
      where: {
        user_id: req.session.userId,
      },
    });
    const lists = listData.map((posts) => posts.get({ plain: true }));
    res.render("homepage", {
      lists,
      loggedIn: Boolean(req?.session?.loggedIn),
      userId: req?.session?.userId,
    });
  } catch (err) {
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

// Render logout page
router.get("/logout", async (req, res) => {
  try {
    res.render("logout");
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

// Render Create New List Page
router.get("/createlist/:user_id", async (req, res) => {
  try {
    res.render("createlist", {
      loggedIn: Boolean(req?.session?.loggedIn),
      userId: req?.session?.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
