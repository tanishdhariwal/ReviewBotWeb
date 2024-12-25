import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import {
  checkURL,
  deleteUserChat,
  extractASINFromUrl,
  getUserChats,
} from "../../Helpers/apiComms";
import HexagonOverlay from "../Common/HexagonLoader";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
// import { FaTrash } from 'react-icons/fa'; // Import delete icon
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

export default function HomeNew() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previousChats, setPreviousChats] = useState([]);

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const handleRecentlyReviewedClick = () => {
    if (auth.isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      if (url === "") {
        toast.error("Please enter the URL to proceed", { duration: 4000 });
      } else {
        handleNavigateToReviewChat();
      }
    }
  };

  const handleASINClick = (asin) => {
    localStorage.setItem("asin", asin);
    navigate("/analysis");
  };

  const handleDeleteChat = async (asin) => {
    try {
      await deleteUserChat(asin);
      setPreviousChats(
        previousChats.filter((chat) => chat.product_asin_no !== asin)
      );
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleNavigateToReviewChat = async () => {
    if (url !== "") {
      try {
        const validationResponse = extractASINFromUrl(url);
        if (validationResponse.asin !== "false") {
          setIsLoading(true);
          const data = await checkURL({ asin: validationResponse.asin });
          if (data.isValid) {
            localStorage.setItem("asin", validationResponse.asin);
            navigate(`/analysis`, { state: { asin: validationResponse.asin } });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const products = await getUserChats();
        // Sort chats by date
        products.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPreviousChats(products);
      } catch (error) {
        console.error("Error fetching user chats:", error);
      }
    };

    if (auth.isLoggedIn) {
      fetchUserChats();
    }
  }, [auth.isLoggedIn]);

  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-xl z-50">
          <HexagonOverlay />
        </div>
      )}

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900" /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              opacity: Math.random() * 0.5 + 0.5,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        {/* Enhanced Title Section */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl h-28 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300"
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
              // fontFamily: 'Helvetica, sans-serif',
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Get Insights on <br /> Amazon Product reviews by AI.
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xl mt-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
          >
            Tired of reading reviews? Let AI do the work for you. paste the
            product URL below to get started.
          </motion.p>
          <motion.div
            className="flex flex-col gap-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Review Input */}
        <motion.div className="w-full max-w-2xl mb-8 z-10 flex items-center justify-center">
          <form className="flex space-x-4">
            <Input
              type="url"
              placeholder="Enter product URL"
              className="flex-auto w-96 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
              value={url}
              onKeyDown={handleKeyPress}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              type="button"
              onKeyDown={handleKeyPress}
              onClick={handleNavigateToReviewChat}
              className="bg-gradient-to-br hover:from-purple-600 hover:via-indigo-600 hover:to-purple-600 from-purple-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-700 ease-in-out"
            >
              Summarize
            </Button>
          </form>
        </motion.div>

        {/* Button Group */}
        <div className="flex space-x-4 z-10">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white/90 transition-all duration-300"
              onClick={() => navigate("/top-rated")}
            >
              Top Rated Products
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white/90 transition-all duration-300"
              onClick={() => navigate("/trending")}
            >
              Trending Products
            </Button>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white/90 transition-all duration-300"
              onClick={handleRecentlyReviewedClick}
            >
              Recently Reviewed Products
            </Button>
          </motion.div>
        </div>

        {/* Recently Reviewed Modal */}
        <AnimatePresence>
          {isModalOpen && auth.isLoggedIn && (
            <Dialog
              open={isModalOpen}
              onOpenChange={() => setIsModalOpen(false)}
            >
              <DialogContent className="bg-gray-800 text-gray-100 max-w-4xl">
                {/* Increased modal width with max-w-3xl */}
                <DialogHeader>
                  <DialogTitle className="text-gray-100">
                    Previously Searched Products
                  </DialogTitle>
                </DialogHeader>
                <motion.ul
                  className=" space-y-2 max-h-96 overflow-y-auto scrollbar-thin scrollbar-corner-fuchsia-900 scrollbar-thumb-slate-200 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {previousChats.length > 0 ? (
                    previousChats.map((product, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <span
                            className="break-words whitespace-normal"
                            title={product.title}
                            onClick={() =>
                              handleASINClick(product.product_asin_no)
                            }
                          >
                            {product.title}
                          </span>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-400 mr-2">
                              {new Date(
                                product.created_at
                              ).toLocaleDateString()}
                            </span>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() =>
                                handleDeleteChat(product.product_asin_no)
                              }
                            >
                              <Trash2Icon />{" "}
                              {/* Replace text with delete icon */}
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))
                  ) : (
                    <li className="text-gray-400">No previous chats found.</li>
                  )}
                </motion.ul>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
