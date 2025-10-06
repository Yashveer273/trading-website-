import React, { useState, useEffect } from "react";
import { Smile, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import "./pay.css"; // 👈 import external CSS
import {  QRrandom, RechargeBalence, SECRET_KEY } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import Cookies from "js-cookie";
const encryptedUser = Cookies.get("tredingWebUser");
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

// const SubmitPayment = async (payload) => {
//   if (payload.utr.length < 5 ) {
//     throw new Error("UTR must be at least 5 characters long.");
//   }

//   try {
//     const res = await BuyProduct(payload);

//     if (!res.status ) {
//       throw new Error( "Payment request failed");
//     }

//     return {
//       success: true,
//     };
//   } catch (err) {
//     const status = err.response.status;
//     if(status===409){
//  throw new Error( "This is one time buy item & you have already buy this item");
//     }else{
//     throw new Error(err.message || "Network error");}
//   }
// };

const Pay = () => {  
  const location = useLocation();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [qrImageName, setQrImageName] = useState("");
  const [utr, setUtr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price, setprice] = useState(location.state ?? 0);

  const [message, setMessage] = useState({ text: "", type: "" });

  // const product = location.state;
  
  const navigate = useNavigate();
  const fetchQRCode = async () => {
    setIsLoading(true);
    setMessage({ text: "Fetching latest QR code...", type: "info" });
    try {
      const data = await QRCode();
      setQrCodeUrl(data.url);
      setQrImageName(data.filename);
      setMessage({
        text: "QR Code loaded. Please complete payment.",
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
  const getUserData = () => {
    if (encryptedUser) {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decrypted);
      if (user?._id == null) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    getUserData();
    fetchQRCode();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!utr.trim() || !qrImageName) {
  //     setMessage({
  //       text: "Please enter your UTR and ensure QR code is loaded.",
  //       type: "error",
  //     });
  //     return;
  //   }

  //   const payload = {
  //     productId: product._id,
  //     amount: product.price,
  //     utr: utr.trim(),
  //     qrImageName,
  //     userId:user?._id,
  //     purchaseType:product.purchaseType
  //   };
  //   setIsLoading(true);
  //   setMessage({ text: "Submitting UTR for verification...", type: "info" });
  //   try {
  //     const data = await SubmitPayment(payload);

  //     if (data.success) {
  //       setMessage({
  //         text: "Payment submitted successfully! Awaiting approval.",
  //         type: "success",
  //       });
  //       setUtr("");
  //          setTimeout(() => {
  //         navigate(-1);
  //       }, 1000);
  //     }

  //   } catch (error) {

  //     setMessage({
  //       text: `Submission failed: ${error.message || "Server error."}`,
  //       type: "error",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
      e.preventDefault();

    setIsLoading(true);
    setMessage({ text: "Submitting UTR for verification...", type: "info" });
    try {
      const payload = { userId: user?._id,amount: price, utr, qrImageName };
      const res = await RechargeBalence(payload);

      if (!res.status) {
        throw new Error("Payment request failed");
      }
else{
 setMessage({
        text: "Payment submitted successfully! Awaiting approval.",
        type: "success",
      });
      setUtr("");
      setTimeout(() => {
        navigate(-1);
      }, 1000); 
}
      
    } catch (error) {
      setMessage({
        text: `Submission failed: ${error.message || "Server error."}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
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
        <button
          className="back-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          {" "}
          Back
        </button>
      </div>
      <div className="pay-card">
        <header className="pay-header">
          <h1> ₹{price}</h1>
        </header>

        <section className="qr-section">
          <h2>Use Mobile Scan code to pay</h2>
          <p>Or take screenshot and scan in your payment app</p>
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
          <p className="qr-warning">
            ⚠️ Do not use the same QR code multiple times
            <h4>userId:= {user?._id}</h4>
          </p>
        </section>

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
