import React ,{useState}from "react";
import {  useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

 import Cookies from "js-cookie";
import { loginUser,SECRET_KEY } from "../api";
import "./Login.css";

const Login = () => {

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

 const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate("/register");
  };



const handleLogin = async (e) => {
  e.preventDefault();

  if (!mobileNumber || !password) return alert("Phone and password are required");

  const credentials = { phone:mobileNumber, password };

  try {
    const response = await loginUser(credentials);

    // Save token in cookies
    if (response.token) {
      const encryptedUser = CryptoJS.AES.encrypt(
  JSON.stringify(response.user),
  SECRET_KEY
).toString();

      Cookies.set("tredingWeb", response.token, { expires: 7 }); 
      Cookies.set("tredingWebUser", encryptedUser, { expires: 7 }); 
    }

    alert(response.message || "Login successful");
    navigate("/home");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
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
