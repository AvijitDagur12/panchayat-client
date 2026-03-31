import React, { useState } from 'react';
import axios from 'axios';
import './CertificateApplication.css';

const CertificateApplication = () => {
  const [formData, setFormData] = useState({
    subject: '',
    applicantName: '',
    fatherName: '',
    village: '',
    postOffice: '',
    policeStation: 'ঘাটাল',
    district: 'পশ্চিম মেদিনীপুর',
    monthlyIncome: '',
    incomeInWords: '',
    gramPanchayat: 'ইরপালা গ্রাম পঞ্চায়েত',
    block: 'ঘাটাল',
    certificateType: 'আয় সংক্রান্ত সনদপত্র'
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [certificateId, setCertificateId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const convertToBengaliWords = (amount) => {
    const words = {
      0: 'শূন্য',
      1: 'এক',
      2: 'দুই',
      3: 'তিন',
      4: 'চার',
      5: 'পাঁচ',
      6: 'ছয়',
      7: 'সাত',
      8: 'আট',
      9: 'নয়',
      10: 'দশ',
      11: 'এগারো',
      12: 'বারো',
      13: 'তেরো',
      14: 'চৌদ্দ',
      15: 'পনেরো',
      16: 'ষোলো',
      17: 'সতেরো',
      18: 'আঠারো',
      19: 'উনিশ',
      20: 'বিশ',
      21: 'একুশ',
      22: 'বাইশ',
      23: 'তেইশ',
      24: 'চব্বিশ',
      25: 'পঁচিশ',
      26: 'ছাব্বিশ',
      27: 'সাতাশ',
      28: 'আঠাশ',
      29: 'ঊনত্রিশ',
      30: 'ত্রিশ',
      40: 'চল্লিশ',
      50: 'পঞ্চাশ',
      60: 'ষাট',
      70: 'সত্তর',
      80: 'আশি',
      90: 'নব্বই',
      100: 'একশো',
      1000: 'এক হাজার'
    };
    
    if (!amount) return '';
    const num = parseInt(amount);
    if (num <= 100) return words[num] || amount;
    return `${amount} টাকা`;
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      monthlyIncome: value,
      incomeInWords: convertToBengaliWords(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/certificate', formData);
      
      if (response.data.success) {
        setCertificateId(response.data.data.ticketId);
        setShowPopup(true);
        setResponseMsg('Certificate application submitted successfully! ✅');
        
        // Reset form
        setFormData({
          subject: '',
          applicantName: '',
          fatherName: '',
          village: '',
          postOffice: '',
          policeStation: 'ঘাটাল',
          district: 'পশ্চিম মেদিনীপুর',
          monthlyIncome: '',
          incomeInWords: '',
          gramPanchayat: 'ইরপালা গ্রাম পঞ্চায়েত',
          block: 'ঘাটাল',
          certificateType: 'আয় সংক্রান্ত সনদপত্র'
        });
      }
    } catch (error) {
      setResponseMsg('Failed to submit application ❌');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setResponseMsg(''), 3000);
    }
  };

  return (
    <div className="certificate-section">
      <div className="certificate-container">
        {/* Header */}
        <div className="certificate-header">
          <h2>
            <span className="header-icon">📜</span>
            পঞ্চায়েত সনদপত্র
            <span className="header-icon">🌾</span>
          </h2>
          <p className="header-subtitle">Gram Panchayat Certificate Application</p>
        </div>

        <div className="certificate-wrapper">
          {/* Form Section */}
          <div className="certificate-form-side">
            <div className="form-section">
              <h4><span className="section-icon">📝</span> সনদপত্রের আবেদন ফর্ম</h4>
              
              {responseMsg && (
                <div className={`response-msg ${responseMsg.includes('✅') ? 'success' : 'error'}`}>
                  {responseMsg}
                </div>
              )}

              <form className="certificate-form" onSubmit={handleSubmit}>
                {/* বিষয় */}
                <div className="form-group">
                  <label>বিষয়</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="বিষয় লিখুন"
                    required 
                  />
                </div>

                {/* নাম */}
                <div className="form-group">
                  <label>আমি</label>
                  <input 
                    type="text" 
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    placeholder="আপনার নাম লিখুন"
                    required 
                  />
                </div>

                {/* পিতা/স্বামীর নাম */}
                <div className="form-group">
                  <label>পিতা / স্বামীর নাম</label>
                  <input 
                    type="text" 
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="পিতা বা স্বামীর নাম লিখুন"
                    required 
                  />
                </div>

                {/* গ্রাম */}
                <div className="form-group">
                  <label>গ্রাম</label>
                  <input 
                    type="text" 
                    name="village"
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="গ্রামের নাম লিখুন"
                    required 
                  />
                </div>

                {/* পোস্ট অফিস */}
                <div className="form-group">
                  <label>পোঃ</label>
                  <input 
                    type="text" 
                    name="postOffice"
                    value={formData.postOffice}
                    onChange={handleChange}
                    placeholder="পোস্ট অফিসের নাম লিখুন"
                    required 
                  />
                </div>

                {/* থানা - Fixed */}
                <div className="form-group fixed-field">
                  <label>থানা</label>
                  <input 
                    type="text" 
                    value="ঘাটাল"
                    disabled
                    className="fixed-input"
                  />
                  <small className="fixed-hint">* Fixed: ঘাটাল</small>
                </div>

                {/* জেলা - Fixed */}
                <div className="form-group fixed-field">
                  <label>জেলা</label>
                  <input 
                    type="text" 
                    value="পশ্চিম মেদিনীপুর"
                    disabled
                    className="fixed-input"
                  />
                  <small className="fixed-hint">* Fixed: পশ্চিম মেদিনীপুর</small>
                </div>

                {/* মাসিক আয় */}
                <div className="form-group">
                  <label>মাসিক আয় (টাকায়)</label>
                  <input 
                    type="number" 
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleIncomeChange}
                    placeholder="মাসিক আয়ের পরিমাণ লিখুন"
                    required 
                  />
                </div>

                {/* আয় কথায় */}
                <div className="form-group">
                  <label>আয় (কথায়)</label>
                  <input 
                    type="text" 
                    value={formData.incomeInWords}
                    disabled
                    className="auto-fill"
                    placeholder="স্বয়ংক্রিয়ভাবে আসবে"
                  />
                  <small className="auto-hint">* মাসিক আয় দিলে স্বয়ংক্রিয়ভাবে আসবে</small>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'সনদপত্রের আবেদন করুন'} 
                  <span className="btn-icon">→</span>
                </button>
              </form>
            </div>
          </div>

          {/* Preview Section - Certificate Preview */}
          <div className="certificate-preview-side">
            <div className="preview-section">
              <h4><span className="section-icon">👁️</span> সনদপত্রের নমুনা</h4>
              
              <div className="certificate-preview">
                <div className="preview-header">
                  <h3>{formData.gramPanchayat}</h3>
                  <p>{formData.block} ব্লক, {formData.district}</p>
                </div>

                <div className="preview-content">
                  <p><strong>বিষয়:</strong> {formData.subject || '________'}</p>
                  
                  <p className="preview-text">
                    <strong>আমি</strong> {formData.applicantName || '________'} 
                    <strong> পিতা/স্বামী</strong> {formData.fatherName || '________'} 
                    <strong> গ্রাম</strong> {formData.village || '________'} 
                    <strong> পোঃ</strong> {formData.postOffice || '________'} 
                    <strong> থানা</strong> ঘাটাল, 
                    <strong> জেলা</strong> পশ্চিম মেদিনীপুর এর বাসিন্দা।
                  </p>
                  
                  <p>
                    আমি একটি স্থায়ী বাসিন্দা। একটি ইনকাম সংক্রান্ত সনদপত্র প্রয়োজন। 
                    আমার পারিবারিক আয় মাসিক <strong>{formData.monthlyIncome || '________'}</strong> টাকা 
                    <strong> {formData.incomeInWords || '________'}</strong> (কথায়)।
                  </p>
                </div>

                <div className="preview-footer">
                  <div className="signature-line">
                    <div className="signature"></div>
                    <p>প্রধান, {formData.gramPanchayat}</p>
                  </div>
                  <div className="date-line">
                    <p>তারিখ: ________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="certificate-footer">
          <div className="footer-bottom">
            <p className="copyright">
              © 2024 Gram Panchayat Portal. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">✅</div>
            <h3>অভিনন্দন!</h3>
            <p>আপনার সনদপত্রের আবেদন সফলভাবে জমা হয়েছে।</p>
            <p className="popup-id">Certificate ID: {certificateId}</p>
            <p className="popup-msg">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            <button className="popup-btn" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateApplication;