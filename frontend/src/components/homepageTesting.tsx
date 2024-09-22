// 'use client'

// import { useState } from 'react'
// import { Menu, X, Search, Star, DollarSign, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import { Progress } from "@/components/ui/progress"

// export default function HomePage() {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showProductDetails, setShowProductDetails] = useState(false)
//   const [chatMessages, setChatMessages] = useState([])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     // Simulating API call
//     setTimeout(() => {
//       setIsLoading(false)
//       setShowProductDetails(true)
//     }, 2000)
//   }

//   const handleChat = (e) => {
//     e.preventDefault()
//     const newMessage = e.target.message.value
//     setChatMessages([...chatMessages, { text: newMessage, sender: 'user' }])
//     e.target.reset()
//     // Simulating AI response
//     setTimeout(() => {
//       setChatMessages(prev => [...prev, { text: "Thank you for your message. How else can I assist you with this product?", sender: 'ai' }])
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
//       <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <img className="h-8 w-8" src="/placeholder.svg" alt="Logo" />
//               </div>
//               <div className="hidden md:block">
//                 <div className="ml-10 flex items-baseline space-x-4">
//                   <a href="#" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">About</a>
//                 </div>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <Button>Sign In</Button>
//             </div>
//             <div className="-mr-2 flex md:hidden">
//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button variant="outline" size="icon" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                     <span className="sr-only">Open main menu</span>
//                     <Menu className="h-6 w-6" aria-hidden="true" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="left">
//                   <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                     <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
//                     <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Previously Searched Products</a>
//                     <a href="#" className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">Top Rated Products</a>
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <h1 className="text-4xl font-bold text-center mb-8">Product Review Summarizer</h1>
//           <form onSubmit={handleSubmit} className="flex justify-center mb-8">
//             <Input type="text" placeholder="Enter product URL" className="max-w-md mr-2" />
//             <Button type="submit">
//               <Search className="mr-2 h-4 w-4" /> Search
//             </Button>
//           </form>
//           <div className="flex justify-center space-x-4 mb-8">
//             <Button variant="outline">Top Rated Products</Button>
//             <Button variant="outline">Recent Searches</Button>
//             <Button variant="outline">Trending Products</Button>
//           </div>

//           <AnimatePresence>
//             {isLoading && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm"
//               >
//                 <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-xl">
//                   <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                   <p className="mt-4 text-lg font-semibold">Loading...</p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {showProductDetails && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-lg shadow-xl p-6 mb-8"
//             >
//               <h2 className="text-2xl font-bold mb-4">Product Name</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">Summary</h3>
//                   <p>This is a summarized review of the product based on multiple customer reviews...</p>
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold mb-2">Analysis</h3>
//                   <div className="flex items-center mb-2">
//                     <ThumbsUp className="text-green-500 mr-2" />
//                     <span>Positive Reviews: 75%</span>
//                   </div>
//                   <div className="flex items-center mb-4">
//                     <ThumbsDown className="text-red-500 mr-2" />
//                     <span>Negative Reviews: 25%</span>
//                   </div>
//                   <h4 className="font-semibold mb-2">Metrics</h4>
//                   <div className="space-y-2">
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <span>Quality</span>
//                         <span>85%</span>
//                       </div>
//                       <Progress value={85} className="w-full" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <span>Value for Money</span>
//                         <span>78%</span>
//                       </div>
//                       <Progress value={78} className="w-full" />
//                     </div>
//                     <div>
//                       <div className="flex justify-between mb-1">
//                         <span>Customer Service</span>
//                         <span>92%</span>
//                       </div>
//                       <Progress value={92} className="w-full" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6">
//                 <h3 className="text-xl font-semibold mb-2">Product Information</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center">
//                     <Star className="text-yellow-400 mr-2" />
//                     <span>4.5 out of 5 stars</span>
//                   </div>
//                   <div className="flex items-center">
//                     <DollarSign className="text-green-500 mr-2" />
//                     <span>$99.99</span>
//                   </div>
//                   <div className="flex items-center">
//                     <MessageCircle className="text-blue-500 mr-2" />
//                     <span>1,234 reviews</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4">Chat about this product</h3>
//                 <div className="bg-gray-100 p-4 rounded-lg mb-4 h-60 overflow-y-auto">
//                   {chatMessages.map((message, index) => (
//                     <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
//                       <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
//                         {message.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <form onSubmit={handleChat} className="flex">
//                   <Input type="text" name="message" placeholder="Type your message..." className="flex-grow mr-2" />
//                   <Button type="submit">Send</Button>
//                 </form>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </main>
//     </div>
//   )
// }