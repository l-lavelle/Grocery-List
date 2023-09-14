const router = require("express").Router();
const listRoutes = require("./listRoutes");
const listProductRoutes = require("./listProductRoutes");
const productRoutes = require("./productRoutes");

router.use("/lists", listRoutes);
router.use("/listProducts", listProductRoutes);
router.use("/products", productRoutes);

module.exports = router;
