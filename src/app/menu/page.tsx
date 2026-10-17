import type { Metadata } from "next";
import { SectionHeading } from "@/components/Ornament";
import MenuGrid from "./MenuGrid";

export const metadata: Metadata = {
  title: "The Royal Menu",
  description: "Signature Ceylon coffees, espresso classics, cold brews and fresh bakes.",
};

export default function MenuPage() {
  return (
    <div className="lattice grain relative pt-36 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="By royal appointment" title="The Royal Menu">
          Each cup is drawn in cross-section so you can see exactly what goes into it, layer by layer.
        </SectionHeading>
        <MenuGrid />
      </div>
    </div>
  );
}
