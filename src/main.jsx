import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import AppLogo from './components/AppLogo';
import { contactEmail } from './config';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './styles.css';

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'Caffinity | Caffeine Tracker',
      '/privacy': 'Privacy Policy | Caffinity',
      '/faq': 'FAQ | Caffinity',
    };

    document.title = titles[location.pathname] || titles['/'];
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

function Layout() {
  return (
    <HashRouter>
      <ScrollAndTitle />
      <div className="site-shell">
        <header className="topbar">
          <NavLink to="/" className="brand" aria-label="Caffinity home">
            <AppLogo />
            <span>Caffinity</span>
          </NavLink>
          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-brand">
            <AppLogo className="footer-logo" />
            <strong>Caffinity</strong>
            <p>&copy; 2026 Caffinity. All rights reserved.</p>
          </div>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </footer>
      </div>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
);
