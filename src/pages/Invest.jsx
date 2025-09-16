import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Invest.css";
import { ArrowLeft } from "lucide-react";

const Invest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stable");

  const allPlans = {
    stable: [
      {
        id: "vip1vivoy100",
        img: "https://hamariweb.com/mobiles/LargeImages/6496_01.jpg",
        price: "₹280.00",
        revenue: "42 Days",
        daily: "₹229.6",
        total: "₹9643.2",
        url: "https://www.vivo.com/in/products/y100",
      },
      {
        id: "vip1vivoy02t",
        img: "https://tse1.mm.bing.net/th/id/OIP.n9jd7Sqi6Zd2lcvmiKg5ZQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: "₹2840.00",
        revenue: "42 Days",
        daily: "₹2357.2",
        total: "₹9002.4",
        url: "https://www.vivo.com/in/products/y02t",
      },
      {
        id: "vip1welfare",
        img: "https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1661953062718/d01966f5058d31376339106458fadac2.png",
        price: "₹8840.00",
        revenue: "42 Days",
        daily: "₹7425.6",
        total: "₹311875.2",
        url: "https://www.vivo.com/in/products/y16",
      },
      {
        id: "vip4",
        img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1692691698575/c0f180bba865685a87025f8ff514ab13.png",
        price: "₹19440.00",
        revenue: "42 Days",
        daily: "₹16524",
        total: "₹694008",
        url: "https://www.vivo.com/in/products/v29e",
      },
    ],
    daily: [
      {
        id: "daily1",
        img: "https://tse2.mm.bing.net/th/id/OIP.TAUDPB-olrcDl7BIsgNgBAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: "₹34440.00",
        revenue: "42 Days",
        daily: "₹29618.4",
        total: "₹1243972.8",
        url: "https://www.vivo.com/in/products/v30",
      },
      {
        id: "daily2",
        img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1702983367485/d0467cb4099841dae725d707fce48b51.png",
        price: "₹64440.00",
        revenue: "42 Days",
        daily: "₹56062.8",
        total: "₹2354637.6",
        url: "https://www.vivo.com/in/products/x100",
      },
    ],
    welfare: [
      {
        id: "welfare1",
        img: "https://tse2.mm.bing.net/th/id/OIP.Qlf_F8asPv5GssddWns4xAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: "₹144400.00",
        revenue: "42 Days",
        daily: "₹127072",
        total: "₹5337024",
        url: "https://www.vivo.com/in/products/x100pro",
      },
    ],
  };

  return (
    <div className="invest-container">
      {/* Header */}
      <div className="invest-header">
         <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="white"/>
        </button>
        <h3>Invest</h3>
      </div>

      {/* Tabs */}
      <div className="invest-tabs">
        <button
          className={`tab ${activeTab === "stable" ? "active" : ""}`}
          onClick={() => setActiveTab("stable")}
        >
          Stable Fund
        </button>
        <button
          className={`tab ${activeTab === "daily" ? "active" : ""}`}
          onClick={() => setActiveTab("daily")}
        >
          Daily Fund
        </button>
        <button
          className={`tab ${activeTab === "welfare" ? "active" : ""}`}
          onClick={() => setActiveTab("welfare")}
        >
          Welfare Fund
        </button>
      </div>

      {/* Plans */}
      <div className="plans-list">
        {allPlans[activeTab].slice(0, 4).map((plan) => (
          <div className="plan-card" key={plan.id}>
            <img src={plan.img} alt="plan" className="plan-img" />
            <div className="plan-info">
              <h4>Buy & Upgrade</h4>
              <p>Each Price: {plan.price}</p>
              <div className="plan-stats">
                <span>Revenue {plan.revenue}</span>
                <span>Daily: {plan.daily}</span>
                <span>Total: {plan.total}</span>
              </div>
            </div>
            <button
              className="buy-btn"
              onClick={() => window.open(plan.url, "_blank")}
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invest;