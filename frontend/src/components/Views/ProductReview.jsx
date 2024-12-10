import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import ChatComponent from './ChatComponent';
import { getProduct } from '../../Helpers/apiComms'; // Import the getProduct function

export const Analysis = () => {
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let asin = localStorage.getItem('asin');
        const productData = await getProduct(asin); // Use the provided ASIN
        setProduct(productData);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 "></div>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product.image_url.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < product.image_url.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-900 to-black text-white">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-transparent "
      >
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{product.title || 'Unavailable'}</h1>
        </div>
      </motion.header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg overflow-hidden shadow-xl"
            >
              <div className="relative aspect-w-1 aspect-h-1">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={product.image_url[selectedImageIndex] || 'Unavailable'}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors duration-200"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors duration-200"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                </button>
              </div>
              <div className="flex justify-center mt-4 space-x-2 pb-4">
                {product.image_url.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === selectedImageIndex ? 'bg-purple-500' : 'bg-gray-500'}`}
                    aria-label={`Select image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-purple-400">
                    {product.price || 'Unavailable'}
                  </h2>
                </div>
                {product.features && product.features.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-white">Key Features</h3>
                    <ul className="list-disc list-inside text-sm md:text-base text-gray-300">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-sm md:text-base text-gray-300">Unavailable</div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Description</h3>
                  <p className="mt-2 text-sm md:text-base text-gray-300">{product.description || 'Unavailable'}</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Customer Feedback</h2>
              <div className="flex items-center mb-4">
                <div className="text-3xl md:text-5xl font-bold text-purple-400">
                  {product.average_rating || 'Unavailable'}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          star <= Math.round(parseFloat(product.average_rating || 0))
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {product.ratings_distribution ? (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Rating Distribution</h3>
                  {product.ratings_distribution.map(({ rating, distribution }) => (
                    <div key={rating} className="flex items-center mt-2">
                      <span className="text-xs md:text-sm text-gray-400 w-16">{rating} stars</span>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${distribution}%` }}
                        ></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-400 ml-2">{distribution}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm md:text-base text-gray-300">Unavailable</div>
              )}
              {product.customer_sentiments && product.customer_sentiments.length > 0 ? (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Common Sentiments</h3>
                  <ul className="space-y-2">
                    {product.customer_sentiments.map((sentiment, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-xs md:text-sm font-medium text-gray-300">{sentiment.title}:</span>
                        <span className={`ml-2 text-xs md:text-sm ${
                          sentiment.sentiment === 'POSITIVE'
                            ? 'text-green-400'
                            : sentiment.sentiment === 'NEGATIVE'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}>
                          {sentiment.sentiment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-sm md:text-base text-gray-300">Unavailable</div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Review Summary</h2>
            <p className="text-sm md:text-base text-gray-300">{product.review_summary || 'Unavailable'}</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl mt-8"
        >
          <ChatComponent ASIN_DETAILS={{ asin: product.product_asin_no || 'Unavailable' }} />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Analysis;

