import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import HeaderNav from "./components/HeaderNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import ApplicationForm from './pages/ApplicationForm';
import ManageProfile from './pages/ManageProfile';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminApplications from './admin/AdminApplications';
import Support from './admin/Support';
import CertificateApplication from './components/CertificateApplication';
import CertificateLogin from './components/CertificateLogin';
import AdminCertificatePanel from './components/AdminCertificatePanel';
import PSC from './components/PSC';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with navbar */}
        <Route
          path="/"
          element={
            <>
              <Topbar />
              <HeaderNav />
              <div style={{ paddingTop: "50px" }}>
                <Hero />
                <About />
                <Services />
                <Contact />
              </div>
            </>
          }
        />

        {/* Auth page with navbar */}
        <Route
          path="/auth"
          element={
            <>
              {/* <Topbar />
              <HeaderNav /> */}
              <div style={{ paddingTop: "0px" }}>
                <Auth />
              </div>
            </>
          }
        />

        {/* Dashboard - NO NAVBAR, pure page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply-certificate" element={<ApplicationForm />} />
        <Route path="/manage-profile" element={<ManageProfile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/adminapplications" element={<AdminApplications />} />
        <Route path="/admin/Support" element={<Support />} />
        <Route path="/certificate-application" element={<CertificateApplication />} />
        <Route path="/download-certificate" element={<CertificateLogin />} />
        <Route path="/admin/certificates" element={<AdminCertificatePanel />} />
        <Route path="/psc" element={<PSC />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;