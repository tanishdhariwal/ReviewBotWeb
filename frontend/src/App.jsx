import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import About from "./components/Sections/About";
import LoginSignUp from "./components/Sections/LoginSignUp";
import HomeNew from "./components/Views/HomeNew";
import Profile from "./components/Views/Profile";
import ReviewChat from "./components/Views/ReviewChat";
import { useAuth } from "./Context/AuthContext";
import LandingPage from "./LandingPage";
import { CombinedProductPage } from "./components/Views/ProductReview";

function App() {
  const { isLoggedIn, loading } = useAuth();

  // if (loading) {
  //   return <LoaderModal />;
  // }

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<HomeNew />} />
            <Route path="/about" element={<About />} />
            <Route path="/review-chat" element={<ReviewChat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="/Box" element={ <Box/> } /> */}
            {/* <Route path="/HomeNew" element={ <HomeNew/> } /> */}
            <Route path="/testing" element={<CombinedProductPage />} />
          </>
        ) : (
          <>
            <Route path="/testing" element={<CombinedProductPage />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="/testing" element={<CombinedProductPage />} />
      </Routes>
    </>
  );
}

export default App;
