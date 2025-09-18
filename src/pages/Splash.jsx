import React from "react";
import "./Splash.css";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/register");
  };

  return (
    <div className="splash-container">
      <div className="splash-content">
        {/* Image */}
        <img
          src="/splash.png"
          alt="Building Wealth"
          className="splash-image"
        />

        {/* Title */}
        <h1 className="title1">Building Wealth<br></br> Together</h1>

        {/* Subtitle */}
        <p className="subtitle">
          A smarter way to invest – gain confidence, track progress and build
          wealth over time with tailored insights and expert guidance.
        </p>

        {/* Continue Button */}
        <button className="continue-btn" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Splash;
