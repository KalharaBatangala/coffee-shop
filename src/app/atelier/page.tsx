import type { Metadata } from "next";
import Atelier from "./Atelier";

export const metadata: Metadata = {
  title: "The Royal Atelier",
  description: "Compose your own royal cup, layer by layer, and watch it come to life.",
};

export default function AtelierPage() {
  return (
    <div className="lattice grain relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The Royal Atelier</p>
          <h1 className="mt-4 font-display text-5xl font-medium text-balance sm:text-6xl">
            Compose a cup <span className="font-script text-6xl text-gold sm:text-7xl">worthy</span> of you
          </h1>
          <p className="mt-6 text-lg text-muted">
            Choose each element and watch your glass fill layer by layer. Every creation is given a royal title, and you can share
            it with a link.
          </p>
        </div>
        <Atelier />
      </div>
    </div>
  );
}
