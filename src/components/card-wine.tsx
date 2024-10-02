import Image from "next/image";
import React from "react";
import Stars from "./stars";
import { calculatePriceAfterDiscount, formatPrice } from "~/lib/utils";
import DiscountBadge from "./discount-badge";
import Link from "next/link";

interface CardWineProps {
  name: string;
  stars: number;
  price: number;
  discount: number;
  imgUrl: string;
  id: number;
	isPriority?: boolean;
}

export default function CardWine({
  name,
  stars,
  price,
  discount,
  imgUrl,
  id,
	isPriority = false
}: CardWineProps) {
  const finalPrice = calculatePriceAfterDiscount(price, discount);

  return (
    <Link
      href={`/product/${id}`}
      className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg"
    >
      <div className="w-full h-48 overflow-hidden flex items-center justify-center">
        <Image
          src={imgUrl}
          alt={name}
          width={300}
          height={300}
          className="h-full w-auto object-contain"
					priority={isPriority}
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 font-semibold">{name}</h3>
        <Stars stars={stars} />
        <div className="flex items-center gap-2 lg:flex-col lg:items-start lg:gap-0 xl:flex-row xl:items-center xl:gap-2">
          <p className="text-lg font-bold">{formatPrice(finalPrice)}</p>
          {discount > 0 && (
            <div className="flex items-center">
              <p className="text-sm text-gray-500 line-through">
                {formatPrice(Number(price))}
              </p>
              <DiscountBadge classname="ml-2 text-xs" discount={discount} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
