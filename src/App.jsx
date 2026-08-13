import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ComplaintProvider } from './context/ComplaintContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { TrackPage } from './pages/TrackPage';
import { MapPage } from './pages/MapPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  return (
    <ComplaintProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ComplaintProvider>
  );
}

export default App;
