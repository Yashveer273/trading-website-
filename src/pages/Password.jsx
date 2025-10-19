import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Password.css";
import { API_BASE_URL, SECRET_KEY, sendOtp } from "../api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

function Password() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNew, setShowNew] = useState(false);

  // Store OTP in a state variable
  const [generatedOtp, setGeneratedOtp] = useState(0);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter phone number");

    try {
      const res = await sendOtp(phone);
      
      const data = await res.json();
console.log(data.data)
   if (data.success) {
         setOtpSent(true);
         setGeneratedOtp(data?.data?.otp|| "123456"); // store OTP from API response
         alert("OTP sent successfully!");
       } else {
         alert(data?.data?.data?.message[0] || "Failed to send OTP");
       }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Step 2: Verify OTP (match with generatedOtp)
  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");
console.log(generatedOtp)
    if (otp == generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified! You can now set new password.");
    } else {
      alert("Invalid OTP");
    }
  };

  // Step 3: Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return alert("Enter new password");

    try {

      const res = await fetch(`${API_BASE_URL}api/users/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "password", confirmPassword:newPassword }),
        
      });
      const data = await res.json();

      if (data.token && data.user) {

        // Cookies.remove("tredingWeb");
        //             Cookies.remove("tredingWebUser");
        //             localStorage.removeItem("userData");
        //             navigate("/login");
      

        //   try {
        //       const response = await loginUser(credentials);
        
        //       if (response.token && response.user) {
        //         // ✅ Encrypt user info
                const encryptedUser = CryptoJS.AES.encrypt(
                  JSON.stringify(data.user),
                  SECRET_KEY
                ).toString();
        
        //        // ✅ Store cookies globally (fixes redirect issue)
        Cookies.set("tredingWeb", data.token, { expires: 7, path: "/" });
        Cookies.set("tredingWebUser", encryptedUser, { expires: 7, path: "/" });
        
        //         // ✅ Save in localStorage
                localStorage.setItem("userData", JSON.stringify(data.user));
        
                alert(data.message || "Login successful");
        
        //         // ✅ Wait a bit before navigating (ensures cookie save)
                setTimeout(() => {
                  navigate("/home");
                }, 200);
              
        //     } catch (err) {
        //       alert(err.response?.data?.message || "Login failed");
        //     }
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password");
    }
  };

  return (
    <div className="">
      {/* <div className="password-header">
        <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="Black" />
        </button>
        <h2>Forget Password</h2>
      </div> */}

      <form className="password-card" onSubmit={handleSubmit}>
        {!otpSent && (
          <>
            <label className="input-label">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="password-input"
            />
            <button type="button" className="update-btn" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        )}

        {otpSent && !otpVerified && (
          <>
            <label className="input-label">Enter OTP</label>
            <input
              type="tel"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="password-input"
            />
            <button type="button" className="update-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {otpVerified && (
          <>
            <label className="input-label">New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="password-input"
              />
              <span className="toggle-visibility" onClick={() => setShowNew(!showNew)}></span>
            </div>
            <button type="submit" className="update-btn">
              Update Password
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Password;
