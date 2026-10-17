import type { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Reveal from "@/components/Reveal";
import { Crown, Divider } from "@/components/Ornament";

export const metadata: Metadata = {
  title: "Our Heritage",
  description: "How Ceylon became one of the world's great coffee islands, lost its crown to a fungus, and why we are bringing it back.",
};

const TIMELINE = [
  {
    year: "c. 1500s",
    title: "A bean arrives by sea",
    text: "Coffee is believed to have reached the island with Arab traders. For generations, it is said, its leaves flavoured curries and its white blossoms were offered at temples — the beans themselves rarely brewed.",
  },
  {
    year: "c. 1740",
    title: "The Dutch experiment",
    text: "The Dutch East India Company attempts to cultivate coffee in the lowlands. Results are modest, but the seed of an industry is planted.",
  },
  {
    year: "1815",
    title: "The fall of the last kingdom",
    text: "The Kandyan Convention cedes the hill kingdom of Kandy to the British, opening the cool central highlands — perfect coffee country.",
  },
  {
    year: "1820s",
    title: "The first plantations",
    text: "Governor Sir Edward Barnes champions coffee estates around Gampola and Kandy. Forest gives way to terraced slopes of glossy green shrubs.",
  },
  {
    year: "1867",
    title: "A quiet experiment",
    text: "On the Loolecondera estate, a Scottish planter named James Taylor plants a few acres of tea. Almost nobody notices.",
  },
  {
    year: "1869",
    title: "A rust-coloured spot",
    text: "A fungus, Hemileia vastatrix — coffee leaf rust — is first recorded on Ceylon estates. At first it seems a minor nuisance.",
  },
  {
    year: "1870s",
    title: "The coffee crown",
    text: "Even as the rust spreads, Ceylon ranks among the largest coffee producers in the world, its highland coffee filling cups across the Empire.",
    highlight: true,
  },
  {
    year: "1880s",
    title: "The crown falls",
    text: "Estate by estate, the rust strips the shrubs bare and the great plantations are ruined. Planters replant with tea, and 'Ceylon' becomes a word for tea, not coffee.",
  },
  {
    year: "Today",
    title: "The crown, reclaimed",
    text: "Small growers in the hills are reviving Ceylon coffee. Royal Coffee is our tribute to that revival — highland beans, island ingredients, and a little ceremony.",
    highlight: true,
  },
];

export default function HeritagePage() {
  return (
    <div className="lattice grain relative overflow-hidden pt-36 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our heritage</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] font-medium sm:text-7xl">
            The island that <span className="gold-text italic">lost its crown</span>
          </h1>
          <p className="mt-8 text-xl leading-relaxed text-ivory/80">
            Before Ceylon was famous for tea, it was famous for coffee. This is the story of a crown won, lost to a fungus, and
            quietly being reclaimed.
          </p>
          <Divider className="mt-10" />
        </header>

        <ol className="relative mt-20">
          <span className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent md:left-1/2" />
          {TIMELINE.map((t, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal as="li" key={t.year + t.title} className="relative mb-14 pl-14 md:mb-20 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span
                  className={`absolute top-2 left-4 z-10 flex h-4 w-4 -translate-x-1/2 rotate-45 border border-gold md:left-1/2 ${
                    t.highlight ? "bg-gold shadow-[0_0_20px_rgba(212,175,95,0.7)]" : "bg-ink"
                  }`}
                />
                <div className={right ? "md:col-start-2" : "md:text-right"}>
                  <p className={`font-caps tracking-[0.2em] ${t.highlight ? "text-gold-bright" : "text-gold"}`}>{t.year}</p>
                  <h2 className="mt-2 font-display text-3xl">{t.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed text-ivory/75">{t.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="gilded mx-auto mt-10 max-w-3xl bg-ink-2/80 px-8 py-14 text-center sm:px-14">
          <Crown className="mx-auto h-8 w-11 text-gold" />
          <blockquote className="mt-6 font-display text-3xl leading-snug italic sm:text-4xl">
            “We are not inventing a tradition. We are pouring one back into the cup.”
          </blockquote>
          <p className="eyebrow mt-6 text-muted">The Royal Coffee house</p>
        </Reveal>

        <Reveal className="mx-auto mt-24 grid max-w-4xl items-center gap-10 border-t border-line pt-16 md:grid-cols-[auto_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/50 font-script text-5xl text-gold">
            KB
          </div>
          <div>
            <p className="eyebrow">Behind the counter</p>
            <h2 className="mt-3 font-display text-4xl">Crafted by Kalhara Batangala</h2>
            <p className="mt-4 text-lg text-ivory/75">
              Royal Coffee is a portfolio concept built with Next.js, React, TypeScript and Tailwind CSS. The shop is imaginary; the
              history is real. Every drink illustration is generated from its recipe in SVG, and the same engine powers the{" "}
              <Link href="/atelier" className="text-gold-bright underline-offset-4 hover:underline">
                Royal Atelier
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://lk.linkedin.com/in/kalhara-batangala-2bb635213" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FaLinkedinIn className="h-4 w-4" /> LinkedIn
              </a>
              <a href="https://github.com/KalharaBatangala" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
