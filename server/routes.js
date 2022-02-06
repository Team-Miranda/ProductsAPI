const router = require("express").Router();
const controller = require("./controllers");

router.use(controller.checkCache);

router.get("/", controller.getProducts);
router.get("/:product_id", controller.getProduct);
router.get("/:product_id/styles", controller.getStyles);
router.get("/:product_id/related", controller.getRelated);

module.exports = router;
