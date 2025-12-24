import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUser() {
    const usersData = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(usersData.data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ul>
      {users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
}

export default App;
