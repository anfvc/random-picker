import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RandomContextProvider from "./Contexts/RandomContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RandomContextProvider>
      <App />
    </RandomContextProvider>
  </React.StrictMode>
);
