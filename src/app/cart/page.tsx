import type { Metadata } from "next";
import Checkout from "./Checkout";

export const metadata: Metadata = {
  title: "Your Order",
};

export default function CartPage() {
  return (
    <div className="lattice grain relative pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow">Your order</p>
        <h1 className="mt-3 font-display text-5xl font-medium">The Royal Tray</h1>
        <Checkout />
      </div>
    </div>
  );
}
