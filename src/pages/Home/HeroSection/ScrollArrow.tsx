export function ScrollArrow() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <circle
        className="hero-scroll-arrow__circle"
        cx="34"
        cy="34"
        r="30"
        stroke="#e0e0e0"
        strokeWidth="1.2"
      />
      <line
        x1="34"
        y1="22"
        x2="34"
        y2="46"
        stroke="#111"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <polyline
        points="25,36 34,46 43,36"
        stroke="#111"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
