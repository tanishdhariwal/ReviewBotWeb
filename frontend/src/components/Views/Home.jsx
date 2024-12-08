import { useState, useEffect } from "react";
import { Search, Star, BarChart2, TrendingUp, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import CubeLoader from "../Common/CubeLoader";
// import toast, { Toaster } from "react-hot-toast";
import { checkURL, extractASINFromUrl, getUserChats } from "../../Helpers/apiComms";

export default function HomePage() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth.isLoggedIn + " is the status");
  }, [auth.isLoggedIn]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage, { duration: 4000 });
      // Reset the location state to prevent duplicate toasts
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isLoading, setIsLoading] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Submitted URL:", url);
  // };

  const handleNavigateToReviewChat = async () => {
    console.log("URL:", url);
    if (url !== "") {
      try {
        const validationResponse = extractASINFromUrl(url);
        console.log(validationResponse.asin);

        if (validationResponse.asin !== "false") {
          const data = await checkURL({ asin: validationResponse.asin });

          if (data.isValid) {
            localStorage.setItem('asin', validationResponse.asin); // Store ASIN in local storage
            navigate(`/review-chat`, { state: { asin: validationResponse.asin } });
          } else {
            toast.error("Unable to help right now");
          }
        } else {
          toast.error("URL is not valid.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred."); // Display actual error message
      }
    } else {
      toast.error("Please enter a URL.");
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

  const handleASINClick = (asin) => {
    localStorage.setItem('asin', asin);
    navigate('/review-chat');
  };

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const chats = await getUserChats();
        setPreviousChats(chats);
      } catch (error) {
        console.error('Error fetching user chats:', error);
      }
    };

    if (auth.isLoggedIn) {
      fetchUserChats();
    }
  }, [auth.isLoggedIn]);

  return (
    <div className="">
      {/* <Toaster /> */}
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

            <form className="w-full max-w-md mb-8">
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
                  type="button" // Change type to "button" to prevent form submission
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
                          previousChats.map((asin, index) => (
                            <li
                              key={index}
                              onClick={() => handleASINClick(asin)}
                              className="cursor-pointer flex justify-between items-center gap-10 border-b py-2 px-9 text-gray-700 hover:bg-gray-200"
                            >
                              <span className="truncate max-w-xs" title={asin}>
                                {asin}
                              </span>
                              {/* Include date or other details if available */}
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
