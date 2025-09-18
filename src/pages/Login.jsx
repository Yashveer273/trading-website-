import React ,{useState}from "react";
import {  useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

 const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); 
  };


  return (
    <div className="login-container">
      
      
      <div className="top-bar">
         <img
          src="https://latestlogo.com/wp-content/uploads/2024/02/vivo.png"
          alt="Vivo Logo"
          className="logo"
        />
      </div>

   
      {/* The main login card content */}
      <div className="login-card">
        <div className="card-header">
          <h2 className="login-title">
            Login
          </h2>
          <button className="register-link" onClick={handleRegisterRedirect}>
            Register
          </button>
        </div>

        <div className="input-section">
          {/* Mobile Number Input */}
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-box-container">
              <span className="country-code">+91</span>
              <input 
                type="text" 
                id="mobileNumber"
                placeholder="Please enter your number" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Please enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field-full"
            />
          </div>
        </div>

        {/* Login Button */}
        <button 
          className="login-btn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
