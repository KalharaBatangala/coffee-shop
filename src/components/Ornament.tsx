type SvgProps = { className?: string };

export function Crown({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 44" className={className} aria-hidden="true">
      <path
        d="M6 36 3 12l15 12L32 4l14 20 15-12-3 24Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M7 41h50" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="3" cy="11" r="2.6" fill="currentColor" />
      <circle cx="32" cy="3.5" r="2.8" fill="currentColor" />
      <circle cx="61" cy="11" r="2.6" fill="currentColor" />
      <circle cx="32" cy="27" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** A centred flourish: line — diamond — line. */
export function Divider({ className = "" }: SvgProps) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-24" />
      <svg viewBox="0 0 40 12" className="h-3 w-10">
        <path d="M20 1 25 6 20 11 15 6Z" fill="currentColor" />
        <circle cx="8" cy="6" r="1.6" fill="currentColor" />
        <circle cx="32" cy="6" r="1.6" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-24" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-ivory sm:text-5xl">{title}</h2>
      {centered && <Divider className="mt-6" />}
      {children && <p className="mt-6 text-lg text-muted">{children}</p>}
    </div>
  );
}

/** Crimson wax seal with an embossed crown. */
export function WaxSeal({ className, label = "RC" }: SvgProps & { label?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#b52a3b" />
          <stop offset="0.6" stopColor="#8b1e2c" />
          <stop offset="1" stopColor="#5e111c" />
        </radialGradient>
      </defs>
      <path
        d="M60 4c9 0 12 6 20 8s15-1 20 6 1 13 5 20 10 9 10 22-7 14-10 22-1 14-6 20-13 3-20 6-11 8-19 8-11-6-19-8-15 2-20-5-2-14-6-21S5 72 5 60s7-15 10-22 0-15 6-21 13-2 20-5 10-8 19-8Z"
        fill="url(#wax)"
      />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#5e111c" strokeWidth="3" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="#c94a58" strokeOpacity="0.45" strokeWidth="1" />
      <g transform="translate(40 34) scale(0.62)" fill="none" stroke="#e7a4ab" strokeOpacity="0.7" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M6 36 3 12l15 12L32 4l14 20 15-12-3 24Z" />
      </g>
      <text x="60" y="86" textAnchor="middle" fontFamily="var(--font-cinzel), serif" fontSize="14" letterSpacing="2" fill="#e7a4ab" fillOpacity="0.75">
        {label}
      </text>
    </svg>
  );
}
