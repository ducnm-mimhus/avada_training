const crypto = require("crypto");
const {
  getAllTodo,
  createTodo,
  findTodoById,
  completeOne,
  deleteTodo,
  completeMany,
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

async function updateOne(ctx) {
  const { id, stt } = ctx.params;
  try {
    if (!findTodoById(id)) {
      ctx.status = 400;
      ctx.body = {
        status: "error",
        message: "Todo not found with this ID!",
      };
      return;
    }

    const updatedItem = await completeOne(id, stt);
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

async function updateMany(ctx) {
  try {
    const { listID, stt } = ctx.request.body;
    const updatedList = await completeMany(listID, stt);
    ctx.status = 200;
    ctx.body = {
      status: "success",
      data: updatedList,
    };
  } catch (error) {
    if (error.message.includes("khong hop le!")) {
      ctx.status = 400;
    } else {
      ctx.status = 500;
    }
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
  updateOne,
  updateMany,
  deleteOne,
};
