import { useState } from "react";
import "./App.css";
import RandomPicker from "./Components/RandomPicker";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>

      <RandomPicker />
      {/* <Form /> */}
    </div>
  )
}

export default App;
