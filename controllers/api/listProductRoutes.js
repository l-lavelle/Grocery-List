const router = require("express").Router();
// will need path for listProduct model
const { User, List, Product, ListProduct } = require("../../models");

const withAuth = require("../../utils/auth");

router.get("/:list_id", withAuth, async (req, res) => {
    try {
        const listProductData = await List.findByPk(req.params.list_id, {
            include: [{ model: Product, through: ListProduct }],
        });
        const listProduct = listProductData.map((posts) => posts.get({ plain: true }));
        res.render("listProducts", {
            listProduct,
            loggedIn: Boolean(req?.session?.loggedIn),
            userId: req?.session?.userId,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

// for testing
// router.get("/:list_id", async (req, res) => {
//     try {
//         const listProductData = await List.findByPk(req.params.list_id, {
//             include: [{ model: Product, through: ListProduct }],

//         });
//         res.status(200).json(listProductData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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