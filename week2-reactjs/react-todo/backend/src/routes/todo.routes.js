const Router = require("koa-router");
const {
  home,
  getById,
  addNew,
  update,
  deleteOne,
} = require("../controller/todo.controller");

const router = new Router({
  prefix: "/todos",
});

router.get("/", home);
router.get("/:id", getById);
router.post("/", addNew);
router.put("/:id", update);
router.delete("/:id", deleteOne);

module.exports = router;
