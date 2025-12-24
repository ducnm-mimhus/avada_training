const crypto = require("crypto");
const {
  getAllTodo,
  createTodo,
  findTodoById,
  updateTodo,
  deleteTodo,
} = require("../repository/todo.repository");

function home(ctx) {
  try {
    const data = getAllTodo();

    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: data,
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

async function addNew(ctx) {
  try {
    const rawData = ctx.request.body;
    const newItem = {
      ...rawData,
      id: crypto.randomUUID(),
      isCompleted: false,
    };
    await createTodo(newItem);
    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: newItem,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

function getById(ctx) {
  try {
    const { id } = ctx.params;
    const item = findTodoById(id);

    if (!item) {
      ctx.status = 404;
      ctx.body = {
        status: "error",
        message: "Todo not found with this ID",
      };
      return;
    }
    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: item,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

async function update(ctx) {
  const { id } = ctx.params;
  const newItem = ctx.request.body;
  try {
    if (!findTodoById(id)) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        message: "Todo not found with this ID!",
      };
      return;
    }

    const updatedItem = await updateTodo(id, newItem);
    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: updatedItem,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: error.message,
    };
  }
}

async function deleteOne(ctx) {
  try {
    const { id } = ctx.params;
    await deleteTodo(id);
    ctx.status = 200;
    ctx.body = {
      status: "success",
    };
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
  getById,
  addNew,
  update,
  deleteOne,
};
