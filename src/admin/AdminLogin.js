import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('https://mern-panchayet-server.onrender.com/api/admin/login', formData);
      if (res.data.success) {
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bdo-login-container">
      <div className="bdo-login-grid">
        {/* Left Side - Brand Section */}
        <div className="bdo-brand-section">
          <div className="bdo-brand-content">
            <div className="bdo-emblem">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1>Block Development Office</h1>
            <p>Government of West Bengal</p>
            <div className="bdo-divider"></div>
            <h2>Admin Portal</h2>
            <p className="bdo-tagline">Secure Access • Official Use Only</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bdo-form-section">
          <div className="bdo-form-wrapper">
            <h3>Sign In</h3>
            <p className="bdo-welcome">Welcome back, Administrator On Testing Mode</p>

            {error && (
              <div className="bdo-error">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="bdo-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@panchayat.gov.in"
                  required
                />
              </div>

              <div className="bdo-input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password- admin@123"
                  required
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="bdo-spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </button>
            </form>

            <div className="bdo-demo">
              <span>Demo Credentials</span>
              <code>admin@bdo.gov.in / admin123</code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bdo-footer">
        <p>© 2024 Block Development Office • All Rights Reserved</p>
      </div>
    </div>
  );
};

export default AdminLogin;