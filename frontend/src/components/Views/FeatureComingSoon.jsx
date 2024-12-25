'use client'

import { motion } from 'framer-motion'

const EightBitBuilder = () => (
  <div className="w-64 h-64 relative">
    {/* Ground */}
    <div className="absolute bottom-0 left-0 w-full h-4 bg-green-800"></div>
    
    {/* Building structure */}
    <motion.div 
      className="absolute bottom-4 left-8 w-48 h-32 bg-orange-700"
      initial={{ height: 0 }}
      animate={{ height: 32 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    >
      {/* Bricks */}
      <div className="absolute top-0 left-0 w-full h-full grid grid-cols-6 grid-rows-4">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="border-r border-b border-orange-800"></div>
        ))}
      </div>
    </motion.div>
    
    {/* Builder character */}
    <motion.div 
      className="absolute bottom-4 left-4 w-12 h-16"
      animate={{ x: [0, 44, 0] }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
    >
      {/* Head */}
      <div className="w-8 h-6 bg-[#FFA07A] ml-2">
        {/* Face */}
        <div className="absolute top-1 left-3 w-2 h-1 bg-white"></div>
        <div className="absolute top-1 left-6 w-2 h-1 bg-white"></div>
        <div className="absolute top-3 left-4 w-4 h-1 bg-[#8B4513]"></div>
      </div>
      {/* Body */}
      <div className="w-12 h-6 bg-red-500"></div>
      {/* Left Arm (static) */}
      <div className="absolute top-6 left-0 w-3 h-3 bg-[#FFA07A]"></div>
      {/* Right Arm (hammering) */}
      <motion.div 
        className="absolute top-6 right-0 w-3 h-3 bg-[#FFA07A]"
        animate={{ rotate: [-10, -50, -10] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* Hammer */}
        <motion.div 
          className="absolute top-2 left-2 w-8 h-8"
          animate={{ rotate: [10, 50, 10] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {/* Hammer head */}
          <div className="absolute top-0 right-0 w-4 h-3 bg-gray-600"></div>
          {/* Hammer handle */}
          <div className="absolute top-1 right-3 w-6 h-2 bg-yellow-800"></div>
        </motion.div>
      </motion.div>
      {/* Legs */}
      <motion.div 
        className="absolute bottom-0 left-1 w-4 h-4 bg-blue-700"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-0 right-1 w-4 h-4 bg-blue-700"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.25 }}
      ></motion.div>
    </motion.div>
    
    {/* Dust particles */}
    <motion.div
      className="absolute bottom-12 left-16 w-2 h-2 bg-gray-300 rounded-full"
      animate={{
        y: [-10, -20],
        x: [0, 10],
        opacity: [1, 0]
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatDelay: 1
      }}
    />
    <motion.div
      className="absolute bottom-12 left-20 w-1 h-1 bg-gray-300 rounded-full"
      animate={{
        y: [-5, -15],
        x: [0, 5],
        opacity: [1, 0]
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 1.2
      }}
    />
  </div>
)

export default function FeatureComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Feature Coming Soon
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-gray-400 mb-12 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        We're building something amazing for you. Stay tuned!
      </motion.p>
      
      <EightBitBuilder />
      
      <motion.p
        className="mt-8 text-lg text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
      </motion.p>
    </div>
  )
}

