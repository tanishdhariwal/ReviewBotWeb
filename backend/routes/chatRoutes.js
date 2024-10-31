const express = require('express');
const chatRouter = express.Router();
const verifyToken = require('../utils/tokenManager').verifyToken;
const { generateChatResponse } = require('../Controllers/chatControllers'); // Import controller

// Chat routes are Protected API's

chatRouter.get("/new",(req,res)=>{
    res.status(200).send("Hello from the chat server");
    })

chatRouter.post('/chat_response', verifyToken, generateChatResponse); // Add POST route

module.exports = chatRouter;