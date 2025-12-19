const yup = require("yup");

async function bookInputMiddleware(ctx, next) {
  try {
    const data = ctx.request.body;
    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      author: yup.string().required(),
    });

    await schema.validate(data);
    await next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.error,
      errorName: e.name,
    };
  }
}

module.exports = bookInputMiddleware;
