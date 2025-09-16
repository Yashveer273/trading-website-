
import React from "react";

import { motion } from "framer-motion";
import "./VIP1VivoY100.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function OrderDetails() {

const navigate = useNavigate();
  
  const order = {
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
  };

  return (
    <div className="order-details-page">
      {/* Header */}
      <header className="details-header">
        
        <button className="back-btnR" onClick={() => navigate(-1)}>
                  <ArrowLeft color="black"/>
                </button>
        <h1>{order.title}</h1>
      </header>

      {/* Card */}
      <motion.div
        className="details-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="details-info">
          <p><strong>Price:</strong> {order.price}</p>
          <p><strong>Revenue:</strong> {order.revenue}</p>
          <p><strong>Buy Share:</strong> {order.buyShare}</p>
          <p><strong>Generated Income:</strong> {order.generatedIncome}</p>
          <p><strong>Estimate Income:</strong> {order.estimateIncome}</p>
        </div>
      </motion.div>

      {/* Settlement Records */}
      <motion.div
        className="settlement-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{"background-color": "#ffffff"}}> 
        <h2>Settlement Records</h2>
        <ul>
          {order.settlements.map((s, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <span>{s.date}</span>
              <span>{s.amount}</span>
            </motion.li>
          ))}
        </ul>

        <div className="total-footer">
          <p><strong>Total Income:</strong> {order.generatedIncome}</p>
          <button className="finish-btn" style={{"background-color": "#341539"}}>Finish</button>
          
        </div>
      </motion.div>
    </div>
  );
}
