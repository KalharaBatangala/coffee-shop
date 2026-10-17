"use client";

import { useEffect, useState } from "react";
import type { MenuItem } from "@/data/menu";
import CupIllustration from "./CupIllustration";

/** Morphs one glass through several recipes, so the layers visibly pour and shift. */
export default function CyclingCup({ items, labels = false, className }: { items: MenuItem[]; labels?: boolean; className?: string }) {
  const drinks = items.filter((i) => i.recipe);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % drinks.length), 3200);
    return () => clearInterval(id);
  }, [drinks.length]);

  const current = drinks[index];
  if (!current?.recipe) return null;

  return (
    <div className={className}>
      <CupIllustration recipe={current.recipe} labels={labels} steam className="w-full" title={current.name} />
      <p key={current.slug} className="animate-fade-up mt-3 text-center font-display text-2xl text-gold-bright italic">
        {current.name}
      </p>
    </div>
  );
}
