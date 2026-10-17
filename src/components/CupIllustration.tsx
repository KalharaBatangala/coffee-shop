import { useId } from "react";
import { INGREDIENTS, TOPPINGS, type Recipe } from "@/lib/ingredients";

// Glass geometry inside a 200 x 260 viewBox.
const TOP_Y = 40;
const BOTTOM_Y = 228;
const TOP_L = 34;
const TOP_R = 166;
const BOT_L = 54;
const BOT_R = 146;
const INNER_H = BOTTOM_Y - TOP_Y;

const GLASS_PATH = `M${TOP_L} ${TOP_Y} L${BOT_L} ${BOTTOM_Y - 10} Q${BOT_L + 2} ${BOTTOM_Y} ${BOT_L + 12} ${BOTTOM_Y} L${BOT_R - 12} ${BOTTOM_Y} Q${BOT_R - 2} ${BOTTOM_Y} ${BOT_R} ${BOTTOM_Y - 10} L${TOP_R} ${TOP_Y}`;

/** x of the right glass wall at height y, for placing label leader lines. */
function rightWallAt(y: number) {
  const t = (y - TOP_Y) / INNER_H;
  return TOP_R + (BOT_R - TOP_R) * t;
}

type Band = { key: string; label: string; color: string; shade: string; top: number; bottom: number };

function computeBands(recipe: Recipe): Band[] {
  const fill = recipe.fill ?? 0.86;
  const total = recipe.layers.reduce((n, l) => n + l.amount, 0) || 1;
  let cursor = BOTTOM_Y;
  const seen: Record<string, number> = {};
  return recipe.layers.map((layer) => {
    // Key by ingredient (not index) so a band keeps its identity and animates
    // when layers are added or removed beneath it.
    const n = (seen[layer.ingredient] = (seen[layer.ingredient] ?? -1) + 1);
    const h = (layer.amount / total) * INNER_H * fill;
    const band = {
      key: n ? `${layer.ingredient}-${n}` : layer.ingredient,
      label: INGREDIENTS[layer.ingredient].label,
      color: INGREDIENTS[layer.ingredient].color,
      shade: INGREDIENTS[layer.ingredient].shade,
      top: cursor - h,
      bottom: cursor,
    };
    cursor -= h;
    return band;
  });
}

// Deterministic pseudo-random sprinkle positions, so server and client agree.
const SPRINKLES = Array.from({ length: 26 }, (_, i) => ({
  x: 52 + ((i * 37) % 96),
  dy: ((i * 13) % 7) - 3,
  r: 0.9 + ((i * 7) % 5) * 0.25,
}));

type Props = {
  recipe: Recipe;
  labels?: boolean;
  steam?: boolean;
  className?: string;
  title?: string;
};

