'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const dummyResponses = [
  "That's an interesting point. Can you tell me more?",
  "I understand. Let me think about that for a moment.",
  "Thank you for sharing. Is there anything else you'd like to add?",
  "I see. Have you considered looking at it from a different perspective?",
  "That's a great question. Let me find some information for you.",
]

export default function ChatComponent() {
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    fetchExistingChats()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  const fetchExistingChats = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setChatMessages([
      { id: '1', content: "Hello! How can I assist you today?", sender: 'bot' },
    ])
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (currentMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        content: currentMessage,
        sender: 'user',
      }
      setChatMessages(prev => [...prev, userMessage])
      setCurrentMessage('')
      setIsLoading(true)

      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        sender: 'bot',
      }
      setChatMessages(prev => [...prev, botMessage])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="flex flex-col h-[500px] bg-gray-100 rounded-lg">
      {/* <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Chat Assistant</h1>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </header> */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-6 space-y-6" ref={chatContainerRef}>
          <AnimatePresence>
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                )}
                <motion.div
                  className={`p-2 px-4 rounded-2xl max-w-[70%] ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-lg"
                  >
                    {message.content}
                  </motion.p>
                </motion.div>
                {message.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    U
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <motion.div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 0.8, delay: i * 0.2 },
                    }}
                    className="bg-blue-500 rounded-full w-3 h-3"
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="p-4 bg-white border-t border-gray-200 rounded-xl">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-3 text-lg bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
}