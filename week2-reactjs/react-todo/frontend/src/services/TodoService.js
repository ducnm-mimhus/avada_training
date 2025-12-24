import axios from "axios";

const API_URL = "http://localhost:5050/todos";

export const getTodosAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createTodoAPI = async (text) => {
  const response = await axios.post(API_URL, {
    text: text,
  });
  return response.data.data;
};

export const updateTodoAPI = async (todo) => {
  const response = await axios.put(`${API_URL}/${todo.id}`, todo);
  return response.data.data;
};

export const deleteTodoAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
