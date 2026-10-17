import Image from "next/image";
import Link from "next/link";
import { getItem, menu, signatures } from "@/data/menu";
import CupIllustration from "@/components/CupIllustration";
import CyclingCup from "@/components/CyclingCup";
import ProductCard from "@/components/ProductCard";
import BrewQuiz from "@/components/BrewQuiz";
import OpenStatus from "@/components/OpenStatus";
import Reveal from "@/components/Reveal";
import { Crown, Divider, SectionHeading } from "@/components/Ornament";
import cappuccino from "../../public/assets/cappuccino.jpg";

const MARQUEE = [
  "Ceylon Highland Arabica",
  "Wild Kithul Treacle",
  "True Ceylon Cinnamon",
  "Fresh Coconut Milk",
  "Hand-pulled Espresso",
  "Edible Gold Leaf",
  "Eighteen-hour Cold Brew",
];

const PILLARS = [
  {
    title: "Highland beans",
    text: "Arabica grown in the misty hills around Kandy, roasted in small batches every week.",
  },
  {
    title: "Island ingredients",
    text: "Kithul treacle, coconut milk and true Ceylon cinnamon — flavours this island has always known.",
  },
  {
    title: "A little ceremony",
    text: "Every order is sealed with a royal decree. Coffee should feel like an occasion.",
  },
];

export default function HomePage() {
  const hero = getItem("cinnamon-court-latte")!;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="lattice grain relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(212,175,95,0.16),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(139,30,44,0.18),transparent_50%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
          <div className="text-center lg:text-left">
            <p className="eyebrow animate-fade-up">Ceylon&apos;s lost coffee crown · Reclaimed</p>
            <h1
              className="animate-fade-up mt-6 font-script text-7xl leading-[1.15] sm:text-8xl lg:text-9xl"
              style={{ animationDelay: "120ms" }}
            >
              <span className="gold-text px-2">Royal Coffee</span>
            </h1>
            <p
              className="animate-fade-up mx-auto mt-6 max-w-xl text-xl leading-relaxed text-ivory/80 sm:text-2xl lg:mx-0"
              style={{ animationDelay: "240ms" }}
            >
              A century before the world drank Ceylon tea, it drank Ceylon coffee. We&apos;re bringing it back — with island
              ingredients and a little royal ceremony.
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
              style={{ animationDelay: "360ms" }}
            >
              <Link href="/atelier" className="btn-gold">
                Compose your cup
              </Link>
              <Link href="/menu" className="btn-ghost">
                View the menu
              </Link>
            </div>
            <div className="animate-fade-up mt-10" style={{ animationDelay: "480ms" }}>
              <OpenStatus />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-fade-up" style={{ animationDelay: "300ms" }}>
            <div className="absolute inset-12 rounded-full bg-gold/15 blur-3xl" />
            <div style={{ animation: "float 7s ease-in-out infinite" }}>
              <CupIllustration recipe={hero.recipe!} labels steam className="relative w-full" title={hero.name} />
            </div>
            <p className="relative mt-2 text-center eyebrow text-muted">
              Anatomy of the <span className="text-gold-bright">{hero.name}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Marquee ---------- */}
      <div className="overflow-hidden border-y border-line bg-ink-2 py-5" aria-hidden="true">
        <div className="flex w-max" style={{ animation: "marquee 40s linear infinite" }}>
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 font-caps text-sm tracking-[0.3em] whitespace-nowrap text-gold/80 uppercase">
              {m}
              <Crown className="h-3 w-4 text-gold/50" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Signatures ---------- */}
      <section className="relative py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="The crown jewels" title="Our Signatures">
              Recipes you won&apos;t find anywhere else, built on the flavours of the island.
            </SectionHeading>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {signatures.map((item, i) => (
              <Reveal key={item.slug} delay={i * 120}>
                <ProductCard item={item} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link href="/menu" className="btn-ghost">
              The full menu · {menu.length} offerings
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Atelier teaser ---------- */}
      <section className="lattice relative overflow-hidden border-y border-line bg-ink-2 py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <CyclingCup items={menu} labels className="mx-auto max-w-md" />
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={120}>
            <SectionHeading eyebrow="The Royal Atelier" title={<>Your cup, <em className="text-gold">your decree</em></>} align="left">
              Choose your shots, your milk, your sweetness and your crown, and watch the glass fill layer by layer. Every creation
              is given its own royal title — <em className="text-ivory">The Amber Duke</em>,{" "}
              <em className="text-ivory">The Gilded Emperor of the Highlands</em> — and can be shared with a single link.
            </SectionHeading>
            <Link href="/atelier" className="btn-gold mt-10">
              Enter the Atelier
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Heritage teaser ---------- */}
      <section className="relative py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow">A forgotten history</p>
            <p className="mt-6 font-display text-8xl leading-none font-medium sm:text-9xl">
              <span className="gold-text">1870s</span>
            </p>
            <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">
              Ceylon was one of the largest coffee producers on earth.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ivory/75">
              Then, in 1869, a rust-coloured fungus appeared on the leaves. Within twenty years the coffee estates were gone and
              the island turned to tea. Ceylon coffee was almost forgotten.
            </p>
            <Link href="/heritage" className="btn-ghost mt-10">
              Read the story
            </Link>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="gilded relative aspect-[4/5] overflow-hidden">
              <Image
                src={cappuccino}
                alt="A cappuccino with rosetta latte art in a black cup"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden max-w-[16rem] border border-line bg-ink/90 p-5 backdrop-blur sm:block lg:-left-10">
              <p className="font-script text-3xl text-gold">Since 1500s</p>
              <p className="mt-1 text-base text-ivory/75 italic">Coffee has grown on this island for five hundred years.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Pillars ---------- */}
      <section className="border-y border-line bg-ink-2 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120} className="text-center">
              <span className="font-caps text-2xl text-gold">{["I", "II", "III"][i]}</span>
              <h3 className="mt-3 font-display text-3xl">{p.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-lg text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Quiz ---------- */}
      <section className="lattice relative py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Consult the oracle" title="Which royal brew are you?">
              Three questions. One cup, chosen for you by the court.
            </SectionHeading>
          </Reveal>
          <Reveal className="mt-14" delay={100}>
            <BrewQuiz />
          </Reveal>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="relative overflow-hidden border-t border-line py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,95,0.12),transparent_60%)]" />
        <Reveal className="relative mx-auto max-w-2xl px-4">
          <Crown className="mx-auto h-10 w-14 text-gold" />
          <h2 className="mt-6 font-display text-5xl font-medium sm:text-6xl">The court is in session</h2>
          <Divider className="mt-6" />
          <p className="mt-6 text-xl text-ivory/75">Order ahead, and your cup will be waiting — sealed with a royal decree.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-gold">
              Order now
            </Link>
            <Link href="/heritage" className="btn-ghost">
              Our heritage
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
