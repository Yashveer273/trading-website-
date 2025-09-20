import React, { useState } from "react";
import {
  Home,
  DollarSign,
  MessageCircle,
  User,
  Gift,
  Users,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyLink = () => {
    const link = "https://m.india1188.com/?invitation_code=390EA";
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Mail", icon: <MessageCircle size={22} />, path: "/mail" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];

  const questRewards = [
    { id: 1, text: "Inviting activation of 20", reward: "₹ 1600.00", progress: { current: 4, total: 20 } },
    { id: 2, text: "Inviting activation of 70", reward: "₹ 5000.00", progress: { current: 4, total: 70 } },
    { id: 3, text: "Inviting activation of 200", reward: "₹ 13000.00", progress: { current: 4, total: 200 } },
    { id: 4, text: "Inviting activation of 500", reward: "₹ 50000.00", progress: { current: 4, total: 500 } },
    { id: 5, text: "Inviting activation of 2000", reward: "₹ 180000.00", progress: { current: 4, total: 2000 } },
    { id: 6, text: "Inviting activation of 5000", reward: "₹ 500000.00", progress: { current: 4, total: 5000 } },
    { id: 7, text: "Inviting activation of 10000", reward: "₹ 1000000.00", progress: { current: 4, total: 10000 } },
  ];

  return (
    <>
      <div>
        <div className="page-container">
          <div className="topbar1">
            <div className="logo-circle1">
              <img
              src="https://latestlogo.com/wp-content/uploads/2024/02/vivo.png"
              alt="Vivo Logo"
              className="logo-img"
               />
            </div>
          </div>

          {/* --- Wallet Card --- */}
          <div className="card1 wallet-card">
            <h3>Main Wallet</h3>
            <div className="wallet-info">
              <div>
                <p className="label">Your Balance</p>
                <p className="balance">
                  <span className="rupee">₹</span>9821.14
                </p>
              </div>
              <Gift size={80} className="gift-icon" />
            </div>
            <div className="button-row">
              <button onClick={() => navigate("/recharge")} className="card-button">Recharge</button>
              <button onClick={() => navigate("/withdraw")} className="card-button">Withdraw</button>
            </div>
          </div>

          {/* --- Icon Grid --- */}
          <div className="icon-grid">
            <div className="grid-item" onClick={() => navigate("/teams")}>
              <Users size={40} className="grid-icon" />
              <span>Teams</span>
            </div>
            <div className="grid-item" onClick={() => navigate("/mail")}>
              <MessageSquare size={40} className="grid-icon" />
              <span>Message</span>
            </div>
            <div className="grid-item" onClick={() => navigate("/orders")}>
              <ShoppingBag size={40} className="grid-icon" />
              <span>Orders</span>
            </div>
          </div>

          {/* --- Invitation Card --- */}
          <div className="card1 invitation-card">
            <div className="card-header">
              <h3>Invitation</h3>
              <button onClick={() => navigate("/teams")} className="link-button">
                <div className="card-header">
                  <div>My team</div> <ArrowRight />
                </div>
              </button>
            </div>
            <div className="invite-info">
              
              <div className="profile-img">
                <img
                  src="https://img.freepik.com/free-vector/contact-concept-landing-page_52683-21298.jpg?semt=ais_hybrid&w=740" 
                  alt="Invitation Icon"
                />
              </div>
              <div>
                <p className="label">Promotional Links</p>
                <p className="link-text">
                  https://m.india1188.com/?invitation_code=390EA
                </p>
              </div>
            </div>
            <button onClick={copyLink} className="full-button copy-button">
              {copied ? "Copied!" : "Copy Invitation Link"}
            </button>
          </div>

          {/* --- Lucky Draw --- */}
          <div className="card1 lucky-draw-card">
            <h3>Lucky Draw</h3>
            <p className="label">The lucky wheel keeps spinning with great gifts</p>
            <button onClick={() => navigate("/luckydraw")} className="full-button go-button">
              Go
            </button>
          </div>

          {/* --- Quest Rewards --- */}
          <div className="card1 quest-rewards-card">
            <h3>Quest Rewards</h3>
            {questRewards.map((quest) => (
              <div key={quest.id} className="quest-item">
                <div className="quest-icon-container">
                  <img
                    src="https://img.freepik.com/free-vector/young-couple-using-tablet_603843-987.jpg?semt=ais_hybrid&w=740&q=80" 
                    alt="Quest Icon"
                  />
                </div>
                <div className="quest-content">
                  <p className="quest-text">{quest.text}</p>
                  <div className="quest-progress-bar-container">
                    <div
                      className="quest-progress-bar-fill"
                      style={{
                        width: `${(quest.progress.current / quest.progress.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="quest-reward-info">
                  <p className="quest-reward">{quest.reward}</p>
                  <p className="quest-progress">
                    {quest.progress.current}/{quest.progress.total}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: "100px" }}></div>
        </div>
      </div>

      {/* --- Bottom Navigation --- */}
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`nav-item ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.name);
              navigate(tab.path);
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default HomePage;