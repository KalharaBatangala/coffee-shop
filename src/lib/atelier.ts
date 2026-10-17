import type { Profile } from "@/data/menu";
import type { Layer, Recipe, Topping } from "./ingredients";

export type AtelierConfig = {
  shots: 1 | 2 | 3;
  milk: "none" | "milk" | "oat" | "coconut";
  milkAmount: 1 | 2 | 3;
  sweet: "none" | "kithul" | "vanilla" | "chocolate";
  spice: "none" | "cinnamon" | "cardamom";
  foam: "none" | "light" | "deep";
  temp: "hot" | "iced";
  finish: "none" | "cocoa" | "cinnamon" | "gold";
};

export const DEFAULT_CONFIG: AtelierConfig = {
  shots: 2,
  milk: "milk",
  milkAmount: 2,
  sweet: "kithul",
  spice: "none",
  foam: "light",
  temp: "hot",
  finish: "cinnamon",
};

type Option<V> = { value: V; label: string; price: number; hint?: string };

export const OPTIONS = {
  shots: [
    { value: 1, label: "Single", price: 0, hint: "Gentle" },
    { value: 2, label: "Double", price: 200, hint: "Balanced" },
    { value: 3, label: "Triple", price: 400, hint: "Commanding" },
  ],
  milk: [
    { value: "none", label: "None", price: 0 },
    { value: "milk", label: "Whole milk", price: 0 },
    { value: "oat", label: "Oat milk", price: 150 },
    { value: "coconut", label: "Coconut milk", price: 150, hint: "Island classic" },
  ],
  milkAmount: [
    { value: 1, label: "A splash", price: 0 },
    { value: 2, label: "Regular", price: 0 },
    { value: 3, label: "Generous", price: 100 },
  ],
  sweet: [
    { value: "none", label: "Unsweetened", price: 0 },
    { value: "kithul", label: "Kithul treacle", price: 100, hint: "Wild palm nectar" },
    { value: "vanilla", label: "Vanilla bean", price: 100 },
    { value: "chocolate", label: "Dark chocolate", price: 150 },
  ],
  spice: [
    { value: "none", label: "None", price: 0 },
    { value: "cinnamon", label: "Ceylon cinnamon", price: 50, hint: "True cinnamon" },
    { value: "cardamom", label: "Cardamom", price: 50 },
  ],
  foam: [
    { value: "none", label: "No foam", price: 0 },
    { value: "light", label: "Silky", price: 0 },
    { value: "deep", label: "Cloud-deep", price: 0 },
  ],
  temp: [
    { value: "hot", label: "Hot", price: 0 },
    { value: "iced", label: "Over ice", price: 100 },
  ],
  finish: [
    { value: "none", label: "Unadorned", price: 0 },
    { value: "cocoa", label: "Cocoa dust", price: 50 },
    { value: "cinnamon", label: "Cinnamon dust", price: 50 },
    { value: "gold", label: "Gold leaf", price: 300, hint: "Truly royal" },
  ],
} satisfies { [K in keyof AtelierConfig]: Option<AtelierConfig[K]>[] };

export const BASE_PRICE = 900;

export function priceOf(c: AtelierConfig) {
  let total = BASE_PRICE;
  for (const key of Object.keys(OPTIONS) as (keyof AtelierConfig)[]) {
    if (key === "milkAmount" && c.milk === "none") continue;
    if (key === "foam" && c.milk === "none") continue;
    const opt = (OPTIONS[key] as Option<unknown>[]).find((o) => o.value === c[key]);
    total += opt?.price ?? 0;
  }
  return total;
}

export function recipeOf(c: AtelierConfig): Recipe {
  const layers: Layer[] = [];
  if (c.sweet !== "none") layers.push({ ingredient: c.sweet, amount: 0.45 });
  if (c.milk !== "none") layers.push({ ingredient: c.milk, amount: c.milkAmount * 0.95 });
  layers.push({ ingredient: "espresso", amount: c.shots * 0.55 });
  if (c.milk === "none") layers.push({ ingredient: "crema", amount: 0.15 });
  else if (c.foam !== "none") layers.push({ ingredient: "foam", amount: c.foam === "deep" ? 1 : 0.4 });

  const toppings: Topping[] = [];
  if (c.temp === "iced") toppings.push("ice");
  if (c.finish !== "none") toppings.push(c.finish);

  const volume = layers.reduce((n, l) => n + l.amount, 0);
  const fill = Math.min(0.9, Math.max(0.3, 0.2 + volume * 0.16));
  return { layers, toppings, fill };
}

