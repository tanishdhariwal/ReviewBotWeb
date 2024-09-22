import { useState } from 'react';
import { Menu, X, Search, Star, BarChart2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle URL submission logic here
    console.log('Submitted URL:', url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">ReviewSummarizer</span>
            </div>
            <div className="hidden md:block">
              <Link to="/about" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-1/4 h-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg z-50 overflow-y-auto shadow-lg"
          >
            <div className="p-4">
              <button
                onClick={toggleMenu}
                className="mb-4 p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
              <Link to="/about" className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-3 py-2 text-sm font-medium text-gray-600">Recent Searches:</div>
              <Link to="#" className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm">
                Product 1
              </Link>
              <Link to="#" className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm">
                Product 2
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Summarize Product Reviews</h1>
        
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
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/top-rated" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center">
            <Star className="h-5 w-5 mr-2" />
            Top Rated Products
          </Link>
          <Link to="/trending" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending Products
          </Link>
          <Link to="/categories" className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg hover:bg-opacity-30 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            Product Categories
          </Link>
        </div>
      </main>
    </div>
  );
}