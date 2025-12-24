import { useState, useEffect } from "react";
import {
  getTodosAPI,
  createTodoAPI,
  updateTodoAPI,
  deleteTodoAPI,
} from "../services/TodoService";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Load danh sách lúc đầu
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTodosAPI();
        if (Array.isArray(data)) {
          setTodos(data);
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

  // 2. Thêm mới
  const addTodo = async (text) => {
    try {
      const newTodo = await createTodoAPI(text);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Lỗi thêm:", error);
    }
  };

  // 3. Update / Complete
  const toggleComplete = async (index) => {
    try {
      const todoToUpdate = {
        ...todos[index],
        isCompleted: !todos[index].isCompleted,
      };

      const updatedTodo = await updateTodoAPI(todoToUpdate);

      const newTodos = [...todos];
      newTodos[index] = updatedTodo;
      setTodos(newTodos);
    } catch (error) {
      console.error("Lỗi update:", error);
    }
  };

  // 4. Delete
  const removeTodo = async (index) => {
    try {
      const idToDelete = todos[index].id;
      await deleteTodoAPI(idToDelete);

      const newTodos = todos.filter((_, i) => i !== index);
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
    uncompletedCount,
    removeTodo,
  };
};
