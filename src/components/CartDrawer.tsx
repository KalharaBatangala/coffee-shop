"use client";

import Link from "next/link";
import { useEffect } from "react";
import { HiMinus, HiPlus, HiXMark } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import ItemVisual from "./ItemVisual";
import { Crown } from "./Ornament";

export default function CartDrawer() {
  const { items, total, isOpen, closeCart, setQty } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-line bg-ink-2 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="eyebrow">Your order</p>
            <h2 className="font-display text-2xl">The Royal Tray</h2>
          </div>
          <button onClick={closeCart} className="rounded-full p-2 text-ivory/70 hover:text-gold-bright" aria-label="Close cart">
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <Crown className="h-10 w-14 text-gold/40" />
            <p className="font-display text-2xl">Your tray awaits</p>
            <p className="text-muted">Nothing has been commissioned yet.</p>
            <Link href="/menu" onClick={closeCart} className="btn-ghost mt-2">
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded bg-ink-3">
                    <ItemVisual recipe={item.recipe} image={item.image} name={item.name} className="h-full w-full rounded" sizes="64px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-display text-xl leading-tight">{item.name}</p>
                        {item.detail && <p className="mt-0.5 text-sm text-muted">{item.detail}</p>}
                      </div>
                      <p className="shrink-0 text-gold-bright">{formatPrice(item.price * item.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <QtyButton label="Decrease" onClick={() => setQty(item.key, item.qty - 1)}>
                        <HiMinus />
                      </QtyButton>
                      <span className="w-5 text-center font-caps text-sm">{item.qty}</span>
                      <QtyButton label="Increase" onClick={() => setQty(item.key, item.qty + 1)}>
                        <HiPlus />
                      </QtyButton>
                      <button
                        onClick={() => setQty(item.key, 0)}
                        className="ml-auto text-sm text-muted underline-offset-4 hover:text-ivory hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Total</span>
                <span className="font-display text-3xl text-gold-bright">{formatPrice(total)}</span>
              </div>
              <Link href="/cart" onClick={closeCart} className="btn-gold mt-5 w-full">
                Proceed to checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function QtyButton({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-sm text-ivory/80 transition-colors hover:border-gold hover:text-gold-bright"
    >
      {children}
    </button>
  );
}
