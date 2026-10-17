"use client";

import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import CupIllustration from "./CupIllustration";
import ItemVisual from "./ItemVisual";

export default function ProductCard({ item }: { item: MenuItem }) {
  const { addItem, openCart } = useCart();

  const quickAdd = () => {
    addItem({
      key: `${item.slug}:regal`,
      slug: item.slug,
      name: item.name,
      price: item.price,
      detail: item.recipe ? "Regal · 8 oz" : undefined,
      recipe: item.recipe,
      image: item.recipe ? undefined : item.image,
    });
    openCart();
  };

  return (
    <article className="group gilded relative flex h-full flex-col bg-ink-2/80 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-ink-2">
      <Link href={`/menu/${item.slug}`} className="block" aria-label={`View ${item.name}`}>
        <div className="relative flex h-56 items-center justify-center overflow-hidden">
          <div className="absolute inset-x-8 bottom-2 h-16 rounded-full bg-gold/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60" />
          {item.recipe ? (
            <CupIllustration
              recipe={item.recipe}
              steam
              className="relative h-full w-auto transition-transform duration-700 group-hover:scale-105"
              title={item.name}
            />
          ) : (
            <ItemVisual image={item.image} name={item.name} className="h-full w-full" sizes="(min-width: 1024px) 25vw, 90vw" />
          )}
        </div>
      </Link>

      <p className="eyebrow mt-6 text-[0.62rem]">{item.tagline}</p>
      <div className="mt-2 flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight">
          <Link href={`/menu/${item.slug}`} className="hover:text-gold-bright">
            {item.name}
          </Link>
        </h3>
        <span className="mt-1 shrink-0 font-caps text-sm text-gold-bright">{formatPrice(item.price)}</span>
      </div>
      <p className="mt-2 text-base text-muted italic">{item.notes.join(" · ")}</p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <Link href={`/menu/${item.slug}`} className="font-caps text-[0.7rem] tracking-[0.2em] text-ivory/70 uppercase hover:text-gold-bright">
          Details →
        </Link>
        <button
          onClick={quickAdd}
          className="flex items-center gap-1.5 rounded-full border border-gold/40 px-4 py-2 font-caps text-[0.68rem] tracking-[0.18em] text-gold-bright uppercase transition-colors hover:bg-gold hover:text-ink"
          aria-label={`Add ${item.name} to order`}
        >
          <HiPlus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </article>
  );
}
