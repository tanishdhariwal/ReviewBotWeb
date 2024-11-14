import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Common/Header';
import About from './components/Sections/About';
import LoginSignUp from './components/Sections/LoginSignUp';
import Home from './components/Views//Home';
import Profile from './components/Views/Profile';
import ReviewChat from './components/Views/ReviewChat';
import { useAuth } from './Context/AuthContext';
import LandingPage from './LandingPage';

function App() {
  const { isLoggedIn, loading } = useAuth();

  // if (loading) {
  //   return <LoaderModal />;
  // }

  return (
    <>
      <>
        {isLoggedIn && <Header />}
        <Routes>
          
          {isLoggedIn ? (
            <>
              <Route path='/landing' element={<LandingPage />} />
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