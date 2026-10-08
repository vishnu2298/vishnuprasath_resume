/** Each career stage is drawn as a system that is a little more complex than the last. */
export function StageGlyph({ stage, active }: { stage: number; active: boolean }) {
  const stroke = active ? "#ff5a1f" : "rgba(255,255,255,0.35)";
  const fill = active ? "rgba(255,90,31,0.18)" : "rgba(255,255,255,0.04)";
  const dot = active ? "#ffb36b" : "rgba(255,255,255,0.5)";
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden className="transition-transform duration-500" style={{ transform: active ? "scale(1.08)" : "none" }}>
      {stage === 0 && (
        <>
          <rect x="16" y="14" width="32" height="22" rx="4" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="32" y1="36" x2="32" y2="44" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="32" cy="48" rx="10" ry="3.5" fill={fill} stroke={stroke} strokeWidth="1.5" />
        </>
      )}
      {stage === 1 && (
        <>
          <rect x="8" y="12" width="18" height="14" rx="3" fill="none" stroke={stroke} strokeDasharray="3 3" strokeWidth="1.2" />
          <path d="M26 19 H38" stroke={stroke} strokeWidth="1.5" />
          <rect x="38" y="10" width="8" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="48" y="10" width="8" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="38" y="20" width="18" height="8" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <line x1="47" y1="28" x2="47" y2="40" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="47" cy="44" rx="9" ry="3.5" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <path d="M12 40 h18 M12 46 h12 M12 52 h16" stroke={dot} strokeWidth="1.5" />
        </>
      )}
      {stage === 2 && (
        <>
          {[
            [32, 12],
            [14, 32],
            [50, 32],
            [32, 52],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 7} y={y - 6} width="14" height="12" rx="3" fill={fill} stroke={stroke} strokeWidth="1.5" />
          ))}
          <path d="M32 18 V46 M21 32 H43" stroke={stroke} strokeWidth="1.2" />
        </>
      )}
      {stage === 3 && (
        <>
          <rect x="26" y="6" width="12" height="9" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" />
          {[10, 24, 40, 54].map((x, i) => (
            <g key={i}>
              <path d={`M32 15 L${x} 30`} stroke={stroke} strokeWidth="1" />
              <rect x={x - 5} y="30" width="10" height="9" rx="2" fill={fill} stroke={stroke} strokeWidth="1.5" />
              <path d={`M${x} 39 L32 50`} stroke={stroke} strokeWidth="0.8" strokeDasharray="2 2" />
            </g>
          ))}
          <circle cx="32" cy="53" r="5" fill={dot} />
        </>
      )}
      {stage === 4 && (
        <>
          {[0, 1, 2].map((l) =>
            [0, 1, 2, 3].slice(0, l === 1 ? 4 : 3).map((k) => {
              const n = l === 1 ? 4 : 3;
              const x = 12 + l * 20;
              const y = 32 + (k - (n - 1) / 2) * 13;
              return <circle key={`${l}-${k}`} cx={x} cy={y} r="4" fill={l === 1 ? dot : fill} stroke={stroke} strokeWidth="1.3" />;
            }),
          )}
          {[19, 32, 45].map((ya) =>
            [12.5, 25.5, 38.5, 51.5].map((yb) => <path key={`${ya}-${yb}`} d={`M16 ${ya} L28 ${yb}`} stroke={stroke} strokeWidth="0.5" />),
          )}
          {[12.5, 25.5, 38.5, 51.5].map((ya) =>
            [19, 32, 45].map((yb) => <path key={`b${ya}-${yb}`} d={`M36 ${ya} L48 ${yb}`} stroke={stroke} strokeWidth="0.5" />),
          )}
        </>
      )}
    </svg>
  );
}
