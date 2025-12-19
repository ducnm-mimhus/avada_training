const Router = require("koa-router");
const productController = require("../controller/product.controller");
const {
  productAddNewMiddleware,
  productUpdateMiddleware,
} = require("../middleware/product.middleware");

const router = new Router({
  prefix: "/api",
});

router.get("/", productController.home);

router.get("/view", productController.renderHomePage);

router.get("/products", productController.getAll);
router.post(
  "/products",
  productAddNewMiddleware,
  productController.createProduct
);
router.put(
  "/products/:id",
  productUpdateMiddleware,
  productController.updateOneProduct
);
router.delete("/products/:id", productController.deleteOne);
router.get("/products/:id", productController.getProductById);

module.exports = router;
