import React, { useState } from "react";
import "./Withdraw.css"; // move your CSS here
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const Withdraw = () => {
    const navigate = useNavigate();
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [tradePassword, setTradePassword] = useState("");
  const [bankCard, setBankCard] = useState("");

  const withdrawalRecords = [
    { id: 1, amount: "₹7000.00", status: "RETURNED" },
    { id: 2, amount: "₹500.00", status: "RETURNED" },
    { id: 3, amount: "₹2000.00", status: "RETURNED" },
    { id: 4, amount: "₹2000.00", status: "SUCCESS" },
    { id: 5, amount: "₹389.00", status: "SUCCESS" },
    { id: 6, amount: "₹483.00", status: "SUCCESS" },
  ];

  const handleWithdrawal = () => {
    console.log("Withdrawal request submitted:", {
      withdrawalAmount,
      tradePassword,
      bankCard,
    });
  };

  return (
    <div className="app-container">
      {/* Top Gradient Header */}
      <div className="header2">
        <div className="flex items-center space-x-2">
         <button className="back-btnR" onClick={() => navigate(-1)}>
                           <ArrowLeft color="black"/>
                         </button>
        </div>
        <h1 className="header-title">Withdraw</h1>
        <div className="spacer"></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Withdrawal Form Card */}
        <div className="card0 withdrawal-form-card">
          <div className="balance-info">
            <span className="balance-label">Withdrawal Balance:</span>
            <span className="balance-amount">₹9632.14</span>
          </div>

          <div className="input-group">
            <input
              type="number"
              className="input-field"
              placeholder="Withdrawal amount 200000-999999"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Trade Password"
              value={tradePassword}
              onChange={(e) => setTradePassword(e.target.value)}
            />
            <div className="select-wrapper">
              <select
                className="select-field"
                value={bankCard}
                onChange={(e) => setBankCard(e.target.value)}
              >
                <option value="" disabled>
                  Choose a Bank Card
                </option>
                <option value="card1">Bank of America</option>
                <option value="card2">Chase Bank</option>
              </select>
              <div className="select-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 
                    111.414 1.414l-4 4a1 1 0 
                    01-1.414 0l-4-4a1 1 0 
                    010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button onClick={handleWithdrawal} className="apply-button">
            Apply Withdrawal
          </button>

          {/* Explanation */}
          <div className="explanation">
            <h2 className="explanation-title">Explain</h2>
            <ol className="rules-list">
              <li>Daily marketing from 00:00:00 to 23:59:59.</li>
              <li>Withdraw an amount between 200000 and 999999.</li>
              <li>You can only request withdrawal once per day.</li>
              <li>Withdrawal rate 5%.</li>
            </ol>
          </div>
        </div>

        {/* Records */}
        <div className="card records-card">
          <h2 className="records-title">My Withdrawal Records</h2>
          <div className="records-list">
            {withdrawalRecords.map((record) => (
              <div key={record.id} className={`record-item ${record.status.toLowerCase()}`}>
                <div className="record-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="record-arrow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="record-amount">{record.amount}</span>
                </div>
                <div className={`record-status ${record.status.toLowerCase()}`}>{record.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
