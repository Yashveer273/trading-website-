
import React from "react";
import { useNavigate } from "react-router-dom";
import "./VIP.css";
import { ArrowLeft } from "lucide-react";

export default function VIP() {
  const navigate = useNavigate();

  const levels = [
    { id: "V₀", amount: 0, className: "badge-v0" },
    { id: "V₁", amount: 280, className: "badge-v1" },
    { id: "V₂", amount: 2840, className: "badge-v2" },
    { id: "V₃", amount: 8840, className: "badge-v3" },
    { id: "V₄", amount: 19440, className: "badge-v4" },
    { id: "V₅", amount: 34440, className: "badge-v5" },
    { id: "V₆", amount: 64440, className: "badge-v6" },
    { id: "V₇", amount: 144400, className: "badge-v7" },
    { id: "V₈", amount: 180000, className: "badge-v8" },
  ];

  return (
    <div className="vip-page">
      {/* Header */}
      <div className="vip-header">
        <button className="back-btnR" onClick={() => navigate(-1)}>
                  <ArrowLeft color="white"/>
                </button>
        <h1 className="vip-title">Vip Level</h1>
      </div>

      {/* VIP Cards */}
      <div className="vip-cards">
        {levels.map((level, idx) => (
          <div key={idx} className="vip-card">
            <div className={`vip-badge ${level.className}`}>{level.id}</div>
            <p>
              His VIP level requires inviting{" "}
              <span className="highlight">0 people</span>, with a total
              investment of{" "}
              <span className="highlight">
                ₹{level.amount.toLocaleString()}.00
              </span>.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}