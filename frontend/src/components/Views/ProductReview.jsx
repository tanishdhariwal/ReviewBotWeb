import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import ChatComponent from './ChatComponent'; // Import the new ChatComponent

export const Analysis = () => {
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      setProduct({
        title: "Premium Wireless Headphones",
        brand: { name: "SoundMaster", url: "#" },
        media: { images: ["https://picsum.photos/400/400", "https://picsum.photos/400/400", "https://picsum.photos/400/500"] },
        price: {
          current_price: "199.99",
          currency: "$",
          previous_price: "249.99",
          savings: "50.00"
        },
        availability: {
          status: "In stock",
          shipping_info: "Free shipping",
          location: "Ships from SoundMaster Warehouse"
        },
        key_features: ["40-hour battery life", "Active Noise Cancellation", "Hi-Fi Sound", "Comfortable over-ear design"],
        product_description: "Experience unparalleled sound quality with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology and long-lasting battery life, these headphones are perfect for music enthusiasts and professionals alike.",
        product_details: {
          dimensions: "7.68 x 7.83 x 3.07 inches",
          weight: "0.55 lbs",
          manufacturer: "SoundMaster Audio",
          country_of_origin: "Japan",
          best_sellers_rank: "#1 in Over-Ear Headphones"
        },
        customer_feedback: {
          average_rating: "4.7",
          total_reviews: "1,234",
          ratings_distribution: {
            "5_stars": "80",
            "4_stars": "50",
            "3_stars": "10",
            "2_stars": "24",
            "1_star": "10"
          },
          common_sentiments: [
            { aspect: "Sound Quality", sentiment: "Positive" },
            { aspect: "Battery Life", sentiment: "Positive" },
            { aspect: "Comfort", sentiment: "Positive" },
            { aspect: "Price", sentiment: "Neutral" }
          ]
        },
        chatbot_analysis: {
          summary: "Overall very positive sentiment. Users praise the sound quality and battery life. Some concerns about the price point.",
          top_positive_review: {
            customer_name: "AudioPhile",
            rating: "5",
            review: "These headphones are a game-changer! The sound quality is incredible, and the battery lasts forever. Absolutely worth every penny."
          },
          top_negative_review: {
            customer_name: "BudgetBuyer",
            rating: "3",
            review: "While the sound quality is great, I find these a bit pricey. Wish they were more affordable for the average consumer."
          }
        }
      });
    }, 1000);
  }, []);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 "></div>
      </div>
    );
  }

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : product.media.images.length - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex < product.media.images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-900 to-black text-white">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-transparent " // Changed bg-gray-900 to bg-blur-20
      >
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{product.title}</h1>
          {product.brand && (
            <a href={product.brand.url} className="text-sm md:text-base text-purple-300 hover:text-purple-100 transition-colors duration-200">
              {product.brand.name}
            </a>
          )}
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
                  src={product.media.images[selectedImageIndex]}
                  alt={`Product image ${selectedImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg" // Changed h-full to h-64
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
                {product.media.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === selectedImageIndex ? 'bg-purple-500' : 'bg-gray-500'}`} // Changed w-3 h-3 to w-2 h-2
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
                    {product.price.currency}{product.price.current_price}
                  </h2>
                  {product.price.previous_price && (
                    <p className="text-sm md:text-base text-gray-400 line-through">
                      {product.price.currency}{product.price.previous_price}
                    </p>
                  )}
                  {product.price.savings && (
                    <p className="text-sm md:text-base text-green-400 mt-1">
                      Save {product.price.currency}{product.price.savings}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Availability</h3>
                  <p className="text-sm md:text-base text-gray-300">{product.availability.status}</p>
                  {product.availability.shipping_info && <p className="text-sm md:text-base text-gray-300">{product.availability.shipping_info}</p>}
                  {product.availability.location && <p className="text-sm md:text-base text-gray-300">{product.availability.location}</p>}
                </div>
                {product.key_features && product.key_features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white">Key Features</h3>
                    <ul className="list-disc list-inside text-sm md:text-base text-gray-300">
                      {product.key_features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
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
                  <p className="mt-2 text-sm md:text-base text-gray-300">{product.product_description}</p>
                </div>
                {product.product_details && Object.keys(product.product_details).length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white">Specifications</h3>
                    <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      {Object.entries(product.product_details).map(([key, value]) => (
                        <div key={key} className="border-t border-gray-700 pt-4">
                          <dt className="text-sm font-medium text-gray-400">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                          </dt>
                          <dd className="mt-1 text-sm md:text-base text-gray-200">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
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
                  {product.customer_feedback.average_rating}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          star <= Math.round(parseFloat(product.customer_feedback.average_rating))
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                    {product.customer_feedback.total_reviews} reviews
                  </div>
                </div>
              </div>
              {product.customer_feedback.ratings_distribution && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Rating Distribution</h3>
                  {Object.entries(product.customer_feedback.ratings_distribution).reverse().map(([stars, count]) => (
                    <div key={stars} className="flex items-center mt-2">
                      <span className="text-xs md:text-sm text-gray-400 w-16">{stars.replace('_', ' ')}</span>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(parseInt(count) / parseInt(product.customer_feedback.total_reviews)) }%` }}
                        ></div>
                      </div>
                      <span className="text-xs md:text-sm text-gray-400 ml-2">{count}</span>
                    </div>
                  ))}
                </div>
              )}
              {product.customer_feedback.common_sentiments && product.customer_feedback.common_sentiments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Common Sentiments</h3>
                  <ul className="space-y-2">
                    {product.customer_feedback.common_sentiments.map((sentiment, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-xs md:text-sm font-medium text-gray-300">{sentiment.aspect}:</span>
                        <span className={`ml-2 text-xs md:text-sm ${
                          sentiment.sentiment === 'Positive'
                            ? 'text-green-400'
                            : sentiment.sentiment === 'Negative'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}>
                          {sentiment.sentiment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Chatbot Analysis</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
              <p className="text-sm md:text-base text-gray-300">{product.chatbot_analysis.summary}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.chatbot_analysis.top_positive_review && (
                <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 backdrop-blur-lg rounded-lg p-4">
                  <h3 className="flex items-center text-base md:text-lg font-semibold text-green-400 mb-2">
                    <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Top Positive Review
                  </h3>
                  <div className="mb-2">
                    <span className="text-xs md:text-sm font-medium text-gray-300">{product.chatbot_analysis.top_positive_review.customer_name}</span>
                    <span className="ml-2 text-xs md:text-sm text-yellow-400">{product.chatbot_analysis.top_positive_review.rating} stars</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400">{product.chatbot_analysis.top_positive_review.review}</p>
                </div>
              )}
              {product.chatbot_analysis.top_negative_review && (
                <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 backdrop-blur-lg rounded-lg p-4">
                  <h3 className="flex items-center text-base md:text-lg font-semibold text-red-400 mb-2">
                    <ThumbsDown className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Top Negative Review
                  </h3>
                  <div className="mb-2">
                    <span className="text-xs md:text-sm font-medium text-gray-300">{product.chatbot_analysis.top_negative_review.customer_name}</span>
                    <span className="ml-2 text-xs md:text-sm text-yellow-400">{product.chatbot_analysis.top_negative_review.rating} stars</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400">{product.chatbot_analysis.top_negative_review.review}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl mt-8"
        >
          <ChatComponent ASIN_DETAILS={{ asin: product.asin }} /> {/* Pass productASIN to ChatComponent */}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Analysis;

