import { useState } from 'react';
import { Link } from 'react-router-dom';

const RAZOR = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 3c-1.7 0-3.2 1-3.9 2.4L14 12l3 8.5c.3.9 1.1 1.5 2 1.5h1V3zM9.9 5.4C9.2 4 7.7 3 6 3v19h1c.9 0 1.7-.6 2-1.5L12 12 9.9 5.4z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div>
          <p className="footer-logo">
            <span className="footer-mark">{RAZOR}</span>
            <span className="footer-logo-name">Styles<em>A</em></span>
          </p>
          <p className="footer-tag">Barbershop — haircuts, shaves and beard work, done properly.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">fb</a>
            <a href="#" aria-label="Twitter">tw</a>
            <a href="#" aria-label="Instagram">ig</a>
          </div>
        </div>
        <div>
          <p className="footer-h">Contact us</p>
          <p className="footer-line">+1 234 567 890</p>
          <p className="footer-line small">3951 Ranchview Dr. Richardson,<br />California 62639</p>
          <p className="footer-line small">
            <a href="mailto:book@stylesa.com">barbershop@stylesa.com</a>
          </p>
        </div>
        <div>
          <p className="footer-h">Subscribe to our newsletter</p>
          <p className="footer-line small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus interdum volutpat urna neque varius.
          </p>
          {joined ? (
            <p className="newsletter-note">You're on the list — see you in your inbox.</p>
          ) : (
            <form className="newsletter-field" onSubmit={subscribe}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>STYLESA © ALL RIGHTS RESERVED</span>
          <span>Walk-ins welcome, appointments cherished.</span>
        </div>
      </div>
    </footer>
  );
}