export default function CupIllustration({ recipe, labels = false, steam = false, className, title }: Props) {
  const uid = useId().replace(/:/g, "");
  const bands = computeBands(recipe);
  const surface = bands.length ? bands[bands.length - 1].top : BOTTOM_Y;
  const toppings = recipe.toppings ?? [];
  const iced = toppings.includes("ice");
  const dust = toppings.find((t) => t === "cocoa" || t === "cinnamon");
  const gold = toppings.includes("gold");
  const showSteam = steam && !iced;

  const width = labels ? 360 : 200;

  // Label rows: one per layer (bottom-up), then toppings above the surface.
  // Rows are pushed apart so thin layers like crema never overlap.
  const labelRows: { key: string; label: string; y: number; anchorY: number | null; topping: boolean }[] = [];
  if (labels) {
    let prev = Infinity;
    for (const b of bands) {
      const mid = (b.top + b.bottom) / 2;
      const y = Math.min(mid, prev - 14);
      labelRows.push({ key: b.key, label: b.label, y, anchorY: mid, topping: false });
      prev = y;
    }
    for (const t of toppings.filter((t) => t !== "ice")) {
      const y = Math.min(surface - 6, prev - 14);
      labelRows.push({ key: t, label: TOPPINGS[t].label, y, anchorY: null, topping: true });
      prev = y;
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} 260`}
      className={className}
      role="img"
      aria-label={title ?? `Cross-section: ${bands.map((b) => b.label).join(", ")}`}
    >
      <defs>
        <clipPath id={`glass-${uid}`}>
          <path d={`${GLASS_PATH} Z`} />
        </clipPath>
        <linearGradient id={`shine-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        {bands.map((b) => (
          <linearGradient key={b.key} id={`g-${uid}-${b.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={b.color} />
            <stop offset="1" stopColor={b.shade} />
          </linearGradient>
        ))}
      </defs>

      {/* Saucer */}
      <ellipse cx="100" cy="238" rx="78" ry="9" fill="none" stroke="#d4af5f" strokeOpacity="0.55" />
      <ellipse cx="100" cy="240" rx="58" ry="4" fill="#d4af5f" fillOpacity="0.08" />

      {/* Liquid layers. Each band is a full-height rect slid down with a transform,
          drawn top-first so lower layers paint over: this animates smoothly. */}
      <g clipPath={`url(#glass-${uid})`}>
        <rect x="0" y={TOP_Y} width="200" height={INNER_H} fill="#0c0907" fillOpacity="0.35" />
        {[...bands].reverse().map((b) => (
          <rect
            key={b.key}
            x="0"
            y="0"
            width="200"
            height={INNER_H + 20}
            fill={`url(#g-${uid}-${b.key})`}
            style={{
              transform: `translateY(${b.top}px)`,
              transition: "transform 0.9s cubic-bezier(0.3, 0.8, 0.25, 1)",
            }}
          />
        ))}
        {/* Soft boundaries between layers */}
        {bands.slice(0, -1).map((b) => (
          <rect
            key={`edge-${b.key}`}
            x="0"
            y="-3"
            width="200"
            height="6"
            fill={b.color}
            opacity="0.5"
            style={{ transform: `translateY(${b.top}px)`, transition: "transform 0.9s cubic-bezier(0.3, 0.8, 0.25, 1)", filter: "blur(2px)" }}
          />
        ))}

        {iced &&
          [
            [70, 0.18, -8],
            [104, 0.3, 12],
            [86, 0.5, 4],
            [118, 0.62, -14],
          ].map(([x, t, rot], i) => {
            const y = surface + (BOTTOM_Y - surface) * t;
            return (
              <rect
                key={i}
                x={x}
                y={y - 12}
                width="24"
                height="22"
                rx="4"
                fill="#fff"
                fillOpacity="0.14"
                stroke="#fff"
                strokeOpacity="0.45"
                transform={`rotate(${rot} ${x + 12} ${y})`}
              />
            );
          })}

        {dust &&
          SPRINKLES.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={surface + 3 + s.dy * 0.6}
              r={s.r}
              fill={dust === "cocoa" ? "#3b2010" : "#9a4e1c"}
              opacity="0.85"
            />
          ))}

        {gold &&
          [
            [84, -1],
            [100, 2],
            [112, 0],
          ].map(([x, dy], i) => (
            <path
              key={i}
              d={`M${x} ${surface + 4 + dy} l5 -4 l6 2 l-3 5 l-6 1 z`}
              fill="#f1d48a"
              stroke="#fff3c9"
              strokeWidth="0.5"
            />
          ))}

        <rect x={TOP_L} y={TOP_Y} width={TOP_R - TOP_L} height={INNER_H} fill={`url(#shine-${uid})`} />
      </g>

      {/* Glass outline + rim */}
      <path d={GLASS_PATH} fill="none" stroke="#d4af5f" strokeWidth="1.6" strokeLinejoin="round" />
      <ellipse cx="100" cy={TOP_Y} rx={(TOP_R - TOP_L) / 2} ry="5" fill="none" stroke="#d4af5f" strokeOpacity="0.8" strokeWidth="1.2" />
      <path d={`M${TOP_L + 10} ${TOP_Y + 14} L${BOT_L + 8} ${BOTTOM_Y - 22}`} stroke="#fff" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />

      {showSteam && (
        <g fill="none" stroke="#f3ead8" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <path className="steam-wisp" d="M80 30 q-8 -10 0 -18 q8 -8 0 -18" style={{ animationDelay: "0s" }} />
          <path className="steam-wisp" d="M100 28 q-8 -10 0 -18 q8 -8 0 -18" style={{ animationDelay: "1.2s" }} />
          <path className="steam-wisp" d="M120 30 q-8 -10 0 -18 q8 -8 0 -18" style={{ animationDelay: "2.4s" }} />
        </g>
      )}

      {labels && (
        <g fontFamily="var(--font-cinzel), serif" fontSize="9" letterSpacing="1.5">
          {labelRows.map((row) => (
            <g key={row.key}>
              {row.anchorY !== null && <circle cx={rightWallAt(row.anchorY) - 4} cy={row.anchorY} r="2" fill="#d4af5f" />}
              <path
                d={`M${row.anchorY !== null ? rightWallAt(row.anchorY) - 4 : 150} ${row.anchorY ?? row.y} L196 ${row.y} L212 ${row.y}`}
                fill="none"
                stroke="#d4af5f"
                strokeOpacity="0.5"
                strokeDasharray="2 3"
              />
              <text x="218" y={row.y + 3} fill={row.topping ? "#a99b86" : "#f1d48a"} fontStyle={row.topping ? "italic" : undefined}>
                {row.label.toUpperCase()}
              </text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
