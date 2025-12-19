const {
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  start: start,
  addBook: addBook,
} = require("../../database/bookRepository");

function home(ctx) {
  ctx.status = 200;
  ctx.body = start();
}

async function getBooks(ctx) {
  try {
    const books = getAllBooks();

    ctx.status = 200;
    ctx.body = {
      data: books,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getOneBook(ctx) {
  try {
    const { id } = ctx.params;
    const myBook = getBookById(id);

    if (!myBook) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Book not found with this ID!",
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      data: myBook,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function addNewBook(ctx) {
  try {
    const data = ctx.request.body;
    addBook(data);

    ctx.status = 201;
    ctx.body = {
      success: true,
    };
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

module.exports = {
  getBooks,
  getOneBook,
  home,
  addNewBook,
};
