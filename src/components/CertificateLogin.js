import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CertificateLogin.css';

const CertificateLogin = () => {
  const [ticketId, setTicketId] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [expectedSum, setExpectedSum] = useState(0);

  // Generate captcha once when component mounts
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const sum = num1 + num2;
    setCaptcha(`${num1} + ${num2} = ?`);
    setExpectedSum(sum);
  };

  const refreshCaptcha = () => {
    generateCaptcha();
    setCaptchaValue('');
  };

  const handleCaptchaChange = (e) => {
    setCaptchaValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verify captcha
    if (parseInt(captchaValue) !== expectedSum) {
      setError('Invalid captcha. Please try again.');
      refreshCaptcha();
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/api/certificate/ticket/${ticketId}`);
      
      if (response.data.success) {
        setUserData(response.data.data);
        setShowCertificate(true);
      } else {
        setError('Invalid Ticket ID. Please check and try again.');
      }
    } catch (error) {
      setError('Application not found or pending approval.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    window.open(`http://localhost:5000/api/download-certificate-pdf/${userData._id}`, '_blank');
  };

  return (
    <div className="certificate-login-section">
      <div className="certificate-login-container">

        {!showCertificate ? (
          <div className="login-form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Ticket ID / Application ID</label>
                <input
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Enter your Ticket ID (e.g., TKT-230315-ABC123)"
                  required
                />
                <small className="hint">Your Ticket ID was provided after application submission</small>
              </div>

              <div className="form-group captcha-group">
                <label>Security Check</label>
                <div className="captcha-box">
                  <span className="captcha-text">{captcha}</span>
                  <button type="button" className="refresh-captcha" onClick={refreshCaptcha}>
                    🔄
                  </button>
                </div>
                <input
                  type="text"
                  value={captchaValue}
                  onChange={handleCaptchaChange}
                  placeholder="Enter the answer"
                  required
                />
              </div>

              {error && <div className="error-msg">{error}</div>}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Checking...' : 'View Certificate'}
              </button>
            </form>

            <div className="info-box">
              <h4>ℹ️ How to get your Ticket ID?</h4>
              <p>After submitting certificate application, you received a Ticket ID in the success popup. If you lost it, contact the Panchayat Office.</p>
            </div>
          </div>
        ) : (
          <div className="certificate-view-wrapper">

            <div className="certificate-preview-mini">
              <div className="preview-header">
                <h3>{userData?.gramPanchayat || 'ইরপালা গ্রাম পঞ্চায়েত'}</h3>
                <p>{userData?.block || 'ঘাটাল'} ব্লক, {userData?.district || 'পশ্চিম মেদিনীপুর'}</p>
              </div>

              <div className="preview-content">
                <p><strong>Ticket ID:</strong> {userData?.ticketId || '________'}</p>
                <p><strong>বিষয়:</strong> {userData?.subject || '________'}</p>
                
                <p className="preview-text">
                  <strong>আমি</strong> {userData?.applicantName || '________'} 
                  <strong> পিতা/স্বামী</strong> {userData?.fatherName || '________'} 
                  <strong> গ্রাম</strong> {userData?.village || '________'} 
                  <strong> পোঃ</strong> {userData?.postOffice || '________'} 
                  <strong> থানা</strong> ঘাটাল, 
                  <strong> জেলা</strong> পশ্চিম মেদিনীপুর এর বাসিন্দা।
                </p>
                
                <p>
                  আমি একটি স্থায়ী বাসিন্দা। একটি ইনকাম সংক্রান্ত সনদপত্র প্রয়োজন। 
                  আমার পারিবারিক আয় মাসিক <strong>{userData?.monthlyIncome || '________'}</strong> টাকা 
                  <strong> {userData?.incomeInWords || '________'}</strong> (কথায়)।
                </p>

                <div className="status-badge-certificate">
                  <span className={`status-${userData?.status?.toLowerCase() || 'pending'}`}>
                    Status: {userData?.status || 'Pending'}
                  </span>
                </div>
              </div>

              <div className="preview-footer">
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <p>প্রধান, {userData?.gramPanchayat || 'ইরপালা গ্রাম পঞ্চায়েত'}</p>
                  <small>Authorized Signatory</small>
                </div>
                <div className="date-section">
                  <p>তারিখ: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              <div className="certificate-actions">
              <button className="back-btn" onClick={() => setShowCertificate(false)}>
                ← Back
              </button>
              {userData?.status === 'Approved' ? (
                <button className="download-btn" onClick={downloadCertificate}>
                  📄 Download Certificate
                </button>
              ) : (
                <div className="status-warning">
                  <p>⚠️ Your application is <strong>{userData?.status}</strong>. Certificate will be available after admin approval.</p>
                </div>
              )}
            </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateLogin;