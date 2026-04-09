import React from "react";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const navigate = useNavigate();

  const handleUnderDev = (pageName) => {
    localStorage.setItem('devPage', pageName);
    navigate('/under-dev');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="nav-links">
          <a href="/admin" className="nav-link">
            <span className="nav-icon">🏛️</span>
            BDO LOGIN
          </a>
          <button 
            onClick={() => handleUnderDev('SDO Login')} 
            className="nav-link"
          >
            <span className="nav-icon">📋</span>
            SDO LOGIN
          </button>
          <a href="/psc" className="nav-link">
            <span className="nav-icon">👥</span>
            PSC LOGIN
          </a>
        </div>
      </div>
      <div className="topbar-right">
        <span className="portal-text">
          Panchayet Portal 1.0
          <span>Website Under Development</span>
        </span>
      </div>
    </div>
  );
};

export default Topbar;