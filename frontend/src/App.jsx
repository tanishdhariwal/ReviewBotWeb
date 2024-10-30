import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';
import Home from './components/Home';
import About from './components/About';
import ReviewChat from './components/ReviewChat';
import Profile from './components/Profile';
import Header from './components/shared/Header';
import LoginSignUp from './components/LoginSignUp';
import LoaderModal from './components/shared/Loader';

function App() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <LoaderModal />;
  }

  return (
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
  );
}

export default App;