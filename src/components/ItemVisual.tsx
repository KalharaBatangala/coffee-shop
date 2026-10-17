import Image from "next/image";
import type { Recipe } from "@/lib/ingredients";
import CupIllustration from "./CupIllustration";

/** A cart line or menu item: drawn as a cross-section if it has a recipe, else its photo. */
export default function ItemVisual({
  recipe,
  image,
  name,
  className = "",
  sizes = "96px",
}: {
  recipe?: Recipe;
  image?: string;
  name: string;
  className?: string;
  sizes?: string;
}) {
  if (recipe) {
    return <CupIllustration recipe={recipe} className={className} title={name} />;
  }
  if (image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image} alt={name} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return null;
}
