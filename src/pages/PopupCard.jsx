import React, { useState, useEffect } from 'react';

import { getSocialLinks } from "../api";
const PopupCard = () => {
 
  const [isOpen, setIsOpen] = useState(false);

   const [usernameLink, setUsernameLink] = useState("");
   const [groupLink, setGroupLink] = useState("");
 
   // ✅ Fetch dynamic links from backend
   useEffect(() => {
     const fetchLinks = async () => {
       try {
         const data = await getSocialLinks();
         if (data && data.length > 0) {
           setUsernameLink(data[0].telegramUsernameLink || "");
           setGroupLink(data[0].telegramGroupLink || "");
         }
       } catch (err) {
         console.error("Failed to fetch links:", err);
       }
     };
     fetchLinks();
   }, []);
  useEffect(() => {
    // Set a timeout for 1 seconds (1000 milliseconds)
    const timer = setTimeout(() => {
      setIsOpen(true); // Show the popup
    }, 1000); 

    return () => clearTimeout(timer);
  }, []); 

  const handleClose = () => {

    setIsOpen(false);
  };
  

  const alertStyles = `
    /* --- ALERT POPUP STYLES (.alert-*) --- */
    .alert-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: flex-start; /* Start from top */
        z-index: 50;
        padding: 1rem;
        padding-top: 2.5rem;
    }
    
    .alert-card {
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
        width: 100%;
        max-width: 400px;
      
        position: relative;
        padding: 1.25rem 1.75rem;
        font-family: 'Inter', sans-serif;
    }
    
    .alert-close-btn {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        color: #9ca3af;
        font-size: 2rem;
        font-weight: 300;
        line-height: 1;
        padding: 0.5rem;
        cursor: pointer;
        transition: color 0.15s ease-in-out;
    }
    .alert-close-btn:hover {
        color: #4b5563;
    }
    
    .alert-header {
        text-align: center;
        font-size: 1rem;
        line-height: 2rem;
        font-weight: 800;
        color: linear-gradient(#ffc800ff, #ff9900ff);
        margin-bottom: 1.25rem;
        border-bottom: 1px solid #fed7aa;
        padding-bottom: 0.75rem;
    }
    .alert-header span {
        font-size: 1.5rem;
        margin: 0 0.5rem;
    }
    
    .alert-content p {
        margin-bottom: 1rem;
        line-height: 1.5;
        color: #1f2937;
        display: flex;
        align-items: flex-start;
    }
    .alert-content p span:first-child {
        font-size: 1.125rem;
        margin-right: 0.75rem;
        margin-top: 0.25rem;
    }
    
    .alert-bold {
        font-weight: 700;
        color: #ff9900; /* Custom Orange */
    }
    
    .alert-detail-row-container {
        padding-top: 0.75rem;
        border-top: 1px solid #f3f4f6;
        margin-bottom: 1rem;
    }
    
    .alert-detail-row {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .alert-cta-btn {
        width: 100%;
        padding: 0.75rem 0;
       background: linear-gradient(rgb(255, 201, 0), #ff9900);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-size: 1.125rem;
        font-weight: 800;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.1s ease;
    }
    .alert-cta-btn:hover {
      background: linear-gradient(rgb(255, 201, 0), #ff9900);
        transform: scale(1.01);
    }
   
  `;


  // When the popup is initially closed, show a minimal background
  if (!isOpen) {
    return (
      <div >
        <style dangerouslySetInnerHTML={{ __html: alertStyles }} />
        {/* Placeholder text visible before the popup appears */}
        
      </div>
    );
  }


  return (
    <div className="">
      <style dangerouslySetInnerHTML={{ __html: alertStyles }} />

      <div className="alert-overlay">
        <div className="alert-card">
          
      
          <button
            onClick={handleClose}
            className="alert-close-btn"
            aria-label="Close"
          >
            &times;
          </button>

          {/* Header: IMPORTANT NOTICE */}
          <div className="alert-header">
            <span role="img" aria-label="alert">🚨</span>
            IMPORTANT NOTICE
            <span role="img" aria-label="alert">🚨</span>
          </div>
          
          {/* Content Details */}
          <div className="alert-content">
            
            {/* Welcome Text */}
            <p>
              <span role="img" aria-label="wave">👋</span> 
              <span>Welcome to <span className="alert-bold">realstateinvest Official Platform!</span></span>
            </p>

            {/* Launch Bonus */}
            <p>
              <span role="img" aria-label="sun">☀️</span> 
              <span>
                <span className="alert-bold">Launch Bonus:</span> All new users will receive an instant 
                <span className="alert-bold"> ₹12 Signup Reward.</span>
              </span>
            </p>
            
            {/* Detail Rows */}
            <div className="alert-detail-row-container">
              {/* Launch Date */}
              <div className="alert-detail-row">
                <span role="img" aria-label="calendar">🗓️</span>
                <span>Launch Date: <span className="alert-bold">24th October 2025</span></span>
              </div>

              {/* Minimum Recharge */}
              <div className="alert-detail-row">
                <span role="img" aria-label="money-bag">💰</span>
                <span>Minimum Recharge: <span className="alert-bold">₹250.00</span></span>
              </div>

              {/* Minimum Withdrawal */}
              <div className="alert-detail-row">
                <span role="img" aria-label="bank">🏛️</span>
                <span>Minimum Withdrawal: <span className="alert-bold">160.00rs</span></span>
              </div>
            </div>
            
            {/* Call to Action Text */}
            <p>
              <span role="img" aria-label="heart">💖</span> 
              <span>Start earning today and enjoy exclusive early access benefits!</span>
            </p>
          </div>

          {/* Join Telegram Button */}
          <div>
            <button
              onClick={() => window.open(groupLink, "_blank")}
              className="alert-cta-btn"
            >
              Join Telegram
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PopupCard;