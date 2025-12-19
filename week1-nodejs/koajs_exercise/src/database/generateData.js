const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const TOTAL_RECORDS = 1000;
const dbPath = path.join(__dirname, "product.json");

const products = [];

for (let i = 1; i <= TOTAL_RECORDS; i++) {
  const product = {
    id: i,
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price({ min: 0, max: 1000, dec: 0 })),
    description: faker.commerce.productDescription(),
    category: faker.commerce.product(),
    color: faker.color.human(),
    createdAt: faker.date.past().toISOString(),
    image_url: faker.image.url(),
  };

  products.push(product);
}

try {
  fs.writeFileSync(dbPath, JSON.stringify({ data: products }, null, 2));
  console.log(`Tao du lieu fake thanh cong o file ${dbPath}! `);
} catch (error) {
  console.error("Loi khi ghi file: ", error);
}
