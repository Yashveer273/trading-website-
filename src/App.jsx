import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import Splash from "./pages/Splash";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import Recharge from "./pages/Recharge";
import Withdraw from "./pages/Withdraw";
import Teams from "./pages/Teams";
import Teamonelevel from "./pages/Teamonelevel";
import Teamtwolevel from "./pages/Teamtwolevel";
import Teamthreelevel from "./pages/Teamthreelevel";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import VIP from "./pages/VIP";
import About from "./pages/About";
import Bill from "./pages/Bill";
import Mail from "./pages/Mail";
import Notice from "./pages/Notice";
import HelpCenter from "./pages/HelpCenter";
import Info from "./pages/Info";
import TradePassword from "./pages/TradePassword";
import Password from "./pages/Password";
import BankCard from "./pages/BankCard";
import Invest from "./pages/Invest";
import LuckyDraw from "./pages/LuckyDraw";
import OrderDetails from "./pages/OrderDetails";
import InvestBuy from "./pages/InvestBuy";
import { productGet } from "./api";
import Pay from "./pages/pay";
import ProductInfo from "./pages/ProductInfo";

function App() {
   const [products, setproducts] = useState([
   
  ]);
useEffect(() => {
  const fetchData = async () => {
try{
  const res=await productGet();

        if (!res.status===200) return;


        const selectedItem = await res.json();
            setproducts(selectedItem.products);
}catch(e){}       
   
  };

  fetchData();
}, []);


 
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Splash />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recharge" element={<Recharge />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teamonelevel" element={<Teamonelevel />} />
        <Route path="/teamtwolevel" element={<Teamtwolevel />} />
        <Route path="/teamthreelevel" element={<Teamthreelevel />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/bankcard" element={<BankCard />} />
        <Route path="/about" element={<About />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/helpcenter" element={<HelpCenter />} />
        <Route path="/info" element={<Info />} />
        <Route path="/tradepassword" element={<TradePassword />} />
        <Route path="/password" element={<Password />} />
        <Route path="/messages" element={<Mail />} />
        <Route path="/invest" element={<Invest products={products}/>} />
        <Route path="/ProductInfo" element={<ProductInfo/>} />
        <Route path="/luckydraw" element={<LuckyDraw />} />
        <Route path="/investbuy/:id" element={<InvestBuy />} />

        {/* Shared Order Details Page */}
        <Route path="/orderdetails" element={<OrderDetails />} />

        
      </Routes>
    </Router>
  );
}

export default App;

