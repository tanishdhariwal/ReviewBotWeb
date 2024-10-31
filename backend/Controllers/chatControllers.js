const User = require("../models/User");
const Chat = require('../models/Chat');

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

module.exports = {
  generateChatResponse,
};