/* eslint-disable @next/next/no-img-element */
"use client";

import { getCountryImg } from "data/getCountryImg";
import { Archive, Wine } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { formatPrice } from "~/lib/utils";
import "~/lib/zoom.css";
import { type getWineById } from "~/server/db/select";
import { ProductCounter } from "../product-counter";
import Stars from "../stars";

export function ProductPageComponent({
  wine,
}: {
  wine: NonNullable<Awaited<ReturnType<typeof getWineById>>>;
}) {
  const finalPrice = (price: number, discount: number) =>
    price - (price * discount) / 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex justify-center overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <div className="container flex w-4/5 gap-4 p-4">
        <div className="zoom-img w-1/2 rounded border">
          <Image src={wine.img} alt={wine.name} width={200} height={600} />
        </div>
        <div className="flex w-1/2 flex-col justify-between">
          <div>
            <h3 className="mb-4 text-4xl font-bold">{wine.name}</h3>
            <Stars stars={wine.stars} />
            <div className="mt-4 flex items-center">
              <p className="text-3xl font-bold">
                {formatPrice(finalPrice(wine.preco, wine.desconto))}
              </p>
              {wine.desconto > 0 && (
                <>
                  <p className="ml-4 text-3xl font-bold text-gray-400 line-through">
                    {formatPrice(wine.preco)}
                  </p>
                  <p className="ml-6 select-none rounded-xl bg-red-100 px-3 py-1 font-semibold text-red-500">
                    -{wine.desconto}%
                  </p>
                </>
              )}
            </div>
            <div className="py-8 text-lg font-light text-neutral-500">
              {wine.descricao}
            </div>
            <div>
              <span className="mb-2 flex items-center justify-start text-lg">
                <Wine className="mr-3 w-7 text-rose-900" />
                <p className="text-neutral-500">{wine.uva}</p>
              </span>
              <span className="mb-2 flex items-center justify-start text-lg">
                <img
                  alt="country flag"
                  className="mr-3 h-7 w-7 object-cover"
                  src={getCountryImg(wine.pais)}
                />
                <p className="text-neutral-500">{wine.pais}</p>
              </span>
              <span className="mb-2 flex items-center justify-start text-lg">
                <Archive className="mr-3 w-7" />
                <p className="text-neutral-500">
                  {wine.unidades} unidade{wine.unidades != 1 ? "s" : ""}
                </p>
              </span>
            </div>
          </div>
          <div className="w-44">
            <ProductCounter id={wine.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
