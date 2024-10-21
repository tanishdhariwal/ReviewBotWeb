import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./Context/AuthContext.jsx";

import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <Toaster />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
