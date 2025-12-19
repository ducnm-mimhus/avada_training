const yup = require("yup");

async function productAddNewMiddleware(ctx, next) {
  try {
    const data = ctx.request.body;

    let schema = yup.object().shape({
      name: yup.string().required("Tên sản phẩm là bắt buộc"),
      price: yup
        .number()
        .positive("Giá tiền phải lớn hơn 0")
        .required("Giá tiền là bắt buộc"),
      description: yup.string().required("Mô tả là bắt buộc"),
      category: yup.string().required("Loại sản phẩm là bắt buộc"),
      color: yup.string().required("Màu sắc là bắt buộc"),
      image_url: yup
        .string()
        .url("Link ảnh không hợp lệ")
        .required("Ảnh là bắt buộc"),
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
      price: yup.number().positive("Giá tiền phải lớn hơn 0"),
      description: yup.string(),
      category: yup.string(),
      color: yup.string(),
      image: yup.string().url("Link ảnh không hợp lệ"),
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
