import { contactEmail, lastUpdated } from '../config';

export default function PrivacyPolicy() {
  return (
    <article className="document-page" aria-labelledby="privacy-title">
      <h1 id="privacy-title">Privacy Policy</h1>
      <p className="updated">Effective Date / Last Updated: {lastUpdated}</p>

      <section>
        <h2>Overview</h2>
        <p>
          Caffinity is a local-first caffeine tracking app. Caffinity v1.0 works without an account, 
          login, ads, analytics, backend server, or online account system.
        </p>
        <p>
          Caffinity does not sell user data and does not share user data with advertisers,
          analytics providers, or backend services.
        </p>
      </section>

      <section>
        <h2>Data Stored On Your Device</h2>
        <p>
          Caffinity stores app data locally on your device using local app storage. This may include
          caffeine logs, drink entries, selected drink names and sizes, custom drink types, custom
          serving sizes, settings such as theme, units, daily limit, and notification preference,
          plus modeled caffeine, alertness, and tolerance values generated from your logs and settings.
        </p>
      </section>

      <section>
        <h2>Notifications</h2>
        <p>
          Caffinity may offer optional local wear-off or caffeine-clear reminders. These reminders
          are local device notifications. The app does not send notification data to a server.
        </p>
      </section>

      <section>
        <h2>Deleting Data</h2>
        <p>
          You can delete data by deleting logs where the app supports it, clearing Caffinity app data
          in Android settings, or uninstalling the app.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>Caffinity is not directed to children.</p>
      </section>

      <section>
        <h2>Modeled Estimates and Health Disclaimer</h2>
        <p>
          Caffeine level, alertness, tolerance, and wear-off values are modeled estimates for personal
          tracking and informational use. Caffinity does not measure caffeine in the body directly,
          is not a medical device, and does not provide medical advice.
        </p>
      </section>

      <section>
        <h2>Policy Changes</h2>
        <p>
          This privacy policy may be updated from time to time. Updates will appear on this page with
          a revised effective date.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </article>
  );
}
