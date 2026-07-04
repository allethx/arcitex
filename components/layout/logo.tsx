type LogoProps = {
  className?: string;
};

/**
 * Arcitex mark: the "A" is drawn as two clean strokes meeting at an apex,
 * with the crossbar replaced by an arc — a literal nod to the Arc network
 * this app is built on. The small node at the peak reads as an orbiting point.
 */
export default function Logo({ className = "h-9 w-9" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="arcitexGradient"
          x1="4"
          y1="34"
          x2="36"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>

      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="11.5"
        className="fill-white/[0.03]"
        stroke="url(#arcitexGradient)"
        strokeOpacity="0.25"
      />

      {/* The two legs of the A */}
      <path
        d="M11 30 L19.4 9.6C19.6 9.1 20.4 9.1 20.6 9.6L29 30"
        stroke="url(#arcitexGradient)"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The crossbar, drawn as an arc instead of a straight line */}
      <path
        d="M13.5 23.5C17 20 23 20 26.5 23.5"
        stroke="url(#arcitexGradient)"
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {/* Apex node */}
      <circle cx="20" cy="9.2" r="1.6" fill="#38BDF8" />
    </svg>
  );
}