const path = require("path");
const fs = require("fs").promises;

const dbPath = path.join(__dirname, "../database/product.json");
let dbData = require(dbPath);
let products = dbData.data || [];

async function saveToFile(productList) {
  try {
    await fs.writeFile(
      dbPath,
      JSON.stringify({ data: productList }, null, 2),
      "utf-8"
    );
    products = productList;
  } catch (error) {
    throw new Error(
      `Cannot save to file! ${error && error.message ? error.message : ""}`
    );
  }
}

function getAllProducts(limit, sort) {
  const safeLimit = Number(limit) || products.length;
  let result = products.slice(0, safeLimit);

  if (sort === "asc") {
    result = [...result].sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  if (sort === "desc") {
    result = [...result].sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  return result;
}

function findProductById(productId, fields) {
  const product = products.find((product) => product.id === Number(productId));
  if (!product) {
    return null;
  }

  // If no fields requested, return the full product
  if (!fields || fields.length === 0) return product;

  return fields.reduce((acc, field) => {
    if (field in product) {
      acc[field] = product[field];
    }
    return acc;
  }, {});
}

async function createNewProduct(product) {
  const newData = [...products, product];

  if (newData.length === products.length) {
    return;
  }

  await saveToFile(newData);
  return product;
}

async function deleteProduct(productId) {
  const newData = products.filter(
    (product) => product.id !== Number(productId)
  );
  if (newData.length === products.length) {
    return false;
  }

  await saveToFile(newData);
  return true;
}

async function updateProduct(productId, newProduct) {
  const index = products.findIndex((p) => p.id === Number(productId));
  if (index === -1) return false;

  const updatedProduct = {
    ...products[index],
    ...newProduct,
    id: products[index].id,
  };

  const copyData = [...products];
  copyData[index] = updatedProduct;
  await saveToFile(copyData);
  return true;
}

module.exports = {
  getAllProducts,
  findProductById,
  deleteProduct,
  updateProduct,
  createNewProduct,
};
