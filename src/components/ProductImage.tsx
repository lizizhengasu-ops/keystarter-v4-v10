import { PRODUCT_IMAGES } from "../data/product-images";

export default function ProductImage({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const src = PRODUCT_IMAGES[slug] || "";
  if (!src) {
    return (
      <div className={"w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center overflow-hidden " + className}>
        <span className="text-5xl font-bold text-[#7c3aed]/25">{name ? name[0] : "K"}</span>
      </div>
    );
  }
  return (
    <div className={"w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#e8e8ed] flex items-center justify-center " + className}>
      <img src={src} alt={name} className="w-full h-full object-contain p-3" loading="lazy" />
    </div>
  );
}
