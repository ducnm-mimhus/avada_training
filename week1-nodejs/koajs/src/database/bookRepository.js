const fs = require("fs");
const { data: books } = require("./books.json");

function start() {
  return "Hello World!";
}

function getAllBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === parseInt(id));
}

function addBook(data) {
  const updateBooks = [data, ...books];
  return fs.writeFileSync(
    "./src/database/books.json",
    JSON.stringify({
      data: updateBooks,
    })
  );
}

module.exports = {
  start,
  getAllBooks,
  getBookById,
  addBook,
};
