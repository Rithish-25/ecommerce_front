import React from "react";
//import "./AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="about-title">About Us</h1>
        <p className="about-intro">
          Welcome to <span className="highlight">Your E-Commerce Portal</span> – Your One-Stop Shop for Everything You Need!
        </p>
        <p className="about-description">
          At <span className="highlight">Your E-Commerce Portal</span>, we believe in delivering quality products at affordable prices. 
          From fashion to electronics, we have everything to fulfill your shopping desires. Our goal is to provide you with a seamless shopping experience, offering reliable products, prompt delivery, and top-notch customer service.
        </p>
        <h2 className="about-subtitle">Why Shop With Us?</h2>
        <ul className="about-list">
          <li>✅ Wide Product Selection – From gadgets to fashion, we have it all.</li>
          <li>✅ Secure Payment Methods – Your privacy and security are our top priority.</li>
          <li>✅ Fast & Reliable Delivery – We ensure your orders reach you quickly and safely.</li>
          <li>✅ 24/7 Customer Support – Our team is here to assist you anytime.</li>
        </ul>
        <p className="about-footer">🛍️ Start shopping now and enjoy the best deals! 🚚</p>
      </div>
    </div>
  );
};

export default AboutUs;
