import React, { useState } from "react";
import {
 
  ChevronRight,
  User,
  Copy,
  ArrowLeft,
  AtSign,
  Phone,
  LogOut,

} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// --- Color and Style Constants ---
const YELLOW_ORANGE_GRADIENT =
  "linear-gradient(rgb(255, 201, 0), rgb(255, 153, 0))";
const BRIGHT_ORANGE = "#ff9900";
const ORANGE_SHADOW_COLOR = "rgba(255, 153, 0, 0.4)";

// Utility function for copying text using document.execCommand
const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    console.log("Text copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
  document.body.removeChild(textarea);
};

// Define all CSS styles as a single string
const STYLES = `
  :root {
    --bright-orange: ${BRIGHT_ORANGE};
    --orange-shadow: ${ORANGE_SHADOW_COLOR};
    --orange-gradient: ${YELLOW_ORANGE_GRADIENT};
  }
  
  /* Global Styles */
  .app-container {
    min-height: 100vh;
    background-color: #f9fafb;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Inter', sans-serif;
  }
  .mainContent {
    width: 100%;

    
 
  }
  .content-padding {
    position: relative;
    z-index: 10;
    padding: 1rem;
    margin-bottom: 5rem;
  }

  /* Header Styles */
  .header-bg {
    height: 10rem;
    background-size: cover;
    background-position: center;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    overflow: hidden;
  }
  .logo-wrapper {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .logo-circle {
    background-color: white;
    padding: 0.25rem;
    border-radius: 9999px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  /* Profile Header Styles */
  .profile {
    background-color: white;
    padding: 1rem;
    margin-top: -5rem;
    margin-bottom: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .user-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .user-icon-border {
    position: relative;
    padding: 0.25rem;
    border: 2px solid var(--bright-orange);
    border-radius: 9999px;
  }
  .id-text {
    color: #1f2937;
    font-weight: 600;
    font-size: 1.25rem;
  }
  .copy-btn {
    color: #9ca3af;
    transition: color 0.15s ease-in-out;
    padding: 0.25rem;
    border-radius: 9999px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .new-tag {
    position: relative;
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: rotate(2deg);
    background: var(--orange-gradient);
  }
  .new-tag-arrow {
    position: absolute;
    top: 50%;
    left: -0.5rem;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent;
    border-right-color: var(--bright-orange);
  }

  /* Balance Summary Styles */
  .balance-card {
    background-color: white;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    border-top: 4px solid var(--bright-orange);
  }
  .metrics-container {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
  .metric-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
  }
  .metric-label {
    font-size: 0.875rem;
    color: #6b7280;
  }

  /* Services List Styles */
  .services-list-container {
    margin-bottom: 2rem;
  }
  .services-heading {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    border-left: 4px solid var(--bright-orange);
    padding-left: 0.5rem;
  }
  .service-items-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Service Item Styles */
  .service-item {
    width: 100%;
    background-color: white;
    padding: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.15s ease-in-out;
    border: none;
    cursor: pointer;
  }
  .service-item:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
  .service-item-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--bright-orange);
  }
  .service-item-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .service-item-text {
    font-size: 1.125rem;
    font-weight: 500;
    color: #374151;
  }
  .chevron-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
  }

  /* Sign Out Button Styles */
  .signout-btn {
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: white;
    font-weight: 600;
    font-size: 1.125rem;
    border-radius: 0.75rem;
    margin-top: 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    background-color: var(--bright-orange); 
    box-shadow: 0 10px 15px -3px var(--orange-shadow), 0 4px 6px -4px var(--orange-shadow);
  }
  .signout-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .signout-btn:active {
    transform: scale(0.98);
  }
    /* Profile Detail Styles */
  .detail-card {
      background-color: white;
      padding: 1rem;
      border-radius: 0.75rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-top: 1rem;
  }
  .detail-item {
      display: flex;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;
  }
  .detail-item:last-child {
      border-bottom: none;
  }
  .detail-icon {
      color: var(--bright-orange);
      margin-right: 1rem;
      width: 1.5rem;
      height: 1.5rem;
  }
  .detail-label {
      font-size: 0.875rem;
      color: #6b7280;
      width: 4rem; /* Fixed width for labels */
  }
  .detail-value {
      font-size: 1rem;
      font-weight: 600;
      color: #1f2937;
      flex-grow: 1;
      text-align: right;
  }
`;

