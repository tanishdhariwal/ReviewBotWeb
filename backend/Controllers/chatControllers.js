const User = require("../models/User");
const Chat = require('../models/Chat');
const dbconnection = require('../DB/dbconnection'); // Correct import for dbconnection

const generateChatResponse = async (req, res) => {
  const { text, productUrl } = req.body; // Get text and productUrl from request body
  const userId = res.locals.jwtData.id; // From token payload


  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  // Extract ASIN from productUrl
  const extractASIN = (url) => {
    const match = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
    return match ? match[1] : null;
  };
  const ProductASIN = extractASIN(productUrl);
  if (!ProductASIN) {
    return res.status(400).json({ error: "Invalid product URL." });
  }

  // Get or create chat for this user and product
  let chat = await Chat.findOne({ user_id: userId, ProductASIN: ProductASIN });
  if (!chat) {
    // Create new chat
    chat = new Chat({
      user_id: userId,
      ProductASIN: ProductASIN,
      exchanges: [],
      productUrl: productUrl,
    });
  }

  // Add the user's message to exchanges
  chat.exchanges.push({
    message: text,
    sender: 'user',
  });

  // Generate a response (hardcoded for now)
  const botResponse = "This is a hardcoded response.";

  // Add bot's response to exchanges
  chat.exchanges.push({
    message: botResponse,
    sender: 'bot',
  });

  // Save chat
  await chat.save();

  // Update user's chatProducts
  if (!user.chatProducts.includes(ProductASIN)) {
    user.chatProducts.push(ProductASIN);
    await user.save();
  }

  res.status(200).json({ response: botResponse });
};

const productUrlValidation = async (req, res) => {
  const { url } = req.body;
  
  // Validate URL format and extract ASIN
  const asin = extractASINFromUrl(url);
  if (!asin) {
    return res.status(400).json({ isValid: false, error: "URL is not valid." });
  }
  
  try {
    const db = await dbconnection(); 
    // console.log("\n\nvejvnbskdcvbsdc\n\nvkjsbvsldkv\n\n");
    const product = await db.collection('products').findOne({ "product_asin_no": asin });
    if (product) {
      return res.status(200).json({ isValid: true, existsInDB: true });
    } else {
      return res.status(200).json({ isValid: true, existsInDB: false });
    }
  } catch (error) {
    return res.status(500).json({ isValid: false, error: "Database error." });
  }
};

const extractASINFromUrl = (url) => {
  const asinPattern = /\/(?:dp|product)\/([A-Z0-9]{10})/i;
  const match = url.match(asinPattern);
  return match ? match[1] : null;
};

module.exports = {
  generateChatResponse,
  productUrlValidation,
};
