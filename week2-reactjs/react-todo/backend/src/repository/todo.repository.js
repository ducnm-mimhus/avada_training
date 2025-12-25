const path = require("path");
const fs = require("fs").promises;

const dbPath = path.join(__dirname, "../database/data.json");
const dbData = require(dbPath);
let todos = dbData.data || [];

async function saveToFile(listTodo) {
  try {
    await fs.writeFile(
      dbPath,
      JSON.stringify({ data: listTodo }, null, 2),
      "utf-8"
    );
    todos = listTodo;
  } catch (error) {
    throw new Error("Cannot save to file", error.message);
  }
}

function getAllTodo() {
  return todos;
}

async function createTodo(todo) {
  try {
    const newList = [...todos, todo];
    await saveToFile(newList);
    todos = newList;
  } catch (error) {
    throw new Error("Cannot add new item!", error.message);
  }
}

function findTodoById(id) {
  return todos.find((todo) => todo.id === id);
}

async function completeOne(id, stt) {
  try {
    const idx = todos.findIndex((todo) => todo.id === id);
    const newList = todos.map((todo) => {
      if (todo.id === id) {
        if (stt === "false") {
          return {
            ...todo,
            isCompleted: false,
          };
        } else {
          return {
            ...todo,
            isCompleted: true,
          };
        }
      }
      return todo;
    });

    await saveToFile(newList);
    return newList[idx];
  } catch (error) {
    throw new Error("Cannot update item!", error.message);
  }
}

async function completeMany(ids, stt) {
  try {
    const listID = todos.map((todo) => todo.id);
    const invalidID = ids.filter((id) => !listID.includes(id));

    if (invalidID.length > 0) {
      throw new Error("Ton tai ID khong hop le!");
    }

    const updatedList = todos.map((todo) => {
      if (ids.includes(todo.id)) {
        return {
          ...todo,
          isCompleted: stt,
        };
      }
      return todo;
    });

    await saveToFile(updatedList);
    return updatedList;
  } catch (err) {
    throw new Error("Cannot update items!", err.message);
  }
}

async function deleteTodo(id) {
  try {
    const newList = todos.filter((todo) => todo.id !== id);
    await saveToFile(newList);
    todos = newList;
  } catch (error) {
    throw new Error("Cannot delete item!", error.message);
  }
}

module.exports = {
  getAllTodo,
  createTodo,
  findTodoById,
  completeOne,
  deleteTodo,
  completeMany,
};
