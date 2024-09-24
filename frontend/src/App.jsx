import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import ReviewChat from './components/ReviewChat'
import LoginSignUp from './components/LoginSignUp'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redirect to login page after logout
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAuthenticated && <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/reviewchat" element={<ProtectedRoute element={<ReviewChat />} />} />
        <Route path="/about" element={<ProtectedRoute element={<div>About Page</div>} />} />
        <Route path="/login" element={<LoginSignUp setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  )
}

export default App