import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import Home from './components/Views//Home';
import About from './components/Sections/About';
import ReviewChat from './components/Views/ReviewChat';
import Profile from './components/Views/Profile';
import Header from './components/Common/Header';
import LoginSignUp from './components/Sections/LoginSignUp';
import LoaderModal from './components/Common/Loader';

function App() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <>
      <>
        {isLoggedIn && <Header />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/review-chat" element={<ReviewChat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginSignUp />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </>
    </>
  );
}

export default App;