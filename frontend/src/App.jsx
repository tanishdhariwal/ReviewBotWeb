import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ReviewChat from "./components/ReviewChat";
import LoginSignUp from "./components/LoginSignUp";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Header from "./components/shared/Header";
import Profile from "./components/Profile";
import About from "./components/About";
import Loader from "./components/shared/Loader";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {auth.isLoggedIn && (
          <>
            <Route path="/review-chat" element={<ReviewChat />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
