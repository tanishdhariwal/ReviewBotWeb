import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PageNotFound />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;