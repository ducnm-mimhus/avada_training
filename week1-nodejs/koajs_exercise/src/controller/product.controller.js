const {
  getAllProducts,
  deleteProduct,
  createNewProduct,
  findProductById,
  updateProduct,
} = require("../repository/product.repository");

function home(ctx) {
  ctx.status = 200;
  ctx.body = "Welcome to Product Management!";
}

function getProductById(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query || {};
    const fieldList = fields ? fields.split(",") : [];

    const product = findProductById(id, fieldList);

    if (!product) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: `Can't find product with ID = ${id}`,
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: product,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

function getAll(ctx) {
  const { limit, sort } = ctx.request.query;
  try {
    const products = getAllProducts(limit, sort);

    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: products,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
      data: [],
    };
  }
}

async function deleteOne(ctx) {
  const { id } = ctx.params;
  try {
    const isDeleted = await deleteProduct(id);

    if (!isDeleted) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Product not found!",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = `Deleted product!`;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

async function createProduct(ctx) {
  try {
    const rawData = ctx.request.body;

    const newProduct = {
      ...rawData,
      id: new Date().getTime(),
      createdAt: new Date().toISOString(),
    };

    const createdProduct = await createNewProduct(newProduct);

    ctx.status = 201;
    ctx.body = {
      status: "success",
      message: "Create successfully!",
      data: createdProduct,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

async function updateOneProduct(ctx) {
  const { id } = ctx.params;
  const newProduct = ctx.request.body;

  try {
    const isUpdated = await updateProduct(id, newProduct);

    if (!isUpdated) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: "Product not found!",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = "Update successfully!";
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

module.exports = {
  home,
  getProductById,
  getAll,
  deleteOne,
  createProduct,
  updateOneProduct,
};
