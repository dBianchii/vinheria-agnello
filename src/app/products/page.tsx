import dynamic from "next/dynamic";
import { getWines } from "~/server/db/select";

const ProductsPageComponent = dynamic(
  () => import("~/components/ui/products/products-page"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export default async function CartPage() {
	const wines = await getWines();
  return <ProductsPageComponent wines={wines}/>;
}

