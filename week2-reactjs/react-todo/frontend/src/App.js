// src/App.jsx
import { useState, useCallback } from "react";
import AdminShell from "./components/layout/AdminLayout";
import TodoList from "./components/todo/TodoList";

function App() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);

  return (
    <AdminShell searchValue={searchValue} onSearchChange={handleSearchChange}>
      <TodoList searchValue={searchValue} />
    </AdminShell>
  );
}

export default App;
