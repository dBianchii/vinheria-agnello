import Image from "next/image";
import React from "react";
import Stars from './stars';

interface CardHomeProps {
  name: string;
  stars: number;
  price: number;
  oldPrice: number;
  imgUrl: string;
}

export default function CardHomePage({name, stars, price, oldPrice, imgUrl}: CardHomeProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
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
        <p className="text-lg font-bold">R${price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 line-through">R${oldPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}


