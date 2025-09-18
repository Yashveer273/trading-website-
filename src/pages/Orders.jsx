import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function Orders() {
  const [filter, setFilter] = useState("all");

  const orders = [
    {
      id: "vip1vivoy100",
      title: "VIP1 Vivo Y100",
      buyShare: 1,
      days: 5,
      dailyIncome: "₹886.88",
      totalIncome: "₹4434.40",
      status: "finish",
    },
    {
      id: "VIP1VivoY100",
      title: "VIP1 Vivo Y02t",
      buyShare: 1,
      days: 6,
      dailyIncome: "₹830.79",
      totalIncome: "₹4984.74",
      status: "finish",
    },
    {
      id: "VIP1VivoY100",
      title: "VIP1 Welfare",
      buyShare: 1,
      days: 1,
      dailyIncome: "₹300.00",
      totalIncome: "₹300.00",
      status: "finish",
    },
    {
      id: "VIP1VivoY100",
      title: "Buy and Upgrade VIP1",
      buyShare: 1,
      days: 42,
      dailyIncome: "₹229.60",
      totalIncome: "₹4132.80",
      status: "normal",
    },
  ];

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const navigate = useNavigate();
  return (
    <div className="orders-page">
      {/* Header */}
      <header className="mail-header">
        <div className="header-content">
          <div className="vivo-logo-container">
            <button className="back-btnR" onClick={() => navigate(-1)}>
              <ArrowLeft color="white" />
            </button>
            <div className="vivo-logo">
              <span className="vivo-text">vivo</span>
            </div>
            <h1 className="mail-title">Mail</h1>
          </div>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="tabs">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "normal" ? "active" : ""}
          onClick={() => setFilter("normal")}
        >
          Normal
        </button>
        <button
          className={filter === "finish" ? "active" : ""}
          onClick={() => setFilter("finish")}
        >
          Finish
        </button>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            className="order-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="order-title">
              <h3>{order.title}</h3>
              <span className={`status ${order.status}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="order-body">
              <div className="order-row">
                <span className="order-label">Buy Share</span>
                <span className="order-value">{order.buyShare}</span>
              </div>
              <div className="order-row">
                <span className="order-label">Days</span>
                <span className="order-value">{order.days}.0000 Days</span>
              </div>
              <div className="order-row">
                <span className="order-label">Daily Income</span>
                <span className="order-value">{order.dailyIncome}</span>
              </div>
              <div className="order-row">
                <span className="order-label">Total Income</span>
                <span className="order-value">{order.totalIncome}</span>
              </div>
            </div>

            {/* Details Button */}
            <Link to={`/${order.id}`} state={{ order:{
    id: 1,
    title: "VIP1 Vivo Y100",
    price: "₹482.00",
    revenue: "5 Days",
    buyShare: 1,
    generatedIncome: "₹4434.40",
    estimateIncome: "₹4434.40",
    settlements: [
      { date: "2025-08-25", amount: "₹886.88" },
      { date: "2025-08-26", amount: "₹886.88" },
      { date: "2025-08-27", amount: "₹886.88" },
      { date: "2025-08-28", amount: "₹886.88" },
      { date: "2025-08-29", amount: "₹886.88" },
    ],
  } }} className="details-btn">
              Details →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
