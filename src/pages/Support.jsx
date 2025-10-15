import React, { useState, useEffect, useRef } from "react";
import { User, Users, MessageSquareText } from "lucide-react";
import "./Support.css"; // 👈 external CSS file

const USERNAME_LINK = "https://t.me/wowdevil512";
const GROUP_LINK = "https://t.me/+X2XYg4dccFBkODll";
const SUPPORT_ICON_URL =
  "https://img.icons8.com/?size=100&id=RntMFwIniVlj&format=png&color=000000";

const SupportIcon = ({ className }) => {
  const [fail, setFail] = useState(false);
  return fail ? (
    <MessageSquareText className={className} />
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
        <SupportIcon className="support-icon" />
      </button>

      <div
        ref={menuRef}
        className={`support-menu ${open ? "show" : ""}`}
        role="menu"
      >
        <div className="menu-header">Choose Contact Method</div>

        <a href={USERNAME_LINK} target="_blank" rel="noreferrer">
          <User size={16} /> Chat with User
        </a>
        <a href={GROUP_LINK} target="_blank" rel="noreferrer">
          <Users size={16} /> Join Group Chat
        </a>
      </div>
    </div>
  );
};

export default Support;
