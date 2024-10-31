import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Star, ThumbsUp, ThumbsDown, DollarSign, Award, Zap, Truck, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatComponent from './ChatComponent'; // Import the new ChatComponent

export default function ProductDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation(); // Use useLocation to get URL parameters
  const [productDetails, setProductDetails] = useState(null); // State for product details
  const [productUrl, setProductUrl] = useState(''); // State for product URL

  useEffect(() => {
    setIsLoaded(true);

    const params = new URLSearchParams(location.search);
    const productUrl = params.get('url');
    setProductUrl(productUrl); // Store product URL

    // Use hardcoded product details for now
    const details = {
      name: 'Premium Wireless Headphones',
      description: 'Experience crystal-clear audio with our Premium Wireless Headphones.',
      imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d30e9647291143.587609fa2b328.jpg',
      price: '$249.99',
      // ...other details...
    };

    setProductDetails(details);
  }, [location]);

  const metrics = [
    { name: 'Quality', value: 85, color: 'bg-blue-600' },
    { name: 'Value for Money', value: 75, color: 'bg-green-600' },
    { name: 'Customer Service', value: 90, color: 'bg-yellow-600' },
    { name: 'Durability', value: 80, color: 'bg-purple-600' },
    { name: 'Ease of Use', value: 95, color: 'bg-pink-600' },
    { name: 'Features', value: 88, color: 'bg-indigo-600' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          {productDetails ? productDetails.name : 'Loading...'}
        </motion.h1>
        
        <div className="flex flex-wrap mb-8">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={productDetails ? productDetails.imageUrl : ''} 
            alt={productDetails ? productDetails.name : ''} 
            className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" 
          />
          <div className="w-full md:w-3/5">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 mb-4"
            >
              {productDetails ? productDetails.description : ''}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center mb-2"
            >
              <Star className="text-yellow-400 w-5 h-5 mr-1" />
              <span className="text-gray-700 font-semibold">4.5 out of 5 (2,345 reviews)</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <DollarSign className="text-green-600 w-5 h-5 mr-1" />
              <span className="text-gray-700 font-semibold">{productDetails ? productDetails.price : ''}</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="bg-white bg-opacity-50 rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Review Summary</h2>
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <ThumbsUp className="text-green-600 w-5 h-5 mr-1" />
                  <span className="text-gray-700">Positive: 80%</span>
                </div>
                <div className="flex items-center">
                  <ThumbsDown className="text-red-600 w-5 h-5 mr-1" />
                  <span className="text-gray-700">Negative: 20%</span>
                </div>
              </div>
              <p className="text-gray-600">Users praise the sound quality, comfort, and battery life. Some concerns about the price point.</p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className="bg-white bg-opacity-50 rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{metric.name}</h3>
              <div className="flex items-center">
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className={`${metric.color} h-2.5 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: isLoaded ? `${metric.value}%` : 0 }}
                    transition={{ delay: 0.5 + 0.1 * index, duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="ml-2 text-gray-600">{metric.value}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col items-center">
            <Award className="text-blue-600 w-8 h-8 mb-2" />
            <span className="text-gray-700 font-semibold text-center">Award-Winning Design</span>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col items-center">
            <Zap className="text-yellow-600 w-8 h-8 mb-2" />
            <span className="text-gray-700 font-semibold text-center">40-Hour Battery Life</span>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col items-center">
            <Truck className="text-green-600 w-8 h-8 mb-2" />
            <span className="text-gray-700 font-semibold text-center">Free Express Shipping</span>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-4 flex flex-col items-center">
            <Repeat className="text-purple-600 w-8 h-8 mb-2" />
            <span className="text-gray-700 font-semibold text-center">30-Day Money Back</span>
          </div>
        </motion.div>

        <ChatComponent productUrl={productUrl} /> {/* Pass productUrl to ChatComponent */}
      </div>
    </div>
  );
}