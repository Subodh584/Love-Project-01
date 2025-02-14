// ValentineCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function ValentineCard() {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/login'); 
  };

  return (
    <div className="page-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      
      <div className="happy-valentines">
        <div className="valentines-day-card">
          <div className="clouds" />
          <div className="hearts">
            <div className="heartOne">
              <div className="left-side" />
              <div className="right-side" />
            </div>
            <div className="heartTwo">
              <div className="left-side" />
              <div className="right-side" />
            </div>
            <div className="heartThree">
              <div className="left-side" />
              <div className="right-side" />
            </div>
            <div className="heartFour">
              <div className="left-side" />
              <div className="right-side" />
            </div>
            <div className="heartFive">
              <div className="left-side" />
              <div className="right-side" />
            </div>
          </div>
          <div className="text">
            <span>
              Happy Valentine's
              <br /> Day! Namee 😘
            </span>
          </div>
        </div>
        <p className="hover">- I Love You So Much -</p>
        
        <div className="button-container">
          <div 
            className="reasons-container"
            onClick={() => navigate('/complaints')}
          >
            <div className="reasons-grid">
              <div className="reason-card">
                <span className="reason-number">#1</span>
                <p className="reason-text">Complaints?</p>
              </div>
            </div>
          </div>
          <div 
            className="reasons-container"
            onClick={() => navigate('/reasons')}
          >
            <div className="reasons-grid">
              <div className="reason-card">
                <span className="reason-number">#2</span>
                <p className="reason-text">100 Reasons I Love U</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}