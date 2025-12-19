const Koa = require("koa");
const render = require("koa-ejs");
const koaBody = require("koa-body");
const routes = require("./routes/product.routes");
const path = require("path");

const app = new Koa();

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
  console.log(`Server is running in: http://localhost:${port}/api`);
});
