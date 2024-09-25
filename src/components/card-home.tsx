import Image from "next/image";
import React from "react";
import Stars from "./stars";
import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import DiscountBadge from "./discount-badge";

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
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">{formatPrice(finalPrice)}</p>
          {discount > 0 && (
            <div className="flex items-center">
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(price)}
              </p>
              <DiscountBadge classname="ml-2 text-xs" discount={discount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
