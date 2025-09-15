import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Withdraw.css";
import { motion, AnimatePresence } from "framer-motion";

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showBanks, setShowBanks] = useState(false);

  const banks = [
    "State Bank of India (SBI)",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IDFC First Bank"
  ];

  const withdrawalRecords = [
    { amount: 7000, status: "RETURNED" },
    { amount: 500, status: "RETURNED" },
    { amount: 2000, status: "RETURNED" },
    { amount: 2000, status: "SUCCESS" },
    { amount: 389, status: "SUCCESS" },
    { amount: 483, status: "SUCCESS" }
  ];

  const handleApply = () => {
    if (amount < 200000 || amount > 999999) {
      alert("Amount must be between 200000 and 999999");
      return;
    }
    if (!password || !selectedBank) {
      alert("Please enter password and select bank");
      return;
    }
    navigate("/applywithdrawal");
  };

  return (
    <div className="withdraw-container">
      {/* Header */}
      <div className="withdraw-header">
        <button className="back-btn" onClick={() => navigate("/home")}>←</button>
        <h2>Withdraw</h2>
      </div>

      <div className="withdraw-box">
        <p className="balance">
          Withdrawal Balance: <strong>₹9632.14</strong>
        </p>

        {/* Amount */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Withdrawal amount 200000-999999"
          className="withdraw-input"
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Trade Password"
          className="withdraw-input"
        />

        {/* Bank Select */}
        <div className="bank-select">
          <button
            className="bank-btn"
            onClick={() => setShowBanks(!showBanks)}
          >
            {selectedBank || "Choose a Bank Card"} <span className="arrow">⌄</span>
          </button>

          <AnimatePresence>
            {showBanks && (
              <motion.ul
                className="bank-list"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {banks.map((bank, index) => (
                  <motion.li
                    key={index}
                    className="bank-item"
                    onClick={() => {
                      setSelectedBank(bank);
                      setShowBanks(false);
                    }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {bank}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <button className="apply-btn" onClick={handleApply}>
          Apply Withdrawal
        </button>
      </div>

      {/* Explain */}
      <div className="explain-box">
        <h3>Explain</h3>
        <ol>
          <li>Daily marketing from 00:00:00 to 23:59:59.</li>
          <li>Withdraw an amount between 200000 and 999999.</li>
          <li>You can only request withdrawal 1 time per day.</li>
          <li>Withdrawal rate 5%.</li>
        </ol>
      </div>

      {/* Records */}
      <div className="records-box">
        <h3>My Withdrawal Records</h3>
        <ul>
          {withdrawalRecords.map((rec, idx) => (
            <motion.li
              key={idx}
              className={`record ${rec.status.toLowerCase()}`}
              initial={{ x: rec.status === "SUCCESS" ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              ₹ {rec.amount.toFixed(2)}
              <span>{rec.status}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Withdraw;