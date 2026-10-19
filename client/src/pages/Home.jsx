import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';
import Reveal from '../components/Reveal.jsx';
import SmartImage from '../components/SmartImage.jsx';
import Eyebrow from '../components/Eyebrow.jsx';
import Marquee from '../components/Marquee.jsx';
import Stars from '../components/Stars.jsx';

const U = (id, w = 1400) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO_BG = U('photo-1503951914875-452162b0f3f1', 2000);
const CARDS = [
  { title: 'The Place', img: U('photo-1585747860715-2ba37e788b70'), to: '/booking', note: 'Details' },
  { title: 'Barbers', img: U('photo-1605497788044-5a32c7078486'), to: '/barbers', note: 'Details' },
  { title: 'Philosophy', img: U('photo-1517832606299-7ae9b720a186'), to: '/services', note: 'Details' },
];
const ABOUT_IMG = U('photo-1621605815971-fbc98d665033', 900);
const COLLAGE = [
  U('photo-1519345182560-3f2917c472ef', 700),
  U('photo-1521490878406-2f2e1d1e0f6a', 700),
  U('photo-1622287162716-f311baa1a2b8', 900),
];
const JOURNAL = [
  { title: '5 advantages why you should visit barbershop', img: U('photo-1605497788044-5a32c7078486', 700) },
  { title: 'Popular cosmetics for hair styling', img: U('photo-1519345182560-3f2917c472ef', 700) },
  { title: 'Features of beard and moustache care', img: U('photo-1503951914875-452162b0f3f1', 700) },
];

const FALLBACK_QUOTES = [
  {
    _id: 'q1',
    authorName: 'Martin C.',
    rating: 5,
    comment:
      'Being in this business for almost a decade, I can tell this place is absolutely worth your time and money. Great incredible job, keep it up boys!',
  },
  {
    _id: 'q2',
    authorName: 'Dave R.',
    rating: 5,
    comment: 'The hot towel shave is a ritual. Forty-five minutes later I walked out a new man.',
  },
];

const SERVICE_ICONS = {
  haircut: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 3c-1.7 0-3.2 1-3.9 2.4L14 12l3 8.5c.3.9 1.1 1.5 2 1.5h1V3zM9.9 5.4C9.2 4 7.7 3 6 3v19h1c.9 0 1.7-.6 2-1.5L12 12 9.9 5.4z" />
    </svg>
  ),
  beard: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C8.7 2 6 4.7 6 8v3c0 4.4 2.7 9 6 11 3.3-2 6-6.6 6-11V8c0-3.3-2.7-6-6-6zm3.5 4.6c.4-.2.9 0 1.1.4.3.5.1 1.1-.3 1.4-.9.5-2.3.6-3.3.6-.5 0-.9-.4-.9-.9s.4-.9.9-.9c1 0 2-.1 2.5-.6zm-7.1.4c.2-.4.7-.6 1.1-.4.5.5 1.5.6 2.5.6.5 0 .9.4.9.9s-.4.9-.9.9c-1 0-2.4-.1-3.3-.6-.4-.3-.6-.9-.3-1.4zM12 19c-1.3 0-2.4-.9-2.4-2h4.8c0 1.1-1.1 2-2.4 2z" />
    </svg>
  ),
  shave: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.1 3.3 16.7 5.7c-.8-.2-1.7 0-2.3.6L8 12.7l3.3 3.3 6.4-6.4c.6-.6.8-1.5.6-2.3l2.4-2.4-1.6-1.6zM4.7 14.2c-.6.6-.6 1.5 0 2.1l3 3c.6.6 1.5.6 2.1 0l1.8-1.8-3-3-3.9-.3z" />
    </svg>
  ),
  combo: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8zM6 17c-1.7 0-3 1.3-3 3s1.3 2 3 2h12c1.7 0 3-.3 3-2s-1.3-3-3-3H6z" />
    </svg>
  ),
  extras: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2 2.9 6.3L22 9.2l-5 4.9 1.2 7L12 17.8 5.8 21l1.2-7-5-4.9 7.1-.9L12 2z" />
    </svg>
  ),
};

/* icon shown when a service has no known category */
const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2 2.9 6.3L22 9.2l-5 4.9 1.2 7L12 17.8 5.8 21l1.2-7-5-4.9 7.1-.9L12 2z" />
  </svg>
);

