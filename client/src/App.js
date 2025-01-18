import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CreateListingPage from './pages/CreateListing';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/create-listing" element={<CreateListingPage/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
