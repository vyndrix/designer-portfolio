import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Theme } from "./theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme.Provider>
      <App />
    </Theme.Provider>
  </StrictMode>,
);
