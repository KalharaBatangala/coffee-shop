"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import { Crown, WaxSeal } from "./Ornament";

export type Decree = {
  number: string;
  name: string;
  pickup: string;
  service: "dine-in" | "takeaway";
  items: CartItem[];
  subtotal: number;
  fee: number;
  date: Date;
};

/** The order confirmation: a parchment decree that unfurls and is stamped with a wax seal. */
export default function RoyalDecree({ decree, onClose }: { decree: Decree; onClose: () => void }) {
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  const dateText = decree.date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="mt-12 flex flex-col items-center">
      <article
        id="royal-decree"
        className="relative w-full max-w-2xl px-8 py-12 text-[#3a2a17] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] sm:px-14"
        style={{
          animation: "unfurl 1.1s cubic-bezier(0.3, 0.8, 0.25, 1) both",
          background:
            "radial-gradient(ellipse at 20% 10%, #f7eed9 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, #e2d0a8 0%, transparent 60%), #efe3c8",
        }}
      >
        <div className="pointer-events-none absolute inset-3 border border-[#9c7a35]/50" />
        <div className="pointer-events-none absolute inset-5 border border-[#9c7a35]/25" />

        <div className="relative text-center">
          <Crown className="mx-auto h-9 w-12 text-[#9c7a35]" />
          <p className="mt-4 font-caps text-[0.7rem] tracking-[0.4em] text-[#7a5c25]">By Royal Decree</p>
          <h2 className="mt-3 font-script text-5xl text-[#5e111c] sm:text-6xl">Let it be known</h2>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed">
            that on this day, the {dateText}, <strong className="font-semibold">{decree.name}</strong> has commissioned the following
            from the Royal Coffee house, to be served {decree.service === "dine-in" ? "at court" : "for the journey"},{" "}
            {decree.pickup.toLowerCase()}:
          </p>
        </div>

        <ul className="relative mt-8 space-y-2 border-y border-[#9c7a35]/40 py-5 text-lg">
          {decree.items.map((i) => (
            <li key={i.key} className="flex items-baseline gap-3">
              <span className="font-caps text-sm">{i.qty} ×</span>
              <span className="italic">{i.name}</span>
              <span className="flex-1 border-b border-dotted border-[#9c7a35]/50" />
              <span>{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>

        <dl className="relative mt-4 ml-auto max-w-xs space-y-1 text-base">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatPrice(decree.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Service</dt>
            <dd>{formatPrice(decree.fee)}</dd>
          </div>
          <div className="flex justify-between font-caps text-sm tracking-[0.15em]">
            <dt>Total due</dt>
            <dd className="text-lg">{formatPrice(decree.subtotal + decree.fee)}</dd>
          </div>
        </dl>

        <div className="relative mt-12 flex items-end justify-between gap-4">
          <div>
            <p className="font-script text-3xl text-[#3a2a17]">The Royal Barista</p>
            <p className="mt-1 border-t border-[#3a2a17]/40 pt-1 font-caps text-[0.6rem] tracking-[0.3em]">Order {decree.number}</p>
          </div>
          <div className="-mb-4 shrink-0" style={{ animation: "seal-stamp 0.7s cubic-bezier(0.3, 1.4, 0.5, 1) 1.1s both" }}>
            <WaxSeal className="h-28 w-28 drop-shadow-[0_8px_10px_rgba(60,10,15,0.45)]" label={decree.number.slice(3)} />
          </div>
        </div>
      </article>

      <div className="no-print mt-10 flex flex-wrap justify-center gap-3">
        <button onClick={() => window.print()} className="btn-ghost">
          Print the decree
        </button>
        <Link href="/menu" onClick={onClose} className="btn-gold">
          Return to the menu
        </Link>
      </div>
    </div>
  );
}
