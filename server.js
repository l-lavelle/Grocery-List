require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const hbs = exphbs.create();

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: process.env.SESSION_RESAVE === 'true',
  saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
