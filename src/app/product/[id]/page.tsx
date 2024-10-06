import { notFound } from "next/navigation";
import CardWine from "~/components/card-wine";
import { ProductPageComponent } from "~/components/product-page";
import { getWineById, getWines } from "~/server/db/select";

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const wine = await getWineById(params.id);
  if (!wine) return notFound();
  const wines = await getWines();

  return (
    <>
      <ProductPageComponent wine={wine} />;
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <h2 className="mb-8 text-center text-3xl font-bold pb-6">
            VOCÊ TAMBÉM PODE GOSTAR
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wines.splice(0, 4).map((vinho) => {
              return (
                <CardWine
                  key={vinho.name}
                  name={vinho.name}
                  stars={vinho.stars} // Coloque a avaliação que desejar
                  price={vinho.preco}
                  discount={vinho.desconto}
                  imgUrl={vinho.img}
                  id={vinho.id}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
