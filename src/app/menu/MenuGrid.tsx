"use client";

import { useState } from "react";
import { CATEGORIES, menu, type Category } from "@/data/menu";
import ProductCard from "@/components/ProductCard";

export default function MenuGrid() {
  const [active, setActive] = useState<Category | "all">("all");
  const items = active === "all" ? menu : menu.filter((m) => m.category === active);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter menu">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={active === c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-5 py-2 font-caps text-[0.7rem] tracking-[0.2em] uppercase transition-all ${
              active === c.id
                ? "border-gold bg-gold text-ink"
                : "border-line text-ivory/75 hover:border-gold/60 hover:text-gold-bright"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, i) => (
          <div key={item.slug} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
