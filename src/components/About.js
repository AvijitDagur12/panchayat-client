import React from "react";
import "./About.css";

import PradhanImg from "../assets/prodhan.jpg";
import UpPradhanImg from "../assets/upo.avif";

const About = () => {
  const panchayat = {
    name: "ইরপালা গ্রাম পঞ্চায়েত",
    block: "Ghatal",
    district: "Paschim Medinipur",
    state: "West Bengal",
    established: "1952",
    office: "Irhpala Gram Panchayat Office",
    population: "8,240+",
    households: "1,620+",
    villagesCovered: "12",
    pinCode: "721212",
    email: "irhpala.gp@wb.gov.in",
    website: "www.irhpalagp.in",
  };

  const statsData = [
    { value: panchayat.established, label: "Year Est.", icon: "🏛️" },
    { value: panchayat.population, label: "Population", icon: "👥" },
    { value: panchayat.households, label: "Households", icon: "🏠" },
    { value: panchayat.villagesCovered, label: "Villages", icon: "🌾" },
  ];

  const leaders = [
    {
      name: "Mr. US",
      role: "Pradhan",
      village: "Jadupur",
      tenure: "2025 - Present",
      phone: "9876543210",
      image: PradhanImg,
      idNumber: "GP/JDP/001",
      ward: "Ward No. 05",
    },
    {
      name: "Mrs. BP",
      role: "Upa Pradhan",
      village: "Joykundu",
      tenure: "2025 - Present",
      phone: "8765432109",
      image: UpPradhanImg,
      idNumber: "GP/JKD/002",
      ward: "Ward No. 08",
    },
  ];

  const services = [
    { icon: "📄", name: "Certificates", desc: "Income, Caste, Domicile", color: "#3b82f6" },
    { icon: "🏗️", name: "Development", desc: "Infrastructure & Planning", color: "#f97316" },
    { icon: "💧", name: "Utilities", desc: "Water, Sanitation, Roads", color: "#10b981" },
    { icon: "📢", name: "Grievances", desc: "Public Issue Redressal", color: "#8b5cf6" },
  ];

  const infoBoxes = [
    { icon: "👨🏻‍💻", title: "Meet Developer", line1: "Name : Avijit Dagur", line2: "Kismot,Ghatal,Paschim Medinipur, [avijitdagur80@gmail.com]" },
    { icon: "🏢", title: "Profession", line1: "B.Tech Computer Science & Engineering Student (3rd Year)", line2: "Swami Vivekananda University, Kolkata" },
  ];

  return (
    <section className="ab-psection">
      <div className="ab-container">
        
        {/* HERO CARD */}
        <div className="ab-hero-card">
          <div className="ab-hero-badges">
            <span className="ab-badge1">🏛️ Gram Panchayat</span>
            <span className="ab-badge2">🇮🇳 Since 1952</span>
          </div>
          <h1 className="ab-hero-title">{panchayat.name}</h1>
          <p className="ab-hero-text">
            Empowering rural communities through transparent governance, digital services, 
            and sustainable development in <strong>Ghatal, Paschim Medinipur</strong>
          </p>
          <div className="ab-hero-stats">
            {statsData.map((stat, idx) => (
              <div key={idx} className="ab-hero-stat">
                <span>{stat.icon}</span>
                <div>
                  <strong>{stat.value}</strong>
                  <small>{stat.label}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="ab-quote">
            <p>“ Seva, Sushasan, Vikas — Service, Governance, Development ”</p>
            <span>🇮🇳 Panchayati Raj System</span>
          </div>
        </div>

        {/* INFO BOXES GRID - 3 IN ROW ON DESKTOP, 2 ON TABLET, 1 ON MOBILE */}
        <div className="ab-info-grid">
          {infoBoxes.map((box, idx) => (
            <div key={idx} className="ab-info-card">
              <div className="ab-info-icon">{box.icon}</div>
              <h3>{box.title}</h3>
              <p>{box.line1}</p>
              <small>{box.line2}</small>
            </div>
          ))}
        </div>

        {/* ABOUT + SERVICES SECTION */}
        <div className="ab-two-col">
          <div className="ab-about-box">
            <div className="ab-box-header">
              <span>📖</span>
              <h2>About Our Panchayat</h2>
            </div>
            <div className="ab-about-body">
              <p className="ab-lead">
                {panchayat.name} stands as a beacon of grassroots democracy, serving the vibrant communities of Ghatal region.
              </p>
              <p>
                Established in <strong>1952</strong>, our panchayat has been instrumental in driving rural transformation, 
                empowering local communities, and ensuring that development reaches every doorstep.
              </p>
              <div className="ab-features">
                <div><span>✅</span> 12 villages under jurisdiction</div>
                <div><span>✅</span> 100% digital service delivery</div>
                <div><span>✅</span> Transparent grievance system</div>
              </div>
            </div>
          </div>

          <div className="ab-services-box">
            <div className="ab-box-header">
              <span>⚙️</span>
              <h2>Key Services</h2>
            </div>
            <div className="ab-services-grid">
              {services.map((service, idx) => (
                <div key={idx} className="ab-service-card" style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)` }}>
                  <div className="ab-service-icon">{service.icon}</div>
                  <h4>{service.name}</h4>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEADERS + MISSION/VISION IN SAME ROW */}
        <div className="ab-bottom-row">
          {/* LEFT SIDE - Leaders (Pradhan & Upa Pradhan) */}
          <div className="ab-leaders-container">
            {leaders.map((leader, idx) => (
              <div key={idx} className="ab-leader-simple-card">
                <div className="ab-leader-image">
                  <img src={leader.image} alt={leader.name} />
                  <div className={`ab-leader-role-badge ${leader.role === 'Pradhan' ? 'pradhan-badge' : 'upapradhan-badge'}`}>
                    {leader.role}
                  </div>
                </div>
                <div className="ab-leader-details-simple">
                  <h3>{leader.name}</h3>
                  <p className="ab-leader-location">📍 {leader.village}</p>
                  <div className="ab-leader-meta">
                    <span>🆔 {leader.idNumber}</span>
                    <span>🗳️ {leader.ward}</span>
                    <span>📅 {leader.tenure}</span>
                  </div>
                  <a href={`tel:${leader.phone}`} className="ab-leader-call">
                    📞 Call {leader.role}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - Mission & Vision */}
          <div className="ab-mv-container">
            <div className="ab-mv-simple-card">
              <div className="ab-mv-icon">🎯</div>
              <h3>Our Vision</h3>
              <p>একটা AI-ভিত্তিক আদর্শ গ্রাম পঞ্চায়েত গড়ে তোলা, যেখানে প্রতিটি নাগরিক ভালো সেবা, স্বচ্ছ প্রশাসন এবং টেকসই উন্নয়নের সুযোগ পাবে।</p>
            </div>
            <div className="ab-mv-simple-card">
              <div className="ab-mv-icon">🚀</div>
              <h3>Our Mission</h3>
              <p>AI ব্যবহার করে নাগরিক-কেন্দ্রিক সেবা প্রদান, জনগণের অংশগ্রহণে পরিকল্পনা করা এবং সবার জন্য সমান উন্নয়ন নিশ্চিত করা।</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;