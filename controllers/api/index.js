const router = require("express").Router();
const listRoutes = require("./listRoutes");

router.use("/lists", listRoutes);

module.exports = router;