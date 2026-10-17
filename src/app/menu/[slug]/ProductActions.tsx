"use client";

import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { SIZES, type MenuItem, type SizeId } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import { QtyButton } from "@/components/CartDrawer";

export default function ProductActions({ item }: { item: MenuItem }) {
  const { addItem, openCart } = useCart();
  const isDrink = Boolean(item.recipe);
  const [size, setSize] = useState<SizeId>("regal");
  const [qty, setQty] = useState(1);

  const sizeInfo = SIZES.find((s) => s.id === size)!;
  const unit = item.price + (isDrink ? sizeInfo.extra : 0);

  const add = () => {
    addItem(
      {
        key: isDrink ? `${item.slug}:${size}` : item.slug,
        slug: item.slug,
        name: item.name,
        price: unit,
        detail: isDrink ? `${sizeInfo.label} · ${sizeInfo.detail}` : undefined,
        recipe: item.recipe,
        image: item.recipe ? undefined : item.image,
      },
      qty,
    );
    openCart();
  };

  return (
    <div className="mt-10 space-y-6">
      {isDrink && (
        <fieldset>
          <legend className="eyebrow mb-3">Size</legend>
          <div className="grid grid-cols-2 gap-3">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                aria-pressed={size === s.id}
                className={`border px-4 py-3 text-left transition-colors ${
                  size === s.id ? "border-gold bg-gold/10" : "border-line hover:border-gold/50"
                }`}
              >
                <span className="block font-display text-xl">{s.label}</span>
                <span className="text-sm text-muted">
                  {s.detail}
                  {s.extra ? ` · +${formatPrice(s.extra)}` : ""}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <QtyButton label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            <HiMinus />
          </QtyButton>
          <span className="w-6 text-center font-caps">{qty}</span>
          <QtyButton label="Increase quantity" onClick={() => setQty((q) => Math.min(20, q + 1))}>
            <HiPlus />
          </QtyButton>
        </div>
        <button onClick={add} className="btn-gold flex-1 sm:flex-none">
          Add to order · {formatPrice(unit * qty)}
        </button>
      </div>
    </div>
  );
}
