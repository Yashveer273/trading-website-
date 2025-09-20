import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mail.css";
import {
  Home,
  Users,
  MessageCircle,
  User,
  DollarSign,

} from "lucide-react";
const Mail = () => {
     const navigate = useNavigate();
   const [activeTab1, setActiveTab1] = useState("Mail");
    const tabs = [
      { name: "Home", icon: <Home size={22} />, path: "/home" },
      { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },
      { name: "Mail", icon: <MessageCircle size={22} />, path: "/mail" },
      { name: "Teams", icon: <Users size={22} />, path: "/teams" },
      { name: "Profile", icon: <User size={22} />, path: "/account" },
    ];
  const [messages] = useState([
    { id: 1, sender: "John Doe", subject: "Project Update", preview: "Hi team, just a quick update on the project status...", read: false },
    { id: 2, sender: "Alice Smith", subject: "Lunch tomorrow?", preview: "Hey, are you free for lunch tomorrow? I was thinking...", read: true },
    { id: 3, sender: "Marketing Team", subject: "New offer for you!", preview: "Check out our new exclusive offer for this week...", read: false },
    { id: 4, sender: "Bob Johnson", subject: "Feedback on the report", preview: "Thanks for the report. I have a few comments...", read: true },
    { id: 5, sender: "Team", subject: "Weekly Sync Meeting", preview: "The weekly sync meeting will be held at 10 AM on Monday...", read: true },
  ]);

  return (
    <div className="mail-container">
      {/* Header */}
      <header className="mail-header1">
        <div className="header-content1">
          <div className="vivo-logo-container">
            <h1 className="mail-title">Mail</h1>
          </div>         
        </div>
      </header>

      {/* Message List */}
      <main className="mail-main">
        {messages.map((mail) => (
          <div
            key={mail.id}
            className={`mail-item ${!mail.read ? "unread-mail" : ""}`}
          >
            <div className="mail-item-content">
              <h3 className={`sender ${mail.read ? "read-sender" : "unread-sender"}`}>
                {mail.sender}
              </h3>
              <p className={`subject ${mail.read ? "read-subject" : "unread-subject"}`}>
                {mail.subject}
              </p>
              <p className="preview">{mail.preview}</p>
            </div>
          </div>
        ))}
      </main>
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`nav-item ${activeTab1 === tab.name ? "active" : ""}`}
            onClick={() => {
              setActiveTab1(tab.name);
              navigate(tab.path);
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </div>

  );
};

export default Mail;
