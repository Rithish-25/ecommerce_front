import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header({ cartItems }) {
  return (
    <nav className="navbar bg-yellow">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/home">
            <img width="160px" src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search-bar w-50">
          <Search />
        </div>

        {/* Navigation Links */}
        <div className="nav-links d-flex">
          <Link to="/about" className="text-white mx-3">About Us</Link>
          
        </div>

        {/* Cart Section */}
        <div className="cart d-flex align-items-center">
          <Link to="/cart" className="text-white">
            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-2" id="cart_count">{cartItems.length}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}