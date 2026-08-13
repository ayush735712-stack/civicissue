import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Heart, Phone, Mail, MapPin } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <div className="footer-brand-icon">
                <ShieldAlert size={20} />
              </div>
              <span className="footer-brand-name">Civic<span>Fix</span></span>
            </Link>
            <p className="footer-description">
              Crowdsourced civic issue resolution platform empowering citizens to report, track, and improve municipal infrastructure in real-time.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <Phone size={14} />
                <span>Municipal Helpline: 311 / 1800-CIVIC-FIX</span>
              </div>
              <div className="contact-item">
                <Mail size={14} />
                <span>support@civicfix.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-menu">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/report">Report an Issue</Link></li>
              <li><Link to="/track">Track Complaint Status</Link></li>
              <li><Link to="/map">City Map Explorer</Link></li>
              <li><Link to="/admin">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Report Categories</h4>
            <ul className="footer-menu">
              <li><Link to="/map?category=Potholes">Potholes & Road Defects</Link></li>
              <li><Link to="/map?category=Garbage">Sanitation & Garbage Spills</Link></li>
              <li><Link to="/map?category=Broken Streetlights">Broken Streetlights</Link></li>
              <li><Link to="/map?category=Water Leakage">Water Pipe Leaks</Link></li>
              <li><Link to="/map?category=Drainage">Drainage & Sewage</Link></li>
            </ul>
          </div>

          {/* Civic Mission Statement */}
          <div className="footer-mission-col">
            <h4 className="footer-heading">Citizen Impact</h4>
            <div className="mission-card">
              <div className="mission-stat">
                <span className="stat-number">2,450+</span>
                <span className="stat-label">Issues Resolved</span>
              </div>
              <div className="mission-stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Response Rate</span>
              </div>
            </div>
            <p className="mission-note">
              Participate in making your neighborhood safer, cleaner, and better managed today.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CivicFix Platform. All rights reserved. Built for modern civic governance.</p>
          <div className="footer-badge">
            <Heart size={14} className="heart-icon" /> Powered by Open Data & Citizens
          </div>
        </div>
      </div>
    </footer>
  );
};
