import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/barbers', label: 'Gallery' },
  { to: '/account', label: 'My bookings' },
];

const RAZOR = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 3c-1.7 0-3.2 1-3.9 2.4L14 12l3 8.5c.3.9 1.1 1.5 2 1.5h1V3zM9.9 5.4C9.2 4 7.7 3 6 3v19h1c.9 0 1.7-.6 2-1.5L12 12 9.9 5.4z" />
  </svg>
);

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <div className="nav-top container">
        <div className="nav-left">
          <Link to="/" className="nav-logo" onClick={close} aria-label="StylesA home">
            <span className="nav-logo-mark">{RAZOR}</span>
            <span className="nav-logo-word">Styles<em>A</em></span>
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l, i) => (
              <NavLink
                key={i}
                to={l.to}
                end={l.to === '/'}
                className="nav-link"
                onClick={close}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name.split(' ')[0]}</span>
              {user.role === 'admin' && (
                <Link className="nav-mini-link" to="/admin">
                  Dashboard
                </Link>
              )}
              <button
                className="nav-mini-link"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link className="nav-mini-link" to="/login">
              Sign in
            </Link>
          )}
          <Link to="/booking" className="btn btn-sm">
            Book now
          </Link>
        </div>

        <button
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div className="nav-mobile" role="dialog" aria-modal="true" aria-label="Menu">
        <nav className="nav-mobile-links">
          {LINKS.map((l, i) => (
            <NavLink
              key={i}
              to={l.to}
              end={l.to === '/'}
              className="nav-mobile-link"
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              onClick={close}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="nav-mobile-cta" style={{ transitionDelay: open ? '450ms' : '0ms' }}>
            <Link to="/booking" className="btn" onClick={close}>
              Book now
            </Link>
            {user ? (
              <div className="nav-mobile-account">
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={close}>
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    close();
                    navigate('/');
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-mobile-account" onClick={close}>
                Sign in / Register
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
