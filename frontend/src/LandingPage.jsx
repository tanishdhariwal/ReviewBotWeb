import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, MessageSquare, Star, Zap, Users, BrainCircuit, Menu } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 bg-purple-700 bg-opacity-30 backdrop-filter backdrop-blur-lg">
        <a href="#" className="flex items-center justify-center">
          <Star className="h-6 w-6 text-blue-500" />
          <span className="ml-2 text-2xl font-bold text-purple-900">EASYPICK</span>
        </a>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <a href="#how-it-works" className="text-sm font-medium hover:text-blue-500 transition-colors">
            How It Works
          </a>
          <a href="#benefits" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Benefits
          </a>
          <a href="#demo" className="text-sm font-medium hover:text-blue-500 transition-colors">
            Demo
          </a>
        </nav>
        <button
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6 text-purple-900" />
        </button>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-purple-700 bg-opacity-90 backdrop-filter backdrop-blur-lg flex flex-col items-center justify-center">
          <nav className="flex flex-col gap-4">
            <a href="#how-it-works" className="text-xl font-medium text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
              How It Works
            </a>
            <a href="#benefits" className="text-xl font-medium text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Benefits
            </a>
            <a href="#demo" className="text-xl font-medium text-white hover:text-blue-300 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Demo
            </a>
          </nav>
          <button
            className="mt-8 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Close
          </button>
        </div>
      )}
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-600 to-blue-500">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Unlock the Power of Customer Reviews
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  AI-powered review analysis that turns feedback into actionable insights.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button className="px-8 py-3 text-lg font-semibold rounded-full bg-white text-purple-600 hover:bg-gray-100 transition-colors">
                  Get Started
                </button>
                <button className="px-8 py-3 text-lg font-semibold rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-colors">
                  Learn More
                </button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-indigo-50">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-purple-900">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: MessageSquare, title: "1. Collect Reviews", description: "Gather customer reviews from multiple platforms automatically." },
                { icon: BrainCircuit, title: "2. Analyze Sentiment", description: "Our AI processes reviews to determine overall sentiment and key topics." },
                { icon: BarChart, title: "3. Generate Insights", description: "Receive detailed reports with actionable insights to improve your business." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <item.icon className="h-12 w-12 mb-4 text-blue-500" />
                    <h3 className="text-lg font-bold mb-2 text-purple-800">{item.title}</h3>
                    <p className="text-purple-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-purple-900">Platform Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Real-time Analysis", description: "Get instant insights as new reviews come in." },
                { icon: Users, title: "Multi-platform Support", description: "Analyze reviews from various sources in one place." },
                { icon: BrainCircuit, title: "AI-Driven Insights", description: "Leverage advanced machine learning for deeper understanding." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-indigo-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <item.icon className="h-12 w-12 mb-4 text-blue-500" />
                    <h3 className="text-xl font-bold mb-2 text-purple-800">{item.title}</h3>
                    <p className="text-purple-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-purple-100 to-blue-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-purple-900">See EASYPICK in Action</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Sentiment Dashboard", description: "Visualize sentiment trends and key metrics at a glance." },
                { title: "Review Analysis", description: "Dive deep into individual reviews with AI-powered insights." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-4 text-purple-800">{item.title}</h3>
                  <div className="aspect-video bg-purple-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={`https://via.placeholder.com/400x300.png?text=${item.title.replace(' ', '+')}`}
                      alt={`${item.title} Demo`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-purple-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { quote: "EASYPICK has transformed how we handle customer feedback. The insights are invaluable.", author: "Emily R., Customer Experience Manager" },
                { quote: "The AI-driven analysis saves us hours of manual work and provides actionable insights we can trust.", author: "Michael T., Business Owner" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-700 p-6 rounded-lg"
                >
                  <p className="italic mb-4">{`"${item.quote}"`}</p>
                  <p className="font-bold">- {item.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-purple-900 text-white">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2024 EASYPICK. All rights reserved.</p>
          <nav className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-blue-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-blue-300 transition-colors">
              Privacy Policy
            </a>
          </nav>
          <button className="mt-4 md:mt-0 px-6 py-2 text-sm font-semibold rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            Start Free Trial
          </button>
        </div>
      </footer>
    </div>
  )
}