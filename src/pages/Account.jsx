import React from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";


import { ArrowLeft, ArrowDownRightFromSquare} from "lucide-react";
const menuItems = [
  { title: "Team", icon: "https://img.icons8.com/color/48/group.png", path: "/teams" },
  { title: "VIP", icon: "https://img.icons8.com/color/48/vip.png", path: "/vip" },
  { title: "BankCard", icon: "https://img.icons8.com/color/48/bank-card-back-side.png", path: "/bankcard" },
  { title: "Bill", icon: "https://img.icons8.com/color/48/bill.png", path: "/bill" },
  { title: "About", icon: "https://img.icons8.com/color/48/user.png", path: "/about" },
  { title: "Mail", icon: "https://img.icons8.com/color/48/speech-bubble.png", path: "/mail" },
  { title: "Notice", icon: "https://img.icons8.com/color/48/administrative-tools.png", path: "/notice" },
  { title: "HelpCenter", icon: "https://img.icons8.com/color/48/help.png", path: "/helpcenter" },
  { title: "Info", icon: "https://img.icons8.com/color/48/info.png", path: "/info" },
  { title: "TradePassword", icon: "https://img.icons8.com/color/48/lock-2.png", path: "/tradepassword" },
  { title: "Password", icon: "https://img.icons8.com/color/48/key.png", path: "/password" },
];

export default function AccountPage() {
  const navigate = useNavigate();

  return (
    <div className="account-container">
      {/* Header */}
      <div style={{display:"flex", marginLeft:"20px",marginTop:"10px", justifyContent:"space-between"}}>
     <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="black"/>
        </button>
        <button className="logout-btn" onClick={() => navigate("/login")}>
        Logout
      </button>
</div>
      {/* Profile Card */}
      <section className="profile-card">
        <div className="profile-top">
          <img src="https://img.icons8.com/color/96/user-male-circle.png" alt="Profile" />
          <div>
            <h2>Vivo VIP1</h2>
            <p>95******32 | ID:458138</p>
          </div>
        </div>

        <div className="stats">
          <div><span>1421</span><p>Buy</p></div>
          <div><span>9719</span><p>Product Income</p></div>
          <div><span>4592</span><p>Pending Income</p></div>
          <div><span>835</span><p>Tasks Reward</p></div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="action">
          <img src="https://img.icons8.com/color/48/money.png" alt="Recharge" />
          <p>Recharge<br /><span>209.00</span></p>
        </div>
        <div className="action">
          <img src="https://img.icons8.com/color/48/withdrawal.png" alt="Withdraw" />
          <p>Withdrawal<br /><span>963214</span></p>
        </div>
        <div className="action">
          <img src="https://img.icons8.com/color/48/order-history.png" alt="Orders" />
          <p>Orders<br /><span>4</span></p>
        </div>
      </section>

      {/* Menu List */}
      <section className="menu-list">
        {menuItems.map((item, i) => (
          <div
            className="menu-item"
            key={i}
            onClick={() => navigate(item.path)}
          >
            <div className="menu-left">
              <img src={item.icon} alt={item.title} />
              <span>{item.title}</span>
            </div>
            <span className="arrow"><ArrowDownRightFromSquare size={18}/></span>
          </div>
        ))}
      </section>

      {/* Logout Button */}
      <button className="logout-btn2">
        
      </button>
      {/* <div style={{height:"20px"}}></div> */}
    </div>
  );
}