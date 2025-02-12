import { useState } from "react";
import "./App.css";
import usePrevious from "./customhooks/usePrevious";
import useIdle from "./customhooks/useIdle";

function App() {
  const [count, setCount] = useState(0);
  const prevValue = usePrevious(count);
  const isIdle = useIdle(2000);
  return (
    <>
      <h1>Custom Hooks</h1>
      <p>IsIdle: {isIdle ? "true" : "false"}</p>
      <p>Count:{count}</p>
      <p>Prev Count :{prevValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

export default App;
