import React from "react";
import AdminShell from "./components/layout/AdminLayout";
import TodoList from "./components/todo/TodoList";

function App() {
  return (
    <AdminShell>
      <TodoList />
    </AdminShell>
  );
}

export default App;
