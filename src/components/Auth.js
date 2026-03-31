import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    village: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const res = await fetch("https://checkirpala.onrender.com/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        
        const result = await res.json();
        
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard');
        } else {
          alert(result.error || "Login failed");
        }
        
      } else {
        // REGISTER
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          setLoading(false);
          return;
        }
        
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("village", formData.village);
        data.append("password", formData.password);
        if (formData.photo) data.append("photo", formData.photo);

        const res = await fetch("https://checkirpala.onrender.com/api/register", {
          method: "POST",
          body: data,
        });
        
        const result = await res.json();
        
        if (res.ok) {
          alert("Registration successful! Please login.");
          setIsLogin(true);
        } else {
          alert(result.error || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="citizen-auth-container">
      <div className="citizen-auth-grid">
        {/* Left Side - Brand Section */}
        <div className="citizen-brand-section">
          <div className="citizen-brand-content">
            <div className="citizen-emblem">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h1>Irhpala Gram Panchayat</h1>
            <p>Village Citizen Services</p>
            <div className="citizen-divider"></div>
            <h2>Digital Seva Portal</h2>
            <p className="citizen-tagline">Access Government Services • Apply for Certificates • Track Applications</p>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="citizen-form-section">
          <div className="citizen-form-wrapper">
            <div className="citizen-auth-toggle">
              <button 
                className={isLogin ? "citizen-active" : ""} 
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button 
                className={!isLogin ? "citizen-active" : ""} 
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>

            {isLogin ? (
              // LOGIN FORM
              <form className="citizen-form" onSubmit={handleSubmit}>
                <div className="citizen-input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="citizen@example.com"
                    required
                  />
                </div>

                <div className="citizen-input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="citizen-spinner"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
            ) : (
              // REGISTER FORM
              <form className="citizen-form citizen-register-form" onSubmit={handleSubmit}>
                <div className="citizen-form-grid">
                  <div className="citizen-input-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="citizen-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="citizen@example.com"
                      required
                    />
                  </div>

                  <div className="citizen-input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="citizen-input-group">
                    <label>Village</label>
                    <select name="village" onChange={handleChange} required>
                      <option value="">Select Village</option>
                      <option value="Ghatal">Ghatal</option>
                      <option value="Daspur">Daspur</option>
                      <option value="Irhpala">Irhpala</option>
                      <option value="Kharar">Kharar</option>
                    </select>
                  </div>

                  <div className="citizen-input-group">
                    <label>Profile Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                    {photoPreview && (
                      <div className="citizen-photo-preview">
                        <img src={photoPreview} alt="Preview" />
                      </div>
                    )}
                  </div>

                  <div className="citizen-input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                    />
                  </div>

                  <div className="citizen-input-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="citizen-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Register Account'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="citizen-footer">
        <p>© 2024 Gram Panchayat • Citizen Services Portal • All Rights Reserved</p>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="citizen-loading-overlay">
          <div className="citizen-loading-spinner"></div>
          <p>{isLogin ? 'Signing in...' : 'Creating account...'}</p>
        </div>
      )}
    </div>
  );
};

export default Auth;