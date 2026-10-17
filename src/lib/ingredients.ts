// Visual vocabulary for drink cross-sections. Every drink (menu or custom) is
// described as a stack of layers, drawn bottom-up inside the glass.

export type Ingredient =
  | "espresso"
  | "crema"
  | "water"
  | "milk"
  | "oat"
  | "coconut"
  | "foam"
  | "chocolate"
  | "kithul"
  | "vanilla"
  | "cream"
  | "coldbrew"
  | "gelato";

export type Topping = "cocoa" | "cinnamon" | "gold" | "ice";

export type Layer = { ingredient: Ingredient; amount: number };

export type Recipe = {
  layers: Layer[];
  toppings?: Topping[];
  /** Fraction of the glass that is filled, 0–1. */
  fill?: number;
};

export const INGREDIENTS: Record<Ingredient, { label: string; color: string; shade: string }> = {
  espresso: { label: "Espresso", color: "#3a2213", shade: "#24140a" },
  crema: { label: "Crema", color: "#b9773d", shade: "#8f5626" },
  water: { label: "Hot water", color: "#4a2c17", shade: "#341e0f" },
  milk: { label: "Steamed milk", color: "#e8d9bf", shade: "#d3c09f" },
  oat: { label: "Oat milk", color: "#e2cfa6", shade: "#cdb788" },
  coconut: { label: "Coconut milk", color: "#f4efe4", shade: "#e2dac9" },
  foam: { label: "Micro-foam", color: "#f8f2e6", shade: "#ebe1cf" },
  chocolate: { label: "Dark chocolate", color: "#4b2a1b", shade: "#331b10" },
  kithul: { label: "Kithul treacle", color: "#7a3d0f", shade: "#562908" },
  vanilla: { label: "Vanilla bean syrup", color: "#d8b46a", shade: "#bf974b" },
  cream: { label: "Whipped cream", color: "#fbf6ec", shade: "#efe6d4" },
  coldbrew: { label: "Cold brew", color: "#2b190d", shade: "#1c0f07" },
  gelato: { label: "Vanilla gelato", color: "#f3e6c4", shade: "#e0cfa3" },
};

export const TOPPINGS: Record<Topping, { label: string }> = {
  cocoa: { label: "Cocoa dust" },
  cinnamon: { label: "Ceylon cinnamon" },
  gold: { label: "Edible gold leaf" },
  ice: { label: "Ice" },
};

export function formatPrice(lkr: number) {
  return `Rs ${lkr.toLocaleString("en-LK")}`;
}
