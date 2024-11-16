const User = require("../models/User");
const Chat = require('../models/Chat');
const dbconnection = require('../DB/dbconnection'); // Correct import for dbconnection
const axios = require('axios'); // Import axios

// const generateChatResponse = async (req, res) => {
//   const { text, productUrl } = req.body; // Get text and productUrl from request body
//   const userId = res.locals.jwtData.id; // From token payload


//   const user = await User.findById(userId);
//   if (!user) {
//     return res.status(400).json({ error: "User not found" });
//   }

//   // Extract ASIN from productUrl
//   const extractASIN = (url) => {
//     const match = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
//     return match ? match[1] : null;
//   };
//   const ProductASIN = extractASIN(productUrl);
//   if (!ProductASIN) {
//     return res.status(400).json({ error: "Invalid product URL." });
//   }

//   // Get or create chat for this user and product
//   let chat = await Chat.findOne({ user_id: userId, ProductASIN: ProductASIN });
//   if (!chat) {
//     // Create new chat
//     chat = new Chat({
//       user_id: userId,
//       ProductASIN: ProductASIN,
//       exchanges: [],
//       productUrl: productUrl,
//     });
//   }

//   // Add the user's message to exchanges
//   chat.exchanges.push({
//     message: text,
//     sender: 'user',
//   });

//   // Generate a response (hardcoded for now)
//   const botResponse = "This is a hardcoded response.";

//   // Add bot's response to exchanges
//   chat.exchanges.push({
//     message: botResponse,
//     sender: 'bot',
//   });

//   // Save chat
//   await chat.save();

//   // Update user's chatProducts
//   if (!user.chatProducts.includes(ProductASIN)) {
//     user.chatProducts.push(ProductASIN);
//     await user.save();
//   }

//   res.status(200).json({ response: botResponse });
// };

const generateChatResponse = async (req, res) => {
  const { text, productUrl } = req.body; // Get text and productASIN from request body
  const userId = res.locals.jwtData.id; // From token payload
  console.log("User ID:", userId);
  console.log("aa gaya bckend me")
  try {
    // const user = await User.findById(userId);
    // console.log("User:", user);
    // if (!user) {
    //   return res.status(400).json({ error: "User not found" });
    // }

    // // Check if the product exists in the database
    // const db = await dbconnection();
    // const productsCollection = db.collection('products');
    // const product = await productsCollection.findOne({ product_asin_no: productASIN });

    // if (!product) {
    //   return res.status(400).json({ error: "Product not found in the database." });
    // }

    // Generate a response using the NLP model
    const llmResponse = await axios.post('http://localhost:8000/get_LLM_response', { "asin": text });
    const botResponse = llmResponse.data.response;

    // Get or create chat for this user and product
    // let chat = await Chat.findOne({ user_id: userId, ProductASIN: productASIN });
    // if (!chat) {
    //   // Create new chat
    //   chat = new Chat({
    //     user_id: userId,
    //     ProductASIN: productASIN,
    //     exchanges: [],
    //     productUrl: product.productUrl, // Assuming productUrl is stored in the product document
    //   });
    // }

    // // Add the user's message to exchanges
    // chat.exchanges.push({
    //   message: text,
    //   sender: 'user',
    // });

    // // Add bot's response to exchanges
    // chat.exchanges.push({
    //   message: botResponse,
    //   sender: 'bot',
    // });

    // // Save chat
    // await chat.save();

    // Update user's chatProducts
    // if (!user.chatProducts.includes(productASIN)) {
    //   user.chatProducts.push(productASIN);
    //   await user.save();
    // }

    res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};



const productUrlCheck = async (req, res, next) => {
  const { asin } = req.body;
  try {
    const db = await dbconnection();
    const productsCollection = db.collection('products');
    // console.log("I just got the products collection", await productsCollection.find().limit(1).toArray());
    console.log("ASIN:", asin);
    const product = await productsCollection.findOne({ product_asin_no: asin });
    if (product) {
      return res.status(200).json({ isValid: true, existsInDB: true });
    } else {
      req.asin = asin;
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isValid: false, error: "Database error." });
  }
};

const scrapeURL = async (req, res) => {
  const asin = req.asin;

  try {
    const response = await axios.post('http://localhost:8000/scrape_url', { asin });

    if (response.data.isScraped) {
      return res.status(200).json({ isValid: true, existsInDB: true, message: "Scraping successful." });
    } else {
      return res.status(500).json({ isValid: false, error: "Scraping failed." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ isValid: false, error: "Error during scraping." });
  }
};

module.exports = {
  generateChatResponse,
  productUrlCheck,
  scrapeURL
};
