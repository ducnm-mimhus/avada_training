const Koa = require("koa");
const render = require("koa-ejs");
const { koaBody } = require("koa-body");
const routes = require("./routes/todo.routes");
const path = require("path");
const cors = require("@koa/cors");

const app = new Koa();
app.use(cors());

const port = process.env.PORT || 5050;

render(app, {
  root: path.join(__dirname, "view"),
  layout: "template",
  viewExt: "html",
  cache: false,
  debug: true,
});

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running in: http://localhost:${port}/todos`);
});
