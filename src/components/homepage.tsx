"use client";

import Image from "next/image";
import CardHomePage from "./card-home";
import Header from "./header";
import Footer from "./footer";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { vinhos } from "data/vinhos";
import Stats from "./stats";
import { useRouter } from "next/navigation";

export function Homepage() {
  const router = useRouter();

  const goToProductPage = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-200 py-12 md:py-24">
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              O VINHO PERFEITO, A UM CLIQUE DE DISTÂNCIA
            </h1>
            <p className="mb-6 text-xl">
              Descubra nossa seleção de vinhos premium e encontre o sabor ideal
              para cada ocasião.
            </p>
            <Button
              className="bg-[#6d071a] text-white hover:bg-[#8d0922]"
              variant={"default"}
              size={"lg"}
            >
              Comprar Agora
            </Button>
          </div>
          <div className="flex justify-end md:w-1/2">
            <Image
              src="https://placehold.co/500x300"
              alt="Wine Selection"
              width={500}
              height={300}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <Stats />
      </section>

      {/* Kits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">KITS</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vinhos.map((vinho) => (
              <CardHomePage
                key={vinho.name}
                name={vinho.name}
                stars={vinho.stars} // Coloque a avaliação que desejar
                price={vinho.preco}
                oldPrice={vinho.preco + 50} // Exemplo de preço anterior
                imgUrl={vinho.img}
                id={vinho.id}
                handleClick={goToProductPage}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              className="bg-[#6d071a] text-white hover:bg-[#8d0922]"
              variant={"default"}
              size={"lg"}
            >
              Ver Todos
            </Button>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">MAIS VENDIDOS</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vinhos.map((vinho) => (
              <CardHomePage
                key={vinho.name}
                name={vinho.name}
                stars={vinho.stars} // Coloque a avaliação que desejar
                price={vinho.preco}
                oldPrice={vinho.preco + 50} // Exemplo de preço anterior
                imgUrl={vinho.img}
                id={vinho.id}
                handleClick={goToProductPage}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              className="bg-[#6d071a] text-white hover:bg-[#8d0922]"
              variant={"default"}
              size={"lg"}
            >
              Ver Todos
            </Button>
          </div>
        </div>
      </section>

      {/* Find Your Ideal Wine */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            ENCONTRE SEU VINHO IDEAL
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["R$29,90", "R$49,90", "R$99,90"].map((price) => (
              <div
                key={price}
                className="cursor-pointer rounded-lg bg-[#6d071a] p-8 text-center text-white hover:bg-[#8d0922]"
              >
                <h3 className="mb-2 text-2xl">VINHOS ATÉ</h3>
                <p className="text-4xl font-bold">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold">
              FIQUE POR DENTRO DE NOSSAS OFERTAS EXCLUSIVAS DE VINHOS!
            </h2>
            <form className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-grow rounded px-4 py-2 text-gray-900"
              />
              <Button
                type="submit"
                className="bg-[#6d071a] text-white hover:bg-[#8d0922]"
                variant={"default"}
                size={"lg"}
              >
                Quero receber ofertas!
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
