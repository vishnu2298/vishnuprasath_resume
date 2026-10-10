/** Each career stage is drawn as the kind of system I was building at that point. */
export function StageGlyph({ stage, active }: { stage: number; active: boolean }) {
  const s = active ? "#63b7ae" : "rgba(167,199,217,0.4)";
  const f = active ? "rgba(99,183,174,0.16)" : "rgba(167,199,217,0.04)";
  const d = active ? "#a7c7d9" : "rgba(167,199,217,0.45)";
  const w = 1.4;
  return (
    <svg viewBox="0 0 64 48" width="56" height="42" aria-hidden>
      {stage === 0 && (
        // UI → API → DB
        <>
          <rect x="6" y="8" width="18" height="13" rx="2" fill={f} stroke={s} strokeWidth={w} />
          <path d="M24 14.5 H32" stroke={s} strokeWidth={w} />
          <rect x="32" y="9" width="10" height="11" rx="2" fill={f} stroke={s} strokeWidth={w} />
          <path d="M42 14.5 H48" stroke={s} strokeWidth={w} />
          <ellipse cx="54" cy="10" rx="6" ry="2.2" fill={f} stroke={s} strokeWidth={w} />
          <path d="M48 10 V19 A6 2.2 0 0 0 60 19 V10" fill="none" stroke={s} strokeWidth={w} />
          <path d="M8 30 h14 M8 35 h10 M8 40 h12" stroke={d} strokeWidth={w} />
        </>
      )}
      {stage === 1 && (
        // One service, several routes, one store
        <>
          <rect x="22" y="6" width="20" height="16" rx="3" fill={f} stroke={s} strokeWidth={w} />
          {[10, 32, 54].map((x) => (
            <path key={x} d={`M${x} 30 L32 22`} stroke={s} strokeWidth={w * 0.8} />
          ))}
          {[10, 32, 54].map((x) => (
            <rect key={`r${x}`} x={x - 5} y="30" width="10" height="7" rx="1.5" fill={f} stroke={s} strokeWidth={w} />
          ))}
          <path d="M8 43 H56" stroke={d} strokeWidth={w} strokeDasharray="2 3" />
        </>
      )}
      {stage === 2 && (
        // Store → inverted index → query
        <>
          <ellipse cx="12" cy="10" rx="7" ry="2.5" fill={f} stroke={s} strokeWidth={w} />
          <path d="M5 10 V30 A7 2.5 0 0 0 19 30 V10" fill="none" stroke={s} strokeWidth={w} />
          <path d="M19 20 H27" stroke={s} strokeWidth={w} />
          {[10, 17, 24, 31].map((y, i) => (
            <path key={y} d={`M29 ${y} h${18 - i * 3}`} stroke={i === 1 ? d : s} strokeWidth={w * 1.6} strokeLinecap="round" />
          ))}
          <circle cx="54" cy="36" r="5" fill="none" stroke={d} strokeWidth={w} />
          <path d="M57.5 39.5 L61 43" stroke={d} strokeWidth={w} />
        </>
      )}
      {stage === 3 && (
        // Signals converge into a ranked list
        <>
          {[8, 18, 28, 38].map((y) => (
            <circle key={y} cx="8" cy={y} r="2.6" fill={d} />
          ))}
          {[8, 18, 28, 38].map((y) => (
            <path key={`l${y}`} d={`M11 ${y} L30 23`} stroke={s} strokeWidth={w * 0.7} />
          ))}
          <rect x="30" y="18" width="8" height="10" rx="2" fill={f} stroke={s} strokeWidth={w} />
          {[24, 18, 12].map((len, i) => (
            <rect key={i} x="44" y={11 + i * 9} width={len * 0.75} height="5" rx="1.5" fill={i === 0 ? s : f} stroke={s} strokeWidth={w * 0.8} />
          ))}
        </>
      )}
      {stage === 4 && (
        // An existing pipeline with one AI step inserted
        <>
          {[4, 20, 44].map((x) => (
            <rect key={x} x={x} y="18" width="12" height="12" rx="2" fill={f} stroke={s} strokeWidth={w} />
          ))}
          <path d="M16 24 H20 M32 24 H34.5 M41.5 24 H44" stroke={s} strokeWidth={w} />
          <path d="M38 17.5 L44.5 24 L38 30.5 L31.5 24 Z" transform="translate(0,0)" fill={active ? "rgba(167,199,217,0.25)" : f} stroke={d} strokeWidth={w} />
          <path d="M60 24 H62" stroke={s} strokeWidth={w} />
          <path d="M38 36 V42" stroke={d} strokeWidth={w} strokeDasharray="2 2" />
        </>
      )}
      {stage === 5 && (
        // One decision, several people building on it
        <>
          <rect x="25" y="4" width="14" height="10" rx="2" fill={active ? "rgba(99,183,174,0.3)" : f} stroke={s} strokeWidth={w} />
          {[10, 32, 54].map((x) => (
            <path key={x} d={`M32 14 L${x} 28`} stroke={s} strokeWidth={w * 0.8} />
          ))}
          {[10, 32, 54].map((x) => (
            <circle key={`c${x}`} cx={x} cy="32" r="4.5" fill={f} stroke={s} strokeWidth={w} />
          ))}
          <path d="M6 43 L9 46 L15 40" fill="none" stroke={d} strokeWidth={w} />
          <path d="M28 43 L31 46 L37 40" fill="none" stroke={d} strokeWidth={w} />
        </>
      )}
    </svg>
  );
}
