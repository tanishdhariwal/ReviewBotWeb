import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ReviewChat from './components/ReviewChat';
import LoginSignUp from './components/LoginSignUp';
import { useAuth } from './Context/AuthContext';
import Header from './components/shared/Header';
import Profile from './components/Profile';
import About from './components/About';

function App() {
  const auth = useAuth();

  return (
    <Router>
      {auth.isLoggedIn && <Header />}
      <Routes>
        {auth.isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/review-chat" element={<ReviewChat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;