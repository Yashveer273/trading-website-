import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
import { Users,Copy, Mail, Package, Home as HomeIcon, DollarSign, User, ArrowRight } from "lucide-react";
const Home = () => {
  const navigate = useNavigate();
const [copied, setCopied] = useState(false);
   const copyLink = () => {
    const link = "https://m.india1188.com/?invitation_code-390EA";
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section">
        <h1 className="fade-in">Welcome to Vivo Trading Platform</h1>
        <p className="fade-in delay">
          Building wealth together – track progress, manage your wallet, and grow
          with confidence.
        </p>
      </header>

      {/* Wallet Section */}
      <section className="wallet-card slide-up">
        <h3>Main Wallet</h3>
        <p>Your Balance</p>
        <h2>₹ 9821.14</h2>
        <div className="btn-group">
          <button onClick={() => navigate("/recharge")}>Recharge</button>
          <button onClick={() => navigate("/withdraw")}>Withdraw</button>
          <button onClick={() => navigate("/account")}>Account</button>
        </div>
      </section>

      {/* Features */}
      <section className="features-section slide-left">
        <div onClick={() => navigate("/teams")} className="feature-box">
          <Users size={40}/>
          <h2>Teams</h2>
          <p>Build and manage your trading network.</p>
        </div>
        <div onClick={() => navigate("/mail")} className="feature-box">
          <Mail size={40}/>
          <h2>Mail</h2>
          <p>Stay connected with real-time updates.</p>
        </div>
        <div onClick={() => navigate("/orders")} className="feature-box">
         <Package size={40}/> 
         <h2>Orders</h2>
          <p>Track your active and past orders easily.</p>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="invitation-card slide-right">
      <h3>Invitation</h3>

      <div className="invite-grid">
        <Link to="/teams"  className="team-link">
          <Users size={18} /> My Team <ArrowRight/>
        </Link>

        <div className="link-wrapper">
          <span className="link">
            https://m.india1188.com/?invitation_code-390EA
          </span>
          <button onClick={copyLink} className="copy-btn">
            {copied ? "Copied" : <Copy size={16} />}
          </button>
        </div>
      </div>
    </section>

      {/* Lucky Draw */}
      <section className="lucky-draw slide-up">
        <h3>Lucky Draw 🎉</h3>
        <p>The lucky wheel keeps spinning with great gifts!</p>
        <button onClick={() => navigate("/luckydraw")}>Try Your Luck</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Vivo Trading Platform. All rights reserved.</p>
      </footer>

      {/* Bottom Navbar */}
      <nav className="bottom-navbar">
        <button onClick={() => navigate("/home")}>
         <HomeIcon/>
          <p>Home</p>
        </button>
        <button onClick={() => navigate("/invest")}>
          <DollarSign/>
          <p>Invest</p>
        </button>
        <button onClick={() => navigate("/teams")}>
          <Users/>
          <p>Teams</p>
        </button>
        <button onClick={() => navigate("/mail")}>
          <span> <Mail/></span>
        <p>Mail</p>
        </button>
        <button onClick={() => navigate("/account")}>
          <User/>
          <p>Account</p>
        </button>
      </nav>
    </div>
  );
};

export default Home;
