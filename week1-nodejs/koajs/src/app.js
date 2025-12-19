const Koa = require("koa");
const koaBody = require("koa-body");
const routes = require("./routes/routes");

const app = new Koa();

const port = process.env.PORT || 5000;

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running in: http://localhost:${port}/api`);
});
