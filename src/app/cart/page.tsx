import dynamic from "next/dynamic";

const CartPageComponent = dynamic(
  () => import("~/components/ui/cart/cart-page"),
  { ssr: false },
);

export default function CartPage() {
  return <CartPageComponent />;
}
