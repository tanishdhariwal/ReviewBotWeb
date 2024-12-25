import axios from "axios";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
// import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/AuthContext.jsx";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Router>
    <AuthProvider>
      {/* <Toaster position="top-center" /> */}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000, // Slightly longer duration for better user attention
          style: {
            background: "rgba(255, 255, 255, 0.08)", // Softer frosted effect
            color: "#ffffff", // Off-white text for a warmer feel
            backdropFilter: "blur(12px) saturate(180%)", // Enhanced frosty effect with saturation
            WebkitBackdropFilter: "blur(12px) saturate(180%)", // Safari compatibility
            boxShadow:
              "0 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px rgba(255, 255, 255, 0.15)", // Outer shadow for depth + subtle inner glow
            borderRadius: "18px", // Slightly more rounded for smoothness
            padding: "14px 22px", // Comfortable spacing
            border: "1px solid rgba(255, 255, 255, 0.2)", // Crisp, minimal border
            fontSize: "15px", // Slightly larger for easy readability
            fontWeight: "500", // Medium weight for emphasis
            letterSpacing: "0.5px", // Subtle spacing for a polished look
          },
        }}
      />
      <App />
    </AuthProvider>
  </Router>
  // </StrictMode>
);
