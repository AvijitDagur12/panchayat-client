import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AdminCertificatePanel.css';

const AdminCertificatePanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Demo admin credentials
  const ADMIN_USERNAME = 'user@irhpala.in';
  const ADMIN_PASSWORD = 'irhpala@2026';

  const calculateStats = useCallback((data) => {
    setStats({
      total: data.length,
      pending: data.filter(app => app.status === 'Pending').length,
      approved: data.filter(app => app.status === 'Approved').length,
      rejected: data.filter(app => app.status === 'Rejected').length
    });
  }, []);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://panchayat-backend-new.onrender.com/api/certificates');
      if (response.data.success) {
        setApplications(response.data.data);
        calculateStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateStats]);

  const filterApplications = useCallback(() => {
    let filtered = [...applications];
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.ticketId && app.ticketId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchTerm, filterStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchApplications();
    }
  }, [isLoggedIn, fetchApplications]);

  useEffect(() => {
    filterApplications();
  }, [filterApplications]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
      // Clear form fields after successful login
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid credentials! Use: user@irhpala.in / irhpala@2026');
    }
    setLoginLoading(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    setApplications([]);
    setFilteredApplications([]);
    setSearchTerm('');
    setFilterStatus('All');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://panchayat-backend-new.onrender.com/api/certificate/${id}`, {
        status,
        remarks,
        approvedBy: 'user@irhpala.in',
        approvedDate: new Date()
      });
      
      if (response.data.success) {
        fetchApplications();
        setSelectedApp(null);
        setRemarks('');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved': return 'cert-status-badge approved';
      case 'Rejected': return 'cert-status-badge rejected';
      default: return 'cert-status-badge pending';
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="cert-admin-login-section">
        <div className="cert-admin-login-container">
          <div className="cert-login-header">
            <h2>
              <span className="cert-header-icon">👨‍⚖️</span>
              Elected Admin Panel
              <span className="cert-header-icon">🏛️</span>
            </h2>
            <p className="cert-header-subtitle">Gram Panchayat Certificate Management</p>
          </div>

          <form onSubmit={handleLogin} className="cert-admin-login-form">
            <div className="cert-form-group">
              <label>Admin Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Admin Name"
                required
              />
            </div>

            <div className="cert-form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
            </div>

            {loginError && <div className="cert-error-msg">{loginError}</div>}

            <button type="submit" className="cert-login-btn" disabled={loginLoading}>
              {loginLoading ? (
                <>
                  <span className="cert-spinner"></span> Logging in...
                </>
              ) : (
                'Login to Dashboard →'
              )}
            </button>

            <div className="cert-demo-info">
              <p>🔐 Demo Credentials:</p>
              <p><strong>Username:</strong> user@irhpala.in</p>
              <p><strong>Password:</strong> irhpala@2026</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="cert-admin-dashboard">
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="cert-modal-overlay">
          <div className="cert-logout-modal">
            <div className="cert-logout-modal-header">
              <span className="cert-logout-icon">🚪</span>
              <h3>Confirm Logout</h3>
            </div>
            <div className="cert-logout-modal-body">
              <p>Are you sure you want to logout?</p>
              <p className="cert-logout-warning">You will need to login again to access the dashboard.</p>
            </div>
            <div className="cert-logout-modal-footer">
              <button className="cert-logout-cancel" onClick={handleCancelLogout}>Cancel</button>
              <button className="cert-logout-confirm" onClick={handleConfirmLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

      <div className="cert-dashboard-header">
        <h1>
          🏛️ Panchayat Certificate Management Dashboard
        </h1>
        <div className="cert-admin-info">
          <span>👤 {ADMIN_USERNAME}</span>
          <button className="cert-logout-btn" onClick={handleLogoutClick}>Logout</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="cert-stats-cards">
        <div className="cert-stat-card total">
          <div className="cert-stat-number">{stats.total}</div>
          <div className="cert-stat-label">Total Applications</div>
        </div>
        <div className="cert-stat-card pending">
          <div className="cert-stat-number">{stats.pending}</div>
          <div className="cert-stat-label">Pending</div>
        </div>
        <div className="cert-stat-card approved">
          <div className="cert-stat-number">{stats.approved}</div>
          <div className="cert-stat-label">Approved</div>
        </div>
        <div className="cert-stat-card rejected">
          <div className="cert-stat-number">{stats.rejected}</div>
          <div className="cert-stat-label">Rejected</div>
        </div>
      </div>

      {/* Applications Table - Fixed No Scroll */}
      <div className="cert-applications-table-container">
        <div className="cert-table-header">
          <h3>📋 Applications</h3>
          <button className="cert-refresh-btn" onClick={fetchApplications}>
            🔄 Refresh
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="cert-search-filter-bar">
          <div className="cert-search-box">
            <input
              type="text"
              placeholder="🔍 Search by name, father's name, village or ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cert-search-input"
            />
          </div>
          <div className="cert-filter-box">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="cert-filter-select"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="cert-loading">
            <div className="cert-loading-spinner"></div>
            <p>Loading applications...</p>
          </div>
        ) : (
          <div className="cert-table-fixed">
            <table className="cert-applications-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Applicant Name</th>
                  <th>Father's Name</th>
                  <th>Village</th>
                  <th>Income (₹)</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="cert-no-data">No applications found</td>
                  </tr>
                ) : (
                  filteredApplications.map(app => (
                    <tr key={app._id} className="cert-table-row">
                      <td className="cert-ticket-id-cell">
                        🎫 {app.ticketId || `TKT-${app._id.slice(-6).toUpperCase()}`}
                      </td>
                      <td>{app.applicantName}</td>
                      <td>{app.fatherName}</td>
                      <td>{app.village}</td>
                      <td>₹ {app.monthlyIncome}</td>
                      <td>{new Date(app.submittedAt).toLocaleDateString()}</td>
                      <td>
                        <span className={getStatusBadge(app.status)}>
                          {app.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="cert-view-btn"
                          onClick={() => setSelectedApp(app)}
                        >
                          📋 Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="cert-modal-overlay">
          <div className="cert-modal-content">
            <div className="cert-modal-header">
              <h3>📄 Review Application</h3>
              <button className="cert-close-modal" onClick={() => setSelectedApp(null)}>✕</button>
            </div>
            
            <div className="cert-modal-body">
              <div className="cert-info-grid">
                <div><strong>🎫 Ticket ID:</strong> {selectedApp.ticketId || `TKT-${selectedApp._id.slice(-6).toUpperCase()}`}</div>
                <div><strong>📅 Submitted:</strong> {new Date(selectedApp.submittedAt).toLocaleString()}</div>
                <div><strong>👤 Applicant:</strong> {selectedApp.applicantName}</div>
                <div><strong>👨 Father's Name:</strong> {selectedApp.fatherName}</div>
                <div><strong>🏠 Village:</strong> {selectedApp.village}</div>
                <div><strong>📮 Post Office:</strong> {selectedApp.postOffice}</div>
                <div><strong>💰 Monthly Income:</strong> ₹ {selectedApp.monthlyIncome}</div>
                <div><strong>📝 Income in Words:</strong> {selectedApp.incomeInWords}</div>
              </div>

              <div className="cert-form-group">
                <label>Remarks / Comments</label>
                <textarea
                  rows="3"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add remarks for this application..."
                />
              </div>

              <div className="cert-action-buttons-modal">
                <button 
                  className="cert-approve-btn"
                  onClick={() => updateStatus(selectedApp._id, 'Approved')}
                >
                  ✓ Approve
                </button>
                <button 
                  className="cert-reject-btn"
                  onClick={() => updateStatus(selectedApp._id, 'Rejected')}
                >
                  ✗ Reject
                </button>
                <button 
                  className="cert-pending-btn"
                  onClick={() => updateStatus(selectedApp._id, 'Pending')}
                >
                  ⏳ Mark Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificatePanel;