import React from "react";
import "./Services.css";

const Services = () => {
  // Services with multiple images each (6 images per service)
  const servicesData = [
    {
      id: 1,
      title: "সার্টিফিকেট",
      titleEn: "Certificates",
      icon: "📄",
      description: "জন্ম, মৃত্যু, জাতি, আবাস - সব সনদ অনলাইনে",
      images: [
        "https://static.vecteezy.com/system/resources/thumbnails/006/425/314/small/modern-university-certificate-template-free-vector.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4ZQwAglgpXjWnUk2X8-oIXXPmfdtf6Fhf1cAGeoywA&s",
        "https://i.pinimg.com/236x/94/51/0a/94510ac1a3547b3c0bb022f1713ea724.jpg",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://static.vecteezy.com/system/resources/previews/070/078/118/non_2x/clean-modern-unique-latest-certificate-design-template-vector.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEcIjI-4xLFFycX-aYPUxsim7n0RfdqDiPw&s"
      ]
    },
    {
      id: 2,
      title: "জল সরবরাহ",
      titleEn: "Water Supply",
      icon: "💧",
      description: "নতুন সংযোগ, নলকূপ মেরামত, পানীয় জল",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7zwMro55lZ6Uq9nFeTx8PjMpHDMVal4U8A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgAbkN5Xdbec7YEZ99N6HLL3xZygROt-yf_w&s",
        "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_G-LjG1ufYcnX3mMQV19nzntx5pivO1QgpA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknOY_ZQoVjYXZph9mDOTZUeNZy6uhqH9Vtw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS51DhgVbxc_h2vFNCCLjocXwgw7UdsMtYaTA&s"
      ]
    },
    {
      id: 3,
      title: "রাস্তাঘাট",
      titleEn: "Roads",
      icon: "🛣️",
      description: "পাকা রাস্তা, ড্রেনেজ, মেরামতের কাজ",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBYVJXlVvu-Z-k5dUEDgrX7t4ZpDBTrUFmlQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsW1fYcoS1GB1CMQjfmRqcR-SCoJAuuHmTAg&s",
        "https://images.unsplash.com/photo-1535382651921-5e77ea4458f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFeL9B-g6guEdut4rF5OcSAnRUSD1OzPG-Q&s",
        "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR47P3-ERWzEEfgqN-O1w3WxlCo15-Gd6JxiA&s"
      ]
    },
    {
      id: 4,
      title: "বৃক্ষরোপণ",
      titleEn: "Tree Plantation",
      icon: "🌳",
      description: "চারা বিতরণ, সবুজায়ন, পরিবেশ সুরক্ষা",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnZ4gYBNqaTm4nw0qiy6Ya0J3ij9It9pbFFQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRKNOS1O5N_jd9fqNVPn1TVtoeJTvHCGxAKg&s",
        "https://thumbs.dreamstime.com/b/guatemalan-father-son-planting-new-saplings-guatemala-department-alto-verapaz-san-cristobal-village-mountains-around-82576405.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-fzB6zzYPSEj3XldXPPvjuAmcnx-_hVebjw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY4zpOrH-NKFYv5tLx4lcG3rA4r6-o9X38A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkb6kwT8eZtPNpODDbrr_XZ-spMP3s3NZgQ&s"
      ]
    },
    {
      id: 5,
      title: "কৃষি সহায়তা",
      titleEn: "Farming Support",
      icon: "🌾",
      description: "বীজ, সার, ফসল সুরক্ষা, সেচ ব্যবস্থা",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI63SHcHjezQtbCWyv4Cwq6WV0PW1YNAFW_Q&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEcop9yWKXShnf9WXg1BSCRf5EKQibAGtzUg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8Y3_myF9IvtREV7UX5UBgIemj1s-qhDqvg&s",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIK0JwslDfqaInVfQiiYuw7GIKXsj4uTkA3A&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEA3llDfUCUFXfdgp9I-9ulBxZwN6zEE9K-g&s"
      ]
    }
  ];

  return (
    <div className="village-services" id="services">
      {/* Decorative Elements */}
      <div className="services-sky"></div>
      <div className="services-deco services-deco--left"></div>
      <div className="services-deco services-deco--right"></div>

      <div className="services-container">
        {/* Header */}
        <header className="services-head">
          <h2>ডিজিটাল পদ্ধতিতে সহজ সুবিধা — গ্রামবাসীর হাতে স্বচ্ছ ও দ্রুত পঞ্চায়েত প্রশাসন</h2>
          <p className="services-sub">Empowering rural communities through digital governance</p>
        </header>

        {/* Services with Images - Flexbox layout */}
        {servicesData.map((service) => (
          <div key={service.id} className="service-block">
            <div className="service-title">
              <span className="service-icon-large">{service.icon}</span>
              <h3>{service.title} <span className="title-en">({service.titleEn})</span></h3>
              <p className="service-desc">{service.description}</p>
            </div>

            {/* Image Gallery - Flexbox with left to right auto wrap */}
            <div className="service-gallery">
              {service.images.map((img, idx) => (
                <figure key={idx} className="service-tile">
                  <img src={img} alt={`${service.titleEn} ${idx + 1}`} loading="lazy" />
                  <figcaption>{service.title} - {idx + 1}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Service Cards */}
        {/* <div className="service-cards">
          <div className="service-card-item">
            <span className="card-icon">📄</span>
            <h4>সনদপত্র</h4>
            <p>জন্ম, জাতি, আবাস—সব সনদ অনলাইনে আবেদনে।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">💧</span>
            <h4>জল ও স্যানিটেশন</h4>
            <p>জলসংযোগ, টয়লেট প্রকল্প ট্র্যাকিং ও গ্রিভ্যান্স।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">🛣️</span>
            <h4>পরিকাঠামো</h4>
            <p>রাস্তাঘাট, লাইট, ড্রেনেজ কাজের অগ্রগতি।</p>
          </div>
          <div className="service-card-item">
            <span className="card-icon">🤝</span>
            <h4>জনসেবা</h4>
            <p>হেল্পডেস্ক, আবেদন স্ট্যাটাস, জনশুনানি।</p>
          </div>
        </div> */}

        {/* Stats */}
        <div className="services-stats">
          <div className="stat-item">
            <strong>১,২০০+</strong>
            <span>সনদ ইস্যু</span>
          </div>
          <div className="stat-item">
            <strong>৮৫+</strong>
            <span>সম্পন্ন প্রকল্প</span>
          </div>
          <div className="stat-item">
            <strong>৯৮%</strong>
            <span>সন্তুষ্টি</span>
          </div>
          <div className="stat-item">
            <strong>২৪×৭</strong>
            <span>ডিজিটাল সেবা</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;