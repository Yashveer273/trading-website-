import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, MessageSquare, } from "lucide-react";
import "./Support.css";

const USERNAME_LINK = "https://t.me/wowdevil512";
const GROUP_LINK = "https://t.me/+X2XYg4dccFBkODll";
const SUPPORT_ICON_URL =
  "https://img.icons8.com/?size=100&id=RntMFwIniVlj&format=png&color=000000";

// ✅ Telegram logo (from Icons8)
const TELEGRAM_ICON_URL =
  "https://img.icons8.com/color/48/telegram-app--v1.png";

const SupportIcon = ({ className }) => {
  const [fail, setFail] = useState(false);
  return fail ? (
    <MessageCircle className={className}  />
  ) : (
    <img
      src={SUPPORT_ICON_URL}
      alt="Support"
      onError={() => setFail(true)}
      className={className}
    />
  );
};

const Support = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (
        open &&
        !btnRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="support-container">
      <button
        ref={btnRef}
        className="support-btn"
        onClick={() => setOpen(!open)}
        title="Support Options"
      >
        <div className="support-btn-content">
          <SupportIcon className="support-icon" />
        </div>
      </button>

      <div ref={menuRef} className={`support-menu ${open ? "show" : ""}`}>
        {/* Chat Icon */}
        <a
          href={USERNAME_LINK}
          target="_blank"
          rel="noreferrer"
          title="Chat with User"
        >
          <MessageCircle size={40} style={{paddingLeft:"10px"}}/>
        </a>

        {/* Telegram Icon */}
        <a
          href={GROUP_LINK}
          target="_blank"
          rel="noreferrer"
          title="Join Telegram Group"
        >
          <img
            src={TELEGRAM_ICON_URL}
            alt="Telegram"
            className="telegram-icon"
          />
        </a>
      </div>
    </div>
  );
};

export default Support;
