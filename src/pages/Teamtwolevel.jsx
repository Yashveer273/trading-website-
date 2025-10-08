import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Teamtwolevel.css";
import { getTeamLevel } from "../api"; // your API function

const TeamTwoLevel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, level } = location.state || {}; // get state data

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (!userid || !level) return;

    const fetchTeam = async () => {
      const res = await getTeamLevel(userid, level);
      if (res.success && res.team) {
        // Flatten ids and attach status based on totalCommission
        const members = res.team.flatMap((t) =>
          t.ids.map((id) => ({
            id: id.phone,
            date: id.date || "", // or any placeholder if date not available
            status: t.totalCommission > 0 ? "Active" : "Not Active",
          }))
        );
        setTeamMembers(members);
      }
    };

    fetchTeam();
  }, [userid, level]);

  return (
    <div className="teamtwo-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Team {level} Members</h2>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/teams")}>Teams</button>
          <button onClick={() => navigate("/account")}>Account</button>
        </div>
      </nav>

      {/* Header */}
      <header className="team-header">
        <h3>
          Referral (Valid/Total):{" "}
          <span>
            {teamMembers.filter((m) => m.status === "Active").length}/
            {teamMembers.length}
          </span>
        </h3>
      </header>

      {/* Members List */}
      <section className="members-section">
        <h2>Team {level} Members List</h2>
        <div className="members-list">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className={`member-card ${
                member.status === "Active" ? "active" : "inactive"
              }`}
            >
              <div className="member-info">
                <p className="member-id">{member.id}</p>
                <p className="member-date">{member.date}</p>
              </div>
              <div
                className={`status-box ${
                  member.status === "Active" ? "green" : "red"
                }`}
              >
                {member.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Vivo Trading Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamTwoLevel;
