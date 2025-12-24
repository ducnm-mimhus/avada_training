const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");
const crypto = require("crypto");

// Cấu hình
const RECORD_COUNT = 20;
const OUTPUT_FILE = path.join(__dirname, "data.json");

console.log(`⏳ Đang tạo ${RECORD_COUNT} công việc giả...`);

const listTodo = [];

for (let i = 0; i < RECORD_COUNT; i++) {
  const todo = {
    id: crypto.randomUUID(),
    text: faker.lorem.sentence({ min: 3, max: 6 }),
    isCompleted: false,
  };

  listTodo.push(todo);
}

// Ghi ra file data.json
try {
  const todos = { data: listTodo };
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(todos, null, 2), "utf-8");
  console.log(`✅ Thành công! Đã tạo file: ${OUTPUT_FILE}`);
} catch (error) {
  console.error("❌ Lỗi khi ghi file:", error);
}
