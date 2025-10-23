import React, { useState, useEffect } from "react";
import { Home, Users, User, DollarSign, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {  getTeamOverview, SECRET_KEY } from "../api"; // Your API function & key
import "./Teams.css";

const Teams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Teams");
  const [teamData, setTeamData] = useState([]);

  const [totalTeams, settotalTeams] = useState(0);

const styles = {
    appContainer: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "130vh",
      maxHeight: "130vh",
      overview:"scroll",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      background: "linear-gradient(to bottom, #ffc900, #ff9900)", // Stronger yellow to orange gradient
      paddingTop: "20px",
      paddingBottom: "34px",
  alignItems: "center",
      textAlign: "center",
      display: "flex",
      justifyContent: "space-evenly",
    

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
      maxWidth: "90%",
     
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
    
   
  
  };

  useEffect(() => {
    const fetchUserTeam = async () => {
      const encryptedUser = Cookies.get("tredingWebUser");
      if (!encryptedUser) return navigate("/login");

      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      const userData = JSON.parse(decrypted);
      if (!userData?._id) return navigate("/login");
const res = await getTeamOverview(userData._id);
console.log(res.success)
const levels = [1, 2, 3];
const teamResults = levels.map((level) => {
  const teamKey = `team${level}`;
  const team =res.success? res?.overview[teamKey] || {}:{};
 settotalTeams(res?.overview?.totalTeams);
  return {
    level,
    userid:userData?._id,
    totalRecharge: team.totalRecharge || 0,
    myCommission: team.totalCommission || 0,
   
    commissionRate: team.commissionRate ? `${team.commissionRate}%` : "0%",
    path: level===1?"/teamonelevel" :level===2?"/teamtwolevel":"/teamthreelevel",
  };
});


      setTeamData(teamResults);

      
    };

    fetchUserTeam();
  }, [navigate]);

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "Invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];

  return (
    <div style={styles.appContainer}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <img src="/logo.jpg"alt="logo"style={styles.vivoLogo}/>
        </div>
        <div style={styles.headerText}>Team</div>
        <div style={styles.commissionRate}>Total Team Member: {totalTeams}</div>
      </div>

      {/* Team Cards */}
      {teamData.map((team, index) => (
        <div key={index} style={styles.card} onClick={() => navigate(team.path, {state:{userid:team.userid, level:team.level}})}>
          <div style={styles.cardHeader}>Level {team.level} Teams</div>
          <div style={styles.cardContent}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  ...styles.goldImage,
                  backgroundImage:
                    "url('https://img.freepik.com/free-vector/gradient-gold-coin_78370-4508.jpg?semt=ais_incoming&w=740&q=80')",
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
             
            </div>

            <ChevronRight style={styles.arrowIcon} />
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

export default Teams;
