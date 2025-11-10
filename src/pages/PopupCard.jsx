import React, { useState, useEffect } from 'react';

// Assuming getSocialLinks is defined in your api file
import { getSocialLinks } from "../api"; 

const PopupCard = () => {
    // State to control the visibility of the popup
    const [isOpen, setIsOpen] = useState(false);

    // States for dynamic links (from backend)
    const [usernameLink, setUsernameLink] = useState("");
    const [groupLink, setGroupLink] = useState("");

    // ✅ Fetch dynamic links from backend (runs once on mount)
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

    // ✅ Set a timeout to show the popup after 1 second (runs once on mount)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true); // Show the popup
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    // --- UPDATED CSS STYLES TO MATCH THE IMAGE ---
    const alertStyles = `
        /* Variables */
        :root {
            --primary-yellow: #ffc900;
            --secondary-orange: #ff9900;
            --text-color: #333;
        }

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
            align-items: center; /* CENTERED VERTICALLY */
            z-index: 50;
            padding: 1rem;
        }
        
        .alert-card {
            background-color: white;
            /* Added the gradient border effect from the image */
            border-radius: 1rem;
            border: 5px solid transparent; 
            border-image: linear-gradient(to bottom right, var(--primary-yellow), var(--secondary-orange)) 1;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* Stronger shadow for pop effect */
            width: 100%;
            max-width: 400px;
            position: relative;
            padding: 1.5rem;
            font-family: Arial, sans-serif;
            text-align: center; /* Center all content */
        }
        
        .alert-close-btn {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            color: #d1d5db; /* Light gray close button */
            font-size: 1.5rem;
            font-weight: bold;
            line-height: 1;
            padding: 0.25rem;
            cursor: pointer;
            transition: color 0.15s ease-in-out;
            background: none;
            border: none;
        }
        .alert-close-btn:hover {
            color: #9ca3af;
        }
        
        .alert-header {
            font-size: 1.6rem;
            font-weight: 900;
            color: var(--text-color);
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .alert-content p {
            margin: 0.75rem 0;
            line-height: 1.5;
            color: var(--text-color);
            display: flex;
            align-items: center;
            justify-content: center; /* Center text lines */
            font-size: 0.95rem;
            font-weight: 500;
        }

        /* Styling for the pin icon and the text */
        .alert-content p .icon {
            font-size: 1.1rem;
            margin-right: 0.5rem;
            color: var(--secondary-orange); /* Pin color */
        }
        
        .alert-bold-text {
            font-weight: 700;
            color: var(--secondary-orange); 
        }

        .alert-founded {
            font-weight: 700;
            font-size: 1.4rem;
            margin: 1.5rem 0 1rem;
            color: var(--text-color);
        }

        /* Styles for the separator and instant payment text */
        .alert-separator-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 1rem 0;
        }

        .alert-instant-text {
            font-weight: 700;
            font-size: 1.1rem;
            color: #4497e6; /* Blue text color in the image */
            margin: 0.5rem 0;
        }

        .alert-line {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0.5rem 0;
        }
        .alert-line hr {
            flex-grow: 1;
            border: 0;
            border-top: 1px solid #ccc;
            margin: 0 0.5rem;
        }
        .alert-line .cross-icon {
            font-size: 1.2rem;
            color: #e57373; /* Reddish cross */
            margin: 0 0.25rem;
        }
        
        .alert-cta-text {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 1rem 0 2rem;
            color: var(--text-color);
            font-size: 0.95rem;
            font-weight: 500;
        }
        .alert-cta-text .target-icon {
            font-size: 1.1rem;
            margin-right: 0.5rem;
            color: #ff9800; /* Target icon color */
        }


        .alert-cta-btn {
            width: 85%; /* Slightly narrower button */
            padding: 0.9rem 0;
            background: linear-gradient(to bottom, #4497e6, #2d70c4); /* Changed to blue to match the button in the image */
            color: white;
            border: 3px solid #79b0f0; /* Outer blue border */
            border-radius: 0.75rem;
            font-size: 1.15rem;
            font-weight: 800;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: background 0.3s ease, transform 0.1s ease;
            margin: 0 auto;
            display: block;
        }
        .alert-cta-btn:hover {
            background: linear-gradient(to bottom, #5ba6f3, #4382d5);
            transform: scale(1.02);
        }
    `;

    // Only render the component if isOpen is true
    if (!isOpen) {
        return (
            <div >
                <style dangerouslySetInnerHTML={{ __html: alertStyles }} />
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
                        ❌
                    </button>

                    {/* Header: IMPORTANT NOTICE */}
                    <div className="alert-header">
                        <span role="img" aria-label="alert">🚨</span>
                        <span role="img" aria-label="pin" style={{ margin: '0 0.5rem' }}>📌</span>
                        IMPORTANT NOTICE
                        <span role="img" aria-label="alert" style={{ margin: '0 0.5rem' }}>🚨</span>
                        
                    </div>

                    {/* Content Details */}
                    <div className="alert-content">

                        {/* Welcome Text */}
                        <p>
                            <span className="icon">📍</span>
                            <span>welcome to <span className="alert-bold-text">Realstatepropertyinvestment</span></span>
                        </p>

                        {/* Join Group Text */}
                        <p>
                            <span className="icon">📍</span>
                            <span>join our Telegram group for Amazing offers <span role="img" aria-label="smile">😊</span></span>
                        </p>
                        
                        {/* Founded */}
                        <div className="alert-founded">
                            Founded : <span className="alert-bold-text">2022</span>
                        </div>
                        
                        {/* Instant Deposit Payment */}
                        <div className="alert-instant-text">
                            <span className="icon">📍</span>
                            instant deposit payment
                        </div>

                        {/* Separator Line */}
                        <div className="alert-separator-section">
                            <div className="alert-line">
                                <span className="cross-icon">❌</span>
                                <hr style={{  border: "none",           /* remove default styling */
  borderTop:" 2px solid blue", /* 2-pixel solid blue line */
  margin: "10px 0",         }}/>
                                <span className="cross-icon">❌</span>
                            </div>
                        </div>

                        {/* Instant Withdrawal Payment */}
                        <div className="alert-instant-text" style={{marginBottom: '1rem'}}>
                            <span className="icon">📍</span>
                            instant withdrawal payment
                        </div>
                        
                        {/* CTA Text */}
                        <div className="alert-cta-text">
                           
                            <span>🎯start earning today and enjoy exclusive early access benefits</span>
                        </div>
                    </div>

                    {/* Join Telegram Button */}
                    <div>
                        <button
                            // Use the dynamically fetched groupLink
                            onClick={() => window.open(groupLink || "https://t.me/", "_blank")}
                            className="alert-cta-btn"
                        >
                            Join telegram
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PopupCard;