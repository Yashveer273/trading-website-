import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { ArrowLeft } from "lucide-react"; 

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header with back arrow */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h1>About Vivo</h1>
      </div>

      {/* Section: About */}
      <div className="info-card slide-up">
        <h2>About vivo</h2>
        <img
          src="https://i.pinimg.com/1200x/4d/b6/70/4db6709fc3814c08d167a5869717a7df.jpg"
          alt="About Vivo"
          className="info-img"
        />
        <p>
          vivo is a technology company that creates great products based on a
          design-driven value, with smart devices and intelligent services as
          its core.
        </p>
      </div>

      {/* Section: Mission */}
      <div className="info-card slide-left">
        <h2>Mission</h2>
        <p>
          Create great products for users. Create a joyful and progressive
          environment for employees. Create win-win platforms for partners based
          on mutual trust. Render steady long term returns on investment for
          shareholders.
        </p>
      </div>

      {/* Section: Vision & Core Values */}
      <div className="info-card slide-right">
        <h2>Vision</h2>
        <p>
          Develop into a healthier, more sustainable world-class corporation.
        </p>
        <h2>Core value</h2>
        <p>
          Benfen, design-driven value, user-orientation, continuous learning and
          team spirit.
        </p>
      </div>

      {/* Section: R&D */}
      <div className="info-card slide-up">
        <h2>Our technical confidence comes from the R&D network</h2>
        <img
          src="https://i.pinimg.com/1200x/d3/15/a8/d315a8f9b5a0e0daf7b609f539facadf.jpg"
          alt="R&D"
          className="info-img"
        />
        <p>
          vivo is supported by an R&D network in Shenzhen, Dongguan, Nanjing,
          Beijing, Hangzhou, Shanghai, Xi’an and more cities, focusing on the
          development of state-of-the-art consumer technologies including 5G,
          AI, industrial design, photography and more.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;