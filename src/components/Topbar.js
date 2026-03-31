import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="nav-links">
          <a href="/admin" className="nav-link">
            <span className="nav-icon">🏛️</span>
            BDO LOGIN
          </a>
          <a href="/sdo" className="nav-link">
            <span className="nav-icon">📋</span>
            SDO LOGIN
          </a>
          <a href="/psc" className="nav-link">
            <span className="nav-icon">👥</span>
            PSC LOGIN
          </a>
        </div>
      </div>
      <div className="topbar-right">
        <span className="portal-text">
          Panchayet Portal 2.0
          <span>Website Under Development</span>
        </span>
      </div>
    </div>
  );
};

export default Topbar;