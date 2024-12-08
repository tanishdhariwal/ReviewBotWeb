'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useAuth } from "../../Context/AuthContext"
import CubeLoader from "../Common/CubeLoader"
import toast, { Toaster } from "react-hot-toast"
import { checkURL, extractASINFromUrl, getUserChats } from "../../Helpers/apiComms"

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

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage, { duration: 4000 });
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleRecentlyReviewedClick = () => {
    if (auth.isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate("/login");
    }
  };

  const handleASINClick = (asin) => {
    localStorage.setItem('asin', asin);
    navigate('/review-chat');
  };

  const handleNavigateToReviewChat = async () => {
    if (url !== "") {
      try {
        const validationResponse = extractASINFromUrl(url);
        if (validationResponse.asin !== "false") {
          setIsLoading(true);
          const data = await checkURL({ asin: validationResponse.asin });
          if (data.isValid) {
            localStorage.setItem('asin', validationResponse.asin);
            navigate(`/review-chat`, { state: { asin: validationResponse.asin } });
          } else {
            toast.error("Unable to help right now");
          }
        } else {
          toast.error("URL is not valid.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter a URL.");
    }
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
    <div className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <Toaster />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
          <CubeLoader />
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
              repeatType: 'reverse',
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-blue-300 to-purple-300 mb-3"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          >
            AI-Powered Review Analysis
          </motion.h1>
          <motion.p
            className="text-gray-400 text-xl mt-3 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Smart insights from thousands of reviews in seconds
          </motion.p>
          <motion.div
            className="flex flex-col gap-2 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
          </motion.div>
        </motion.div>

        {/* Review Input */}
        <motion.div className="w-full max-w-2xl mb-8 z-10 flex items-center justify-center">
          <form className="flex space-x-4">
            <Input
              type="url"
              placeholder="Enter product URL"
              className="flex-auto w-96 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button 
              type="button" 
              onClick={handleNavigateToReviewChat}
              className="bg-gradient-to-br hover:from-purple-600 hover:via-indigo-600 hover:to-purple-600 from-purple-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-700 ease-in-out"
            >
              Summarize
            </Button>
          </form>
        </motion.div>

        {/* Button Group */}
        <div className="flex space-x-4 z-10">
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white/90 transition-all duration-300"
              onClick={() => navigate('/top-rated')}
            >
              Top Rated Products
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white/90 transition-all duration-300"
              onClick={() => navigate('/trending')}
            >
              Trending Products
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
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
            <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
              <DialogContent className="bg-gray-800 text-gray-100">
                <DialogHeader>
                  <DialogTitle className="text-gray-100">Previously Searched Products</DialogTitle>
                </DialogHeader>
                <motion.ul
                  className="space-y-2 max-h-96 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {previousChats.length > 0 ? (
                    previousChats.map((asin, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
                        onClick={() => handleASINClick(asin)}
                      >
                        <span className="truncate max-w-xs" title={asin}>
                          {asin}
                        </span>
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
  )
}
