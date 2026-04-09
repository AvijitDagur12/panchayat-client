import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UnderDev.css';

const UnderDev = () => {
  const navigate = useNavigate();
  const pageName = localStorage.getItem('devPage') || 'History';

  return (
    <div className="under-dev-container">
      <div className="terminal-wrapper">
        
        {/* Status Badges */}
        <div className="status-badges">
          <div className="badge red">
            <span className="led red-led"></span>
            AI SECURITY ACTIVE
          </div>
          <div className="badge green">
            <span className="led green-led blink"></span>
            QUANTUM COMPUTING
          </div>
          <div className="badge yellow">
            <span className="led yellow-led"></span>
            UNDER DEVELOPMENT MODE
          </div>
        </div>

        {/* Terminal Card */}
        <div className="terminal-card">
          
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-btn red"></span>
              <span className="terminal-btn yellow"></span>
              <span className="terminal-btn green"></span>
            </div>
            <span className="terminal-title">root@development:~#</span>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body">
            
            {/* Command Line 1 */}
            <div className="terminal-line">
              <span className="prompt">$</span>
              <span className="command">sudo systemctl status development</span>
            </div>
            
            {/* Output */}
            <div className="terminal-output">
              <span className="output-text">● {pageName}.service - Development Service</span>
              <span className="output-text warning">   Loaded: loaded (/etc/systemd/system)</span>
              <span className="output-text warning">   Active: 🔴 activating (auto-restart) since {new Date().toLocaleTimeString()}</span>
              <span className="output-text">   Status: "Building amazing features..."</span>
              <span className="output-text progress">   Progress: ████████░░░░ 75%</span>
            </div>

            {/* Blinking Cursor */}
            <div className="cursor-line">
              <span className="prompt">$</span>
              <span className="blinking-cursor">_</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => navigate('/')} className="btn-primary">
              🏠 GO TO HOME
            </button>
            <button onClick={() => navigate(-1)} className="btn-secondary">
              🔙 GO BACK
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>© **ওয়েবসাইট ডেভেলপ করা হচ্ছে, দয়া করে কয়েকদিন পর আবার চেক করুন। ধন্যবাদ।**
</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDev;