import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Password.css";
import { ArrowLeft } from "lucide-react";

function Password() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password updated successfully!");
  };

  return (
    <div className="password-container">
      {/* Header */}
      <div className="password-header">
       <button className="back-btnR" onClick={() => navigate(-1)}>
                  <ArrowLeft color="Black"/>
                </button>
        <h2>Update Password</h2>
      </div>

      {/* Form */}
      <form className="password-card" onSubmit={handleSubmit}>
        {/* Old Password */}
        <label className="input-label">Old Password</label>
        <div className="password-input-wrapper">
          <input
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Please enter password"
            className="password-input"
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowOld(!showOld)}
          >
            
          </span>
        </div>

        {/* New Password */}
        <label className="input-label">New Password</label>
        <div className="password-input-wrapper">
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Please enter new password"
            className="password-input"
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowNew(!showNew)}
          >
           
          </span>
        </div>

        {/* Submit Button */}
        <button type="submit" className="update-btn">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Password;