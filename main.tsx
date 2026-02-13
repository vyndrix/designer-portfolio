import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/remote";
import Routes from "@/routes";
import { Theme } from "@/theme";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <Theme.Provider>
          <TooltipProvider>
            <Routes />
          </TooltipProvider>
        </Theme.Provider>
      </HashRouter>
    </AuthProvider>
    <Toaster />
  </React.StrictMode>,
);
