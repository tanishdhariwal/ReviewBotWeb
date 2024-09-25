import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import ReviewChat from './components/ReviewChat'
import LoginSignUp from './components/LoginSignUp'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'
import { AuthProvider } from './Context/AuthContext'

function App() {
  
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review-chat" element={<ReviewChat />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </AuthProvider>


  )
}

export default App