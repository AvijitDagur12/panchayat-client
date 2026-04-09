import React, { useState } from "react";
import "./HeaderNav.css";
import { Link} from "react-router-dom";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  // const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 const handleUnderDev = (pageName) => {
  localStorage.setItem('devPage', pageName);
  window.location.href = '/under-dev';  // Use window.location instead of navigate
};

  return (
    <div className="header-nav">
      <div className="left">
        <Link to="/">
          <img
            src="https://iconape.com/wp-content/files/bt/257232/svg/257232.svg"
            alt="Portal Logo"
            className="logo"
          />
        </Link>
        <Link to="/"><p>আমাদের গ্রাম পঞ্চায়েত</p></Link>
        
        {/* Mobile toggle button */}
        <button className="mobile-toggle-btn" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`center ${!isMenuOpen ? "hidden" : ""}`}>
        <div className="nav-item">
          About
          <div className="dropdown">
            <Link onClick={() => handleUnderDev('About Panchayet')}>About Panchayet</Link>
            <Link onClick={() => handleUnderDev('History')}>History</Link>
            <Link onClick={() => handleUnderDev('Vision & Mission')}>Vision & Mission</Link>
            <Link onClick={() => handleUnderDev('Team')}>Team</Link>
            <Link onClick={() => handleUnderDev('Achievements')}>Achievements</Link>
          </div>
        </div>

        <div className="nav-item">
          Services
          <div className="dropdown">
            <Link to="/admin/certificates" className="nav-item">ELECTED ADMIN LOGIN PANCHAYET</Link>
            <Link to="/download-certificate" className="nav-item">Download Certificate</Link>
            <Link onClick={() => handleUnderDev('Income Certificate')}>Income Certificate</Link>
            <Link onClick={() => handleUnderDev('Residence Certificate')}>Residence Certificate</Link>
            <Link onClick={() => handleUnderDev('Application Status')}>Application Status</Link>
          </div>
        </div>

        <div className="nav-item">
          Contact
          <div className="dropdown">
            <Link to="/contact">Contact Info</Link>
            <Link onClick={() => handleUnderDev('Office Address')}>Office Address</Link>
            <Link to="/contact">Support</Link>
            <Link onClick={() => handleUnderDev('Grievance')}>Grievance</Link>
          </div>
        </div>

        <div className="nav-item">
          Survey
          <div className="dropdown">
            <Link onClick={() => handleUnderDev('Village Survey')}>Village Survey</Link>
            <Link onClick={() => handleUnderDev('Development Survey')}>Development Survey</Link>
            <Link onClick={() => handleUnderDev('Citizen Feedback')}>Citizen Feedback</Link>
            <Link onClick={() => handleUnderDev('Public Opinion')}>Public Opinion</Link>
          </div>
        </div>
      </div>

      <div className={`right ${!isMenuOpen ? "hidden" : ""}`}>
        <Link to="/auth">
          <button className="login-btn">Login / Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;