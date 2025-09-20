import React,{useState} from "react";
import {
  Home,

  Users,
  MessageCircle,
  User,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import "./Teams.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  // Mock data for the teams
  const navigate = useNavigate();
  const teamData = [
    {
      level: 1,
      totalRecharge: "476.60",
      myCommission: "476.60",
      referral: "6/4",
      commissionRate: "0%",
      path: "/teamonelevel",
    },
    {
      level: 2,
      totalRecharge: "8.40",
      myCommission: "8.40",
      referral: "1/2",
      commissionRate: "0%",
      path: "/teamtwolevel",
    },
    {
      level: 3,
      totalRecharge: "0",
      myCommission: "0",
      referral: "3/0",
      commissionRate: "0%",
      path: "/teamthreelevel",
    },
  ];

  const styles = {
    appContainer: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "80px", // Space for the bottom nav
    },
    header: {
      width: "100%",
      background: "linear-gradient(to bottom, #ffc900, #ff9900)", // Stronger yellow to orange gradient
      paddingTop: "20px",
      paddingBottom: "34px",
      position: "relative",
      textAlign: "center",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "baseline",

      borderBottomLeftRadius: "60% 30px",
      borderBottomRightRadius: "60% 30px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      color: "#444",
      marginBottom: "20px",
      position: "relative",
      zIndex: 2,
    },
    vivoLogo: {
      width: "50px",
      height: "50px",
      backgroundColor: "white",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    bellIcon: {
      color: "#fff", // White icon for better contrast
      cursor: "pointer",
    },
    headerText: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff", // White text for better contrast
    },
    commissionRate: {
      fontSize: "15px",
      color: "#fff", // White text
    
    },
    card: {
      background: "linear-gradient(to bottom, #ffffff, #fffdf8)", // Distinct white to off-white gradient
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      margin: "15px 15px",
      padding: "20px",
      width: "90%",
      maxWidth: "450px",
      position: "relative",
      top: "-40px",
      zIndex: 2,
    },
    cardHeader: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "15px",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    teamInfo: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    teamDetail: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#555",
      marginBottom: "8px",
     width:"200px"
    },
    goldImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    rateContainer: {
      textAlign: "center",
      marginTop: "15px",
    },
    rateValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#ffc900",
    },
    rateLabel: {
      fontSize: "12px",
      color: "#666",
    },
    arrowIcon: {
      color: "#bbb",
      cursor: "pointer",
      alignSelf: "center",
    },
    coloredValue: {
      color: "#ffc900", // Yellow color for the values
      fontWeight: "bold",
    },
    bottomNav: {
      position: "fixed",
      bottom: 0,
      width: "100%",
      backgroundColor: "white",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      height: "70px",
      borderTop: "1px solid #eee",
      boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.05)",
      zIndex: 10,
    },
    navItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#888",
      fontSize: "12px",
      textDecoration: "none",
      cursor: "pointer",
    },
    activeNavItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#ff9900", // Stronger orange for active tab text and icon
      fontSize: "12px",
      fontWeight: "bold",
      position: "relative",
      padding: "10px 20px",
      borderRadius: "30px",
      background: "linear-gradient(to right, #ffeb99, #ffc900)", // Stronger yellow gradient for active tab background
      boxShadow: "0 2px 8px rgba(255, 185, 0, 0.3)",
      transform: "translateY(-10px)",
    },
    activeIcon: {
      color: "#ff9900", // Stronger orange for active icon
    },
    inactiveIcon: {
      color: "#888",
    },
  };

   const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Mail", icon: <MessageCircle size={22} />, path: "/mail" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];
 const [activeTab, setActiveTab] = useState("Teams");
  return (
    <div style={styles.appContainer}>
      {/* Top Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.vivoLogo}>
            <span style={{ fontWeight: "bold" }}>vivo</span>
          </div>
        </div>
        <div style={styles.headerText}>Team</div>
        <div style={styles.commissionRate}>Total Commission Rate: 0%</div>
      </div>

      {/* Team Cards Section */}
      {teamData.map((team, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.cardHeader}>Level {team.level} teams</div>
          <div style={styles.cardContent} onClick={() => navigate(team.path)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  ...styles.goldImage,
                  backgroundImage: "url('https://img.freepik.com/free-vector/gradient-gold-coin_78370-4508.jpg?semt=ais_incoming&w=740&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>  
              
              <div style={styles.rateContainer}>
                <div style={styles.rateValue}>{team.commissionRate}</div>
                <div style={styles.rateLabel}>Commission Rate</div>
              </div>
            </div>
            <div style={styles.teamInfo}>
              <div style={styles.teamDetail}>
                <span>Total Recharge:</span>
                <span style={styles.coloredValue}>₹ {team.totalRecharge}</span>
              </div>
              <div style={styles.teamDetail}>
                <span>My Commission:</span>
                <span style={styles.coloredValue}>₹ {team.myCommission}</span>
              </div>
              <div style={styles.teamDetail}>
                <span>Referral (Valid/Total):</span>
                <span>{team.referral}</span>
              </div>
            </div>
            <ChevronRight
              style={styles.arrowIcon}
              onClick={() => navigate(team.path)}
            />
          </div>
        </div>
      ))}

      {/* Bottom Navigation */}
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
    </div>
  );
};

export default App;
