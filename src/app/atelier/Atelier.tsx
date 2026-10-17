"use client";

import { useEffect, useMemo, useState } from "react";
import { HiOutlineLink, HiOutlineSparkles, HiCheck } from "react-icons/hi2";
import CupIllustration from "@/components/CupIllustration";
import FlavorProfile from "@/components/FlavorProfile";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import {
  DEFAULT_CONFIG,
  OPTIONS,
  decodeConfig,
  describe,
  encodeConfig,
  nameOf,
  priceOf,
  profileOf,
  randomConfig,
  recipeOf,
  type AtelierConfig,
} from "@/lib/atelier";

type Step = {
  numeral: string;
  title: string;
  blurb: string;
  fields: { key: keyof AtelierConfig; label?: string; hiddenWhen?: (c: AtelierConfig) => boolean }[];
};

const STEPS: Step[] = [
  {
    numeral: "I",
    title: "The Foundation",
    blurb: "Ceylon highland espresso, pulled to order.",
    fields: [{ key: "shots" }],
  },
  {
    numeral: "II",
    title: "The Milk",
    blurb: "Coconut milk is how the island has long taken its comfort.",
    fields: [
      { key: "milk" },
      { key: "milkAmount", label: "How much", hiddenWhen: (c) => c.milk === "none" },
      { key: "foam", label: "Foam", hiddenWhen: (c) => c.milk === "none" },
    ],
  },
  {
    numeral: "III",
    title: "The Sweetness",
    blurb: "Kithul treacle is tapped from the flower of the fishtail palm.",
    fields: [{ key: "sweet" }],
  },
  {
    numeral: "IV",
    title: "The Spice",
    blurb: "Ceylon cinnamon, the true cinnamon, is delicate and sweet.",
    fields: [{ key: "spice" }],
  },
  {
    numeral: "V",
    title: "The Finish",
    blurb: "Served hot, or poured over ice, and crowned as you wish.",
    fields: [{ key: "temp" }, { key: "finish", label: "Crown" }],
  },
];

export default function Atelier() {
  const { addItem, openCart } = useCart();
  const [config, setConfig] = useState<AtelierConfig>(DEFAULT_CONFIG);
  const [customName, setCustomName] = useState("");
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);

  // Load a shared creation from ?cup=… once on mount.
  useEffect(() => {
    const shared = decodeConfig(new URLSearchParams(window.location.search).get("cup"));
    if (shared) setConfig(shared);
  }, []);

  const recipe = useMemo(() => recipeOf(config), [config]);
  const profile = useMemo(() => profileOf(config), [config]);
  const price = priceOf(config);
  const royalName = nameOf(config);
  const name = customName.trim() || royalName;

  const update = <K extends keyof AtelierConfig>(key: K, value: AtelierConfig[K]) => {
    setConfig((c) => ({ ...c, [key]: value }));
    setAdded(false);
  };

  const share = async () => {
    const url = `${window.location.origin}/atelier?cup=${encodeConfig(config)}`;
    window.history.replaceState(null, "", `/atelier?cup=${encodeConfig(config)}`);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the URL bar now holds the link instead.
    }
  };

  const commission = () => {
    addItem({
      key: `custom:${encodeConfig(config)}:${name}`,
      name,
      price,
      detail: describe(config),
      recipe,
    });
    setAdded(true);
    openCart();
  };

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
      {/* Live preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="gilded relative bg-ink-2/70 px-4 pt-8 pb-8 sm:px-8">
          <div className="absolute inset-x-16 top-1/3 h-40 rounded-full bg-gold/10 blur-3xl" />
          <CupIllustration recipe={recipe} labels steam className="relative mx-auto w-full max-w-md" title={name} />

          <div className="relative mt-6 text-center">
            <p className="eyebrow text-[0.62rem] text-muted">You have composed</p>
            <h2 key={name} className="animate-fade-up mt-2 font-display text-3xl text-gold-bright italic sm:text-4xl">
              {name}
            </h2>
            <p className="mt-2 text-base text-muted">{describe(config)}</p>
          </div>

          <div className="relative mt-8">
            <FlavorProfile profile={profile} />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div>
        <ol className="space-y-10">
          {STEPS.map((step) => (
            <li key={step.numeral} className="border-b border-line pb-10">
              <div className="flex items-baseline gap-4">
                <span className="font-caps text-2xl text-gold">{step.numeral}</span>
                <div>
                  <h3 className="font-display text-3xl">{step.title}</h3>
                  <p className="text-base text-muted italic">{step.blurb}</p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {step.fields
                  .filter((f) => !f.hiddenWhen?.(config))
                  .map((f) => (
                    <div key={f.key}>
                      {f.label && <p className="eyebrow mb-2.5 text-[0.62rem] text-muted">{f.label}</p>}
                      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={f.label ?? step.title}>
                        {(OPTIONS[f.key] as { value: AtelierConfig[typeof f.key]; label: string; price: number; hint?: string }[]).map((o) => {
                          const selected = config[f.key] === o.value;
                          return (
                            <button
                              key={String(o.value)}
                              role="radio"
                              aria-checked={selected}
                              onClick={() => update(f.key, o.value)}
                              className={`group relative border px-4 py-2.5 text-left transition-all duration-300 ${
                                selected
                                  ? "border-gold bg-gold/12 shadow-[0_0_24px_-8px_rgba(212,175,95,0.6)]"
                                  : "border-line hover:border-gold/50"
                              }`}
                            >
                              <span className={`block text-lg leading-tight ${selected ? "text-gold-bright" : "text-ivory"}`}>
                                {o.label}
                              </span>
                              <span className="block text-sm text-muted">
                                {o.price ? `+${formatPrice(o.price)}` : "Included"}
                                {o.hint && <span className="italic"> · {o.hint}</span>}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <label htmlFor="cup-name" className="eyebrow text-[0.62rem] text-muted">
            Bestow your own title (optional)
          </label>
          <input
            id="cup-name"
            value={customName}
            onChange={(e) => setCustomName(e.target.value.slice(0, 40))}
            placeholder={royalName}
            className="mt-3 w-full border-b border-line bg-transparent py-2 font-display text-2xl text-ivory italic placeholder:text-ivory/30 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border border-line bg-ink-2/70 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow text-[0.62rem] text-muted">Price</p>
            <p className="font-display text-4xl text-gold-bright tabular-nums">{formatPrice(price)}</p>
          </div>
          <button onClick={commission} className="btn-gold">
            {added ? (
              <>
                <HiCheck className="h-4 w-4" /> Added to tray
              </>
            ) : (
              "Commission this cup"
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => {
              setConfig(randomConfig());
              setAdded(false);
            }}
            className="btn-ghost"
          >
            <HiOutlineSparkles className="h-4 w-4" /> A royal whim
          </button>
          <button onClick={share} className="btn-ghost">
            {copied ? <HiCheck className="h-4 w-4" /> : <HiOutlineLink className="h-4 w-4" />}
            {copied ? "Link copied" : "Share this cup"}
          </button>
        </div>
      </div>
    </div>
  );
}
