import Image from "next/image";
import React from "react";
import Stars from "./stars";
import { calculatePriceAfterDiscount } from "~/lib/utils";

interface CardHomeProps {
  name: string;
  stars: number;
  price: number;
  discount: number;
  imgUrl: string;
  id: string;
  handleClick: (id: string) => void;
}

export default function CardHomePage({
  name,
  stars,
  price,
  discount,
  imgUrl,
  id,
  handleClick,
}: CardHomeProps) {
  const finalPrice = calculatePriceAfterDiscount(price, discount);

  return (
    <div
      onClick={() => handleClick(id)}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg"
    >
      <Image
        src={imgUrl}
        alt={name}
        width={300}
        height={300}
        className="w-full"
      />
      <div className="p-4">
        <h3 className="mb-2 font-semibold">{name}</h3>
        <Stars stars={stars} />
        <p className="text-lg font-bold">R${finalPrice.toFixed(2)}</p>
        <div className="flex items-center gap-2 text-xs">
          <p className="text-sm text-gray-500 line-through">
            R${price.toFixed(2)}
          </p>
          <p className="text-red-500">-{discount.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
}
