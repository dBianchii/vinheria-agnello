import ProductsPage from "~/components/ui/products/products-page";
import { getWines } from "~/server/db/select";
export default async function CartPage() {
  const wines = await getWines();
  return <ProductsPage wines={wines} />;
}
