import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main className="bg-black min-h-screen flex items-center w-full justify-center">
      <App />
    </main>
  </StrictMode>
);
