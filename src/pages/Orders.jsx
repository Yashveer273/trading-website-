import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import "./Orders.css";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { getUserInfo, SECRET_KEY, sendClaim } from "../api";

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null); 
  const [timer, setTimer] = useState(0); // For countdown updates
  const navigate = useNavigate();

  

  const fetchUser = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    if (!encryptedUser) return navigate("/login");

    const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
    let Data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setUserData(Data);
    if (!Data?._id) return navigate("/login");

    try {
      const res = await getUserInfo(Data._id);
   const userPurchases = (res?.data?.users?.purchases || []).slice().reverse();
      setOrders(userPurchases);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
  fetchUser()
  }, []);

  // Refresh every second for countdown
  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.cycleType?.toLowerCase() === filter);

  const renderTimeLeft = (order, i) => {
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    const startTime = new Date(order.createdAt).getTime() + i * (order.cycleType === "day" ? msPerDay : 0);
    let leftTime = 0;

    if (order.cycleType === "hour") {
      leftTime = (new Date(order.createdAt).getTime() + (i + 1) * 60 * 60 * 1000) - now;
      if (leftTime <= 0) return "Ready to Claim";
    } else {
      const endTime = startTime + msPerDay;
      if (now >= endTime) return "Ready to Claim";
      if (now >= startTime && now < endTime) leftTime = endTime - now;
      else if (now < startTime) return `${Math.ceil((startTime - now)/msPerDay)} day(s) left`;
    }

    const totalSeconds = Math.floor(leftTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

const handleClaim = async (productId, cycleIndex, claimAmount,isCycleComplete) => {
  if (!UserData?._id) return;

  try {
    const res = await sendClaim(UserData._id, productId, cycleIndex, claimAmount ,isCycleComplete);

    if (res.data.success) {
      setClaimStatus({ type: "success", message: `Claimed ₹${claimAmount} successfully!` });

      // Update orders
      setOrders((prevOrders) =>
        prevOrders.map((p) => {
          if (p._id === productId) {
            const newClaimed = [...(p.claimedCycles || []), cycleIndex];
            return { ...p, claimedCycles: newClaimed };
          }
          return p;
        })
      );

      // Update modalOrder if it's open
      setModalOrder((prev) => {
        if (prev && prev.productId === productId) {
          const newClaimed = [...(prev.claimedCycles || []), cycleIndex];
          return { ...prev, claimedCycles: newClaimed };
        }
        return prev;
      });
  fetchUser()
    } else {
      setClaimStatus({ type: "fail", message: res.data.message || "Claim failed!" });
    }

    setTimeout(() => setClaimStatus(null), 2000);
  } catch (err) {
    console.error(err);
    setClaimStatus({ type: "fail", message: "Claim failed!" });
    setTimeout(() => setClaimStatus(null), 2000);
  }
};


  return (
    <div className="orders-page">
      <div className="header2">
              <button className="back-btnR" onClick={() => navigate(-1)}>
                <ArrowLeft color="black" />
              </button>
              <h1 className="header-title">My Order</h1>
              <div className="spacer"></div>
            </div>

      <div className="tabs">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "day" ? "active" : ""} onClick={() => setFilter("day")}>Day</button>
        <button className={filter === "hour" ? "active" : ""} onClick={() => setFilter("hour")}>Hour</button>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          filteredOrders.map((order, index) => {
            const totalCycles = Number(order.cycleValue);
            const elapsed = order.cycleType === "hour"
              ? Math.floor((Date.now() - new Date(order.createdAt)) / (1000 * 60 * 60))
              : Math.floor((Date.now() - new Date(order.createdAt)) / (1000 * 60 * 60 * 24));
            const claimableCount = Math.min(elapsed, totalCycles);

            return (
              <motion.div key={index} className="order-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="order-title">
                  <b>{order.productName}</b>
                  <button className="claim-btn" onClick={() => setModalOrder(order)}>
                    Claim Record ({claimableCount}/{totalCycles})
                  </button>
                </div>
<button
  className="claim-btn"
  style={{
    backgroundColor:
      order.claim === "waiting" && claimableCount === totalCycles
        ? "black"
        : "gray",
    color: "white",
    cursor:
      order.claim === "waiting" && claimableCount === totalCycles
        ? "pointer"
        : "not-allowed",
  }}
  disabled={!(order.claim === "waiting" && claimableCount === totalCycles)}
  onClick={() => handleClaim(order.productId, -1, 0, true)}
>
  {order.claim === "claimed" ? (
    <>Claimed ✅</>
  ) : order.claim === "waiting" && claimableCount === totalCycles ? (
    <>Claim ₹{(order.cycleValue * order.dailyIncome * order.quantity).toFixed(2)} ({claimableCount}/{totalCycles})</>
  ) : (
    <>Claim Locked ₹{(order.cycleValue * order.dailyIncome * order.quantity).toFixed(2)}({claimableCount}/{totalCycles})</>
  )}
</button>

                <div className="order-body">
                  <div className="order-row"><span className="order-label">Buy Share</span><span className="order-value">{order.quantity}</span></div>
                  <div className="order-row"><span className="order-label">Cycle</span><span className="order-value">{order.cycleValue} {order.cycleType}</span></div>
                  <div className="order-row"><span className="order-label">{order.cycleType === "hour" ? "Hourly Income" : "Daily Income"}</span><span className="order-value">₹{order.dailyIncome}</span></div>
                  <div className="order-row"><span className="order-label">Item Price</span><span className="order-value">₹{(order.TotalAmount/order.quantity).toFixed(2)}</span></div>
                  <div className="order-row"><span className="order-label">Total Amount</span><span className="order-value">₹{order.TotalAmount}</span></div>
                </div>
               
              </motion.div>
            );
          })
        )}
      </div>
{/* Claim Status Popup */}
{claimStatus && (
  <motion.div 
    className={`claim-status ${claimStatus.type}`} 
    initial={{ opacity: 0, y: -20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }}
  >
    {claimStatus.message}
  </motion.div>
)}

      {modalOrder && (
        <div className="modal-overlay" onClick={() => setModalOrder(null)}>
          <motion.div className="claim-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modalOrder.productName} - Claim List</h3>
            <ul className="claim-list">
              {Array.from({ length: Number(modalOrder.cycleValue) }).map((_, i) => {
                const incomePerCycle = modalOrder.dailyIncome * modalOrder.quantity;
                const isAvailable = (modalOrder.claimedCycles || []).includes(i) ? false : (renderTimeLeft(modalOrder, i) === "Ready to Claim");

                return (
                  <li key={i} className={`claim-item ${isAvailable ? "available" : "locked"}`}>
                    <span>{modalOrder.cycleType === "hour" ? `Hour ${i+1}` : `Day ${i+1}`}</span>
                    <span>₹{incomePerCycle.toFixed(2)} - {renderTimeLeft(modalOrder, i)}</span>
                    {isAvailable && <button className="claim-now-btn" onClick={() => handleClaim(modalOrder.productId, i, incomePerCycle,false)}>Claim Now</button>}
                  </li>
                );
              })}
            </ul>
            <button className="close-modal" onClick={() => setModalOrder(null)}><X size={18} color="white" /></button>
          </motion.div>
        </div>
      )}
    
    </div>
  );
}
