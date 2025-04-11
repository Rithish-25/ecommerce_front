import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
//import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";


function App() {
  const [cartItems, setCartItems] = useState([]);
  
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/*"
        element={
          <div>
          <ToastContainer theme='dark' position='top-center' />
          <Header cartItems={cartItems} />
          <Routes>
          

            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            
          </Routes>
        </div>
        }
        />
       
        </Routes>
      </Router>

    </div>
  );
}

export default App;

/* in line no 51 we can add footer also*/