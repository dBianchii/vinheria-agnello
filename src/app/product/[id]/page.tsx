import { vinhos } from "data/vinhos";
import { notFound } from "next/navigation";
import { ProductPageComponent } from "~/components/product-page";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = vinhos.find((vinho) => vinho.id === params.id);
  if (!product) return notFound();

  return <ProductPageComponent product={product} />;
}
