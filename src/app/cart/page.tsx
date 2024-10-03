import dynamic from "next/dynamic";
import { getWines } from "~/server/db/select";

const CartPageComponent = dynamic(
  () => import("~/components/ui/cart/cart-page"),
  {
    ssr: false,
    loading: () => <div className="mx-auto flex px-4 py-8">Loading...</div>,
  },
);

export default async function CartPage() {
  const wines = await getWines();
  return <CartPageComponent wines={wines} />;
}
