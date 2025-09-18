import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div id="register-container">
      <div id="top-bar">
        <img
          src="https://latestlogo.com/wp-content/uploads/2024/02/vivo.png"
          alt="Vivo Logo"
          id="logo"
        />
      </div>
      <img src="/registration.png" alt="Bar Chart Graphic" id="chart-img" />
      
      {/* Main Card */}
      <div id="card">
        <h2 id="register-title">Register</h2>

        <div id="input-group">
          <input type="text" placeholder="Please enter your number" />
        </div>

        <div id="input-group">
          <input type="password" placeholder="Please enter your password" />
        </div>

        <div id="input-group">
          <input type="text" placeholder="Enter Invitation code" />
        </div>

        {/* Verification Code + Send Button */}
        <div id="verification-row">
          <input type="text" placeholder="Enter verification code" />
          <button id="send-btn">Send</button>
        </div>

        {/* Register Button */}
        <button id="login-btn" onClick={() => navigate("/login")}>
          Register
        </button>

        {/* Login Redirect */}
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
