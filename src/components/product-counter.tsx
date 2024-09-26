import { type IProduto } from "data/vinhos";
import { LucideLoader2, Minus, Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useCart } from "~/context/cart-context";

const CurrentProductCount = dynamic(
  () => import("./product-page/current-prduct-count"),
  {
    ssr: false,
    loading: () => (
      <LucideLoader2 className="size-5 animate-spin text-muted-foreground"></LucideLoader2>
    ),
  },
);

export function ProductCounter({ product }: { product: IProduto }) {
  const { incrementItem, decrementItem } = useCart();

  return (
    <div className="flex h-12 w-56 items-center justify-between rounded-full bg-neutral-200 px-6">
      <button
        className="hover:opacity-85"
        onClick={() => decrementItem(product.id)}
      >
        <Minus className="h-6 w-6" />
      </button>
      <CurrentProductCount product={product} />
      <button
        className="hover:opacity-85"
        onClick={() => incrementItem(product)}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
