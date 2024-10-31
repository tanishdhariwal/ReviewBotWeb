import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavBar({ isLoggedIn, username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  // Close the sidebar when the viewport is resized
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
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex-shrink-0">
              <img className="h-8 w-30" src="Group 1.png" alt="" />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/about"
              className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            {isLoggedIn ? (
              <Link to="/profile">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${username}`}
                  alt="Profile"
                />
              </Link>
            ) : (
              <button
                onClick={handleNavigateToLogin}
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 left-0 w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col items-start p-4 space-y-4 w-full h-full">
          <button
            onClick={toggleMenu}
            className="self-end p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
          {isLoggedIn ? (
            <Link to="/profile" onClick={toggleMenu}>
              <img
                className="h-16 w-16 rounded-full"
                src={`https://ui-avatars.com/api/?name=${username}`}
                alt="Profile"
              />
            </Link>
          ) : (
            <button
              onClick={() => {
                handleNavigateToLogin();
                toggleMenu();
              }}
              className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </button>
          )}
          <Link
            to="/about"
            onClick={toggleMenu}
            className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            About
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
}