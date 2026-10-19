/** Small red section label, StylesA theme (no decorative tildes). */
export default function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{children}</p>;
}
