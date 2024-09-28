import dynamic from "next/dynamic";

const ProductsPageComponent = dynamic(
  () => import("~/components/ui/products/products-page"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

export default function CartPage() {
  return <ProductsPageComponent />;
}

