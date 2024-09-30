import { useCart } from "~/context/cart-context";

export default function CurrentProductCount({ id }: { id: number }) {
  const { items } = useCart();
  const quantity = items.find((item) => item.id === id)?.quantity ?? 0;
  return <span className="mx-4 font-semibold">{quantity}</span>;
}
