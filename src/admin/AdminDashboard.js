import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDevelopmentPopup, setShowDevelopmentPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalApplications: 0,
    totalPopularity: 0,
    reportsCount: 0
  });

  const [reports, setReports] = useState({
    certificatesIssued: 0,
    meetingsHeld: 0,
    complaintsResolved: 0,
    schemesLaunched: 0,
    beneficiaries: 0,
    fundsUtilized: '₹0'
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(adminData));
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appRes] = await Promise.all([
        axios.get('https://panchayat-backend-new.onrender.com/api/admin/applications')
      ]);
      
      const apps = appRes.data || [];
      
      setTimeout(() => {
        setStats({
          totalEmployees: 8,
          totalApplications: apps.length,
          totalPopularity: 12458,
          reportsCount: 24
        });

        setReports({
          certificatesIssued: 184,
          meetingsHeld: 12,
          complaintsResolved: 67,
          schemesLaunched: 8,
          beneficiaries: 1856,
          fundsUtilized: '₹18,75,000'
        });

        setRecentActivities([
          { id: 1, action: 'New BPL Certificate Application', time: '5 mins ago', user: 'Rahul Sharma', village: 'Irhpala' },
          { id: 2, action: 'Income Certificate Approved', time: '2 hours ago', user: 'Priya Singh', village: 'Ghatal' },
          { id: 3, action: 'Gram Sabha Meeting Scheduled', time: '3 hours ago', user: 'Sarpanch', village: 'Irhpala' },
          { id: 4, action: 'Water Supply Complaint Resolved', time: '1 day ago', user: 'Gram Sevak', village: 'Daspur' },
          { id: 5, action: 'New Scheme Application', time: '2 days ago', user: 'Amit Kumar', village: 'Kharar' },
        ]);

        setUpcomingMeetings([
          { id: 1, title: 'Gram Sabha Meeting', date: '25 March 2024', time: '11:00 AM', venue: 'Irhpala Panchayat Office' },
          { id: 2, title: 'Health Camp', date: '28 March 2024', time: '10:00 AM', venue: 'Ghatal Primary Health Center' },
          { id: 3, title: 'Scheme Review Committee', date: '30 March 2024', time: '3:00 PM', venue: 'BDO Office' },
          { id: 4, title: 'Village Development Meeting', date: '2 April 2024', time: '10:30 AM', venue: 'Daspur Gram Panchayat' },
        ]);
        
        setLoading(false);
      }, 800);
      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('session_active');
    navigate('/admin/login');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleUnderDevelopment = (pageName) => {
    setPopupMessage(`${pageName} page is under development. Coming soon! 🚀`);
    setShowDevelopmentPopup(true);
    setTimeout(() => {
      setShowDevelopmentPopup(false);
    }, 3000);
  };

  if (!admin) return null;

  return (
    <div className="admin-dash">
      {/* Loading Overlay */}
      {loading && (
        <div className="admin-loading-overlay">
          <div className="admin-loading-spinner"></div>
          <p>Loading Dashboard Data...</p>
        </div>
      )}

      {/* Under Development Popup */}
      {showDevelopmentPopup && (
        <div className="dev-popup">
          <div className="dev-popup-content">
            <span className="dev-popup-icon">🔨</span>
            <h3>Under Development</h3>
            <p>{popupMessage}</p>
            <div className="dev-progress-bar">
              <div className="dev-progress-fill"></div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <span className="admin-modal-icon">🚪</span>
              <h3>Confirm Logout</h3>
            </div>
            <div className="admin-modal-body">
              <p>Are you sure you want to logout from the Admin Dashboard?</p>
              <p className="admin-modal-warning">You will need to login again to access the portal.</p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-modal-cancel" onClick={handleCancelLogout}>Cancel</button>
              <button className="admin-modal-confirm" onClick={handleConfirmLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header - Always Visible */}
      <div className="admin-header-fixed">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <div className="admin-emblem">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                alt="Ashoka Emblem"
                className="ashoka-emblem"
              />
            </div>
            <div className="admin-title">
              <h1>Block Development Office</h1>
              <p className="header-subtitle">Irhpala Panchayat • Government of West Bengal</p>
            </div>
          </div>
          <div className="admin-date">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Fixed Sidebar - Always Visible */}
      <div className="admin-sidebar-fixed">
        <div className="admin-profile">
          <div className="admin-avatar">
            {admin.name?.charAt(0).toUpperCase()}
          </div>
          <h3>{admin.name}</h3>
          <p>{admin.email}</p>
          <p className="admin-role">BDO • Irhpala Panchayat</p>
        </div>

        <div className="admin-menu">
          <button className="active" onClick={() => window.location.href = '/admin/dashboard'}>
            📊 Main Dashboard
          </button>
          <button onClick={() => { navigate('/admin/AdminApplications'); }}>
            📝 Application Approval
          </button>
          <button onClick={() => handleUnderDevelopment('Employee Management')}>
            👥 Manage Employees
          </button>
          <button onClick={() => handleUnderDevelopment('Panchayat Reports')}>
            📈 Panchayat Reports
          </button>
          <button onClick={() => { navigate('/admin/Support'); }}>
            💬 Citizen Support
          </button>
          <button onClick={() => handleUnderDevelopment('Meeting Schedule')}>
            📅 Meeting Schedule
          </button>
          <button onClick={handleLogoutClick}>🚪 Logout</button>
        </div>

        <div className="sidebar-footer">
          <p>Irhpala Panchayat Portal</p>
          <p>© 2024 • BDO Office</p>
        </div>
      </div>

      {/* Main Content with margins for fixed header and sidebar */}
      <div className="admin-main-fixed">
        {/* Stats Cards - 4 Items */}
        <div className="stats-grid">
          <div className="stat-card primary">
            <span className="stat-icon">👥</span>
            <span className="stat-num">{stats.totalEmployees}</span>
            <span>Total Employees</span>
          </div>
          <div className="stat-card success">
            <span className="stat-icon">📝</span>
            <span className="stat-num">{stats.totalApplications}</span>
            <span>Total Applications</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-icon">🌟</span>
            <span className="stat-num">{stats.totalPopularity.toLocaleString()}</span>
            <span>Total Popularity</span>
          </div>
          <div className="stat-card info">
            <span className="stat-icon">📊</span>
            <span className="stat-num">{stats.reportsCount}</span>
            <span>Reports</span>
            <small>Monthly Reports Generated</small>
          </div>
        </div>

        {/* Panchayat Reports Section */}
        <div className="reports-section">
          <h2>📈 Panchayat Performance Report</h2>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon">📜</div>
              <div className="report-content">
                <h3>Certificates Issued</h3>
                <p className="report-number">{reports.certificatesIssued}</p>
                <p className="report-trend">↑ 15% from last month</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">🗓️</div>
              <div className="report-content">
                <h3>Meetings Held</h3>
                <p className="report-number">{reports.meetingsHeld}</p>
                <p className="report-trend">Gram Sabha: 4, Committee: 8</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">⚙️</div>
              <div className="report-content">
                <h3>Complaints Resolved</h3>
                <p className="report-number">{reports.complaintsResolved}</p>
                <p className="report-trend">96% resolution rate</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">🌾</div>
              <div className="report-content">
                <h3>Schemes Launched</h3>
                <p className="report-number">{reports.schemesLaunched}</p>
                <p className="report-trend">Active: 8, Upcoming: 3</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">👨‍👩‍👧‍👦</div>
              <div className="report-content">
                <h3>Beneficiaries</h3>
                <p className="report-number">{reports.beneficiaries.toLocaleString()}</p>
                <p className="report-trend">Across 4 villages</p>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">💰</div>
              <div className="report-content">
                <h3>Funds Utilized</h3>
                <p className="report-number">{reports.fundsUtilized}</p>
                <p className="report-trend">FY 2024-25</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-two-col">
          {/* Left Column - Recent Activities */}
          <div className="activity-section">
            <h3>📋 Recent Activities</h3>
            <div className="activity-list">
              {recentActivities.map(activity => (
                <div className="activity-item" key={activity.id}>
                  <div className="activity-icon">🔔</div>
                  <div className="activity-details">
                    <p>{activity.action}</p>
                    <small>{activity.user} • {activity.village} • {activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Upcoming Meetings */}
          <div className="meeting-section">
            <h3>📅 Upcoming Meetings</h3>
            <div className="meeting-list">
              {upcomingMeetings.map(meeting => (
                <div className="meeting-card" key={meeting.id}>
                  <div className="meeting-date-box">
                    <span className="meeting-day">{meeting.date.split(' ')[0]}</span>
                    <span className="meeting-month">{meeting.date.split(' ')[1]}</span>
                  </div>
                  <div className="meeting-info">
                    <h4>{meeting.title}</h4>
                    <p>⏰ {meeting.time}</p>
                    <p>📍 {meeting.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div className="action-buttons">
            <button onClick={() => navigate('/admin/AdminApplications')}>
              📝 Review Applications
            </button>
            <button onClick={() => handleUnderDevelopment('Employee Management')}>
              👥 Manage Employees
            </button>
            <button onClick={() => handleUnderDevelopment('Meeting Schedule')}>
              📅 Schedule Meeting
            </button>
            <button onClick={() => handleUnderDevelopment('Generate Report')}>
              📊 Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;