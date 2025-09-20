import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Invest.css";
import { useNavigate } from "react-router-dom";
import { Home, Users, MessageCircle, User, DollarSign } from "lucide-react";

const allPlans = {
  stable: [
    {
      id: "VIP1 VivoY100",
      img: "https://hamariweb.com/mobiles/LargeImages/6496_01.jpg",
      price: "₹280.00",
      revenue: "42 Days",
      daily: "₹229.6",
      total: "₹9643.2",
    },
    {
      id: "VIP1 VivoY02t",
      img: "https://tse1.mm.bing.net/th/id/OIP.n9jd7Sqi6Zd2lcvmiKg5ZQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      price: "₹2840.00",
      revenue: "42 Days",
      daily: "₹2357.2",
      total: "₹9002.4",
    },
    {
      id: "VIP1 Welfare",
      img: "https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1661953062718/d01966f5058d31376339106458fadac2.png",
      price: "₹8840.00",
      revenue: "42 Days",
      daily: "₹7425.6",
      total: "₹311875.2",
    },
    {
      id: "VIP1 VivoY35",
      img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1692691698575/c0f180bba865685a87025f8ff514ab13.png",
      price: "₹19440.00",
      revenue: "42 Days",
      daily: "₹16524",
      total: "₹694008",
    },
  ],
  daily: [
    {
      id: "VIP1 VivoY15",
      img: "https://tse2.mm.bing.net/th/id/OIP.TAUDPB-olrcDl7BIsgNgBAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      price: "₹34440.00",
      revenue: "42 Days",
      daily: "₹29618.4",
      total: "₹1243972.8",
    },
    {
      id: "VIP1 VivoY22",
      img: "https://in-exstatic-vivofs.vivo.com/gdHFRinHEMrj3yPG/1702983367485/d0467cb4099841dae725d707fce48b51.png",
      price: "₹64440.00",
      revenue: "42 Days",
      daily: "₹56062.8",
      total: "₹2354637.6",
    },
  ],
  welfare: [
    {
      id: "VIP1 VivoY55",
      img: "https://tse2.mm.bing.net/th/id/OIP.Qlf_F8asPv5GssddWns4xAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      price: "₹144400.00",
      revenue: "42 Days",
      daily: "₹127072",
      total: "₹5337024",
    },
  ],
};

const Invest = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Stable Fund");

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Mail", icon: <MessageCircle size={22} />, path: "/mail" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];
  const [activeTab1, setActiveTab1] = useState("invest");

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const getProducts = () => {
    switch (activeTab) {
      case "Stable Fund":
        return allPlans.stable;
      case "Daily Fund":
        return allPlans.daily;
      case "Welfare Fund":
        return allPlans.welfare;
      default:
        return allPlans.stable;
    }
  };

  return (
    <>
      <div className="invest-page-container">
        {/* Background gradients */}
        <div className="background-gradient"></div>

        {/* Header */}
        <header className="header1">
          <div className="header-content">
            <div className="header-logo">vivo</div>
            <span className="header-title">Invest</span>
          </div>
        </header>

        {/* Tabs section */}
        <div className="tabs-container">
          {["Stable Fund", "Daily Fund", "Welfare Fund"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active-tab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product list section */}
        <div className="product-list-container">
          {getProducts().map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              {/* Product Image */}
              <div className="product-image-placeholder">
                <img
                  src={product.img}
                  alt={product.id}
                  className="product-image"
                />
              </div>

              {/* Product details */}
              <div className="product-details">
                <h3 className="product-title">{product.id}</h3>
                <p className="product-price">Each Price: {product.price}</p>

                <div className="product-stats">
                  <button className="stat-button">
                    Revenue{" "}
                    <span className="stat-value">{product.revenue}</span>
                  </button>
                  <button className="stat-button">
                    Daily Earnings{" "}
                    <span className="stat-value">{product.daily}</span>
                  </button>
                  <button className="stat-button">
                    Total Revenue{" "}
                    <span className="stat-value">{product.total}</span>
                  </button>
                </div>
              </div>

              {/* Buy button */}
              <button
                className="buy-button"
                onClick={() =>
                  navigate(`/investbuy/${product.id}`, { state: product })
                }
              >
                Buy
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`nav-item ${activeTab1 === tab.name ? "active" : ""}`}
            onClick={() => {
              setActiveTab1(tab.name);
              navigate(tab.path);
            }}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Invest;