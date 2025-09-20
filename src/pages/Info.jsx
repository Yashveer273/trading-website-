import React, { useState } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
function Info() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("/vivo-logo.png");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Saved: ${nickname}, ${email}`);
  };

  return (
    <div className="info-container">
      <button className="back-btnR" onClick={() => navigate(-1)}>
                  <ArrowLeft color="black"/>
                </button>
      <header className="info-header">Settings Info</header>
     

      <form className="info-card" onSubmit={handleSubmit}>
        {/* Profile Upload */}
        <label className="profile-pic-label">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          <p className="change-text">Click to change picture</p>
          <span className="recommend-text">
            It is recommended to upload 1:1 images larger than 100px
          </span>
        </label>

        {/* Nickname */}
        <label className="input-label">NickName</label>
        <input
          type="text"
          className="info-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter nickname"
        />

        {/* Email */}
        <label className="input-label">E-mail</label>
        <input
          type="email"
          className="info-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        {/* Save Button */}
        <button type="submit" className="save-btn">
          Save Info
        </button>
      </form>
    </div>
  );
}

export default Info;