import { useState, useEffect } from "react";
import {
  getTodosAPI,
  getTodoByIdAPI,
  createTodoAPI,
  updateTodoAPI,
  updateManyTodoAPI,
  deleteTodoAPI,
} from "../services/TodoService";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTodosAPI();
        if (Array.isArray(data)) {
          const normalized = data.map((t) => ({
            ...t,
            isCompleted: t.isCompleted === true || t.isCompleted === "true",
          }));
          setTodos(normalized);
        } else {
          console.error("API không trả về mảng:", data);
          setTodos([]);
        }
      } catch (error) {
        console.error("Lỗi kết nối Backend:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getById = async (id) => {
    try {
      const myTodo = getTodoByIdAPI(id);
      setTodos([myTodo]);
    } catch (err) {
      console.error("Loi tim kiem!");
    }
  };

  const addTodo = async (text) => {
    try {
      const newTodo = await createTodoAPI(text);
      const newList = [...todos, newTodo];
      setTodos(newList);
    } catch (error) {
      console.error("Lỗi thêm:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const updatedTodo = await updateTodoAPI(id, !todoToUpdate.isCompleted);

      setTodos((pre) => {
        return pre.map((todo) => {
          if (todo.id === id) {
            return {
              ...updatedTodo,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("Lỗi update:", error);
    }
  };

  const toggleCompleteMany = async (ids, stt) => {
    try {
      const listTodoUpdated = await updateManyTodoAPI(ids, stt);

      setTodos((pre) => {
        return pre.map((todo) => {
          if (ids.includes(todo.id)) {
            const newData = listTodoUpdated.find(
              (oldData) => oldData.id === todo.id
            );
            return {
              ...newData,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("Lỗi update:", error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((t) => t.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("Lỗi xóa:", error);
    }
  };

  const uncompletedCount = todos.filter((todo) => !todo.isCompleted).length;

  return {
    todos,
    loading,
    addTodo,
    toggleComplete,
    toggleCompleteMany,
    uncompletedCount,
    removeTodo,
    getById,
  };
};
