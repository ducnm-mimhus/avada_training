import "./App.css";
import { useEffect, useState } from "react";

function ActiveState() {
  useEffect(() => {
    console.log("Component mounted!");

    return function cleanup() {
      console.log("Component unmounted!");
    };
  }, []);

  return <div>Hello</div>;
}

function App() {
  const [state, setState] = useState();

  useEffect(() => {
    console.log("Component has been change!");
  }, [state]);

  return (
    <div>
      <button onClick={() => setState((pre) => !pre)}>Submit</button>
      {state && <ActiveState />}
    </div>
  );
}

export default App;
