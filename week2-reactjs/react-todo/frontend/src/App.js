import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import { useTodos } from "./hooks/TodoHook";

function App() {
  const {
    todos,
    loading,
    addTodo,
    toggleComplete,
    removeTodo,
    uncompletedCount,
  } = useTodos();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div>
      Uncompleted: {uncompletedCount}
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              completeTodo={toggleComplete}
              deleteTodo={removeTodo}
            />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