export default function Home() {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [reviews, setReviews] = useState(FALLBACK_QUOTES);
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    api.get('/services').then((r) => setServices(r.data.services)).catch(() => {});
    api.get('/stylists').then((r) => setStylists(r.data.stylists)).catch(() => {});
    api
      .get('/reviews?limit=6')
      .then((r) => r.data.reviews.length && setReviews(r.data.reviews))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => setQuote((q) => (q + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, [reviews.length]);

  const menu = services.slice(0, 6);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="hero-shade" />
        <div className="hero-inner stagger">
          <h1 className="hero-title">We will keep you an impeccable look</h1>
          <p className="hero-sub">
            3951 Ranchview Dr. Richardson,
            <br />
            California 62639
          </p>
          <p className="hero-phone">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
            </svg>
            +1 234 567 890
          </p>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      <div className="hero-slash" aria-hidden="true" />

      <Marquee />

      {/* ============ ABOUT ============ */}
      <section className="section">
        <div className="container about-grid">
          <Reveal className="about-copy">
            <h2 className="h2 rule">Professional barbershop for men only</h2>
            <p className="muted">
              Et tellus rhoncus urna a. Tempus felis, sociis libero aliquet nibh pellentesque. Vitae nunc dolor,
              blandit eget eleifend etiam id. Amet arcu lobortis sed pulvinar cursus pretium sit pretium.
            </p>
            <div className="about-stats">
              <div>
                <p className="stat-pair-num">Since 2015</p>
                <p className="stat-pair-sub">Duis cursus eget at ipsum curus urna fringilla ris enim duis ozac odio</p>
              </div>
              <div>
                <p className="stat-pair-num">1000+ Clients</p>
                <p className="stat-pair-sub">Metas viverra vitae habitant lorem porta scelerisque facilisis lobortis</p>
              </div>
            </div>
            <Link to="/services" className="btn btn-sm">
              Learn more
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICE MENU ============ */}
      <section className="section section-smoke">
        <div className="container menu-wrap">
          <Reveal className="menu-head">
            <h2 className="h2 rule">What we provide</h2>
            <p className="muted">
              Risus odio lobortis ullamcorper felis vitae bibendum mi. Penatibus fusce consequat donec vitae porttitor
              elementum ni.
            </p>
          </Reveal>
          <div className="svc-grid">
            {menu.map((s, i) => (
              <Reveal key={s._id} delay={i * 80} className="svc-card">
                <div className="svc-icon">
                  {SERVICE_ICONS[s.category] || DEFAULT_ICON}
                  <Link to={`/booking?service=${s._id}`} className="svc-quick" aria-label={`Book ${s.name} now`}>
                    +
                  </Link>
                </div>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-desc">{s.description || 'Scissors, clippers and a steamed towel — done properly.'}</p>
                <p className="svc-price">
                  from <strong>${s.price}</strong>
                </p>
              </Reveal>
            ))}
            {menu.length === 0 && (
              <p className="muted center">Start the API and run the seed to load the service menu.</p>
            )}
          </div>
          <Reveal delay={200} className="center">
            <Link to="/services" className="btn">
              Full price list &amp; booking
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ TEAM + HOURS BAND ============ */}
      <section className="band">
        <div className="band-bg" style={{ backgroundImage: `url(${COLLAGE[2]})` }} />
        <div className="band-shade" />
        <div className="container band-grid">
          <Reveal className="band-copy">
            <h2 className="h2">Team of professionals is waiting for you</h2>
            <p className="muted">
              Risus odio lobortis ullamcorper felis vitae bibendum mi. Penatibus fusce consequat donec vitae
              porttitor aenean volutpat gravida. Tellus hac tristique nisi, id amet cras tempus amet.
            </p>
            <Link to="/barbers" className="btn">
              Book now
            </Link>
          </Reveal>

          <Reveal delay={150} className="band-hours">
            <h3 className="hours-h">Special opening hours</h3>
            <div className="hours-row">
              <span>Monday</span>
              <span>9:00 am — 7:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Tuesday</span>
              <span>9:00 am — 7:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Wednesday</span>
              <span>9:00 am — 7:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Thursday</span>
              <span>9:00 am — 7:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Friday</span>
              <span>9:00 am — 7:30 pm</span>
            </div>
            <div className="hours-row">
              <span>Sat–Sun</span>
              <span>Closed</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BARBERS ============ */}
      <section className="section">
        <div className="container">
          <Reveal className="center">
            <Eyebrow>The crew</Eyebrow>
            <h2 className="h2 rule rule-center">Pick your barber</h2>
          </Reveal>
          <div className="crew-grid">
            {stylists.slice(0, 4).map((b, i) => (
              <Reveal key={b._id} delay={i * 100} className="crew-card">
                <div className="crew-photo">
                  <SmartImage src={b.photo} alt={b.name} />
                </div>
                <h3 className="crew-name">{b.name}</h3>
                <p className="crew-title">{b.title}</p>
                {b.rating?.count > 0 && (
                  <p className="crew-rating">
                    <Stars value={Math.round(b.rating.avg)} /> {b.rating.avg} ({b.rating.count})
                  </p>
                )}
                <Link to={`/booking?stylist=${b._id}`} className="crew-book">
                  Book with {b.name.split(' ')[0]} →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNAL ============ */}
      <section className="section section-smoke">
        <div className="container">
          <Reveal>
            <h2 className="h2 rule journal-head">Our blog</h2>
          </Reveal>
          <div className="journal-grid">
            {JOURNAL.map((post, i) => (
              <Reveal key={post.title} delay={i * 110} className="journal-card">
                <Link to="/services">
                  <div className="journal-media">
                    <SmartImage src={post.img} alt={post.title} />
                  </div>
                  <span className="journal-title">{post.title}</span>
                  <span className="journal-date"> Read more </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testi">
        <div className="testi-collage" aria-hidden="true">
          <SmartImage src={COLLAGE[0]} alt="" className="testi-img a" />
          <SmartImage src={COLLAGE[1]} alt="" className="testi-img b" />
          <SmartImage src={COLLAGE[2]} alt="" className="testi-img c" />
        </div>
        <div className="testi-panel">
          <Reveal>
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="h2 testi-title">Clients say</h2>
            <div className="testi-quotes">
              {reviews.map((r, i) => (
                <blockquote key={r._id} className={`testi-quote ${i === quote ? 'on' : ''}`}>
                  <p>“{r.comment}”</p>
                  <footer>
                    <Stars value={r.rating} />
                    <cite>
                      {r.authorName}
                      {r.stylist?.name ? `, on ${r.stylist.name}` : ''}
                    </cite>
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="testi-dots">
              {reviews.map((r, i) => (
                <button
                  key={r._id}
                  className={i === quote ? 'on' : ''}
                  onClick={() => setQuote(i)}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="cta-band">
        <div className="container center">
          <Reveal>
            <p className="eyebrow eyebrow-light">No waiting around</p>
            <h2 className="cta-title">Ready for a fresh cut?</h2>
            <p className="cta-sub">Pick a service, a barber and a time — done in under a minute.</p>
            <Link to="/booking" className="btn btn-lg">
              Book your chair
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
