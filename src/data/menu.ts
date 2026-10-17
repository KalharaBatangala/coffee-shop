import type { Recipe } from "@/lib/ingredients";

export type Category = "espresso" | "milk" | "signature" | "cold" | "bakery";

export type Profile = {
  body: number;
  sweetness: number;
  acidity: number;
  intensity: number;
};

export type MenuItem = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  tagline: string;
  description: string;
  notes: string[];
  profile: Profile;
  recipe?: Recipe;
  image?: string;
  pairsWith?: string;
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "signature", label: "Signatures" },
  { id: "espresso", label: "Espresso" },
  { id: "milk", label: "With Milk" },
  { id: "cold", label: "Cold" },
  { id: "bakery", label: "Bakery" },
];

export const SIZES = [
  { id: "regal", label: "Regal", detail: "8 oz", extra: 0 },
  { id: "imperial", label: "Imperial", detail: "12 oz", extra: 250 },
] as const;

export type SizeId = (typeof SIZES)[number]["id"];

export const menu: MenuItem[] = [
  {
    slug: "cinnamon-court-latte",
    name: "Cinnamon Court Latte",
    category: "signature",
    price: 1550,
    tagline: "Our crown jewel",
    description:
      "Double espresso over silky milk, sweetened with wild kithul treacle from the southern hills and finished with true Ceylon cinnamon — the spice that once drew empires to this island.",
    notes: ["Kithul caramel", "Ceylon cinnamon", "Toasted brioche"],
    profile: { body: 4, sweetness: 4, acidity: 2, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "kithul", amount: 0.5 },
        { ingredient: "milk", amount: 2.2 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "foam", amount: 0.7 },
      ],
      toppings: ["cinnamon"],
    },
    pairsWith: "chocolate-muffin",
  },
  {
    slug: "coconut-kingsguard",
    name: "Coconut Kingsguard",
    category: "signature",
    price: 1500,
    tagline: "The coast meets the highlands",
    description:
      "Highland espresso drawn over fresh coconut milk, the way the island has always taken its comfort. Naturally sweet, gently nutty, completely dairy-free.",
    notes: ["Fresh coconut", "Palm sugar", "Roasted hazelnut"],
    profile: { body: 3, sweetness: 3, acidity: 2, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "coconut", amount: 2.4 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "foam", amount: 0.5 },
      ],
    },
    pairsWith: "chocolate-muffin",
  },
  {
    slug: "gilded-affogato",
    name: "Gilded Affogato",
    category: "signature",
    price: 1750,
    tagline: "Dessert fit for a throne",
    description:
      "A scoop of vanilla bean gelato drowned in a hot ristretto and crowned with a flake of edible gold leaf. Eat it with a spoon, or wait and drink it.",
    notes: ["Vanilla bean", "Bittersweet cocoa", "Burnt sugar"],
    profile: { body: 4, sweetness: 5, acidity: 1, intensity: 4 },
    recipe: {
      layers: [
        { ingredient: "gelato", amount: 1.6 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "crema", amount: 0.2 },
      ],
      toppings: ["gold"],
      fill: 0.62,
    },
  },
  {
    slug: "kithul-iced-latte",
    name: "Kithul Iced Latte",
    category: "cold",
    price: 1600,
    tagline: "Amber, ice and espresso",
    description:
      "Kithul treacle at the bottom, cold milk in the middle and a double shot floated on top. Stir it, or watch the layers swirl together as you drink.",
    notes: ["Dark treacle", "Cold cream", "Cocoa nib"],
    profile: { body: 3, sweetness: 4, acidity: 2, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "kithul", amount: 0.6 },
        { ingredient: "milk", amount: 2.2 },
        { ingredient: "espresso", amount: 1 },
      ],
      toppings: ["ice"],
    },
  },
  {
    slug: "crown-espresso",
    name: "The Crown Espresso",
    category: "espresso",
    price: 850,
    tagline: "Pure, short, sovereign",
    description:
      "Our house blend of Ceylon highland arabica with a touch of robusta, pulled short and thick under a tiger-striped crema.",
    notes: ["Dark cocoa", "Molasses", "Black cherry"],
    profile: { body: 5, sweetness: 2, acidity: 3, intensity: 5 },
    recipe: {
      layers: [
        { ingredient: "espresso", amount: 1 },
        { ingredient: "crema", amount: 0.25 },
      ],
      fill: 0.34,
    },
    image: "/assets/espresso.jpg",
  },
  {
    slug: "royal-americano",
    name: "Royal Americano",
    category: "espresso",
    price: 950,
    tagline: "Long, clean and bright",
    description:
      "A double shot poured over hot water so the crema survives. Lets the fruit in our highland beans speak clearly.",
    notes: ["Stone fruit", "Brown sugar", "Cedar"],
    profile: { body: 2, sweetness: 2, acidity: 4, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "water", amount: 2.6 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "crema", amount: 0.15 },
      ],
    },
  },
  {
    slug: "regents-cortado",
    name: "The Regent's Cortado",
    category: "espresso",
    price: 1100,
    tagline: "Equal parts, perfect balance",
    description:
      "Espresso cut with an equal measure of warm milk. Small, strong and smooth — a cup for counsel and conversation.",
    notes: ["Milk chocolate", "Caramel", "Almond"],
    profile: { body: 4, sweetness: 3, acidity: 2, intensity: 4 },
    recipe: {
      layers: [
        { ingredient: "milk", amount: 1 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "foam", amount: 0.2 },
      ],
      fill: 0.55,
    },
  },
  {
    slug: "kandyan-cappuccino",
    name: "Kandyan Cappuccino",
    category: "milk",
    price: 1250,
    tagline: "A cloud of foam, a dust of cocoa",
    description:
      "Espresso, steamed milk and a deep, velvety cap of micro-foam in classic thirds, finished with a whisper of cocoa.",
    notes: ["Cocoa", "Sweet cream", "Hazelnut"],
    profile: { body: 3, sweetness: 3, acidity: 2, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "milk", amount: 1 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "foam", amount: 1.2 },
      ],
      toppings: ["cocoa"],
    },
    image: "/assets/cappuccino.jpg",
  },
  {
    slug: "velvet-latte",
    name: "Velvet Latte",
    category: "milk",
    price: 1300,
    tagline: "Soft, long and gentle",
    description:
      "A single origin shot softened with plenty of steamed milk and a thin, glossy layer of foam for latte art.",
    notes: ["Caramel", "Vanilla", "Biscuit"],
    profile: { body: 3, sweetness: 3, acidity: 1, intensity: 2 },
    recipe: {
      layers: [
        { ingredient: "milk", amount: 2.6 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "foam", amount: 0.45 },
      ],
    },
  },
  {
    slug: "queens-mocha",
    name: "The Queen's Mocha",
    category: "milk",
    price: 1450,
    tagline: "Indulgence, unapologetic",
    description:
      "Melted dark chocolate, espresso and steamed milk under a crown of whipped cream and cocoa. Rich enough to rule on its own.",
    notes: ["Dark chocolate", "Fudge", "Roasted malt"],
    profile: { body: 5, sweetness: 5, acidity: 1, intensity: 3 },
    recipe: {
      layers: [
        { ingredient: "chocolate", amount: 0.8 },
        { ingredient: "milk", amount: 1.6 },
        { ingredient: "espresso", amount: 1 },
        { ingredient: "cream", amount: 0.8 },
      ],
      toppings: ["cocoa"],
    },
  },
  {
    slug: "highland-cold-brew",
    name: "Highland Cold Brew",
    category: "cold",
    price: 1350,
    tagline: "Eighteen hours, zero hurry",
    description:
      "Coarsely ground highland beans steeped cold for eighteen hours, then served long over ice. Smooth, low in acidity and quietly strong.",
    notes: ["Dark chocolate", "Dried fig", "Jaggery"],
    profile: { body: 3, sweetness: 2, acidity: 1, intensity: 4 },
    recipe: {
      layers: [{ ingredient: "coldbrew", amount: 1 }],
      toppings: ["ice"],
    },
  },
  {
    slug: "chocolate-muffin",
    name: "Royal Chocolate Muffin",
    category: "bakery",
    price: 750,
    tagline: "Baked at dawn",
    description:
      "A dark, tender muffin studded with chocolate chips, baked fresh each morning. Our most loyal companion to any cup.",
    notes: ["Dark chocolate", "Butter", "Sea salt"],
    profile: { body: 4, sweetness: 4, acidity: 1, intensity: 2 },
    image: "/assets/muffin.jpg",
  },
];

export function getItem(slug: string) {
  return menu.find((m) => m.slug === slug);
}

export const signatures = menu.filter((m) => m.category === "signature");
