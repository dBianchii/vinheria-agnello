/* eslint-disable @next/next/no-img-element */
// app/product/[id]/page.tsx

"use client";

import { getCountryImg } from "data/getCountryImg";
import { type IProduto } from "data/vinhos";
import { Archive, Wine } from "lucide-react";
import Image from "next/image";
import { formatPrice } from "~/lib/utils";
import "~/lib/zoom.css";
import { ProductCounter } from "../product-counter";
import Stars from "../stars";

export function ProductPageComponent({ product }: { product: IProduto }) {
  const finalPrice = (price: number, discount: number) =>
    price - (price * discount) / 100;

  return (
    <div className="flex justify-center overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      {product && (
        <div className="container flex w-4/5 gap-4 p-4">
          <div className="zoom-img w-1/2 rounded border">
            <Image
              src={product.img}
              alt={product.name}
              width={300}
              height={300}
              className="w-full"
            />
          </div>
          <div className="flex w-1/2 flex-col justify-between">
            <div>
              <h3 className="mb-4 text-4xl font-bold">{product.name}</h3>
              <Stars stars={product.stars} />
              <div className="mt-4 flex items-center">
                <p className="text-3xl font-bold">
                  {formatPrice(finalPrice(product.preco, product.desconto))}
                </p>
                {product.desconto > 0 && (
                  <>
                    <p className="ml-4 text-3xl font-bold text-gray-400 line-through">
                      {formatPrice(product.preco)}
                    </p>
                    <p className="ml-6 select-none rounded-xl bg-red-100 px-3 py-1 font-semibold text-red-500">
                      -{product.desconto}%
                    </p>
                  </>
                )}
              </div>
              <div className="py-8 text-lg font-light text-neutral-500">
                {product.descricao}
              </div>
              <div>
                <span className="mb-2 flex items-center justify-start text-lg">
                  <Wine className="mr-3 w-7 text-rose-900" />
                  <p className="text-neutral-500">{product.tipo_de_uva}</p>
                </span>
                <span className="mb-2 flex items-center justify-start text-lg">
                  <img
                    alt="country flag"
                    className="mr-3 h-7 w-7 object-cover"
                    src={getCountryImg(product.pais)}
                  />
                  <p className="text-neutral-500">{product.pais}</p>
                </span>
                <span className="mb-2 flex items-center justify-start text-lg">
                  <Archive className="mr-3 w-7" />
                  <p className="text-neutral-500">
                    {product.unidades} unidade{product.unidades != 1 ? "s" : ""}
                  </p>
                </span>
              </div>
            </div>
            <div className="w-44">
              <ProductCounter product={product} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
