import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); 
  };

  return (
    <div className="login-page">
      <div className="top-bar">
        <img
          src="https://latestlogo.com/wp-content/uploads/2024/02/vivo.png"
          alt="Vivo Logo"
          className="logo"
        />
      </div>

      {/* Login Card */}
      <div className="login-card">
        <div className="card-header">
          <h2>Welcome Back</h2>
          <button className="register-link" onClick={handleRegisterRedirect}>
            Create Account
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Mobile Number</label>
          <div className="input-row">
            <span className="prefix">+91</span>
            <input type="text" placeholder="Please enter your number" />
          </div>

          <label>Password</label>
          <div className="input-row">
            <input type="password" placeholder="Please enter password" />
          </div>

          <div className="forgot-password">
            <Link to="#">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
