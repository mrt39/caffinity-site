import { NavLink } from 'react-router-dom';
import AppLogo from '../components/AppLogo';
import CaffeineStatusCircle from '../components/CaffeineStatusCircle';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="hero-title-lockup">
            <AppLogo className="hero-logo" />
            <h1 id="home-title">Caffinity</h1>
          </div>
          <p className="tagline">See your caffeine flow.</p>
          <p className="hero-description">
            A clean caffeine tracker for intake, alertness, tolerance, and timing.
          </p>
          <div className="hero-actions" aria-label="Primary pages">
            <NavLink className="button secondary" to="/privacy">
              Privacy Policy
            </NavLink>
            <NavLink className="button secondary" to="/faq">
              FAQ
            </NavLink>
          </div>
        </div>
        <div className="status-circle-panel">
          <CaffeineStatusCircle />
        </div>
      </section>

      <section className="content-band" aria-labelledby="quick-notes-title">
        <div className="section-heading">
          <h2 id="quick-notes-title">Local-first, quiet, and simple.</h2>
        </div>
        <div className="feature-grid">
          <article>
            <h3>No account</h3>
            <p>Caffinity works without login, cloud sync, ads, analytics, or a backend server.</p>
          </article>
          <article>
            <h3>Modeled over time</h3>
            <p>Drinks can stack as Caffinity estimates absorption, active caffeine, and wear-off timing.</p>
          </article>
          <article>
            <h3>Made for tracking</h3>
            <p>Daily totals, calendar history, custom drinks, units, themes, and optional reminders are supported.</p>
          </article>
        </div>
      </section>
    </>
  );
}
