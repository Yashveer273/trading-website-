import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Import API
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [otp, setOtp] = useState("");

  const handleRegister = async () => {
    if (!phone || !password) return alert("Phone and password are required");

    const userData = {
      phone,
      password,
      refCode: refCode || null,
      otp: otp || "12345", // example OTP
    };

    try {
      const response = await registerUser(userData);
      alert(response.message || "Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div id="register-container">
      <div id="top-bar">
        <img
          src="https://latestlogo.com/wp-content/uploads/2024/02/vivo.png"
          alt="Vivo Logo"
          id="logo"
        />
      </div>
      <img
        src="https://img.freepik.com/free-vector/hand-drawn-stock-market-concept-with-analysts_23-2149163670.jpg?semt=ais_incoming&w=740&q=80"
        alt="Bar Chart Graphic"
        id="chart-img"
      />

      <div id="card">
        <h2 id="register-title">Register</h2>

        <div id="input-group">
          <input
            type="text"
            placeholder="Please enter your number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div id="input-group">
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div id="input-group">
          <input
            type="text"
            placeholder="Enter Invitation code"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
          />
        </div>

        <div id="verification-row">
          <input
            type="text"
            placeholder="Enter verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button id="send-btn">Send</button>
        </div>

        <button id="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p id="login-text">
          Already have an account?{" "}
          <span id="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
