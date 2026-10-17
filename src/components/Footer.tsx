import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Crown } from "./Ornament";
import OpenStatus from "./OpenStatus";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-3">
            <Crown className="h-6 w-8 text-gold" />
            <span className="font-caps text-lg tracking-[0.25em]">
              ROYAL<span className="text-gold"> COFFEE</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-muted italic">
            Reviving the forgotten coffee crown of Ceylon, one carefully pulled cup at a time.
          </p>
          <div className="mt-6">
            <OpenStatus />
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-5 space-y-2.5">
            {[
              ["/menu", "The Royal Menu"],
              ["/atelier", "The Atelier"],
              ["/heritage", "Our Heritage"],
              ["/cart", "Your Order"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-ivory/80 transition-colors hover:text-gold-bright">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="eyebrow">Court Hours</h3>
          <dl className="mt-5 space-y-2.5 text-ivory/80">
            <div className="flex justify-between gap-6 border-b border-line pb-2.5">
              <dt>Monday – Friday</dt>
              <dd className="text-gold-bright">7:00 – 22:00</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-line pb-2.5">
              <dt>Saturday – Sunday</dt>
              <dd className="text-gold-bright">8:00 – 23:00</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt>Location</dt>
              <dd>Kandy, Sri Lanka</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted sm:px-6 md:flex-row lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Royal Coffee · A portfolio concept by{" "}
            <span className="text-ivory">Kalhara Batangala</span>. Not a real shop.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/KalharaBatangala"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-gold-bright"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://lk.linkedin.com/in/kalhara-batangala-2bb635213"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-gold-bright"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
