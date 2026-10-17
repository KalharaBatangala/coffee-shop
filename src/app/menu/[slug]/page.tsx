import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem, menu } from "@/data/menu";
import CupIllustration from "@/components/CupIllustration";
import ProductCard from "@/components/ProductCard";
import { Divider } from "@/components/Ornament";
import FlavorProfile from "@/components/FlavorProfile";
import ProductActions from "./ProductActions";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const item = getItem((await params).slug);
  return item ? { title: item.name, description: item.description } : {};
}

export default async function ProductPage({ params }: { params: Params }) {
  const item = getItem((await params).slug);
  if (!item) notFound();

  const pairing = item.pairsWith ? getItem(item.pairsWith) : undefined;
  const related = menu.filter((m) => m.slug !== item.slug && m.category === item.category).slice(0, 3);
  const more = related.length ? related : menu.filter((m) => m.slug !== item.slug).slice(0, 3);

  return (
    <div className="lattice grain relative pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="font-caps text-[0.68rem] tracking-[0.2em] text-muted uppercase" aria-label="Breadcrumb">
          <Link href="/menu" className="hover:text-gold-bright">
            Menu
          </Link>{" "}
          / <span className="text-ivory/80">{item.name}</span>
        </nav>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="absolute inset-10 rounded-full bg-gold/10 blur-3xl" />
            {item.recipe ? (
              <div className="relative">
                <CupIllustration recipe={item.recipe} labels steam className="mx-auto w-full max-w-lg" title={item.name} />
                <p className="mt-4 text-center eyebrow text-muted">Anatomy of the cup</p>
              </div>
            ) : (
              item.image && (
                <div className="gilded relative mx-auto aspect-[4/5] max-w-md overflow-hidden">
                  <Image src={item.image} alt={item.name} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
                </div>
              )
            )}
          </div>

          <div>
            <p className="eyebrow">{item.tagline}</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-medium sm:text-6xl">{item.name}</h1>
            <p className="mt-6 text-xl leading-relaxed text-ivory/85">{item.description}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {item.notes.map((n) => (
                <span key={n} className="rounded-full border border-line px-4 py-1.5 text-base text-ivory/85 italic">
                  {n}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <FlavorProfile profile={item.profile} />
            </div>

            <ProductActions item={item} />

            {pairing && (
              <Link
                href={`/menu/${pairing.slug}`}
                className="mt-8 flex items-center gap-4 border-t border-line pt-6 text-muted transition-colors hover:text-ivory"
              >
                <span className="eyebrow text-[0.62rem]">Pairs beautifully with</span>
                <span className="font-display text-xl text-ivory italic">{pairing.name} →</span>
              </Link>
            )}
          </div>
        </div>

        {item.recipe && item.image && (
          <figure className="gilded relative mx-auto mt-24 aspect-[16/9] max-w-4xl overflow-hidden">
            <Image src={item.image} alt={`${item.name}, as served`} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover opacity-80" />
            <figcaption className="absolute bottom-0 left-0 bg-gradient-to-t from-ink/90 to-transparent p-6 font-display text-xl italic">
              As served at court.
            </figcaption>
          </figure>
        )}

        <section className="mt-28">
          <Divider />
          <h2 className="mt-6 text-center font-display text-4xl">You may also favour</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <ProductCard key={m.slug} item={m} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
