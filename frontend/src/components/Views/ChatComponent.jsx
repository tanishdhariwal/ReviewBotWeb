import { useState, useEffect, useRef } from "react";
import { Send, Loader2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getChatResponse, get_user_chat } from "../../Helpers/apiComms";
import { useAuth } from "../../Context/AuthContext";

const parseInlineMarkdown = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const parseMarkdown = (text) => {
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];

  lines.forEach((line, index) => {
    if (/^[-*]\s+/.test(line)) {
      listItems.push(line.replace(/^[-*]\s+/, ""));
    } else {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc list-inside">
            {listItems.map((item, idx) => (
              <li key={idx}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
      elements.push(
        <p key={`p-${index}`} className="mb-2">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  });

  if (listItems.length > 0) {
    elements.push(
      <ul key={`ul-end`} className="list-disc list-inside">
        {listItems.map((item, idx) => (
          <li key={idx}>{parseInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  }

  return elements;
};

export default function ChatComponent({ ASIN_DETAILS }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const auth = useAuth();
  const name = auth.user.username.charAt(0);

  const productASIN = ASIN_DETAILS["asin"];

  useEffect(() => {
    console.log("name:  ", name);
    console.log("productASIN:  ", productASIN);
    fetchExistingChats();
  }, [productASIN]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fetchExistingChats = async () => {
    try {
      const data = await get_user_chat({ product_asin: productASIN });
      if (data && data.exchanges && data.exchanges.length > 0) {
        const messages = data.exchanges.flatMap((exchange, index) => {
          const msgs = [];
          if (exchange.user_query && exchange.user_query.trim()) {
            msgs.push({
              id: `${index}-user`,
              content: exchange.user_query,
              sender: "user",
            });
          }
          if (exchange.bot_response && exchange.bot_response.trim()) {
            msgs.push({
              id: `${index}-bot`,
              content: exchange.bot_response,
              sender: "bot",
            });
          }
          return msgs;
        });
        setChatMessages(messages);
      } else {
        setChatMessages([
          {
            id: "1",
            content: "Hello! How can I assist you today?",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching existing chats:", error);
      setChatMessages([
        {
          id: "1",
          content: "Hello! How can I assist you today?",
          sender: "bot",
        },
      ]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const userMessage = {
        id: Date.now().toString(),
        content: currentMessage,
        sender: "user",
      };
      setChatMessages((prev) => [...prev, userMessage]);
      setCurrentMessage("");
      setIsLoading(true);

      try {
        console.log("in handleSendMessage");
        const data = await getChatResponse({ currentMessage, productASIN });
        console.log("data:", data);
        const botMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "bot",
        };
        setChatMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-gradient-to-br from-gray-900 to-black text-white rounded-lg">
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto p-6 space-y-6"
          ref={chatContainerRef}
        >
          <AnimatePresence>
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                )}
                <motion.div
                  className={`p-2 px-4 rounded-2xl max-w-[70%] ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-white shadow-md"
                  }`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div0
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-lg"
                  >
                    {message.sender === "bot"
                      ? parseMarkdown(message.content)
                      : message.content}
                  </motion.div0>
                </motion.div>
                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                    {name}
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
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                AI
              </div>
              <motion.div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 0.8,
                        delay: i * 0.2,
                      },
                    }}
                    className="bg-purple-500 rounded-full w-3 h-3"
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-b-xl">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-3 text-lg bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}