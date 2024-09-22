import { useState } from "react";
import { Menu, X, Search, Star, BarChart2, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle URL submission logic here

    console.log("Submitted URL:", url);
  };

  const handleNavigateToReviewChat = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/reviewchat");
    }, 2000); // Simulate a loading delay of 2 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center  justify-between h-16">
            <div className="flex-shrink-0">
              <img  className="h-8 w-30" src="Group 1.png" alt="" />
            </div>
            <div className="hidden md:block">
              <Link
                to="/about"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
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
              <Link
                to="/about"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-3 py-2 text-sm font-medium text-gray-600">
                Recent Searches:
              </div>
              <Link
                to="#"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm"
              >
                Product 1
              </Link>
              <Link
                to="#"
                className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm"
              >
                Product 2
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 flex flex-col items-center justify-center min-h-screen px-4">
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
            Product Categories
          </Link>
        </div>
      </main>
    </div>
  );
}


// import { useState } from 'react'
// import { Menu, Search } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Link, useNavigate } from 'react-router-dom'

// export default function HomePage() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const navigate = useNavigate()

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setIsLoading(true)
//     // Simulating API call
//     setTimeout(() => {
//       setIsLoading(false)
//       navigate('/product-details')
//     }, 2000)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
//       <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <img className="h-18 w-28" src="https://namelix.com/img/logo.svg?" alt="Logo" />
//               </div>
//               <div className="hidden md:block">
//                 <div className="ml-10 flex items-baseline space-x-4">
//                   <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//                 Sign In
//               </button>
//             </div>
//             <div className="-mr-2 flex md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 <Menu className="h-6 w-6" aria-hidden="true" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: "-100%" }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: "-100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             className="fixed inset-0 z-50 bg-white md:hidden"
//           >
//             <div className="pt-5 pb-6 px-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <img className="h-8 w-auto" src="/placeholder.svg" alt="Logo" />
//                 </div>
//                 <div className="-mr-2">
//                   <button
//                     onClick={() => setIsMenuOpen(false)}
//                     className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <nav className="grid gap-y-8">
//                   <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">About</a>
//                   <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">Previously Searched Products</a>
//                   <Link to="/top-rated" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">Top Rated Products</Link>
//                 </nav>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <h1 className="text-4xl font-bold text-center mb-8">Product Review Summarizer</h1>
//           <form onSubmit={handleSubmit} className="flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Enter product URL"
//               className="max-w-md mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
//             >
//               <Search className="mr-2 h-4 w-4" /> Search
//             </button>
//           </form>
//           <div className="flex justify-center space-x-4 mb-8">
//             <Link to="/top-rated">
//               <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//                 Top Rated Products
//               </button>
//             </Link>
//             <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//               Recent Searches
//             </button>
//             <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
//               Trending Products
//             </button>
//           </div>
//         </div>
//       </main>

//       <AnimatePresence>
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm"
//           >
//             <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-xl">
//               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               <p className="mt-4 text-lg font-semibold">Loading...</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }