import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, Zap } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import "./ProductInfo.css";
import Cookies from "js-cookie";
import { BuyProduct, getUserInfo, SECRET_KEY } from "../api";

let user = null;
let balance = null;
const encryptedUser = Cookies.get("tredingWebUser");

// --- Sub-Components ---

// Popup-enabled Buy Card
const BuyCard = ({ price, minShare, maxShare, dailyIncomePerShare, product }) => {
  const navigate =useNavigate();
  const [shareCount, setShareCount] = useState(minShare);
  const [popup, setPopup] = useState({ visible: false, success: false, message: "" });

  const totalIncome = product.cycleValue;
  const totalDailyIncome = shareCount * dailyIncomePerShare;
  const totalMoney = totalDailyIncome * totalIncome;
  const newPrice = price * shareCount;

  const handleBuy = async (shareCount, product, amount) => {
    if (amount > balance) {
      setPopup({ visible: true, success: false, message: "❌ Insufficient balance." });
      setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
      return;
    }

    try {
      const res = await BuyProduct({
        userId: user?._id,
        quantity: shareCount,
        product,
        TotalAmount: amount,
      });

      if (res.data.success) {
        setPopup({ visible: true, success: true, message: "✅ Purchase successful!" });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      } else {
        setPopup({ visible: true, success: false, message: res.data.message || "❌ Purchase failed!" });
      }
    } catch (err) {
      console.log(err.response.data.message)
      setPopup({ visible: true, success: false, message: `❌ ${err.response.data.message??"Internal Error"}` });
    } finally {
      setTimeout(() => setPopup({ ...popup, visible: false }), 2500);
    }
  };

  return (
    <div className="card">
      <h3 className="text-sm font-medium color-gray-500 margin-bottom-1">Price</h3>
      <p className="text-3xl font-bold color-orange-500 margin-bottom-4">₹{newPrice.toFixed(2)}</p>

      <div className="flex-row border-top-1 padding-top-2 margin-bottom-6">
        <div className="flex-1 padding-right-4">
          <label className="block text-sm font-medium color-gray-500 margin-bottom-1">Buy Share</label>
          <div className="flex-row align-center space-x-2">
            <span className="text-lg font-bold color-gray-800">{shareCount}</span>
            <span className="badge-orange">{minShare}</span>
          </div>
          <input
            type="range"
            min={minShare}
            max={maxShare}
            value={shareCount}
            onChange={(e) => setShareCount(parseInt(e.target.value))}
            className="range-slider"
            style={{ accentColor: "#f97316" }}
          />
          <div className="flex-row justify-between text-xs color-gray-500 margin-top-1">
            <span>MIN {minShare}</span>
            <span>MAX {maxShare}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm color-gray-500">{product.cycleType === "hour" ? "Hourly Income" : "Daily Income"}</p>
          <p className="text-xl font-bold color-green-600">₹{totalDailyIncome.toFixed(1)}</p>
        </div>
      </div>

      <div className="flex-row justify-between align-center margin-top-6">
        <p className="text-lg font-medium color-gray-600">
          Total Income <span className="text-2xl font-bold color-gray-800">₹{totalMoney}</span>
        </p>
        <button onClick={() => handleBuy(shareCount, product, newPrice)} className="button-primary">Buy Now</button>
      </div>

      {popup.visible && (
        <div className={`popup-card ${popup.success ? "popup-success" : "popup-fail"}`}>{popup.message}</div>
      )}
    </div>
  );
};

// Detailed Info Cards
const DetailCards = ({ price, duration, dailyIncome, totalIncome, needLevel, product }) => (
  <div className="space-y-6">
    <div className="card">
      <h2 className="text-xl font-bold color-gray-800 border-left-4 border-orange-500 padding-left-3 margin-bottom-4">
        Buy and upgrade vip1
      </h2>
      <div className="space-y-3 color-gray-700">
        <DetailRow label="Price" value={`₹${price.toFixed(2)}`} valueClassName="color-orange-500 font-bold" />
        <DetailRow label="Revenue Duration" value={`${duration} Days`} valueClassName="color-green-600 font-bold" />
        <DetailRow label="Daily Income" value={`₹${dailyIncome.toFixed(1)}`} valueClassName="color-green-600 font-bold" />
        <DetailRow
          label="Need Level"
          value={
            <div className="flex-row align-center">
              <Zap className="icon-sm color-gray-500 margin-right-1" />
              {needLevel}
            </div>
          }
        />
        <DetailRow label="Total Income" value={`₹${totalIncome.toFixed(1)}`} valueClassName="color-gray-800 font-bold text-lg" />
      </div>
    </div>
  </div>
);

const DetailRow = ({ label, value, valueClassName = "color-gray-700" }) => (
  <div className="flex-row justify-between align-center text-base">
    <span className="color-gray-600">{label}</span>
    <span className={valueClassName}>{value}</span>
  </div>
);

// Main Component
export default function ProductInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state;
  const dailyIncome = product.cycleType === "hour" ? product.hour : product.daily;
  const PRODUCT_MOCK_DATA = {
    price: product.price,
    minShare: 1,
    maxShare: 10,
    dailyIncomePerShare: dailyIncome,
    revenueDurationDays: product.cycleValue,
    productImageUrl: `https://bdgwin.com.co${product.imageUrl}`,
    needLevel: "VIP",
  };

  const totalIncome = useMemo(
    () => PRODUCT_MOCK_DATA.dailyIncomePerShare * PRODUCT_MOCK_DATA.revenueDurationDays,
    []
  );

  const getUserData = async () => {
    if (encryptedUser) {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      user = JSON.parse(decrypted);

      if (!user?._id) {
        navigate("/login");
      } else {
        const res = await getUserInfo(user._id);
        balance = res.data.users.balance || 0;
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <ChevronLeft className="w-6 h-6 color-gray-800" style={{ cursor: "pointer" }} onClick={() => navigate(-1)} />
          <h1 className="text-xl font-semibold color-gray-800">Buy Product</h1>
          <span>
            Balance <h3>{balance ?? 0}</h3>
          </span>
        </div>
      </header>

      <main className="main-content">
        <div className="image-container">
          <img
            src={PRODUCT_MOCK_DATA.productImageUrl}
            alt="item"
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/300x300/e0f2ff/0369a1?text=Image+Not+Available";
            }}
          />
        </div>

        <div className="margin-bottom-6">
          <BuyCard
            price={PRODUCT_MOCK_DATA.price}
            minShare={PRODUCT_MOCK_DATA.minShare}
            maxShare={PRODUCT_MOCK_DATA.maxShare}
            dailyIncomePerShare={PRODUCT_MOCK_DATA.dailyIncomePerShare}
            product={product}
          />
        </div>

        <DetailCards
          price={PRODUCT_MOCK_DATA.price}
          duration={PRODUCT_MOCK_DATA.revenueDurationDays}
          dailyIncome={PRODUCT_MOCK_DATA.dailyIncomePerShare}
          totalIncome={totalIncome}
          needLevel={PRODUCT_MOCK_DATA.needLevel}
          product={product}
        />

        <div style={{ height: "2.5rem" }}></div>
      </main>
    </div>
  );
}
