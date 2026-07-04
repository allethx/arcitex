export default function OrbitDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      <svg viewBox="0 0 500 500" className="h-full w-full">
        <defs>
          <linearGradient id="arx-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7dd3fc" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id="arx-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="55%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="1" />
        <circle cx="250" cy="250" r="140" fill="none" stroke="rgba(125,211,252,0.14)" strokeWidth="1" />

        <g className="origin-center animate-[spin_40s_linear_infinite]">
          <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="url(#arx-line)" strokeWidth="1.1" opacity="0.55" />
        </g>
        <g className="origin-center animate-[spin_55s_linear_infinite_reverse]">
          <ellipse cx="250" cy="250" rx="80" ry="200" fill="none" stroke="url(#arx-line)" strokeWidth="1.1" opacity="0.35" />
        </g>

        {/* core */}
        <circle cx="250" cy="250" r="46" fill="url(#arx-core)" opacity="0.35" />
        <circle
          cx="250"
          cy="250"
          r="26"
          fill="#0c0e1c"
          stroke="url(#arx-line)"
          strokeWidth="1.6"
          className="drop-shadow-[0_0_30px_rgba(167,139,250,0.55)]"
        />
        <text x="250" y="254" textAnchor="middle" fill="#f2f1fb" fontFamily="var(--font-display, sans-serif)" fontSize="11" fontWeight={600} letterSpacing="1">
          ARX
        </text>

        {/* live nodes */}
        {[
          { x: 250, y: 50, ty: 34, label: "SWAP", delay: "0s" },
          { x: 432, y: 160, ty: 144, label: "SEND", delay: ".4s" },
          { x: 380, y: 392, ty: 415, label: "BRIDGE", delay: ".8s" },
          { x: 120, y: 392, ty: 415, label: "GOV", delay: "1.2s" },
        ].map((n) => (
          <g key={n.label} style={{ animation: `arxPulse 3s ease-in-out infinite`, animationDelay: n.delay }}>
            <circle cx={n.x} cy={n.y} r="7" fill="#6ee7b7" />
            <text x={n.x} y={n.ty} textAnchor="middle" fill="#9aa0c4" fontFamily="var(--font-mono, monospace)" fontSize="11">
              {n.label}
            </text>
          </g>
        ))}

        {/* coming soon nodes */}
        {[
          { x: 68, y: 160, ty: 144, label: "POOLS" },
          { x: 250, y: 450, ty: 470, label: "PAY" },
        ].map((n) => (
          <g key={n.label} opacity={0.45}>
            <circle cx={n.x} cy={n.y} r="6" fill="none" stroke="#64748b" strokeWidth="1.4" strokeDasharray="2 2" />
            <text x={n.x} y={n.ty} textAnchor="middle" fill="#5b6180" fontFamily="var(--font-mono, monospace)" fontSize="10">
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <style>{`
        @keyframes arxPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .55; }
        }
      `}</style>
    </div>
  );
}