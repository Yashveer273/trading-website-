import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { ArrowLeft } from "lucide-react";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header with back arrow */}
      <div className="header2">
        <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="black" />
        </button>
        <h1 className="header-title">About</h1>
        <div className="spacer"></div>
      </div>

      {/* Section: About Company */}
      <div className="info-card slide-up">
        <h2>About Realstate Property Investment</h2>
        <p>
          Realstate Property Investment is India’s largest online marketplace
          for all types of properties — from residential and commercial spaces
          to large buildings and even shares in factories. Headquartered in
          Mumbai, our platform offers attractive prices and reliable investment
          options across India.
        </p>
        <p>
          In less than three years, Realstate Property Investment has helped
          over 100,000 individuals own profitable properties at prices many
          times higher than their share value.
        </p>
      </div>

      {/* Section: Mission */}
      <div className="info-card slide-left">
        <h2>Our Mission</h2>
        <p>
          To make buying and selling properties effortless by providing a secure,
          transparent, and nationwide property investment platform. We aim to
          empower investors to access legitimate, verified property opportunities
          through a simple and trusted system.
        </p>
      </div>

      {/* Section: Vision */}
      <div className="info-card slide-right">
        <h2>Our Vision</h2>
        <p>
          To become India’s most trusted and comprehensive marketplace for real
          estate investments, uniting the unorganized market of non-performing
          and distressed assets under one digital roof.
        </p>
        <h2>Core Values</h2>
        <p>
          Transparency, trust, growth, and customer-first approach drive
          everything we do — ensuring fair deals, verified listings, and secure
          transactions.
        </p>
      </div>

      {/* Section: Network */}
      <div className="info-card slide-up">
        <h2>Our Network</h2>
        <img
          src="https://i.pinimg.com/1200x/d3/15/a8/d315a8f9b5a0e0daf7b609f539facadf.jpg"
          alt="Real Estate Network"
          className="info-img"
        />
        <p>
          Our extensive property network spans cities across India, enabling you
          to choose properties by city or by auctioning banks. Whether you’re
          buying or selling, Realstate Property Investment ensures seamless,
          verified, and profitable transactions.
        </p>
      </div>

      {/* Section: Founded */}
      <div className="info-card slide-left">
        <h2>Founded</h2>
        <p>Realstate Property Investment was founded in 2022.</p>
        <p>
          To buy or sell properties, please visit the <strong>Invest</strong> page.
          Thank you for trusting us!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
