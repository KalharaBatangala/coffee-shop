import type { Profile } from "@/data/menu";

const ROWS: { key: keyof Profile; label: string }[] = [
  { key: "body", label: "Body" },
  { key: "sweetness", label: "Sweetness" },
  { key: "acidity", label: "Brightness" },
  { key: "intensity", label: "Intensity" },
];

/** Five-bean scale for each tasting dimension. */
export default function FlavorProfile({ profile }: { profile: Profile }) {
  return (
    <dl className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
      {ROWS.map(({ key, label }) => {
        const value = Math.max(0, Math.min(5, Math.round(profile[key])));
        return (
          <div key={key} className="flex items-center justify-between gap-4 border-b border-line pb-2">
            <dt className="font-caps text-[0.7rem] tracking-[0.2em] text-muted uppercase">{label}</dt>
            <dd className="flex gap-1.5" aria-label={`${value} out of 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} viewBox="0 0 12 16" className="h-4 w-3">
                  <ellipse
                    cx="6"
                    cy="8"
                    rx="5"
                    ry="7"
                    fill={i < value ? "#d4af5f" : "none"}
                    stroke="#d4af5f"
                    strokeOpacity={i < value ? 1 : 0.35}
                    style={{ transition: "fill 0.4s ease" }}
                  />
                  <path d="M6 2 Q3.5 8 6 14" fill="none" stroke={i < value ? "#14100c" : "#d4af5f"} strokeOpacity={i < value ? 0.7 : 0.25} />
                </svg>
              ))}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
