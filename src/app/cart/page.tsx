import dynamic from "next/dynamic";

const CartPageComponent = dynamic(
  () => import("~/components/ui/cart/cart-page"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export default function CartPage() {
  return <CartPageComponent />;
}
