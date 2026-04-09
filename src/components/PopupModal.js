import React, { useState, useEffect } from 'react';
import './PopupModal.css';

const PopupModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Remove the localStorage check - show every time
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Remove localStorage save
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <button className="popup-cross" onClick={handleClose}>✕</button>
                
                {/* Animated AI Logo */}
                <div className="ai-logo-container">
                    <div className="ai-logo">
                        <span className="ai-icon">🤖</span>
                        <span className="ai-pulse"></span>
                    </div>
                    <div className="ai-text">
                        <span className="ai-title">AI Gram Panchayat</span>
                        <span className="ai-badge">Powered by Artificial Intelligence</span>
                    </div>
                </div>

                <div className="popup-text">
                    <p>
                        আপনাকে ইরপালা গ্রাম পঞ্চায়েত পোর্টালে স্বাগতম।(আন অফিসিয়াল)
                        আমাদের মূল উদ্দেশ্য হলো গ্রাম পঞ্চায়েতের সকল পরিষেবা ডিজিটালভাবে আপনাদের কাছে পৌঁছে দেওয়া, যাতে আপনারা ঘরে বসেই প্রযুক্তির মাধ্যমে নিজের এলাকার সব ধরনের সুযোগ-সুবিধা সহজে উপভোগ করতে পারেন।

                       আপনাদের জন্য একটি AI-ভিত্তিক ডিজিটাল সিস্টেম তৈরি করা হচ্ছে, যেখানে আপনি অনলাইনে আপনার প্রয়োজনীয় তথ্য, পরিষেবা, নোটিশ, সার্টিফিকেট, স্কিম ও অন্যান্য সকল সুবিধা সহজে দেখতে ও ব্যবহার করতে পারবেন।
                        টেস্ট করার উদ্দেশ্যে ডেমো/ভুল ডাটা ব্যবহার করা হয়েছে।
                        অনুগ্রহ করে আপনার মূল্যবান মতামত নিচে দেওয়া ফর্মে লিখে সাবমিট করুন।
                        ধন্যবাদ। 🙏
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PopupModal;