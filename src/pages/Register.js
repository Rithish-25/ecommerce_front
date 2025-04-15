import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // Admin Password Field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8000/api/v1/register", {
        name,
        email,
        phone,
      });

      if (response.data.success) {
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  // Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:8000/api/v1/adminlogin", {
        email,
        phone,
        password, // Send admin password for authentication
      });

      if (response.data.success) {
        navigate("/admin");
      } else {
        setError(response.data.message || "Admin login failed.");
      }
    } catch (err) {
      setError("Server error. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isAdmin ? "Admin Login" : "User Register"}</h2>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        {isAdmin ? (
          // Admin Login Form
          <form onSubmit={handleAdminLogin} style={styles.form}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Login</button>
          </form>
        ) : (
          // User Registration Form
          <form onSubmit={handleRegister} style={styles.form}>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Register</button>
          </form>
        )}

        {/* Toggle between Admin and User Registration */}
        <p onClick={() => setIsAdmin(!isAdmin)} style={styles.toggle}>
          {isAdmin ? "Switch to User Registration" : "Switch to Admin Login"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    height: "100vh", 
    backgroundImage: "url('/images/products/register.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font
  },
  card: { 
    background: "rgba(255, 255, 255, 0.2)", // semi-transparent background
    padding: "30px", 
    borderRadius: "15px", 
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", 
    backdropFilter: "blur(10px)", 
    WebkitBackdropFilter: "blur(10px)", 
    border: "1px solid rgba(255, 255, 255, 0.18)", 
    width: "360px", 
    textAlign: "center",
    animation: "fadeIn 1s ease-out"
  },
  title: { 
    marginBottom: "20px", 
    fontSize: "26px", 
    fontWeight: "600",
    color: "#ffffff"
  },
  form: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px"
  },
  input: { 
    padding: "12px", 
    fontSize: "16px", 
    width: "100%", 
    borderRadius: "8px", 
    border: "1px solid #ccc", 
    transition: "all 0.3s ease",
    outline: "none"
  },
  button: { 
    padding: "12px", 
    fontSize: "16px", 
    fontWeight: "600",
    background: "#007BFF", 
    color: "#fff", 
    border: "none", 
    borderRadius: "8px", 
    cursor: "pointer", 
    transition: "all 0.3s ease",
    animation: "buttonHover 0.5s infinite alternate"
  },
  error: { 
    color: "red", 
    fontSize: "14px",
    fontWeight: "500"
  },
  success: { 
    color: "limegreen", 
    fontSize: "14px",
    fontWeight: "500"
  },
  toggle: { 
    marginTop: "15px", 
    color: "#ffffff",  // Changed to white
    cursor: "pointer", 
    textDecoration: "underline",
    fontWeight: "500"
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    }
  },
  '@keyframes buttonHover': {
    '0%': {
      backgroundColor: '#007BFF',
    },
    '50%': {
      backgroundColor: '#0056b3',
    },
    '100%': {
      backgroundColor: '#007BFF',
    }
  }
};

export default Register;
