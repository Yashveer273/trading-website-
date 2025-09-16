import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mail.css";
import { ArrowLeft } from "lucide-react";

export default function Mail() {
  const navigate = useNavigate();

  return (
    <div className="mail-page">
      {/* Header */}
      <div className="header">
         <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="white"/>
        </button>
        <h1>Mail</h1>
      </div>

      {/* Mail Content */}
      <div className="mail-container">
        <p className="mail-text animate-fadeIn">No mail yet</p>
      </div>
    </div>
  );
}