const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");

const router = new Router({
  prefix: "/api",
});

router.get("/", bookHandler.home);
router.get("/books", bookHandler.getBooks);
router.get("/books/:id", bookHandler.getOneBook);
router.post("/books", bookInputMiddleware, bookHandler.addNewBook);

module.exports = router;
