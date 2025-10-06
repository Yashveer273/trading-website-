import React, { useState, useRef, useEffect } from "react";
import { fetchLuckySpinPrizes, spinItem } from "../api";

 

const mockWinnings = [
];

const Reel = ({ prizes, isSpinning, finalValue }) => {
  const [position, setPosition] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const itemHeight = 192; // 12rem = 192px

  useEffect(() => {
    if (isSpinning) {
      const duration = 4000;
      const totalRotations = prizes.length * 5; // 5 full rotations
      const targetPosition = (totalRotations + finalValue) * itemHeight;

      startTimeRef.current = performance.now();

      const animateReel = (currentTime) => {
        const elapsedTime = currentTime - startTimeRef.current;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentPosition = easedProgress * targetPosition;
        setPosition(-currentPosition);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateReel);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateReel);
    } else {
      setPosition(-finalValue * itemHeight);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isSpinning, finalValue, prizes.length, itemHeight]);

  const extendedPrizes = [
    ...prizes,
    ...prizes,
    ...prizes,
    ...prizes,
    ...prizes,
    ...prizes,
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "transform 0s ease-in-out",
          transform: `translateY(${position}px)`,
        }}
      >
        {extendedPrizes.map((prize, index) => (
          <div
            key={index}
            style={{
              flexShrink: 0,
              width: "12rem",
              height: "12rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              border: "2px solid transparent",
              borderRadius: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <img
              src={prize.image}
              alt={`Prize ${prize.value}`}
              style={{
                width: "6rem",
                height: "6rem",
                borderRadius: "9px",
                marginBottom: "3rem",
              }}
            />
            <h2
              style={{
                color: "black",
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                textAlign: "center",
              }}
            >
              {prize.name}
            </h2>
            <h1
              style={{ color: "black", fontSize: "1.5rem", fontWeight: "bold" }}
            >
              {prize.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrizeModal = ({ prize, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <div
        style={{
          backgroundColor: "#fef3c7",
          padding: "2rem",
          borderRadius: "1.5rem",
          textAlign: "center",
          maxWidth: "20rem",
          width: "90%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h3
          style={{
            fontSize: "2rem",
            fontWeight: "extrabold",
            color: "#f59e0b",
            marginBottom: "1rem",
          }}
        >
          Congratulations!
        </h3>
        <p style={{ fontSize: "1rem", marginBottom: "1.5rem" }}>
          You have won:
        </p>
        <img
          src={prize.image}
          alt={prize.name}
          style={{
            width: "8rem",
            height: "8rem",
            borderRadius: "9999px",
            marginBottom: "1rem",
          }}
        />
        <h2
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}
        >
          {prize.name}
        </h2>
        <p
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: "#d97706",
            marginBottom: "1.5rem",
          }}
        >
          {prize.value}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#f59e0b",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.125rem",
            borderRadius: "9999px",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const LuckyDraw = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(0);
  const [winnings, setWinnings] = useState(mockWinnings);
  const [showModal, setShowModal] = useState(false);
   const [prizes, setPrizes] = useState([
 
]);
  const [winningPrizeDetails, setWinningPrizeDetails] = useState(null);
  const fetchLuckySpinData = async () => {
    let data = await fetchLuckySpinPrizes();
    setPrizes(data);
  };
  useEffect(() => {
    fetchLuckySpinData();
  });
 const startSpin = async () => {
  if (isSpinning) return;
  setIsSpinning(true);

  try {
    const res =await spinItem(); // call backend
    if (!res.ok) throw new Error("Failed to fetch item");
    const selectedItem = await res.json();

    const newResult = prizes.findIndex(p => p.name === selectedItem.itemName);
    if (newResult === -1) {
      console.error("Selected item not in local prizes");
      setIsSpinning(false);
      return;
    }

    setResult(newResult);

    setTimeout(() => {
      setIsSpinning(false);
      setWinningPrizeDetails(prizes[newResult]);
      setShowModal(true);

      const newWin = {
        id: Date.now(),
        title: prizes[newResult].name,
        date: new Date().toLocaleString(),
        value: prizes[newResult].value,
        image: prizes[newResult].image,
      };
      setWinnings(prev => [newWin, ...prev]);
    }, 4500);
  } catch (err) {
    console.error(err);
    setIsSpinning(false);
  }
};


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        overflow: "hidden",
        color: "#111827",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "32rem",
          backgroundColor: "#f1f5f9",
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #f59e0b",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Slot Machine Section */}
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            color: "#1f2937",
            marginBottom: "2rem",
          }}
        >
          Slot Machine
        </h2>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            backgroundColor: "#fef3c7",
            padding: "1rem",
            borderRadius: "0.75rem",
            borderWidth: "4px",
            borderColor: "#fde68a",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              width: "12rem",
              height: "12rem",
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              overflow: "hidden",
              borderWidth: "2px",
              borderColor: "#fcd34d",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Reel prizes={prizes} isSpinning={isSpinning} finalValue={result} />
          </div>
        </div>
        <button
          onClick={startSpin}
          style={{
            padding: "0.75rem 2rem",
            backgroundColor: "#f59e0b",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.125rem",
            borderRadius: "9999px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transition: "transform 0.2s",
            transform: isSpinning ? "scale(0.95)" : "scale(1)",
            cursor: isSpinning ? "not-allowed" : "pointer",
          }}
          disabled={isSpinning}
        >
          {isSpinning ? "Spinning..." : "Spin"}
        </button>
        {/* Available Rewards Section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            margin: "1.5rem 0",
          }}
        >
          {prizes.map((prize, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.5rem",
                borderRadius: "0.75rem",
                borderWidth: "2px",
                borderColor: "#e5e7eb",
              }}
            >
              <img
                src={prize.image}
                alt={prize.name}
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "50%",
                  marginBottom: "0.25rem",
                }}
              />
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                {prize.value}
              </p>
            </div>
          ))}
        </div>

        {/* Winning Record Section */}
        <div style={{ width: "100%", marginTop: "2.5rem" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "#1f2937",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            My Winning Record
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {winnings.map((win) => (
              <div
                key={win.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem",
                  backgroundColor: "#fef3c7",
                  borderRadius: "0.75rem",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <img
                  src={win.image}
                  alt="Bonus"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "9999px",
                    marginRight: "1rem",
                  }}
                />
                <div style={{ flex: "1 1 0%" }}>
                  <p style={{ fontWeight: "bold", color: "#1f2937" }}>
                    {win.title}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {win.date}
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      color: "#d97706",
                    }}
                  >
                    {win.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && winningPrizeDetails && (
        <PrizeModal
          prize={winningPrizeDetails}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LuckyDraw;
