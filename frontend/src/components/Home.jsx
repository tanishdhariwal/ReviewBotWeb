import { useState, useEffect } from "react";
import { Search, Star, BarChart2, TrendingUp, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import CubeLoader from "./shared/CubeLoader";

export default function HomePage() {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.isLoggedIn + " is the status");
  }, [auth.isLoggedIn]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted URL:", url);
  };

  const handleNavigateToReviewChat = () => {
    if (url!== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/review-chat?url=${url}`);
      }, 5000);
    }
  };

  const handleOpenModal = () => {
    if (auth.isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
      // alert("You need to be logged in to view this content.");
    }
  }; // Function to open modal

  const handleCloseModal = () => setIsModalOpen(false); // Function to close modal

  // Mock data for previously searched products (Replace this with real data if available)
  const previousChats = [
    { product: "Headphones", date: "2024-09-20" },
    { product: "Refrigerator", date: "2024-09-21" },
    {
      product: "Nokia smartest Smartphone unbr unbreakable with boom boom",
      date: "2024-09-22",
    },
    // Add more items to test scrolling
    { product: "Laptop", date: "2024-09-23" },
    { product: "Tablet", date: "2024-09-24" },
    { product: "Smartwatch", date: "2024-09-25" },
    { product: "Camera", date: "2024-09-26" },
    { product: "Printer", date: "2024-09-27" },
    { product: "Monitor", date: "2024-09-28" },
    { product: "Keyboard", date: "2024-09-29" },
    { product: "Mouse", date: "2024-09-30" },
  ];

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent  backdrop-blur-sm z-50">
          <CubeLoader />
        </div>
      )}
      {
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
                <Search className="h-5 w-5" />
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
            <button
              onClick={handleOpenModal}
              className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              Recently Reviewed Products
            </button>
          </div>
  
          {/* Modal */}
          <AnimatePresence>
            {isModalOpen && auth.isLoggedIn && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-white-900 bg-opacity-50 backdrop-filter backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 max-w-3xl w-full shadow-lg"
                  initial={{ y: "-50%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-50%", opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Previously Searched Products
                    </h2>
                    <button onClick={handleCloseModal}>
                      <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <ul className="space-y-2">
                      {previousChats.length > 0 ? (
                        previousChats.map((chat, index) => (
                          <li
                            key={index}
                            className="flex justify-between items-center gap-10 border-b py-2 px-9 text-gray-700"
                          >
                            <span
                              className="truncate max-w-xs"
                              title={chat.product}
                            >
                              {chat.product}
                            </span>
                            <span className="whitespace-nowrap">{chat.date}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-700">
                          No previous chats found.
                        </li>
                      )}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      }
    </div>
  );
}