import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        phone,
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } else {
        setError(response.data.message || "Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      setError("Login failed. Please check your details.");
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes fadeInBackground {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes zoomIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes slideIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 123, 255, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(0, 123, 255, 0.9); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 123, 255, 0.7); }
          }
        `}
      </style>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
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
    backgroundImage: "url('/images/products/login.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    animation: "fadeInBackground 2s ease-in-out"
  },
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    width: "360px",
    textAlign: "center",
    animation: "zoomIn 1s ease"
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#ffffff",
    animation: "fadeIn 1.5s ease-in-out"
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
    outline: "none",
    animation: "slideIn 0.8s ease forwards",
    opacity: 0
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
    //animation: "pulse 2s infinite"
  },
  error: {
    color: "red",
    fontSize: "14px",
    fontWeight: "500"
  }
};

export default Login;
