import React from "react";

const MetricItem = ({
  label,
  value,
  valueColor,
  isPrimary = false,
  isLarge = false,
}) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 0",
    borderBottom: !isPrimary ? "1px solid #f3f4f6" : "none",
  };

  const labelStyle = {
    color: "#374151",
    fontWeight: "500",
    fontSize: isLarge ? "1.125rem" : "1rem",
  };

  let finalValueColor = "#1f2937";
  if (valueColor === "text-green-800") finalValueColor = "#000000ff";
  else if (valueColor === "text-green-600") finalValueColor = "#000000ff";
  else if (valueColor === "text-red-600") finalValueColor = "#000000ff";

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>
      <span
        style={{
          fontWeight: "bold",
          fontSize: isLarge ? "1.5rem" : "1.125rem",
          color: finalValueColor,
        }}
      >
        <span style={{ fontFamily: "sans-serif" }}>₹</span> {value}
      </span>
    </div>
  );
};

const ProductCard = ({ productData, onBuy }) => {
  const { title, price, dailyEarnings, totalGain, durationDays, cycleType,img } =
    productData;


  const cardStyle = {
    position: "relative",
    width: "100%",

    background: "#ffffffff",
    borderRadius: "1.5rem",
     overflow: "hidden",
   
    transition: "transform 0.3s ease-in-out",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  border: "1px solid #898989",

  };

  const badgeStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#f97316",
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "600",
    padding: "0.25rem 1rem",
    borderBottomRightRadius: "1rem",
    borderTopLeftRadius: "0.75rem",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  };

  return (
    <div style={cardStyle}>
      {/* Orange badge */}
      <div style={badgeStyle}>
        {durationDays} {cycleType === "hour" ? "Hours" : "Days"}
      </div>

      <div style={{ paddingLeft:"1.5rem",paddingRight:"1.5rem", paddingTop: "2.5rem", height:"38vh"}}>
        

        <div
          style={{
           
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          {/* Product image */}
          <div
            style={{
              flexShrink: 0,
              width: "100%",
              height: "18vh",
              backgroundColor: "#ebdcdcff",
              borderRadius: "1rem",
              
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            
            }}
          >
            <img
               src={`https://bdgwin.com.co${img}`}
              alt="Product"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/150x150/9ca3af/fff?text=Product";
              }}
            />
          </div>

          {/* Product metrics */}
          <div style={{ flexGrow: 1 }}>
            <h3>     {title}</h3>
            <MetricItem
              label="Each Price"
              value={price}
              valueColor="text-green-800"
              isPrimary
            />
            <MetricItem
              label="Daily Earnings"
              value={dailyEarnings}
              valueColor="text-green-600"
            />
            <MetricItem
              label="Total Gain"
              value={totalGain}
              valueColor="text-red-600"
              isPrimary
              isLarge
            />
          </div>
        </div>
      </div>

      {/* Buy Button (matches your .buy-button CSS) */}
      <div
        style={{
          padding: "5px  1.5rem",
          backgroundColor: "#fffef3",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button className="buy-button" onClick={onBuy}>
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
