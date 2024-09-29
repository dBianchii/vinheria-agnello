import { notFound } from "next/navigation";
import { ProductPageComponent } from "~/components/product-page";
import { getWineById, getWines } from "~/server/db/select";

export default async function ProductPage({ params }: { params: { id: number } }) {
  const product = await getWineById(params.id);
  if (!product || product.length === 0 || !product[0]) return notFound();
  return <ProductPageComponent product={product[0]} />;
}

