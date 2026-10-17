"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { useCart, type CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import ItemVisual from "@/components/ItemVisual";
import { QtyButton } from "@/components/CartDrawer";
import { Crown } from "@/components/Ornament";
import RoyalDecree, { type Decree } from "@/components/RoyalDecree";

const PICKUP = ["As soon as possible", "In 15 minutes", "In 30 minutes", "In 1 hour"];

export default function Checkout() {
  const { items, total, setQty, clear } = useCart();
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState(PICKUP[0]);
  const [service, setService] = useState<"dine-in" | "takeaway">("dine-in");
  const [decree, setDecree] = useState<Decree | null>(null);

  const serviceFee = Math.round(total * 0.1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    setDecree({
      number: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim() || "Honoured Guest",
      pickup,
      service,
      items: items as CartItem[],
      subtotal: total,
      fee: serviceFee,
      date: new Date(),
    });
    clear();
  };

  if (decree) return <RoyalDecree decree={decree} onClose={() => setDecree(null)} />;

  if (!items.length) {
    return (
      <div className="mt-16 flex flex-col items-center gap-5 border border-line bg-ink-2/60 px-6 py-20 text-center">
        <Crown className="h-12 w-16 text-gold/40" />
        <p className="font-display text-3xl">Your tray awaits</p>
        <p className="max-w-sm text-muted">Nothing has been commissioned yet. Visit the menu, or compose your own cup in the Atelier.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/menu" className="btn-gold">
            Browse the menu
          </Link>
          <Link href="/atelier" className="btn-ghost">
            Enter the Atelier
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.key} className="flex gap-5 py-6">
            <div className="flex h-28 w-24 shrink-0 items-center justify-center bg-ink-2">
              <ItemVisual recipe={item.recipe} image={item.image} name={item.name} className="h-full w-full" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div className="min-w-0">
                  {item.slug ? (
                    <Link href={`/menu/${item.slug}`} className="font-display text-2xl hover:text-gold-bright">
                      {item.name}
                    </Link>
                  ) : (
                    <p className="font-display text-2xl">
                      {item.name} <span className="eyebrow ml-1 text-[0.58rem]">Atelier</span>
                    </p>
                  )}
                  {item.detail && <p className="text-base text-muted">{item.detail}</p>}
                </div>
                <p className="font-caps text-gold-bright">{formatPrice(item.price * item.qty)}</p>
              </div>
              <div className="mt-auto flex items-center gap-3 pt-3">
                <QtyButton label="Decrease" onClick={() => setQty(item.key, item.qty - 1)}>
                  <HiMinus />
                </QtyButton>
                <span className="w-6 text-center font-caps text-sm">{item.qty}</span>
                <QtyButton label="Increase" onClick={() => setQty(item.key, item.qty + 1)}>
                  <HiPlus />
                </QtyButton>
                <span className="ml-2 text-sm text-muted">{formatPrice(item.price)} each</span>
                <button onClick={() => setQty(item.key, 0)} className="ml-auto text-sm text-muted hover:text-ivory hover:underline">
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="gilded h-fit space-y-6 bg-ink-2/70 p-7 lg:sticky lg:top-24">
        <h2 className="font-display text-3xl">Seal your order</h2>

        <div>
          <label htmlFor="guest" className="eyebrow text-[0.62rem] text-muted">
            Name for the decree
          </label>
          <input
            id="guest"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="Honoured Guest"
            autoComplete="given-name"
            className="mt-2 w-full border-b border-line bg-transparent py-2 font-display text-2xl placeholder:text-ivory/30 focus:border-gold focus:outline-none"
          />
        </div>

        <fieldset>
          <legend className="eyebrow mb-2 text-[0.62rem] text-muted">Service</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["dine-in", "takeaway"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setService(s)}
                aria-pressed={service === s}
                className={`border py-2.5 font-caps text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                  service === s ? "border-gold bg-gold/10 text-gold-bright" : "border-line text-ivory/75 hover:border-gold/50"
                }`}
              >
                {s === "dine-in" ? "Dine at court" : "Take away"}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="pickup" className="eyebrow text-[0.62rem] text-muted">
            When
          </label>
          <select
            id="pickup"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="mt-2 w-full border border-line bg-ink-3 px-3 py-2.5 text-lg text-ivory focus:border-gold focus:outline-none"
          >
            {PICKUP.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <dl className="space-y-2 border-t border-line pt-5 text-lg">
          <div className="flex justify-between">
            <dt className="text-muted">Subtotal</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Service (10%)</dt>
            <dd>{formatPrice(serviceFee)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-line pt-3">
            <dt className="eyebrow">Total</dt>
            <dd className="font-display text-3xl text-gold-bright">{formatPrice(total + serviceFee)}</dd>
          </div>
        </dl>

        <button type="submit" className="btn-gold w-full">
          Seal the decree
        </button>
        <p className="text-center text-sm text-muted italic">Payment is made at the counter. This is a demo — no order is sent.</p>
      </form>
    </div>
  );
}
