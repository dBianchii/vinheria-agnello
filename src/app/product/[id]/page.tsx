import { notFound } from "next/navigation";
import { ProductPageComponent } from "~/components/product-page";
import { getWineById } from "~/server/db/select";

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const wine = await getWineById(params.id);
  if (!wine) return notFound();

  return <ProductPageComponent wine={wine} />;
}
