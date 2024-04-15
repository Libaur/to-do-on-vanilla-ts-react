import "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("indext.tsx: root element not found");
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error(error);
}
