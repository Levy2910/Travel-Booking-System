import './App.css';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import BookingNav from './BookingNav';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BookingNav></BookingNav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
