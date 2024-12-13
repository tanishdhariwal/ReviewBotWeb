import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTheme } from "../../ThemeContext"; // Import useTheme from ThemeContext

export default function NavBar({ isLoggedIn, username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme(); // Use the theme from ThemeContext
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  // Close the dropdown menu when the viewport is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render the NavBar on the login/signup page
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex-shrink-0">
              <img className="h-8 w-30" src="Group 1.png" alt="" />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/pricing"
              className="hover:text-sky-400 transition-transform px-3 py-2 rounded-md text-sm font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="hover:text-sky-400 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>

            {isLoggedIn ? (
              <Link to="/profile">
                <img
                  className="h-8 w-8 rounded-full border-2 border-blue-400 hover:border-blue-600 border-spacing-5"
                  src={`https://ui-avatars.com/api/?name=${username}`}
                  alt="Profile"
                />
              </Link>
            ) : (
              <button
                onClick={handleNavigateToLogin}
                className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden relative">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            {isMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              >
                <Link
                  to="/pricing"
                  onClick={toggleMenu}
                  className={`block px-4 py-2 text-sm ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className={`block px-4 py-2 text-sm ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  About
                </Link>
                {isLoggedIn ? (
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className={`block px-4 py-2 text-sm ${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    Profile
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleNavigateToLogin();
                      toggleMenu();
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
