const Router = require("koa-router");
const {
  home,
  getById,
  addNew,
  updateOne,
  deleteOne,
  updateMany,
} = require("../controller/todo.controller");

const router = new Router({
  prefix: "/todos",
});

router.get("/", home);
router.get("/:id", getById);
router.post("/", addNew);
router.put("/:id/:stt", updateOne);
router.put("/", updateMany);
router.delete("/:id", deleteOne);

module.exports = router;
