const ITEMS = ['Haircut', 'Hot Towel Shave', 'Beard Trim', 'Skin Fade', 'Grey Blending', 'Est. 2015'];

/** Red slash separator, StylesA theme. */
const Slash = () => <em aria-hidden="true">/</em>;

export default function Marquee() {
  const strip = (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="marquee-item">
          {item} <Slash />
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}
