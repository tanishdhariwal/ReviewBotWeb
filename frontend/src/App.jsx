import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import About from "./components/Sections/About";
import LoginSignUp from "./components/Sections/LoginSignUp";
import HomeNew from "./components/Views/HomeNew";
import Profile from "./components/Views/Profile";
import { useAuth } from "./Context/AuthContext";
import LandingPage from "./LandingPage";
import Analysis from "./components/Views/ProductReview";
import Pricing from "./components/Views/Pricing";
import FeatureComingSoon from "./components/Views/FeatureComingSoon";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<HomeNew />} />
            <Route path="/about" element={<About />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/comingsoon" element={<FeatureComingSoon />} />
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