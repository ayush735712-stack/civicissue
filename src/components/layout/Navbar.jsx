import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MapPin, PlusCircle, Search, Map, LayoutDashboard, Menu, X, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div className="brand-icon-wrapper">
            <ShieldAlert size={22} className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Civic<span className="brand-accent">Fix</span></span>
            <span className="brand-tagline">City Resolution Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <PlusCircle size={16} />
            <span>Report Issue</span>
          </NavLink>
          <NavLink to="/track" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Search size={16} />
            <span>Track Complaint</span>
          </NavLink>
          <NavLink to="/map" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Map size={16} />
            <span>Map View</span>
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `nav-link admin-nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={16} />
            <span>Admin</span>
          </NavLink>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions desktop-actions">
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => navigate('/report')}>
            Report an Issue
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer animate-fade-in">
          <nav className="mobile-nav-list">
            <NavLink to="/" end className="mobile-nav-item" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/report" className="mobile-nav-item" onClick={closeMenu}>
              <PlusCircle size={18} />
              <span>Report Issue</span>
            </NavLink>
            <NavLink to="/track" className="mobile-nav-item" onClick={closeMenu}>
              <Search size={18} />
              <span>Track Complaint</span>
            </NavLink>
            <NavLink to="/map" className="mobile-nav-item" onClick={closeMenu}>
              <Map size={18} />
              <span>Map Explorer</span>
            </NavLink>
            <NavLink to="/admin" className="mobile-nav-item admin-item" onClick={closeMenu}>
              <LayoutDashboard size={18} />
              <span>Admin Dashboard</span>
            </NavLink>
          </nav>
          <div className="mobile-drawer-footer">
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={PlusCircle}
              onClick={() => {
                closeMenu();
                navigate('/report');
              }}
            >
              Report an Issue
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