// Main App component
const Profile = ({ userInfo, accountData }) => {
     console.log(userInfo)
    const navigate=useNavigate();
  // Simple state to simulate page navigation
  const [activeScreen, setActiveScreen] = useState("home");
const accountpaloadData=[
    { label: "Total Buy", value: accountData.totalBuy },
    { label: "Product Income", value: accountData.productIncome },

    { label: "Pending Income", value: accountData.pendingIncome },
    { label: "Tasks Reward", value: accountData.tasksReward },
  ]
  const accountpaloadData2=[
    { label: "Balance", value: accountData.balance },
    { label: "Withdrawal", value: accountData.Withdrawal },

    { label: "Orders", value: accountData.ordersCount },
  
  ]
    const services = [
    { name: "Team", icon: "https://img.icons8.com/color/48/group.png", screen: "home", path: "/teams",userInfo},
    { name: "User Info", icon: "https://img.icons8.com/color/48/info.png", screen: "profit",path: "/info",userInfo },
    { name: "About", icon: "https://img.icons8.com/color/48/user.png", screen: "home",path: "/about",userInfo },
    { name: "VIP", icon: "https://img.icons8.com/color/48/vip.png", screen: "home",path: "/vip" ,userInfo},
    { name: "TradePassword", icon: "https://img.icons8.com/color/48/lock-2.png", screen: "home",path: "/tradepassword",userInfo},
    { name: "Password", icon: "https://img.icons8.com/color/48/key.png", screen: "home",path: "/password",userInfo },
  ];
  return (
    <div className="app-container">
      {/* Inject the styles into the head of the document */}
      <style>{STYLES}</style>

      <div className="mainContent">
        {activeScreen !== "profit" ? (
          <>
            <HeaderBackground />
            <div className="content-padding">
              <ProfileHeader userId={userInfo.userId} />
              <BalanceSummary accountData={accountpaloadData} />
              <BalanceSummary accountData={accountpaloadData2} />
              <ServicesList navigate={navigate}services={services} />
              <SignOutButton navigate={navigate}/>
            </div>
          </> 
        ) : (
          <ProfileDetail
            userInfo={userInfo}
            setActiveScreen={setActiveScreen}
          />
        )}
      </div>
    </div>
  );
};

// --- Sub Components ---

// Component for the background of the header area
const HeaderBackground = () => (
  <div
    className="header-bg"
    style={{
      backgroundImage: `url('https://placehold.co/400x160/a0522d/fff?text=Britannia+Background')`,
    }}
  >
    <div className="logo-wrapper">
      {/* Placeholder for Britannia logo */}
      <div className="logo-circle">
        <img
          src="https://placehold.co/40x40/dc2626/fff?text=B"
          alt="Britannia Logo"
          style={{ width: "2rem", height: "2rem", borderRadius: "9999px" }}
        />
      </div>
    </div>
  </div>
);

// Component for the profile section (ID and New tag)
const ProfileHeader = ({userId}) => {

  const displayLength = 7;
  const truncatedId =
    userId.length > displayLength
      ? userId.substring(0, displayLength) + ".."
      : userId;

  return (
    <div className="profile">
      <div className="user-icon-wrapper">
        <div className="user-icon-border">
          <User
            style={{ width: "3rem", height: "3rem", color: "#4b5563" }}
            strokeWidth={1.5}
          />
        </div>

        {/* ID Display and Copy Button */}
        <div className="user-id-text-group">
          <span className="id-text">ID: {truncatedId}</span>
          <button
            onClick={() => copyToClipboard(userId)}
            className="copy-btn"
            title="Copy User ID"
          >
            <Copy style={{ width: "1rem", height: "1rem" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the balance and income metrics
const BalanceSummary = ({ accountData }) => {
  const data = accountData;

  return (
    <div className="balance-card">
      <div className="metrics-container">
        {data.map((item, index) => (
          <div key={index} className="metric-item">
            <div className="metric-value">{item.value}</div>
            <div className="metric-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for the list of services
const ServicesList = ({ setActiveScreen,navigate,services }) => {



  return (
    <div className="services-list-container">
      <h3 className="services-heading">My Services</h3>
      <div className="service-items-wrapper">
        {services.map((service) => (
          <ServiceItem
            key={service.name}
            service={service}
            onClick={()=> {navigate(service.path,{state:service.userInfo})}}
            
          />
        ))}
      </div>
    </div>
  );
};

// Reusable component for a single service list item
const ServiceItem = ({ service, onClick }) => (
  <button onClick={onClick} className="service-item">
    <div className="service-item-content">
   
       <img className="service-item-icon" src={service.icon} alt={service.title} />
      <span className="service-item-text">{service.name}</span>
    </div>
    <ChevronRight className="chevron-icon" />
  </button>
);

// Component for the Sign Out button
const SignOutButton = (navigate) => (
  <button className="signout-btn" onClick={() => {Cookies.remove("tredingWeb");
            Cookies.remove("tredingWebUser");
            localStorage.removeItem("userData");
            navigate("/login");}}>
    <div className="signout-content">
      <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
      <span>Sign Out</span>
    </div>
  </button>

);

const ProfileDetail = ({ userInfo, setActiveScreen }) => {
  return (
    <div>
      <div className="profile-back-header">
        <button className="back-button" onClick={() => setActiveScreen("home")}>
          <ArrowLeft className="chevron-icon" style={{ color: "#1f2937" }} />
        </button>
        <h2>Profile Record</h2>
      </div>
      <div className="content-padding">
        <div className="detail-card">
          <DetailItem
            icon={AtSign}
            label="Username"
            value={userInfo.username}
          />
          <DetailItem icon={Phone} label="Number" value={userInfo.number} />
          <DetailItem
            icon={User}
            label="User ID"
            value={userInfo.userId}
            isCopyable={true}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable component for a single detail item
const DetailItem = ({ icon: Icon, label, value, isCopyable = false }) => {
  return (
    <div className="detail-item">
      <Icon className="detail-icon" />
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value}</span>
      {isCopyable && (
        <button
          onClick={() => copyToClipboard(value)}
          className="copy-btn"
          title="Copy Value"
          style={{ marginLeft: "0.5rem", color: BRIGHT_ORANGE }}
        >
          <Copy style={{ width: "1rem", height: "1rem" }} />
        </button>
      )}
    </div>
  );
};

export default Profile;
