// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ReviewChat from './components/ReviewChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div>About Page</div>} /> {/* Example additional page */}
        <Route path="/reviewchat" element={<ReviewChat />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;