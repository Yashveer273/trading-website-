import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Teams.css";
import { ArrowLeft } from "lucide-react";

export default function TeamPage() {
    const navigate = useNavigate();
  return (
    <div className="team-dashboard">
     
      <section className="hero">
        <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="white"/>
        </button>
        <div>
          <h1>Team Overview</h1>
        <p>
          Total Commission Rate: <span>0%</span>
        </p>
        </div>
        
      </section>

      {/* Cards Section */}
      <section className="cards-grid">
        <TeamCard
          title="Level 1 Teams"
          recharge="₹476.60"
          commission="₹476.60"
          referral="6/4"
          link="/teamonelevel"
        />
        <TeamCard
          title="Level 2 Teams"
          recharge="₹8.40"
          commission="₹8.40"
          referral="1/2"
          link="/teamtwolevel"
        />
        <TeamCard
          title="Level 3 Teams"
          recharge="₹0"
          commission="₹0"
          referral="3/0"
          link="/teamthreelevel"
        />
      </section>

      {/* Footer */}
      <footer className="footer">© 2025 Vivo Team Dashboard</footer>
    </div>
  );
}

function TeamCard({ title, recharge, commission, referral, link }) {
  return (
    <div className="team-card">
      <h3>{title}</h3>
      <div className="card-body">
        <p>
          <strong>Total Recharge:</strong> {recharge}
        </p>
        <p>
          <strong>My Commission:</strong> {commission}
        </p>
        <p>
          <strong>Referral (Valid/Total):</strong> {referral}
        </p>
      </div>

      <Link to={link} className="details-btn">
        View Details 
      </Link>
    </div>
  );
}

