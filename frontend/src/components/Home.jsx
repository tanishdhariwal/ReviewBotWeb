import { useState, useEffect } from "react";
import { Search, Star, BarChart2, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/AuthContext";

export default function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.isLoggedIn + " is the status");
  }, [auth.isLoggedIn]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle URL submission logic here

    console.log("Submitted URL:", url);
  };

  const handleNavigateToReviewChat = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/review-chat");
      // navigate("/login");
    }, 2000); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <main className="pt-2 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Summarize Product Reviews
        </h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
          <div className="flex items-center border-b-2 border-blue-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="url"
              placeholder="Enter product URL"
              aria-label="Product URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
              onClick={handleNavigateToReviewChat}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/top-rated"
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <Star className="h-5 w-5 mr-2" />
            Top Rated Products
          </Link>
          <Link
            to="/trending"
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending Products
          </Link>
          <Link
            to="/categories"
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
          >
            <BarChart2 className="h-5 w-5 mr-2" />
            Recently Reviewed Products
          </Link>
        </div>

 
      </main>
    </div>
  );
}