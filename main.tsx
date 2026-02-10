import Routes from "@/routes";
import { Theme } from "@/theme";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Theme.Provider>
        <Routes />
      </Theme.Provider>
    </HashRouter>
  </React.StrictMode>,
);
