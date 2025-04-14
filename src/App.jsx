// src/App.jsx - Updated to include routing
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CakePage from './components/CakePage';
import GiftsPage from './components/GiftsPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CakePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;