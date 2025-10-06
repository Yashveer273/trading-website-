import React, {  useState } from "react";
import { motion } from "framer-motion";
import "./Invest.css";
import { useNavigate } from "react-router-dom";
import { Home, Users, User, DollarSign } from "lucide-react";


const Invest = ({ products }) => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Stable Fund");  

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },

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
        return products.filter(
          (item) => item.badge === "popular" || item.badge === "non"
        );

      case "Daily Fund":
        return products.filter((item) => item.badge === "new");

      case "Welfare Fund":
        return products.filter((item) => item.badge === "limited");

      default:
        return products.filter(
          (item) => item.badge === "popular" || item.badge === "non"
        );
    }
  };
  const buyitem = async (product) => {
    navigate("/ProductInfo",{state:product})
    return;

    //     setIsLoading(true);
    //     setMessage({ text: "Submitting UTR for verification...", type: "info" });
    //     try {
    //        const payload = {
    //     productId: product._id,
    //     amount: product.price,
    //     userId:user?._id,
    //     purchaseType:product.purchaseType
    //   };
    //       const res = await RechargeBalence(payload);
    //       if (!res.status) {
    //         throw new Error("Payment request failed");
    //       }
    // else{
    //  setMessage({
    //         text: "Payment submitted successfully! Awaiting approval.",
    //         type: "success",
    //       });
    //       setUtr("");
    //       setTimeout(() => {
    //         navigate(-1);
    //       }, 1000);
    // }
    //     } catch (error) {
    //       setMessage({
    //         text: `Submission failed: ${error.message || "Server error."}`,
    //         type: "error",
    //       });
    //     } finally {
    //       setIsLoading(false);
    //     }
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
              key={product._id}
              className="product-card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              {/* Product Image */}

              <div className="product-details">
                <div className="product-stats">
                  <div
                    style={{
                      display: "",
                      
                      alignItems: "start",
                    }}
                  >
                    <div className="product-image-placeholder">
                      <img
                        src={`http://localhost:5004${product.imageUrl}`}
                        alt={product._id}
                        className="product-image"
                      />
                    </div>
                    <h3>{product.productName}</h3>
                  </div>
                  <div className="stat-row">
                    <span className="stat-name">Price</span>
                    <span className="stat-value">₹{product.price}</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-name">Revenue Duration</span>
                    <span className="stat-value">
                      {product.cycleValue}{" "}
                      {product.cycleType === "hour" ? "Hours" : "Days"}
                    </span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-name">Daily Earnings</span>
                    <span className="stat-value">
                      ₹
                      {product.cycleType === "hour"
                        ? product.hour
                        : product.daily}
                    </span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-name">Total Revenue</span>
                    <span className="stat-value">
                      ₹
                      {product.cycleType === "hour"
                        ? product.totalIncomeHour
                        : product.totalIncomeDay}
                    </span>
                  </div>
                </div>

                <button className="buy-button" onClick={()=>{buyitem(product)}}>
                  Buy
                </button>
              </div>

              {/* Buy button */}
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
