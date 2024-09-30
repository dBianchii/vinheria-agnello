import dynamic from "next/dynamic";
import { getWines } from "~/server/db/select";

const CartPageComponent = dynamic(
  () => import("~/components/ui/cart/cart-page"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export default async function CartPage() {
  const wines = await getWines();
  return <CartPageComponent wines={wines} />;
}
