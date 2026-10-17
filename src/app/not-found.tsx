import Link from "next/link";
import CupIllustration from "@/components/CupIllustration";

export default function NotFound() {
  return (
    <div className="lattice grain flex min-h-[80vh] flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
      <CupIllustration recipe={{ layers: [{ ingredient: "espresso", amount: 1 }], fill: 0.06 }} className="h-56 w-auto opacity-80" title="An empty cup" />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="mt-4 font-display text-5xl">This cup is empty</h1>
      <p className="mt-4 max-w-md text-lg text-muted">The page you seek is not within the palace walls.</p>
      <Link href="/" className="btn-gold mt-10">
        Return to court
      </Link>
    </div>
  );
}
