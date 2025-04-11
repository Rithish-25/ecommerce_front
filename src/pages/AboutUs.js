import React from "react";
//import "./AboutUs.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-box">
        <h1 className="about-title">About Us</h1>
        <p className="about-intro">
          Welcome to <span className="highlight">Your Travel Portal</span> – Your Gateway to Unforgettable Journeys!
        </p>
        <p className="about-description">
          At <span className="highlight">Your Travel Portal</span>, we believe that travel is about more than just destinations —
          it's about experiences, adventure, and creating memories. We offer amazing deals on flights, hotels, and vacation packages,
          making your planning process smooth and exciting.
        </p>
        <h2 className="about-subtitle">Why Choose Us?</h2>
        <ul className="about-list">
          <li>✅ Best Price Guarantee – Competitive rates for flights, hotels, and more.</li>
          <li>✅ Easy & Secure Bookings – Safe payment options and instant confirmations.</li>
          <li>✅ 24/7 Customer Support – Dedicated support whenever you need it.</li>
          <li>✅ Customized Travel Plans – Tailored experiences to match your preferences.</li>
        </ul>
        <p className="about-footer">🌍 Your journey starts with us. Let’s make it memorable! ✈️</p>
      </div>
    </div>
  );
};

export default AboutUs;
