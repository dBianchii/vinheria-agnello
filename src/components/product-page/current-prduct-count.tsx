import { type IWine } from "data/vinhos";
import { useCart } from "~/context/cart-context";

export default function CurrentProductCount({ product }: { product: IWine }) {
  const { items } = useCart();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;
  return <span className="mx-4 font-semibold">{quantity}</span>;
}
