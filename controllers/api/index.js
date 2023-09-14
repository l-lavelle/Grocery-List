const router = require("express").Router();
const listRoutes = require("./listRoutes");
const listProductRoutes = require("./listProductRoutes");

router.use("/lists", listRoutes);
router.use("/listProducts", listProductRoutes);

module.exports = router;