const clamp = (n: number) => Math.max(1, Math.min(5, n));

export function profileOf(c: AtelierConfig): Profile {
  const milk = c.milk === "none" ? 0 : c.milkAmount;
  return {
    body: clamp(1.4 + c.shots * 0.6 + milk * 0.4 + (c.foam === "deep" ? 0.5 : 0) + (c.sweet === "chocolate" ? 0.6 : 0)),
    sweetness: clamp(
      1 + (c.sweet !== "none" ? 2 : 0) + (milk ? 0.6 : 0) + (c.milk === "coconut" ? 0.5 : 0) + (c.sweet === "chocolate" ? 0.4 : 0),
    ),
    acidity: clamp(3.6 - milk * 0.6 - (c.sweet !== "none" ? 0.5 : 0) - (c.temp === "iced" ? 0.3 : 0)),
    intensity: clamp(c.shots * 1.5 + 0.6 - milk * 0.5 + (c.spice !== "none" ? 0.3 : 0)),
  };
}

/** A deterministic regal name for the creation, e.g. "The Amber Duke". */
export function nameOf(c: AtelierConfig) {
  const title = { 1: "Countess", 2: "Duke", 3: "Emperor" }[c.shots];
  const adjective =
    c.finish === "gold"
      ? "Gilded"
      : c.temp === "iced"
        ? "Frost"
        : c.sweet === "kithul"
          ? "Amber"
          : c.sweet === "chocolate"
            ? "Velvet"
            : c.milk === "coconut"
              ? "Coastal"
              : c.spice === "cinnamon"
                ? "Spiced"
                : c.spice === "cardamom"
                  ? "Fragrant"
                  : c.sweet === "vanilla"
                    ? "Honeyed"
                    : c.milk === "oat"
                      ? "Gentle"
                      : c.milk === "none"
                        ? "Iron"
                        : "Noble";
  const realm = c.milk === "coconut" ? " of the Coast" : c.spice !== "none" ? " of the Spice Road" : c.shots === 3 ? " of the Highlands" : "";
  return `The ${adjective} ${title}${realm}`;
}

export function describe(c: AtelierConfig) {
  const parts = [OPTIONS.shots.find((o) => o.value === c.shots)!.label + " shot"];
  if (c.milk !== "none") parts.push(OPTIONS.milk.find((o) => o.value === c.milk)!.label.toLowerCase());
  if (c.sweet !== "none") parts.push(OPTIONS.sweet.find((o) => o.value === c.sweet)!.label.toLowerCase());
  if (c.spice !== "none") parts.push(OPTIONS.spice.find((o) => o.value === c.spice)!.label.toLowerCase());
  if (c.temp === "iced") parts.push("iced");
  if (c.finish !== "none") parts.push(OPTIONS.finish.find((o) => o.value === c.finish)!.label.toLowerCase());
  return parts.join(" · ");
}

// Compact URL encoding so a creation can be shared as a link: e.g. ?cup=2m2kcl1t.
const KEYS: (keyof AtelierConfig)[] = ["shots", "milk", "milkAmount", "sweet", "spice", "foam", "temp", "finish"];

export function encodeConfig(c: AtelierConfig) {
  return KEYS.map((k) => (OPTIONS[k] as Option<unknown>[]).findIndex((o) => o.value === c[k])).join("");
}

export function decodeConfig(code: string | null): AtelierConfig | null {
  if (!code || code.length !== KEYS.length) return null;
  const out: Record<string, unknown> = {};
  for (let i = 0; i < KEYS.length; i++) {
    const opt = (OPTIONS[KEYS[i]] as Option<unknown>[])[Number(code[i])];
    if (!opt) return null;
    out[KEYS[i]] = opt.value;
  }
  return out as AtelierConfig;
}

export function randomConfig(): AtelierConfig {
  const pick = <K extends keyof AtelierConfig>(k: K) => {
    const opts = OPTIONS[k] as Option<AtelierConfig[K]>[];
    return opts[Math.floor(Math.random() * opts.length)].value;
  };
  return Object.fromEntries(KEYS.map((k) => [k, pick(k)])) as AtelierConfig;
}
