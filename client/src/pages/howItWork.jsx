import React from 'react';
import { FaSearch, FaHandshake, FaLeaf } from 'react-icons/fa'; 
import '../styles/HowItWorks.css'; 
import ImagePeople from '../../public/hhh.png'; 

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      <div className="container">
        <h1>How It Works</h1>
        <p className="subtitle">Simple steps to connect and collaborate.</p>

        <div className="steps-container">
          <div className="step-item">
            <div className="icon-wrapper">
              <FaSearch />
            </div>
            <h3>1. Discover Opportunities</h3>
            <p>Browse through a curated list of ecoprojects, community farms, and cultural exchanges worldwide.</p>
          </div>

          <div className="step-item">
            <div className="icon-wrapper">
              <FaHandshake />
            </div>
            <h3>2. Connect & Interact</h3>
            <p>Message hosts or volunteers, share your skills, and find the perfect match.</p>
          </div>

          <div className="step-item">
            <div className="icon-wrapper">
              <FaLeaf />
            </div>
            <h3>3. Grow Together</h3>
            <p>Experience sustainable living, learn new skills, and build lasting community bonds.</p>
          </div>
        </div>

        <div className="image-section">
          <img src={ImagePeople} alt="People working in a farm" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;