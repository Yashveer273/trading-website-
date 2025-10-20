import React, { useState, useEffect, useRef } from "react";
import {
  Smile,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronLeft,
} from "lucide-react";
import "./pay.css";
import { QRrandom, RechargeBalence, SECRET_KEY } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

let user = null;

const QRCode = async () => {
  const res = await QRrandom();
  if (!res.ok) return;
  const selectedItem = await res.json();
  console.log(selectedItem);
  return {
    filename: selectedItem.filename,
    url: selectedItem.url,
  };
};

const Pay = () => {
  const location = useLocation();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrImageName, setQrImageName] = useState("");
  const [utr, setUtr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price, setprice] = useState(location.state ?? 0);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [timer, setTimer] = useState(60); // countdown (in seconds)
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // 🧩 Fetch new QR code
  const fetchQRCode = async () => {
    setIsLoading(true);
    setMessage({ text: "Fetching latest QR code...", type: "info" });
    try {
      const data = await QRCode();
      setQrCodeUrl(data.url);
      setQrImageName(data.filename);
      setMessage({
        text: "QR Code loaded. Please complete payment within 1 minute.",
        type: "info",
      });
    } catch (error) {
      setMessage({
        text: "Failed to load QR code. Please refresh.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔐 Get user data
  const getUserData = () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    if (encryptedUser) {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decrypted);
      if (!user?._id) navigate("/login");
    }
  };

  // 🚀 Initial setup
  useEffect(() => {
    getUserData();
    fetchQRCode();
    setTimer(60);
  }, []);

  // ⏱ Countdown effect
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // 🔁 When timer hits 0, fetch new QR and reset timer
  useEffect(() => {
    if (timer === 0) {
      fetchQRCode(); // fetch new QR
      setTimer(60); // restart countdown
    }
  }, [timer]);

  // Inline styles
  const containerStyle = {
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  };

  const itemStyle = {
    backgroundColor: "#F4F4F5",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #D1D1D6",
    width: "48%",
    cursor: "pointer",
  };

  const innerFlex = { display: "flex", alignItems: "center", gap: "10px" };
  const textStyle = { color: "#0F0F0F", fontSize: "12px", fontWeight: 500 };
  const imageStyle = { width: "24px", height: "auto" };

  // 🧾 Submit UTR
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "Submitting UTR for verification...", type: "info" });
    try {
      const payload = { userId: user?._id, amount: price, utr, qrImageName };
      const res = await RechargeBalence(payload);

      if (!res.status) throw new Error("Payment request failed");

      setMessage({
        text: "Payment submitted successfully! Awaiting approval.",
        type: "success",
      });
      setUtr("");
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      setMessage({
        text: `Submission failed: ${error.message || "Server error."}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Message component
  const MessageDisplay = ({ text, type }) => {
    if (!text) return null;
    let icon, cssClass;
    switch (type) {
      case "success":
        icon = <CheckCircle />;
        cssClass = "msg success";
        break;
      case "error":
        icon = <AlertTriangle />;
        cssClass = "msg error";
        break;
      default:
        icon = <Smile />;
        cssClass = "msg info";
    }
    return (
      <div className={cssClass}>
        {icon}
        <p>{text}</p>
      </div>
    );
  };

  return (
    <div className="pay-container">
      <div>
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </button>
      </div>

      <div className="pay-card">
        <header className="pay-header">
          <h1>₹{price}</h1>
        </header>

        {/* Payment Methods */}
        <div style={containerStyle}>
          <div style={itemStyle}>
            <div style={innerFlex}>
              <img
                src="https://pay.topcashwallet.com/assets/paytm-iAXkRI72.png"
                alt="Paytm"
                style={imageStyle}
              />
              <p style={textStyle}>Paytm</p>
            </div>
          </div>

          <div style={itemStyle}>
            <div style={innerFlex}>
              <img
                src="https://pay.topcashwallet.com/assets/qr_phonepe-DfcDrNXK.png"
                alt="PhonePe"
                style={imageStyle}
              />
              <p style={textStyle}>PhonePe</p>
            </div>
          </div>
        </div>

        {/* QR Section */}
        <section className="qr-section">
          <h2>Use Mobile Scan Code to Pay</h2>
          <p>
            Or take screenshot and scan in your payment app.
            <br />
            <Clock size={14} style={{ marginRight: 4 }} />
            QR will expire in <strong>{timer}s</strong>
          </p>

          <div className="qr-box">
            {isLoading && !qrCodeUrl ? (
              <div className="qr-loading">
                <Loader2 className="spin" />
                <p>Loading QR...</p>
              </div>
            ) : (
              qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/160x160/F7F7F7/333333?text=QR+Error";
                  }}
                />
              )
            )}
          </div>

          <div className="qr-warning">
            ⚠️ Do not use the same QR code multiple times
            <span>userId: {user?._id}</span>
          </div>
        </section>

        {/* UTR Section */}
        <section className="utr-section">
          <h3>Enter Ref No. and Submit</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="Enter Your UTR..."
              required
              disabled={isLoading || message.type === "success"}
            />
            <button
              type="submit"
              disabled={isLoading || !utr.trim() || message.type === "success"}
            >
              {isLoading ? <Loader2 className="spin" /> : "Click To Pay"}
            </button>
          </form>

          <MessageDisplay text={message.text} type={message.type} />
        </section>
      </div>
    </div>
  );
};

export default Pay;
