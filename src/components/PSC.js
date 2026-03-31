import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PSC.css';

const PSC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPassword, setSupportPassword] = useState('');
  const [supportError, setSupportError] = useState('');
  const [supportLoading, setSupportLoading] = useState(false);

  // Demo credentials
  const SECRETARY_USERNAME = 'PANCHAYAT_SECRETARY';
  const SECRETARY_PASSWORD = 'secretary@123';
  const SUPPORT_USERNAME = 'support@panchayat.gov.in';
  const SUPPORT_PASSWORD = 'support@123';

  // Village Statistics
  const villageStats = {
    totalVillages: 8,
    totalPopulation: 12458,
    totalHouseholds: 2840,
    totalSchemes: 15,
    activeSchemes: 12,
    pendingApplications: 24,
    approvedApplications: 156,
    totalEmployees: 28,
    certificatesIssued: 184,
    complaintsResolved: 67,
    fundsUtilized: '₹24,50,000',
    totalBeneficiaries: 1856
  };

  const recentActivities = [
    { id: 1, action: 'New BPL Certificate Application', time: '10 mins ago', user: 'Rahul Sharma', village: 'Irhpala' },
    { id: 2, action: 'Gram Sabha Meeting Scheduled', time: '1 hour ago', user: 'Sarpanch', village: 'Ghatal' },
    { id: 3, action: 'Water Supply Complaint Resolved', time: '3 hours ago', user: 'Gram Sevak', village: 'Daspur' },
    { id: 4, action: 'New Scheme Launched', time: '5 hours ago', user: 'BDO Office', village: 'All Villages' },
    { id: 5, action: 'Income Certificate Approved', time: '1 day ago', user: 'Priya Singh', village: 'Kharar' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Review Pending Applications', deadline: 'Today', priority: 'High', count: 8 },
    { id: 2, task: 'Gram Sabha Meeting Preparation', deadline: '25 March 2024', priority: 'Medium', count: null },
    { id: 3, task: 'Scheme Implementation Review', deadline: '28 March 2024', priority: 'High', count: null },
    { id: 4, task: 'Beneficiary Verification', deadline: '30 March 2024', priority: 'Low', count: 45 },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    setTimeout(() => {
      if (username === SECRETARY_USERNAME && password === SECRETARY_PASSWORD) {
        setIsLoggedIn(true);
        setLoginError('');
      } else {
        setLoginError('Invalid credentials! Use: PANCHAYAT_SECRETARY / secretary@123');
      }
      setLoading(false);
    }, 800);
  };

  const handleSupportLogin = (e) => {
    e.preventDefault();
    setSupportLoading(true);
    setSupportError('');

    setTimeout(() => {
      if (supportEmail === SUPPORT_USERNAME && supportPassword === SUPPORT_PASSWORD) {
        navigate('/admin/Support');
      } else {
        setSupportError('Invalid credentials! Use: support@panchayat.gov.in / support@123');
      }
      setSupportLoading(false);
    }, 800);
  };

  if (!isLoggedIn) {
    return (
      <div className="psc-login-container">
        <div className="psc-login-grid">
          {/* Left Side - Brand Section */}
          <div className="psc-login-brand">
            <div className="psc-brand-content">
              <div className="psc-brand-emblem">🏛️</div>
              <h1>Panchayat Secretary</h1>
              <p>Irhpala Gram Panchayat</p>
              <div className="psc-brand-divider"></div>
              <h2>Administrative Portal</h2>
              <p className="psc-brand-tagline">Empowering Rural Development • Serving Citizens</p>
              <div className="psc-brand-stats">
                <div className="psc-brand-stat">
                  <span>8</span>
                  <small>Villages</small>
                </div>
                <div className="psc-brand-stat">
                  <span>12.5K</span>
                  <small>Citizens</small>
                </div>
                <div className="psc-brand-stat">
                  <span>15</span>
                  <small>Schemes</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="psc-login-form-side">
            <div className="psc-login-wrapper">
              <h3>Welcome Back</h3>
              <p className="psc-login-welcome">Sign in to access Secretary Dashboard</p>

              <form onSubmit={handleLogin}>
                <div className="psc-input-group">
                  <label>Secretary ID</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your Secretary ID"
                    required
                  />
                </div>

                <div className="psc-input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {loginError && <div className="psc-error-msg">{loginError}</div>}

                <button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="psc-spinner"></span>
                      Authenticating...
                    </>
                  ) : (
                    'Sign In →'
                  )}
                </button>
              </form>

              <div className="psc-demo-info">
                <span>Demo Credentials</span>
                <code>PANCHAYAT_SECRETARY / secretary@123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="psc-dashboard">
      {/* Header */}
      <div className="psc-dashboard-header">
        <div className="psc-header-left">
          <div className="psc-header-emblem">🏛️</div>
          <div>
            <h1>Panchayat Secretary Dashboard</h1>
            <p>Irhpala Gram Panchayat • Block Development Office</p>
          </div>
        </div>
        <div className="psc-header-right">
          <div className="psc-date">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <button className="psc-support-btn" onClick={() => setShowSupportForm(true)}>
            💬 Support Citizen
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="psc-stats-grid">
        <div className="psc-stat-card">
          <div className="psc-stat-icon">👥</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.totalPopulation.toLocaleString()}</span>
            <span className="psc-stat-label">Total Population</span>
            <span className="psc-stat-sub">Across {villageStats.totalVillages} villages</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">🏠</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.totalHouseholds.toLocaleString()}</span>
            <span className="psc-stat-label">Total Households</span>
            <span className="psc-stat-sub">Registered families</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">📋</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.pendingApplications}</span>
            <span className="psc-stat-label">Pending Applications</span>
            <span className="psc-stat-sub">Need immediate review</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">✅</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.approvedApplications}</span>
            <span className="psc-stat-label">Approved Applications</span>
            <span className="psc-stat-sub">Successfully processed</span>
          </div>
        </div>
      </div>

      {/* Second Row Stats */}
      <div className="psc-stats-grid">
        <div className="psc-stat-card">
          <div className="psc-stat-icon">🌾</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.activeSchemes}</span>
            <span className="psc-stat-label">Active Schemes</span>
            <span className="psc-stat-sub">Total: {villageStats.totalSchemes}</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">👨‍👩‍👧‍👦</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.totalBeneficiaries.toLocaleString()}</span>
            <span className="psc-stat-label">Total Beneficiaries</span>
            <span className="psc-stat-sub">Covered under schemes</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">💰</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.fundsUtilized}</span>
            <span className="psc-stat-label">Funds Utilized</span>
            <span className="psc-stat-sub">FY 2024-25</span>
          </div>
        </div>
        <div className="psc-stat-card">
          <div className="psc-stat-icon">📜</div>
          <div className="psc-stat-info">
            <span className="psc-stat-number">{villageStats.certificatesIssued}</span>
            <span className="psc-stat-label">Certificates Issued</span>
            <span className="psc-stat-sub">This financial year</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="psc-two-col">
        {/* Recent Activities */}
        <div className="psc-activity-section">
          <h3>📋 Recent Activities</h3>
          <div className="psc-activity-list">
            {recentActivities.map(activity => (
              <div className="psc-activity-item" key={activity.id}>
                <div className="psc-activity-icon">🔔</div>
                <div className="psc-activity-details">
                  <p>{activity.action}</p>
                  <span>{activity.user} • {activity.village} • {activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="psc-tasks-section">
          <h3>⏰ Upcoming Tasks</h3>
          <div className="psc-tasks-list">
            {upcomingTasks.map(task => (
              <div className={`psc-task-item priority-${task.priority.toLowerCase()}`} key={task.id}>
                <div className="psc-task-info">
                  <h4>{task.task}</h4>
                  <p>📅 {task.deadline}</p>
                  {task.count && <span className="psc-task-count">📊 {task.count} pending</span>}
                </div>
                <div className={`psc-task-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Village Overview */}
      <div className="psc-village-overview">
        <h3>🏘️ Village-wise Overview</h3>
        <div className="psc-village-grid">
          <div className="psc-village-card">
            <h4>Irhpala</h4>
            <p>👥 2,450</p>
            <p>🏠 520</p>
            <p>🌾 8 Schemes</p>
          </div>
          <div className="psc-village-card">
            <h4>Ghatal</h4>
            <p>👥 3,200</p>
            <p>🏠 680</p>
            <p>🌾 12 Schemes</p>
          </div>
          <div className="psc-village-card">
            <h4>Daspur</h4>
            <p>👥 2,800</p>
            <p>🏠 590</p>
            <p>🌾 10 Schemes</p>
          </div>
          <div className="psc-village-card">
            <h4>Kharar</h4>
            <p>👥 1,900</p>
            <p>🏠 410</p>
            <p>🌾 6 Schemes</p>
          </div>
        </div>
      </div>

      {/* Support Citizen Modal */}
      {showSupportForm && (
        <div className="psc-modal-overlay">
          <div className="psc-support-modal">
            <button className="psc-modal-close" onClick={() => setShowSupportForm(false)}>×</button>
            <div className="psc-support-header">
              <div className="psc-support-icon">💬</div>
              <h3>Citizen Support Portal</h3>
              <p>Login to assist citizens with their queries</p>
            </div>

            <form onSubmit={handleSupportLogin} className="psc-support-form">
              <div className="psc-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="support@panchayat.gov.in"
                  required
                />
              </div>

              <div className="psc-input-group">
                <label>Password</label>
                <input
                  type="password"
                  value={supportPassword}
                  onChange={(e) => setSupportPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              {supportError && <div className="psc-error-msg">{supportError}</div>}

              <button type="submit" disabled={supportLoading}>
                {supportLoading ? (
                  <>
                    <span className="psc-spinner"></span>
                    Verifying...
                  </>
                ) : (
                  'Access Support Dashboard →'
                )}
              </button>

              <div className="psc-support-demo">
                <p>🔐 Demo Credentials:</p>
                <code>support@panchayat.gov.in / support@123</code>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PSC;