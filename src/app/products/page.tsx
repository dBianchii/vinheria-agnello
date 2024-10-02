import { getMaxPrice, getWines } from "~/server/db/select";

import ProductsPage from "./_components/products-page";
import { searchParamsCache } from "./_components/nuqs-parsers";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { categoria, tipo, pais, uva } = searchParamsCache.parse(searchParams);
  const wines = await getWines({ categoria, tipo, pais, uva });

  const maxPrice = (await getMaxPrice()) ?? 0;
  return <ProductsPage wines={wines} maxPrice={maxPrice} />;
}
