import React, { useState } from 'react';
import axios from 'axios';
import './AdminCertificatePanel.css';

const AdminCertificatePanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [selectedApp, setSelectedApp] = useState(null);
  const [remarks, setRemarks] = useState('');

  // Demo admin credentials
  const ADMIN_USERNAME = 'NABIN KHAN';
  const ADMIN_PASSWORD = 'nabin123';

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
      fetchApplications();
    } else {
      setLoginError('Invalid credentials! Use: NABIN KHAN / nabin123');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/certificates');
      if (response.data.success) {
        setApplications(response.data.data);
        calculateStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      pending: data.filter(app => app.status === 'Pending').length,
      approved: data.filter(app => app.status === 'Approved').length,
      rejected: data.filter(app => app.status === 'Rejected').length
    });
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/certificate/${id}`, {
        status,
        remarks,
        approvedBy: 'NABIN KHAN',
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

            <button type="submit" className="cert-login-btn">
              Login to Dashboard →
            </button>

            <div className="cert-demo-info">
              <p>🔐 Demo Credentials:</p>
              <p><strong>Username:</strong> NABIN KHAN</p>
              <p><strong>Password:</strong> nabin123</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="cert-admin-dashboard">
      <div className="cert-dashboard-header">
        <h1>
          <i className="fas fa-tasks"></i> Certificate Management Dashboard
        </h1>
        <div className="cert-admin-info">
          <span>👤 {ADMIN_USERNAME}</span>
          <button className="cert-logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
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

      {/* Applications Table */}
      <div className="cert-applications-table-container">
        <div className="cert-table-header">
          <h3>📋 Certificate Applications</h3>
          <button className="cert-refresh-btn" onClick={fetchApplications}>
            🔄 Refresh
          </button>
        </div>

        {loading ? (
          <div className="cert-loading">Loading applications...</div>
        ) : (
          <div className="cert-table-responsive">
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
                {applications.map(app => (
                  <tr key={app._id}>
                    <td className="cert-ticket-id-cell">
                      {app.ticketId || `TKT-${app._id.slice(-6).toUpperCase()}`}
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
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
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
              <h3>Review Application</h3>
              <button className="cert-close-modal" onClick={() => setSelectedApp(null)}>✕</button>
            </div>
            
            <div className="cert-modal-body">
              <div className="cert-info-grid">
                <div><strong>Ticket ID:</strong> TKT-{selectedApp._id.slice(-6).toUpperCase()}</div>
                <div><strong>Submitted:</strong> {new Date(selectedApp.submittedAt).toLocaleString()}</div>
                <div><strong>Applicant:</strong> {selectedApp.applicantName}</div>
                <div><strong>Father's Name:</strong> {selectedApp.fatherName}</div>
                <div><strong>Village:</strong> {selectedApp.village}</div>
                <div><strong>Post Office:</strong> {selectedApp.postOffice}</div>
                <div><strong>Monthly Income:</strong> ₹ {selectedApp.monthlyIncome}</div>
                <div><strong>Income in Words:</strong> {selectedApp.incomeInWords}</div>
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