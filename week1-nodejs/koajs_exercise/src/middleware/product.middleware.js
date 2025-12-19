const yup = require("yup");

async function productAddNewMiddleware(ctx, next) {
  try {
    const data = ctx.request.body;

    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      description: yup.string().required(),
      category: yup.string().required(),
      color: yup.string().required(),
      image_url: yup.string().url().required(),
    });

    await schema.validate(data);

    await next();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function productUpdateMiddleware(ctx, next) {
  try {
    const data = ctx.request.body;

    let schema = yup.object().shape({
      name: yup.string(),
      price: yup.number().positive(),
      description: yup.string(),
      category: yup.string(),
      color: yup.string(),
      image_url: yup.string().url(),
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

module.exports = {
  productAddNewMiddleware,
  productUpdateMiddleware,
};
