/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useEffect } from "react";
import { applyDiscount, formatPrice } from "~/lib/utils";
import "~/lib/zoom.css";
import { type getWineById } from "~/server/db/select";
import { ProductCounter } from "../product-counter";
import Stars from "../stars";

export function ProductPageComponent({
  wine,
}: {
  wine: NonNullable<Awaited<ReturnType<typeof getWineById>>>;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="zoom-img flex h-96 w-full items-center justify-center overflow-hidden">
            <Image
              src={wine.img}
              alt={wine.name}
              width={384}
              height={384}
              className="h-[80%] w-auto object-contain"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{wine.name}</h1>
              <div className="flex items-center">
                <Stars stars={wine.stars} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold">
                {formatPrice(applyDiscount(wine.preco, wine.desconto))}
              </span>
              {wine.desconto > 0 && (
                <>
                  <p className="ml-4 text-3xl font-bold text-gray-400 line-through">
                    {formatPrice(Number(wine.preco))}
                  </p>
                  <p className="ml-6 select-none rounded-xl bg-red-100 px-3 py-1 font-semibold text-red-500">
                    -{Number(wine.desconto).toFixed(0)}%
                  </p>
                </>
              )}
            </div>
            <p className="my-6 text-base text-gray-600">{wine.descricao}</p>
            <div className="mb-4 flex flex-col items-start space-y-2 text-sm text-gray-600">
              <span>
                🍷 {wine.winesToGrapes.map((wG) => wG.grape.name).join(", ")}
              </span>
              <span className="flex items-center">
                <img
                  alt="country flag"
                  className="mr-1 h-5 w-5 object-cover"
                  src={getCountryImg(wine.pais)}
                />
                <p className="text-neutral-500">{wine.pais}</p>
              </span>
              <span>
                📦{" "}
                {wine.unidades === 1
                  ? "1 unidade"
                  : `${wine.unidades} unidades`}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <ProductCounter id={wine.id} />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          {/* saiba mais */}
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              Saiba mais sobre o produto
            </h2>
            <p className="text-gray-600">{wine.descricao}</p>
          </section>

          <div className="grid gap-8 md:grid-cols-2">
            {/* como degustar */}
            <section>
              <h2 className="mb-2 text-xl font-semibold">Como degustar</h2>
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold">Observe a cor</h3>
                  <p className="text-gray-600">{wine.cor}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Sinta os aromas</h3>
                  <p className="text-gray-600">{wine.aroma}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Em boca</h3>
                  <p className="text-gray-600">{wine.sabor}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Harmonize com</h3>
                  <p className="text-gray-600">
                    {wine.winesToGrapes
                      .map((wG) => getHarmonizacao(wG.grape.name))
                      .join(", ")}.
                  </p>
                </div>
              </div>
            </section>
            {/* ficha técnica */}
            <section>
              <h2 className="mb-2 text-xl font-semibold">Ficha Técnica</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <h3 className="font-semibold">Volume</h3>
                  <p>{wine.volume}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Safra</h3>
                  <p>{wine.safra}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Teor Alcoólico</h3>
                  <p>{wine.teoralcoolico}%</p>
                </div>
                <div>
                  <h3 className="font-semibold">Temperatura de serviço</h3>
                  <p>{wine.temperaturaservico}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Tipo de fechamento</h3>
                  <p>{wine.tipofechamento}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function getHarmonizacao(uva: string) {
  switch (uva.toLowerCase()) {
    case "tempranillo":
      return "Carnes vermelhas, presuntos curados e queijos curados";
    case "grenache":
      return "Pratos mediterrâneos, cordeiro e queijos suaves";
    case "merlot":
      return "Massas com molho vermelho, aves e queijos semi-curados";
    case "sauvignon blanc":
      return "Frutos do mar, saladas frescas e queijos de cabra";
    case "verdejo":
      return "Tapas, pratos leves e frutos do mar";
    case "uvas variadas":
      return "Pratos variados conforme a combinação das uvas utilizadas";
    case "moscatel":
      return "Sobremesas, queijos azuis e frutas frescas";
    case "pinot noir":
      return "Peixes gordos como salmão, pato e cogumelos";
    case "airén":
      return "Pratos leves, saladas e peixes grelhados";
    case "chardonnay":
      return "Frutos do mar, aves e queijos cremosos";
    case "syrah":
      return "Carnes grelhadas, embutidos e queijos fortes";
    case "carménère":
      return "Pratos picantes, carnes de caça e queijos curados";
    case "primitivo":
      return "Massas com molho robusto, carnes vermelhas e queijos intensos";
    case "malbec":
      return "Carnes vermelhas, churrasco e queijos curados";
    case "nebbiolo":
      return "Pratos italianos, trufas e queijos envelhecidos";
    case "cabernet sauvignon":
      return "Carnes vermelhas, costelas de porco e queijos fortes";
    case "antão vaz":
      return "Frutos do mar, saladas e queijos suaves";
    case "verdelho":
      return "Pratos asiáticos, frutos do mar e queijos leves";
    case "arinto":
      return "Peixes, mariscos e pratos com sabores cítricos";
    case "alicante branco":
      return "Aves, peixes e pratos com ervas frescas";
    case "tamarez":
      return "Sobremesas doces, queijos azuis e frutas secas";
    case "chenin blanc":
      return "Frutos do mar, aves e queijos suaves";
    case "cinsault":
      return "Saladas, pratos leves e queijos macios";
    case "tibouren":
      return "Pratos mediterrâneos, frutos do mar e queijos frescos";
    default:
      return "Harmonização não disponível para esta uva";
  }
}

function getCountryImg(country: string): string {
  let link = "https://cdn-icons-png.flaticon.com/512/9746/9746676.png";
  switch (country.toLowerCase()) {
    case "brasil":
      link = "https://cdn-icons-png.flaticon.com/128/5372/5372653.png";
      break;
    case "argentina":
      link = "https://cdn-icons-png.flaticon.com/128/197/197573.png";
      break;
    case "portugal":
      link = "https://cdn-icons-png.flaticon.com/128/12364/12364368.png";
      break;
    case "espanha":
      link = "https://cdn-icons-png.flaticon.com/128/197/197593.png";
      break;
    case "frança":
      link = "https://cdn-icons-png.flaticon.com/128/197/197560.png";
      break;
    case "italia":
      link = "https://cdn-icons-png.flaticon.com/128/197/197626.png";
      break;
  }
  return link;
}
