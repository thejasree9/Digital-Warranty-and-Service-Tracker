import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            success: {
              style: {
                background: "#16a34a",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }}
        />

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);