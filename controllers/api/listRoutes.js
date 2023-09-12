const router = require("express").Router();
// will need path for list model
const { User, List, Product, ListProduct } = require("../../models");

router.get('/', async (req, res) => {
    try {
        const listData = await List.findAll({
            include: [{ model: User }],
        });
        res.status(200).json(listData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:user_id', async (req, res) => {
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

module.exports = router;