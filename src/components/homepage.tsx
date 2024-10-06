"use client";

import Image from "next/image";
import CardWine from "./card-wine";
import Stats from "./stats";
import { Button } from "./ui/button";
import { type getWines } from "~/server/db/select";
import Link from "next/link";
import { serialize } from "~/app/products/_components/nuqs-parsers";
import banner from "/public/bannervinheriaagnello.jpeg"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const maxElementsPerRow = 4;

export function Homepage({
  wines,
}: {
  wines: Awaited<ReturnType<typeof getWines>>;
}) {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-card-foreground/10 py-12 md:py-24">
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              O VINHO PERFEITO, A UM CLIQUE DE DISTÂNCIA
            </h1>
            <p className="mb-6 text-xl">
              Descubra nossa seleção de vinhos premium e encontre o sabor ideal
              para cada ocasião.
            </p>
            <Link href="/products">
              <Button variant={"default"} size={"lg"}>
                Comprar Agora
              </Button>
            </Link>
          </div>
          <div className="flex justify-end md:w-1/2">
            <Image
              src={banner}
              alt="Wine Selection"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <Stats />
      </section>

      {/* Kits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 py-4">
          <h2 className="mb-8 text-center text-3xl font-bold pb-6">KITS</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wines
              .filter((vinho) => vinho.categoria === "kit")
              .splice(0, 4)
              .map((vinho) => {
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
          <div className="mt-8 text-center py-4">
            <Link href={`/products${serialize({ categoria: ["kit"] })}`}>
              <Button variant={"default"} size={"lg"}>
                Ver Todos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold pb-6">MAIS VENDIDOS</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wines
              .filter((vinho) => vinho.categoria === "singular")
              .splice(0, 4)
              .map((vinho) => {
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
          <div className="mt-8 text-center py-4">
            <Link href={`/products${serialize({ categoria: ["singular"] })}`}>
              <Button variant={"default"} size={"lg"}>
                Ver Todos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Your Ideal Wine */}
      <section className="py-12">
        <div className="container mx-auto px-4 pb-6">
          <h2 className="mb-8 text-center text-3xl font-bold pb-6">
            ENCONTRE SEU VINHO IDEAL
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["29,90", "49,90", "99,90"].map((price) => (
              <Link 
								key={price}
								href={`/products?preco=${price.replace(",", ".")}`}>
							<div
                className="cursor-pointer rounded-lg bg-primary p-8 text-center text-white hover:bg-primary/90"
              >
                <h3 className="mb-2 text-2xl">VINHOS ATÉ</h3>
                <p className="text-4xl font-bold">R${price}</p>
              </div>
							</Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
